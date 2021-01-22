
class StudyGuide {
    constructor(attributes) {
        let whitelist = ["id", "name"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
        // this["id"] = attributes["id"] OR this.id = attributes.id
        // this["name"] = attributes["name"]
    }

    static container() {
        return this.c ||= document.querySelector("#guides")
    }

    // StudyGuide.all() will return a promise for all of the study_guide objects that we get from fetching to /study_guides
    // This collection will be stored locally in StudyGuide.collection so we can reference it after initial call to StudyGuide.all
    // which will occur at the DOMContentLoaded event.

    static all() {
        return fetch("http://localhost:3000/study_guides", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
                //Body?
            }
        })
            .then(res => {
                if(res.ok) {
                    return res.json() //returns a promise for body content parsed as json
                } else {
                    return res.text().then(error => Promise.reject(error)) // return a rejected promise so we skip the following then and go to catch
                }
            })
            .then(studyGuidesJson => {
                this.collection = studyGuidesJson.map(attrs => new  StudyGuide(attrs))
                let renderedGuides = this.collection.map(studyGuide => studyGuide.render())
                this.container().append(...renderedGuides)
                // append is NOT looking for an array, it wants a series of elements so we change it to ...renderedGuides
                return this.collection //bc i might want to use return value later; return a promise
            })
    }

    //StudyGuide.findById(id) accepts id as an arg and returns the SG matching that id
    static findById(id) {
        return this.collection.find(studyGuide => studyGuide.id == id); //google double equals vs triple
    }

    //StudyGuide.create(formData) makes a fetch request to create new SG in database
    //will use a successful resp to create new SG client side, store it in this.collection
    //will also call render on it to create the DOM element we'll use to represent it in our web page
    //will then add that DOM note to SG.container()
    //will return promise for SG obj created\
    
    static create(formData) {
        return fetch("http://localhost:3000/study_guides", {
            method: 'POST', //default method is GET; post requests require a body
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            //formdata is an object and when we send info to server we don't want to send an object, we want to send a string so here we convert the object into string format in JSON
            //allows string to be parsed in ruby when it gets to server and then used as a hash to create a new SG on the server side
            //have to have key called study_guide so formdata is obj with things in our white list (just name for SG)
            body: JSON.stringify({study_guide: formData})
        })
        .then(res => {
            if(res.ok) {
                return res.json() //returns a promise for body content parsed as json
            } else {
                return res.text().then(error => Promise.reject(error)) // return a rejected promise so we skip the following then and go to catch
            }
        })
        .then(studyGuideAttributes => {
            let studyGuide = new StudyGuide(studyGuideAttributes);
            this.collection.push(studyGuide);
            studyGuide.render() //this gives us list item element that represents that partiular study guide
            //then put into the DOM
            this.container().appendChild(studyGuide.render()); //look up diff bewteen append and appendchild
            new FlashMessage({type: 'success', message: 'New study guide added.'});
            //return promise for SG created
            return studyGuide;
        })
        .catch(error => {
            new FlashMessage({type: 'error', message: error});
        })
    }

    //instance method
    //studyGuide.show() => {
        //fetch the /study_guides/:id route to get studyguide and its associated flashcards
        //use the response to create flashcard instances client side by invoking Flashcard.loadByGuide(id, flashcardsAttributes)
    //}

    show() {
        return fetch(`http://localhost:3000/study_guides/${this.id}`, {
            method: 'GET', 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.ok) {
                return res.json() //returns a promise for body content parsed as json
            } else {
                return res.text().then(error => Promise.reject(error)) // return a rejected promise so we skip the following then
            }
        })
        .then(({id, flashcardsAttributes}) => {
            Flashcard.loadByGuide(id, flashcardsAttributes)
           
        })
    }
    
    render() {
        this.element ||= document.createElement('li');
        this.element.classList.add(..."my-2 px-4 bg-green-200 grid grid-cols-12 sm:grid-cols-6".split(" "));

        this.nameLink ||= document.createElement('a');
        this.nameLink.classList.add(..."py-4 col-span-10 sm:col-span-4 selectStudyGuide".split(" "));
        this.nameLink.textContent = this.name;
        this.nameLink.dataset.studyGuideId = this.id; //DOMStringMap 

        this.editLink ||= document.createElement('a');
        this.editLink.classList.add(..."my-4 text-right".split(" "));
        this.editLink.innerHTML = `<i class="fa fa-pencil-alt"></i>`;

        this.deleteLink ||= document.createElement('a');
        this.deleteLink.classList.add(..."my-4 text-right".split(" "));
        this.deleteLink.innerHTML = `<i class="fa fa-trash-alt"></i>`;

        this.element.append(this.nameLink, this.editLink, this.deleteLink);

        return this.element;
    }
}

class Flashcard {
    constructor(attributes) {
        let whitelist = ["id", "cardfront", "cardback", "subject", "memorized", "study_guide_id"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container() {
        return this.c ||= document.querySelector("#flashcards")
    }

    static collection() {
        return this.coll ||= {};
    }


    //create flashcard instances using flashcardsAttributes
    //call render on each of the instances to build the associated DOM node
    //clear out the container() contents
    //append the rendered instances to the container()
    static loadByGuide(id, flashcardsAttributes) {
        Flashcard.study_guide_id = id;
        let flashcards = flashcardsAttributes.map(flashcardAttributes => new Flashcard(flashcardAttributes));
        this.collection()[id] = flashcards; //the keys are the sg ids
        let rendered = flashcards.map(flashcard => flashcard.render());
        //when you call this method it will remove the contents of the container to replace them with new flashcards
        this.container().innerHTML = "";
        this.container().append(...rendered);
    }

    //Flashcard.create(formData)
        //will make a fetch request using the form data and study_guide_id to create a new flashcard instance
        //if resp is okay, we'll parse it as JSON and return that
        //then we use the data we parsed to create a new flashcard instance, store ir, render it and add it to DOM at container()
        //if the resp is not okay, we'll return a rejected promise for the error and catch it with a callback which will display it in a FlashMessage
    static create(formData) {
        //
        if(!Flashcard.study_guide_id) {
            return new FlashMessage({type: 'error', message: "Select a Study Guide before entering a Flashcard"});
        }
        return fetch('/flashcards', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                flashcard: formData
            })
        })

    }

    render() {
        this.element ||= document.createElement('li');
        this.element.classList.add(..."my-2 px-4 bg-green-200 grid grid-cols-12".split(" "));
        
        this.markMemorizedLink ||= document.createElement('a');
        this.markMemorizedLink.classList.add(..."my-1 text-center".split(" "));
        this.markMemorizedLink.innerHTML = `<i class="p-4 far fa-circle">`;

        this.cardFrontSpan ||= document.createElement('span');
        this.cardFrontSpan.classList.add(..."py-4 col-span-9".split(" "));
        this.cardFrontSpan.textContent = this.cardfront;

        this.editLink ||= document.createElement('a');
        this.editLink.classList.add(..."my-1 text-right".split(" "));
        this.editLink.innerHTML = `<i class="p-4 fa fa-pencil-alt"></i>`;

        this.deleteLink ||= document.createElement('a');
        this.deleteLink.classList.add(..."my-1 text-right".split(" "));
        this.deleteLink.innerHTML = `<i class="p-4 fa fa-trash-alt"></i>`;

        this.element.append(this.markMemorizedLink, this.cardFrontSpan, this.editLink, this.deleteLink);
        
        return this.element;
    }
}


// new FlashMessage({type: 'error', message: 'Name is required'})
// this will create flash message and fade it in
//it will also trigger a fade out in 5 seconds

class FlashMessage {
    constructor({type, message}) {
        this.message = message;
        //color will be red if error and blue if success
        //type controls the background color
        this.color = type == "error" ? 'bg-red-200' : 'bg-blue-100';
        //when we create the message we then want to add it to the DOM:
        this.render();
    }

    static container() {
        return this.c ||= document.querySelector('#flash')
    }    

    render() {
       this.toggleMessage();
       window.setTimeout(() => this.toggleMessage(), 5000);
    }

    toggleMessage() {
         //message into the container
         FlashMessage.container().textContent = this.message;
         FlashMessage.container().classList.toggle(this.color);
         FlashMessage.container().classList.toggle('opacity-0');
    }
}
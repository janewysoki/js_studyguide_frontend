
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


    //StudyGuide.create(formData) makes a fetch request to create new SG in database
    //will use a successful resp to create new SG client side, store it in this.collection
    //will also call render on it to create the DOM element we'll use to represent it in our web page
    //will then add that DOM note to SG.container()
    //will return promise for SG obj created\
    
    static create(formData) {
        return fetch("http://localhost:3000/study_guides",, {
            method: 'POST', //default method is GET; post requests require a body
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            //formdata is an object and when we send info to server we don't want to send an object, we want to send a string so here we convert the object into string format in JSON
            //allows string to be parsed in ruby when it gets to server and then used as a hash to create a new SG on the server side
            //have to have key called study_guide so formdata is obj with things in our white list (just name for SG)
            body: JSON.stringify(study_guide: formData)
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
            //return promise for SG created
            return studyGuide;
        })
    }


    // static create(formData) {
    //     return fetch("http://localhost:3000/study_guides", {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify(formData)
    //     })
    //     .then(res => {
    //         if (res.ok) {
    //             return res.json()
    //         } else {
    //             return res.text().then(errors => Promise.reject(errors))
    //         }
    //     })
    //     .then (json => {
    //         let studyGuide = new StudyGuide(json);
    //         this.collection.push(studyGuide);
    //         this.container().appendChild(studyGuide.render());
    //         new FlashMessage({type: 'success', message: 'StudyGuide created successfully'})
    //         return studyGuide;
    //     })
    //     .catch(error => {
    //         new FlashMessage({type: 'error', message: error})
    //     })
    // }

    // //gets us the instance
    // static findbyId() {
    //     return this.collection.find(studyGuide => studyGuide.id == id)
    // }

    // edit() {
    //     //remove links i added and grid classes so form looks good
    //     [this.nameLink, this.editLink, this.deleteLink].forEach(eg => eg.remove())
    //     this.element.classList.remove(..."grid grid-cols-12 sm:grid-cols-6 pl-4".split(" "))
    //     //then checks if form already exists, then all we do is replace name input value with name of studyguide
    //     if (this.form) {
    //         this.nameInput.value = this.name;
    //     } else { //otherwise create the form
    //         this.form = document.createElement('form');
    //         //then add classlist to make it look the way it should
    //         //run split to get array of class names 
    //         //then call spread operator on that array to spread out each element to be a separate argument to classList (which accepts a sequence of strings as an arg)
    //         this.form.classList.add(..."editStudyGuideForm flex mt-4".split(" "));
    //         this.form.dataset.studyGuideId = this.id;
    //         //add name input
    //         this.nameInput = document.createElement('input');
    //         this.nameInput.value = this.name;
    //         this.nameInput.name = 'name';
    //         this.nameInput.classList.add(..."flex-1 p-3".split(" "));
    //         //add save button
    //         this.saveButton = document.createElement('button');
    //         this.saveButton.classList.add("flex-none");
    //         this.saveButton.innterHTML = `<i class="fa fa-save p-4 z--1 bg-green-400"></i>`
    //         //then put the save button into the form
    //         this.form.append(this.nameInput, this.saveButton);
    //     }
    //     //then add the form into the guide item
    //     this.element.append(this.form);
    //     this.nameInput.focus();
    // }
    // // studyGuide.render() will create an li element and assign it to this.element
    // // it will then fill the element with contents looking like the below html:

    // update(formData) {
    //     return fetch(`http://localhost:3000/study_guides/${this.id}`, {
    //         method: 'PUT',
    //         headers: {
    //           "Content-Type": "application/json",
    //           "Accept": "application/json"
    //         },
    //         body: JSON.stringify(formData)
    //       })
    //         .then(res => {
    //           if(res.ok) {
    //             return res.json()
    //           } else {
    //             return res.text().then(errors => Promise.reject(errors))
    //           }
    //         })
    //         .then(json => {
    //           //update this object with the json response
    //           Object.keys(json).forEach((key) => this[key] = json[key])
    //           // remove the form
    //           this.form.remove();
    //           // add the nameLink edit and delete links in again.
    //           this.render();
    //           new FlashMessage({type: 'success', message: 'StudyGuide updated successfully'})
    //           return studyGuide;
    //         })
    //         .catch(error => {
    //           new FlashMessage({type: 'error', message: error});
    //         })
    // }


    render() {
        this.element ||= document.createElement('li');
        this.element.classList.add(..."my-2 px-4 bg-green-200 grid grid-cols-12 sm:grid-cols-6".split(" "));

        this.nameLink ||= document.createElement('a');
        this.nameLink.classList.add(..."py-4 col-span-10 sm:col-span-4".split(" "));
        this.nameLink.textContent = this.name;

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
        return this.c ||= document.querySelector("#cards")
    }
}

// class FlashMessage {
//     constructor({message, type}) {
//       this.error = type === "error";
//       this.message = message;
//       this.render()
//     }
  
//     container() {
//       return this.c ||= document.querySelector("#flash")
//     }
  
//     render() {
//       this.container().textContent = this.message;
//       this.toggleDisplay();
//       setTimeout(() => this.toggleDisplay(), 5000);
//     }
  
//     toggleDisplay() {
//       this.container().classList.toggle('opacity-0');
//       this.container().classList.toggle(this.error ? 'bg-red-200' : 'bg-blue-200')
//       this.displayed = !this.displayed;
//     } 
//   }
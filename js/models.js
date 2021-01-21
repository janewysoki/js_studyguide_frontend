
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

    static create(formData) {
        return fetch("http://localhost:3000/study_guides", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return res.text().then(errors => Promise.reject(errors))
            }
        })
        .then (json => {
            let studyGuide = new StudyGuide(json);
            this.collection.push(studyGuide);
            this.container().appendChild(studyGuide.render());
            new FlashMessage({type: 'success', message: 'StudyGuide created successfully'})
            return studyGuide;
        })
        .catch(error => {
            new FlashMessage({type: 'error', message: error})
        })
    }

    //gets us the instance
    static findbyId() {
        return this.collection.find(studyGuide => studyGuide.id == id)
    }

    edit() {
        //remove links i added and grid classes so form looks good
        [this.nameLink, this.editLink, this.deleteLink].forEach(eg => eg.remove())
        this.element.classList.remove(..."grid grid-cols-12 sm:grid-cols-6 pl-4".split(" "))
        //then checks if form already exists, then all we do is replace name input value with name of studyguide
        if (this.form) {
            this.nameInput.value = this.name;
        } else { //otherwise create the form
            this.form = document.createElement('form');
            //then add classlist to make it look the way it should
            //run split to get array of class names 
            //then call spread operator on that array to spread out each element to be a separate argument to classList (which accepts a sequence of strings as an arg)
            this.form.classList.add(..."editStudyGuideForm flex mt-4".split(" "));
            this.form.dataset.studyGuideId = this.id;
            //add name input
            this.nameInput = document.createElement('input');
            this.nameInput.value = this.name;
            this.nameInput.name = 'name';
            this.nameInput.classList.add(..."flex-1 p-3".split(" "));
            //add save button
            this.saveButton = document.createElement('button');
            this.saveButton.classList.add("flex-none");
            this.saveButton.innterHTML = `<i class="fa fa-save p-4 z--1 bg-green-400"></i>`
            //then put the save button into the form
            this.form.append(this.nameInput, this.saveButton);
        }
        //then add the form into the guide item
        this.element.append(this.form);
        this.nameInput.focus();
    }
    // studyGuide.render() will create an li element and assign it to this.element
    // it will then fill the element with contents looking like the below html:

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
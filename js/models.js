
class StudyGuide {
    constructor(attributes) {
        let whitelist = ["id", "name"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
        // this["id"] = attributes["id"] OR this.id = attributes.id
        // this["name"] = attributes["name"]
    }

    static container() {
        return this.c ||= document.querySelector("#studyGuidesContainer")
    }

    static guide() {
        return this.g ||= document.querySelector('#guides')
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
            .then(studyGuideArray => {
                this.collection = studyGuideArray.map(attrs => new  StudyGuide(attrs))
                
            })
    }

    // studyGuide.render() will create an li element and assign it to this.element
    // it will then fill the element with contents looking like the below html:

    render() {
        this.element ||= document.createElement('li');
        this.element.class = "my-2 px-4 bg-green-200 grid grid-cols-12 sm:grid-cols-6";

        this.nameLink ||= document.createElement('a');
        this.nameLink.class = "py-4 col-span-10  sm:col-span-4";
        this.nameLink.textContent = this.name;

        this.editLink ||= document.createElement('a');
        this.editLink.class = "my-4 text-right";
        this.editLink.innerHTML = `<i class="fa fa-pencil-alt"></i>`;

        this.deleteLink ||= document.createElement('a');
        this.deleteLink.class = "my-4 text-right";
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
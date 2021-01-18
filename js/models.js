
class StudyGuide {
    constructor(attributes) {
        let whitelist = []
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container() {
        return this.c ||= document.querySelector("#studyGuidesContainer")
    }

    static guide() {
        return this.g ||= document.querySelector('#guides')
    }

    render() {

    }
}

class Flashcard {
    constructor(attributes) {
        let whitelist = []
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container() {
        return this.c ||= document.querySelector("#cards")
    }
}

class StudyGuide {
    constructor(attributes) {
        let whitelist = ["id", "name"]
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
        let whitelist = ["id", "cardfront", "cardback", "subject", "memorized", "study_guide_id"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container() {
        return this.c ||= document.querySelector("#cards")
    }
}
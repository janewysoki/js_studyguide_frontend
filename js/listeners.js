document.addEventListener('DOMContentLoaded', function(e) {
    StudyGuide.all();
})

document.addEventListener('click', function(e) {
    //store target
    let target = e.target;
    if(target.matches(".selectStudyGuide")) {
        let studyGuide = StudyGuide.findById(target.dataset.studyGuideId)
        studyGuide.show(); // calling show on the instance found in line above
    } else if (target.matches(".toggleMemorized")) {
        let flashcard = Flashcard.findById(target.dataset.flashcardId);
        flashcard.toggleMemorized();
    } else if (target.matches(".cardFront")) {
        let cardBack = target.nextElementSibling;
        if(cardBack.classList.contains("opacity-0")) {
            cardBack.classList.replace("opacity-0", "opacity-100")
            cardBack.classList.replace("max-h-0", "max-h-screen")
        } else {
            cardBack.classList.replace("opacity-100", "opacity-0")
            cardBack.classList.replace("max-h-screen", "max-h-0")
        }
    } 
})

document.addEventListener('submit', function(e) {
    let target = e.target;
    if(target.matches('#newStudyGuide')) {
        e.preventDefault(); //prevents page refresh?
        let formData = {}
        target.querySelectorAll('input').forEach(function(input) {
            formData[input.name] = input.value;
        })
        StudyGuide.create(formData)
            .then(() => {
                target.querySelectorAll('input').forEach(function(input) {
                    input.value = ""; //won't leave title in study guide entry box
                })
            });
    } else if(target.matches('#newFlashcardForm')) {
        e.preventDefault();
        let formData = {};
        target.querySelectorAll('input').forEach(function(input) {
            formData[input.name] = input.value;
        });
        Flashcard.create(formData)
            .then(() => {
                target.querySelectorAll('input').forEach(function(input) {
                    input.value = ""; //won't leave title in flashcard entry box
                })
            });
    }

})

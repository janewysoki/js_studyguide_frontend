document.addEventListener('DOMContentLoaded', function(e) {
    StudyGuide.all();
})

document.addEventListener('click', function(e) {
    //store target
    let target = e.target;
    if(target.matches(".selectStudyGuide")) {
        let studyGuide = StudyGuide.findById(target.dataset.studyGuideId)
        studyGuide.show()
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
        StudyGuide.create(formData);
    }

})

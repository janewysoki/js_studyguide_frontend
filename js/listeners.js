document.addEventListener('DOMContentLoaded', function(e) {
    StudyGuide.all();
})

document.addEventListener('click', function(e) {
    console.dir(e.target)
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

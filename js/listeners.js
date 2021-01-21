document.addEventListener('DOMContentLoaded', function(e) {
    StudyGuide.all();
})

document.addEventListener('click', function(e) {
    console.dir(e.target)
    let target = e.target;
    if (target.matches('.editStudyGuide')) {
        let guide = StudyGuide.findbyId(target.dataset.studyGuideId);
        guide.edit();
    }
})

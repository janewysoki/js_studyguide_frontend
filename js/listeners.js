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
        console.log("submit form")
    }

})
// document.addEventListener('click', function(e) {
//     console.dir(e.target)
//     let target = e.target;
//     if (target.matches('.editStudyGuide')) {
//         let guide = StudyGuide.findbyId(target.dataset.studyGuideId);
//         guide.edit();
//     }
// })

// document.addEventListener('submit', function(e) {
//     let target = e.target; 
//     if(target.matches('#newStudyGuide')) {
//       e.preventDefault();
//       let nameInput = target.querySelector('input[name="name"]');
//       let formData = {
//           name: nameInput.value
//       };
//       StudyGuide.create({study_guide: formData})
//         .then(() => nameInput.value = "");
//     } else if (target.matches('.editStudyGuideForm')) {
//       e.preventDefault();
//       let nameInput = target.querySelector('input[name="name"]');
//       let formData = {
//         name: nameInput.value
//       };
//       let guide = StudyGuide.findById(target.dataset.studyGuideId);
//       guide.update({study_guide: formData});
  
//     }
// })
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





listeners

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
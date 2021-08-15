const titleTag = document.querySelector("#gesture-page-title");
const titleReplace = document.querySelector("#emer-title");
const imgReplace = document.querySelector("#emer-image");

const urlParams = new URLSearchParams(window.location.search);
const gestureId = urlParams.get('gestureId');

function fetchDataFromTopicID() {
    if (gestureId) {
        const topicsRef = firebase.database().ref(`gestures2/${gestureId}`);
        topicsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            titleReplace.innerHTML = "Sign: " + data.title;
            imgReplace.innerHTML+= `<iframe width="100%" height="100%" src=${data.src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        });
    }
}
// const renderModules = (data) => {


//     for (key in data) {

        

 

//         const module = data[key];
//         let contentWrapper = ""

//         module.content.forEach(content => {
//             contentWrapper += `
//                   <li class="list-group-item d-flex justify-content-between align-items-center">
//     ${content.name}
//     <span class="badge badge-primary badge-pill" id="timePill">${content.time} mins</span>
//   </li>
//                 `
//         });

//         moduleWrapper.innerHTML += `
//                 <div class="col">
//                     <a class="card shadow mb-6" href="viewModule.html?topicId=${topicId}&moduleId=${key}">
//             <img class= card-img-top src=${module.image}>
//                     <div class="card-header py-3">
//                 <h5 class="m-0 font-weight-bold text-primary" id="moduleName">${module.name}</h6>
//                 <h6 class="card-text" style="text-align:left;">${module.description}</h6>
//                                <ul class="list-group">
//             ${contentWrapper}
//             </ul>
//             </div>
  

//         </div>

//                 </div>
//             `

//     }

// }

window.addEventListener("DOMContentLoaded", function (ev) {
    console.log("DOMContentLoaded event");
    fetchDataFromTopicID()
});


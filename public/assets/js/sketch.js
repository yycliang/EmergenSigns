// Add some header info
// For TM template code

// Video
// const completeButton = document.getElementById("completeLetter");
let video;
let classifier;
let label = 'waiting...';
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/_8wOFtP0j/';
let dataBob;
let time = 1000;

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  
}
const urlParams2 = new URLSearchParams(window.location.search);
const gestureId2 = urlParams2.get('gestureId');

function fetchBobFromTopicID() {
    if (gestureId2) {
        const topicsRef = firebase.database().ref(`gestures/${gestureId2}`);
        topicsRef.on('value', (snapshot) => {
            dataBob = snapshot.val();
            
        });
    }
}
window.addEventListener("DOMContentLoaded", function (ev) {
    console.log("DOMContentLoaded event");
    fetchBobFromTopicID()
});
function setup() {
  let canvas = createCanvas(575, 430);
  canvas.parent('sketch-container');
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  video.size(width, height);

  // STEP 2: Start classifying
  classifyVideo();
  
}

// STEP 2 classify!
function classifyVideo(){
  classifier.classify(video, gotResults);
}

function draw() {
  background('#283a5ae6');
  
  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width/2, height-25)
}


// STEP 3: Get the classification!
function gotResults(error, results) {
  if (error){
    console.error(error);
    return;
  }
  if (results[0].label == dataBob.title.toLowerCase()){
    const completeButton = document.getElementById("completeLetter");
    label = '✅';
    completeButton.innerHTML = `<a class="btn btn-primary" id=${gestureId2} href = "profile.html" onclick=saveTopic(this)>FINISH!</a>`;
  } else {
    classifyVideo();
  }
  
  
}

function saveTopic(btn) {
    var useriddd;
    console.log("savetopics method called")
    const notesRef3 = firebase.database().ref(`users/`);
    notesRef3.on("value", snapshot => {
        const data4 = snapshot.val();
        for (const noteItem in data4) {
            const note = data4[noteItem];
            console.log("note item" + note.name);
            
            if (document.querySelector("#name").innerHTML === note.name) {
                useriddd = noteItem;
                console.log("user found: " + noteItem);
            }
        }
    });

    console.log("hello" +useriddd)
    const notesRef2 = firebase.database().ref(`gestures/`);

    notesRef2.on("value", snapshot => {
        console.log("savetopics value called")
        const data2 = snapshot.val();
        const note = data2[btn.id];
        console.log(btn.id)
        console.log(note)
        console.log("bob" + useriddd);
        firebase.database().ref(`users/${useriddd}/completedGestures`).push({
            name: note.name,
            image: note.src
        })
    });
}
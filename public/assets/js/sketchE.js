// Add some header info
// For TM template code

// Video
// const completeButton = document.getElementById("completeLetter");
let video;
let classifier;
let label = 'waiting...';
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/sxu_578iI/';
let dataJoe;
let time = 1000;

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  
}
const urlParams3 = new URLSearchParams(window.location.search);
const gestureId3 = urlParams3.get('gestureId');

function fetchJoeFromTopicID() {
    if (gestureId3) {
        const topicsRef = firebase.database().ref(`gestures2/${gestureId3}`);
        topicsRef.on('value', (snapshot) => {
            dataJoe = snapshot.val();
            
        });
    }
}
window.addEventListener("DOMContentLoaded", function (ev) {
    console.log("DOMContentLoaded event");
    fetchJoeFromTopicID()
});
function setup() {
  let canvas = createCanvas(575, 430);
  canvas.parent('sketch-container2');
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
  if (results[0].label == dataJoe.title.toLowerCase()){
    const completeButton = document.getElementById("completeEmer");
    label = '✅';
    completeButton.innerHTML = `<a class="btn btn-primary" id="${gestureId3}" onClick="saveTopic()">FINISH!</a>`;
  }
  classifyVideo();
  
  
}
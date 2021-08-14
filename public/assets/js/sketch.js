// Add some header info
// For TM template code

// Video
// const completeButton = document.getElementById("completeLetter");
let video;
let classifier;
let label = 'waiting...';
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/_8wOFtP0j/';
let dataBob;

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
  let canvas = createCanvas(640, 480);
  canvas.parent('sketch-container');
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
  
}

// STEP 2 classify!
function classifyVideo(){
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);
  
  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width/2, height-16)
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
    completeButton.innerHTML = `<a class="btn btn-primary" id="${gestureId2}" onClick="saveTopic()">FINISH!</a>`;
  }
  classifyVideo();
  
  
}
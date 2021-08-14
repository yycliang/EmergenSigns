// Add some header info
// For TM template code

// Video
let video;
let classifier;
let label = 'waiting...'
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/_8wOFtP0j/';

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  
}
const urlParams = new URLSearchParams(window.location.search);
const gestureId = urlParams.get('gestureId');

function fetchDataFromTopicID() {
    if (gestureId) {
        const topicsRef = firebase.database().ref(`gestures/${gestureId}`);
        topicsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            titleReplace.innerHTML = data.title;
            imgReplace.innerHTML+= `<img src=${data.src} class="img-fluid" alt=""></img>`
            
        });
    }
}
// window.addEventListener("DOMContentLoaded", function (ev) {
//     console.log("DOMContentLoaded event");
//     fetchDataFromTopicID()
// });
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
  label = results[0].label;
  classifyVideo();
  
  
}
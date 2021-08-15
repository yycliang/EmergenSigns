window.onload = (event) => {
    console.log("window loadeds")
    // Use this to retain user state between html pages.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        console.log('Logged in: ' + user.displayName);
        const googleUserId = user.uid;
        setUpUI(user);
       
        document.querySelector("#name").innerHTML = user.displayName;
      console.log("name stuff")
      document.querySelector("#imagestuff").innerHTML= `<img alt="..." width="130" class="rounded mb-2 img-thumbnail" src=${user.photoURL}></img>`
    //   document.querySelector("#userDropdown").innerHTML+=`<img class="img-profile rounded-circle" src="${user.photoURL}">`;
    //   document.querySelector("#dash").innerHTML+=`<img class="img-radius" alt="User-Profile-Image" src="${user.photoURL}">`;
      document.querySelector("#email").innerHTML = user.email;
       accessProfile(user.displayName);
        } else {
            setUpUI();
        // If not logged in, navigate back to login page.
        //   
        };
    });
};
const logout = () =>{
    console.log("logout method called")
    firebase.auth().signOut().then(() => {
        window.location('index.html')
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
};

function accessProfile(userName) {
    console.log("Access profile")
    var useriddd = "";
    const notesRef2 = firebase.database().ref(`users/`);
    notesRef2.on("value", snapshot => {
        console.log("notesref in users called")
        const data2 = snapshot.val();
        for (const noteItem in data2) {
            console.log("started");
            const note = data2[noteItem];
            console.log(noteItem);
            if (userName === note.name) {
                found = true;
                useriddd=noteItem;
                console.log("found");
                showstuff(useriddd);
                break;
                
            }
        }
    });
    
    
};
function showstuff(useriddd){
    console.log("hello" + useriddd)
    const notesRef3 = firebase.database().ref(`users/${useriddd}/completedGestures/`);

    notesRef3.on("value", snapshot => {
        console.log("savetopics value called")
        const data2 = snapshot.val();
        let cards = "";
        for (const noteItem in data2) {
            const note = data2[noteItem];
            // console.log(note.title)
            cards += `<div class="col-lg-6 mb-2 pr-lg-1"><img src="${note.image}" alt="" class="img-fluid rounded shadow-sm"></div>`
        }
        document.querySelector("#gestures").innerHTML = cards;
        
    });
}
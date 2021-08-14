const signIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  // console.log(provider)
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var token = credential.accessToken;
    console.log("Logged In")
    // The signed-in user info.
    var user = result.user;

    window.location = 'index.html';
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    const err = {
      errorCode,
      errorMessage,
      email,
      credential
    };
    console.log(err);
  });
}

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      const googleUserId = user.uid;
      setUpUI(user);
      addUser(user);
      
    } else {
        setUpUI();
      // If not logged in, navigate back to login page.
    //   
    };
  });
};

const addUser = user => {
    let found;
    console.log("addUser method called")
    const notesRef2 = firebase.database().ref(`users/`);
    notesRef2.on("value", snapshot => {
        console.log("notesref in users called")
        const data2 = snapshot.val();
        for (const noteItem in data2) {
            console.log("started");
            const note = data2[noteItem];
            console.log(noteItem);
            if (user.displayName === note.name) {
                found = true;
                console.log("found");
            }
        }
        if (!found) {
            firebase.database().ref(`users`).push({
                name: user.displayName,
                image: user.photoURL
            })
        }
    });
};
window.onload = (event) => {
    console.log("window loaded")
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      const googleUserId = user.uid;
      setUpUI(user);
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
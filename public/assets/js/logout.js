
const logout = () =>{
    console.log("logout method called")
    firebase.auth().signOut().then(() => {
        window.location('index.html')
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});

};
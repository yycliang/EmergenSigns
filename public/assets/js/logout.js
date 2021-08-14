const logout = () =>{
    console.log("logout method called")
    firebase.auth().signOut().then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});

};
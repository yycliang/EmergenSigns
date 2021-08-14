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

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
loggedInLinks.forEach(item=>item.style.display = 'block');
loggedOutLinks.forEach(item=>item.style.display = 'none');
const setUpUI = (user) =>{
    if(user){
        loggedInLinks.forEach(item=>item.style.display = 'block');
        loggedOutLinks.forEach(item=>item.style.display = 'none');
    }
    else{
        loggedOutLinks.forEach(item=>item.style.display = 'block');
        loggedInLinks.forEach(item=>item.style.display = 'none');
    }
}
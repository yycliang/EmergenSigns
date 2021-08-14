window.onload = (event) => {
    console.log("window loaded part 2")
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      const googleUserId = user.uid;
      setUpUI(user);
      document.querySelector("#name").innerHTML = user.displayName;
      document.querySelector("#imagestuff").innerHTML= `<img alt="..." width="130" class="rounded mb-2 img-thumbnail" src=${user.photoURL}></img>`
    //   document.querySelector("#userDropdown").innerHTML+=`<img class="img-profile rounded-circle" src="${user.photoURL}">`;
    //   document.querySelector("#dash").innerHTML+=`<img class="img-radius" alt="User-Profile-Image" src="${user.photoURL}">`;
      document.querySelector("#email").innerHTML = user.email;
    //   document.querySelector("#emailV").innerHTML = user.providerId;
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
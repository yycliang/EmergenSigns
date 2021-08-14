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
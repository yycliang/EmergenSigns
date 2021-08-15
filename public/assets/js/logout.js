
window.onload = (event) => {
    console.log("window loaded")
    // Use this to retain user state between html pages.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Logged in: ' + user.displayName);
            const googleUserId = user.uid;
            setUpUI(user);
            getGestures(user.uid);
            getGestures2(user.uid);
            document.querySelector("#name").innerHTML = user.displayName;
            console.log("name stuff")
            document.querySelector("#imagestuff").innerHTML= `<img alt="..." width="130" class="rounded mb-2 img-thumbnail" src=${user.photoURL}></img>`
            //   document.querySelector("#userDropdown").innerHTML+=`<img class="img-profile rounded-circle" src="${user.photoURL}">`;
            //   document.querySelector("#dash").innerHTML+=`<img class="img-radius" alt="User-Profile-Image" src="${user.photoURL}">`;
            document.querySelector("#email").innerHTML = user.email;
        } else {
            setUpUI();
        // If not logged in, navigate back to login page.
        //   
        };
    });
  
    //beginning of loading letter gestures 
    const getGestures = userId => {
        
        console.log("Getnotes called" + userId)
        const notesRef = firebase.database().ref(`gestures/`);
        notesRef.on("value", snapshot => {
            
            const data = snapshot.val();
            databob = data;
            // console.log("notesref for topics called");
            renderDataAsHtml(data);
        });
    };
    const renderDataAsHtml = data => {
        let cards = "";
        for (const noteItem in data) {
            const note = data[noteItem];
            // console.log(note.title)
            cards += createCard(noteItem, note);
        }
        document.querySelector("#letterGestures").innerHTML = cards;
        console.log(cards);
    };

    const createCard = (noteId, note) => {
        return `<div class="col-lg-3 col-md-6 portfolio-item alphabet">
                    <a href="learning.html?gestureId=${noteId}" class="details-link">
                        <div class="portfolio-img"><img src=${note.src} class="img-fluid"></div>
                        <div class="portfolio-info">
                            <h4>Letter: ${note.title}</h4>
                        </div>
                    </a>
                </div>`
    };
    // second loading

    const getGestures2 = userId => {
        console.log(document.querySelector("#letterGestures"));
        const notesRef2 = firebase.database().ref(`gestures2/`);
        notesRef2.on("value", snapshot2 => {
            const data2 = snapshot2.val();
            databob2 = data2;
            console.log("notesref for topics called");
            renderDataAsHtml2(data2);
        });
    };

    const renderDataAsHtml2 = data2 => {
        let cards2 = "";
        for (const noteItem2 in data2) {
            const note2 = data2[noteItem2];
            cards2 += createCard2(noteItem2, note2);
            console.log(cards2);
        }
        document.querySelector("#emergencyGestures").innerHTML = cards2;
        console.log(document.querySelector("#letterGestures"));
    };

    const createCard2 = (noteId2, note2) => {
        console.log(note2.title);
        console.log(note2.src);
        return `<div class="col-lg-4 col-md-6 portfolio-item emergency">
            <a href="learningE.html?gestureId=${noteId2}" class="details-link">
                <iframe width="100%" height="100%" src=${note2.src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div class="portfolio-info">
                    <h4>Emergency Sign: ${note2.title}</h4>
                </div>
            </a>
          </div>`
    };
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


//the bottom is the filter 
    filterSelection("all")
    function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("portfolio-item");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        w3AddClass(x[i], "noshow");
        if (x[i].className.indexOf(c) > -1) w3RemoveClass(x[i], "noshow");
    }
    }

    function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
    }

    function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);     
        }
    }
    element.className = arr1.join(" ");
    }

    // Add active class to the current button (highlight it)
    var btnContainer = document.getElementById("portfolio-flters");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(){
        var current = document.getElementsByClassName("filter-active");
        current[0].className = current[0].className.replace(" filter-active", "");
        this.className += " filter-active";
    });
    }
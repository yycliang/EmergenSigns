window.onload = (event) => {
    console.log("window loaded")
    // Use this to retain user state between html pages.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        console.log('Logged in: ' + user.displayName);
        const googleUserId = user.uid;
        setUpUI(user);
        getGestures(user.uid);
        } else {
            setUpUI();
        // If not logged in, navigate back to login page.
        //   
        };
    });
  
    //beginning of loading gestures 
    const getGestures = userId => {
        console.log("Getnotes called" + userId)
        const notesRef = firebase.database().ref(`gestures/`);
        notesRef.on("value", snapshot => {
            const data = snapshot.val();
            databob = data;
            // console.log(data);
            console.log("notesref for topics called");
            renderDataAsHtml(data);
        });
    };
    const renderDataAsHtml = data => {
        let cards = "";
        for (const noteItem in data) {
            const note = data[noteItem];
            // console.log(note.title)
            cards += createCard(noteItem, note);
            console.log(cards);
        }
        document.querySelector("#letterGestures").innerHTML = cards;
    };
    // const createCard = (noteId, note) => {
    //     return `<div class="view-topics-card">
    //      <a class="card shadow mb-4" href="viewTopic.html?topicId=${noteId}">
    //         <div class="card-header py-3">
    //             <h6 class="m-0 font-weight-bold" id="topicTitle">${note.title}</h6>
    //         </div>
    //         <div class="card-body">
    //             <p>${note.title}</p>
    //             <img class= card-img-top src=${note.src}>
                
    //         </div>
            
    //     </a>
    //     <a class="btn btn-primary"  id="${noteId}" onClick="saveTopic(this)" >Save topic</a>
    //         </div>;`
    // };
    const createCard = (noteId, note) => {
        console.log(note.title)
        return `<div class="col-lg-3 col-md-6 portfolio-item alphabet">
                    <a href="learning.html" class="details-link">
                        <div class="portfolio-img"><img src=${note.src} class="img-fluid"></div>
                        <div class="portfolio-info">
                            <h4>Letter: ${note.title}</h4>
                        </div>
                    </a>
                </div>;`
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

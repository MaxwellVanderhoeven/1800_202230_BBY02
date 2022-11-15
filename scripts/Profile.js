console.log("dataBaseTest.js loaded");

var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("A user is logged in, created currentUser");
        currentUser = db.collection("users").doc(user.uid)
    } else {
        console.log ("No user is signed in");
    }
});

document.getElementById('personalInfoFields').disabled = false;

var currentUser;          // Global variable, points to current logged in user

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        console.log("populateInfo called");
        // Check if user is signed in:
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.

            currentUser.get()
                .then(userDoc => {
                    // Store inputed values for username and exclusions
                    var userName = userDoc.data().username;
                    var exclusions = userDoc.data().exclusions;

                    console.log(userName);
                    console.log(exclusions);
                    // Display current username and exclusions (If available)
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                        document.getElementById('personalInfoFields').disabled = false;
                    }
                    if (exclusions != null) {
                        document.getElementById("exclusionsInput").value = exclusions;
                        document.getElementById('personalInfoFields').disabled = false;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}
populateInfo();

 function saveUserInfo() {
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userSchool = document.getElementById('exclusionsInput').value;     //get the value of the field with id="exclusionsInput"
    
    currentUser.update({
        username: userName,
        exclusions: userSchool
    })
    .then(() => {
        console.log("Document successfully updated!");
        window.location.assign("main.html"); 
    })
}




var currentuser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

function writeRequest() {
    console.log("in")
    let Title = document.getElementById("exampleFormControlInput1").value;
    let Typeappetizer = document.getElementById("appetizer").checked;
    let Typesalad = document.getElementById("salads").checked;
    let Typemaindish = document.getElementById("maindishes").checked;
    let Typesoup = document.getElementById("soups").checked;
    let Typevegetable = document.getElementById("vegetables").checked;
    let Typedessert = document.getElementById("desserts").checked;
    let Max = document.getElementById("exampleFormControlSelect2").value;
    let Description = document.getElementById("comment").value;
    console.log(Title, Max, Typeappetizer, Typesalad, Typemaindish, Description);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("Requests").add({
                        author: userEmail,
                        title: Title,
                        maximum: Max,
                        description: Description,
                        appetizer: Typeappetizer,
                        salad: Typesalad,
                        maindish: Typemaindish,
                        soup: Typesoup,
                        vegetable: Typevegetable,
                        dessert: Typedessert,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "thanks.html";
                    })
                })

        } else {
        }

    });

}

function writeRequestinUser() {
    console.log("in")
    let Title = document.getElementById("exampleFormControlInput1").value;
    let Typeappetizer = document.getElementById("appetizer").checked;
    let Typesalad = document.getElementById("salads").checked;
    let Typemaindish = document.getElementById("maindishes").checked;
    let Typesoup = document.getElementById("soups").checked;
    let Typevegetable = document.getElementById("vegetables").checked;
    let Typedessert = document.getElementById("desserts").checked;
    let Max = document.getElementById("exampleFormControlSelect2").value;
    let Description = document.getElementById("comment").value;
    console.log(Title, Max, Typeappetizer, Typesalad, Typemaindish, Description);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    currentUser.collection("requests").add({
                        author: userEmail,
                        title: Title,
                        maximum: Max,
                        description: Description,
                        appetizer: Typeappetizer,
                        salad: Typesalad,
                        maindish: Typemaindish,
                        soup: Typesoup,
                        vegetable: Typevegetable,
                        dessert: Typedessert,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()},
                        {
                            merge: true
                    }).then(() => {
                        window.location.href = "thanks.html";
                    })
                })

        } else {
        }

    });

}

//-----------------------------------------------------------------------------
// This function is called whenever the user submits a recipe request.
// It adds the request to the "requests" array
//-----------------------------------------------------------------------------
function saveRequest(requestID) {
    currentUser.set({
            requests: firebase.firestore.FieldValue.arrayUnion(requestID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("request has submitted by: " + currentUser);
            var iconID = 'save-' + Description;
            
            //console.log(iconID);
            //this is to change the icon of the hike that was saved to "filled"
            document.getElementById(iconID).innerText = 'favorite';
        });
}

// console.log("Profile.js loaded");

var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("A user is logged in, created currentUser");
        currentUser = db.collection("users").doc(user.uid)
          .get()
          .then(queryUsers => {
            size = queryUsers.size;

            Users = queryUsers.docs;
            
            var userDoc = Users[0].data();
            const displayName = userDoc.username;
            console.log(displayName);
          });
    } else {
        console.log ("No user is signed in");
    }
});

var currentUser;  
function insertName() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        username = user.displayName;
        document.getElementById("name-goes-here").innerText = username;
      } else {
        // No user is signed in.
      }
    });
  }
insertName();

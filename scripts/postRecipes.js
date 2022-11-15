console.log("dataBaseTest.js loaded");

var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("A user is logged in, created currentUser");
        currentUser = db.collection("users").doc(user.uid);
    } else {
        console.log ("No user is signed in");
    }
});


function submitRecipe() {
  console.log("submitRecipe called");

  let Title = document.getElementById("title").value;
  let Ingredients = document.getElementById("ingredients").value;
  let Instructions = document.getElementById("instructions").value;
  let Description = document.getElementById("description").value;

  console.log("Title:",Title,",  Ingredients:",Ingredients,"  Instructions:",Instructions,"  Description:",Description);

  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          var currentUser = db.collection("users").doc(user.uid);
          //get the document for current user.
          currentUser.get()
              .then(userDoc => {
                console.log("Current User:",currentUser.get());
                console.log(user.uid);
                  //var userEmail = userDoc.data().email;
                  db.collection("recipes").add({
                      title : Title,
                      description: Description,
                      ingredients: Ingredients,
                      instructions: Instructions,
                      author: currentUser,
                      photo: "drink1",
                      reviewsPercent: "Percent",
                      uploadDate: firebase.firestore.FieldValue.serverTimestamp()
                  }).then(()=>{
                      console.log("Recipe submitted");
                      //window.location.href = "main.html"; //new line added
                  })
              })
                 
      } else {
          console.log("Must Log In To Submit Recipe");
      }
  });

}
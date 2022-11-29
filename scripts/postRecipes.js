var ImageFile;      //global variable to store the File Object reference

console.log("dataBaseTest.js loaded");

var currentUser;
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("A user is logged in, created currentUser");
    currentUser = db.collection("users").doc(user.uid);
  } else {
    console.log("No user is signed in");
  }
});


// function submitRecipe() {
//   console.log("submitRecipe called");

//   let Title = document.getElementById("exampleFormControlInput1").value;
//   let Ingredients = document.getElementById("exampleFormControlInput2").value;
//   let Instructions = document.getElementById("comment2").value;
//   let Description = document.getElementById("comment").value;
//   let profilePic = document.getElementById("mypic-input").value;

//   console.log("Title:", Title, ",  Ingredients:", Ingredients, "  Instructions:", Instructions, "  Description:", Description);

//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       var currentUser = db.collection("users").doc(user.uid);
//       //get the document for current user.
//       currentUser.get()
//         .then(userDoc => {
//           console.log("Current User:", currentUser.get());
//           console.log(user.uid);
//           var user_Name = user.displayName;
//           //var userEmail = userDoc.data().email;
//           db.collection("recipes").add({
//             title: Title,
//             description: Description,
//             ingredients: Ingredients,
//             instructions: Instructions,
//             author: user_Name,
//             profilePic: picUrl,
//             reviewsPercent: "Percent",
//             uploadDate: firebase.firestore.FieldValue.serverTimestamp()
//           }).then(() => {
//             console.log(currentUser);
//             console.log("Recipe submitted");
//             window.location.href = "thanksrecipe.html"; //new line added
//           })
//         })

//     } else {
//       window.location.href = "login.html"
//       console.log("Must Log In To Submit Recipe");
//     }
//   });

// }

function saveUserInfo() {
  firebase.auth().onAuthStateChanged(function (user) {

    var user_Name = user.displayName;
    var Title = document.getElementById("exampleFormControlInput1").value;
    var Ingredients = document.getElementById("exampleFormControlInput2").value;
    var Instructions = document.getElementById("comment2").value;
    var Description = document.getElementById("comment").value;

    db.collection("recipes").add({
      title: Title,
      description: Description,
      ingredients: Ingredients,
      instructions: Instructions,
      author: user_Name,
      // profilePic: url,
      uploadDate: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then(function (doc) {
        console.log("Added a new recipe: " + doc.id);
        var storageRef = storage.ref("images/" + doc.id + ".jpg");
        storageRef.put(ImageFile)
        .then(function () {
          console.log('Uploaded to Cloud Storage.');
  
          //Asynch call to get URL from Cloud
          storageRef.getDownloadURL()
            .then(function (url) { // Get "url" of the uploaded file
              console.log("Got the download URL.");
              //Asynch call to save the form fields into Firestore.
              db.collection("recipes").doc(doc.id).update({
                profilePic: url
              })
                .then(function () {
                  console.log('Added Profile Pic URL to Firestore.');
                  console.log('Created recipe with image');
                  // document.getElementById('personalInfoFields').disabled = true;
                })
            })
        })
      })
  })
}

function chooseFileListener() {
  const fileInput = document.getElementById("mypic-input");   // pointer #1
  const image = document.getElementById("mypic-goes-here");   // pointer #2

  //attach listener to input file
  //when this file changes, do something
  fileInput.addEventListener('change', function (e) {

    //the change event returns a file "e.target.files[0]"
    ImageFile = e.target.files[0];
    var blob = URL.createObjectURL(ImageFile);

    //change the DOM img element source to point to this file
    image.src = blob;    //assign the "src" property of the "img" tag
  })
}
chooseFileListener();


var ImageFile;      //global variable to store the File Object reference
var empty = "";
console.log("dataBaseTest.js loaded");

var instructionTimer = 0;
var ingredientsTimer = 0;
var empty = "fe";

var currentUser;
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("A user is logged in, created currentUser");
    currentUser = db.collection("users").doc(user.uid);
  } else {
    console.log("No user is signed in");
  }
});

function addIngredient(target){
  console.log("addIngredient() Called");

  var getValue = document.getElementById('ingredients');

  if(getValue.length != empty) {
      var txtVal = document.getElementById('ingredients').value,
          listNode = document.getElementById('ingredients-go-here'),
          liNode = document.createElement('LI'),
          txtNode = document.createTextNode(txtVal);

      liNode.appendChild(txtNode);
      listNode.appendChild(liNode);

      getValue.value = "";
      // console.log(getValue.value, empty, getValue.value == empty);
      // console.log(ingredientsTimer);
      // ingredientsTimer = ingredientsTimer + 1;
      // console.log(" ");
      }
}

function addInstruction(target){
  console.log("addInstruction() Called");

  var getValue = document.getElementById('instructions');

  if(getValue.length != empty) {
      var txtVal = document.getElementById('instructions').value,
          listNode = document.getElementById('instructions-go-here'),
          liNode = document.createElement('LI'),
          txtNode = document.createTextNode(txtVal);

      liNode.appendChild(txtNode);
      listNode.appendChild(liNode);

      getValue.value = "";
      }
}

function saveUserInfo() {
  firebase.auth().onAuthStateChanged(function (user) {

    var user_Name = user.displayName;
    var Title = document.getElementById("title").value;
    var ingred = document.querySelectorAll("#ingredients-go-here li");
    var instruc = document.querySelectorAll("#instructions-go-here li");
    var Description = document.getElementById("description").value;

    var ingredientsElements = Array.prototype.slice.call(ingred);
    var instructionsElements = Array.prototype.slice.call(instruc);

    var ingredientsArray = [];
    var instructionsArray = [];

    for (let insEl = 0; insEl < instructionsElements.length; insEl++) {
      instructionsArray[insEl] = instructionsElements[insEl].textContent;
    }
    for (let ingEl = 0; ingEl < ingredientsElements.length; ingEl++) {
      ingredientsArray[ingEl] = ingredientsElements[ingEl].textContent;
    }


    db.collection("recipes").add({
      title: Title,
      description: Description,
      ingredients: ingredientsArray,
      instructions: instructionsArray,
      author: user_Name,
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
                recipePic: url
              })
                .then(function () {
                  console.log('Added Profile Pic URL to Firestore.');
                  console.log('Created recipe with image');
                  window.location.href = "thanksrecipe.html";
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


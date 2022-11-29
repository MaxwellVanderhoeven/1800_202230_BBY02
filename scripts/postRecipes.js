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
        console.log ("No user is signed in");
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
        // console.log(getValue.value, empty, getValue.value == empty);
        // console.log(ingredientsTimer);
        // ingredientsTimer = ingredientsTimer + 1;
        // console.log(" ");
        }
}

function submitRecipe() {
  console.log("submitRecipe called");

  // Takes content from the lists created by users.
  var ingred = document.querySelectorAll("#ingredients-go-here li");
  var instruc = document.querySelectorAll("#instructions-go-here li");

  // Holds list of HTML LI Element objects
  var ingredientsElements = Array.prototype.slice.call(ingred);
  var instructionsElements = Array.prototype.slice.call(instruc);

  // Arrays sent to firebase, holds actual strings.
  var ingredientsArray = [];
  var instructionsArray = [];
  
  // Test logs.
  console.log("ingred: " + ingred.length);
  console.log("instruc: " + instruc.length);
  console.log("ingredientsElements: " + ingredientsElements.length);
  console.log("instructionsElements: " + instructionsElements.length);

    
    // Test logs.
    console.log("\ningred: " + ingred.length);
    console.log("instruc: " + instruc.length);
    console.log("ingredientsElements: " + ingredientsElements.length);
    console.log("instructionsElements: " + instructionsElements.length);
    console.log("ingredientsArray: " + ingredientsArray.length);
    console.log("instructionsArray: " + instructionsArray.length + "\n");
  
  // Moves text value of both elements to the arrays.
  for (let insEl = 0; insEl < instructionsElements.length; insEl++) {
    instructionsArray[insEl] = instructionsElements[insEl].textContent;
  }
  for (let ingEl = 0; ingEl < ingredientsElements.length; ingEl++) {
    ingredientsArray[ingEl] = ingredientsElements[ingEl].textContent;
  }

  // Test prints of array
  console.log("\nPrinting instructionsArray below:");
  for (let insAr = 0; insAr < instructionsArray.length; insAr++) {
    console.log(instructionsArray[insAr] + " " + (insAr + "," + instructionsArray.length) + " " +  (insAr > instructionsArray.length));
  }
 
  console.log("\nPrinting ingredients below:");
  for (let engAr = 0; engAr < ingredientsArray.length; engAr++) {
    console.log(ingredientsArray[engAr] + " " + (engAr + "," + ingredientsArray.length) + " " + (engAr > ingredientsArray.length));
  }

  console.log(instructionsArray + " " + ingredientsArray);

  let Title = document.getElementById("title").value;
  let Description = document.getElementById("description").value;

  let Title = document.getElementById("exampleFormControlInput1").value;
  let Ingredients = document.getElementById("exampleFormControlInput2").value;
  let Instructions = document.getElementById("comment2").value;
  let Description = document.getElementById("comment").value;

//   console.log("Title:",Title,",  Ingredients:",Ingredients,"  Instructions:",Instructions,"  Description:",Description);

  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          var currentUser = db.collection("users").doc(user.uid);
          //get the document for current user.
          currentUser.get()
              .then(userDoc => {
                console.log("Current User:",currentUser.get());
                console.log(user.uid);
                //   var userEmail = user.data().userName;
                  console.log(userEmail);
                  db.collection("recipes").add({
                      title : Title,
                      description: Description,
                      ingredients: ingredientsArray,
                      instructions: instructionsArray,
                      author: currentUser,
                      photo: "drink1",
                      reviewsPercent: "Percent",
                      uploadDate: firebase.firestore.FieldValue.serverTimestamp()
                  }).then(()=>{
                    console.log(currentUser);
                      console.log("Recipe submitted");
                      window.location.href = "thanksrecipe.html"; //new line added
                  })
              })
                 
      } else {
        window.location.href = "login.html"
          console.log("Must Log In To Submit Recipe");
      }
  });

}
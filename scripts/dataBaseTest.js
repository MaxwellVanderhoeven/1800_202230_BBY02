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

function populateCardsDynamically() {
  let recipeCardTemplate = document.getElementById("recipeCardTemplate");
  let recipeCardGroup = document.getElementById("recipeCardGroup");
  
  db.collection("recipes").get()
      .then(allHikes => {
          allHikes.forEach(doc => {
              var recipeTitle = doc.data().title;
              var recipeAuthor = doc.data().author;
              var photoID = doc.data().photo;
              var reviews = doc.data().reviewsPercent;

              let testRecipeCard = recipeCardTemplate.content.cloneNode(true);

              testRecipeCard.querySelector('.card-title').innerHTML = recipeTitle; 
              testRecipeCard.querySelector('.card-text').innerHTML = recipeAuthor;
              testRecipeCard.querySelector('.ingredientsList').innerHTML = reviews;
              testRecipeCard.querySelector('img').src = `./images/${photoID}.png`;
              recipeCardGroup.appendChild(testRecipeCard);
          })
      })
}

populateCardsDynamically();

var currentUser;          // Global variable, points to current logged in user

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
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

                    // Display current username and exclusions (If available)
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (exclusions != null) {
                        document.getElementById("exclusionsInput").value = exclusions;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
    console.log("editUserInfo Called");

    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }

 function saveUserInfo() {
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userSchool = document.getElementById('exclusionsInput').value;     //get the value of the field with id="exclusionsInput"
    
    currentUser.update({
        username: userName,
        exclusions: userSchool
    })
    .then(() => {
        console.log("Document successfully updated!");
    })

    //Disable the form fields
    document.getElementById('personalInfoFields').disabled = true; 
}



function submitRecipe() {
  console.log("submitRecipe called");
  console.log("lets Below");
  let Title = document.getElementById("title").value;
  let Ingredients = document.getElementById("ingredients").value;
  let Instructions = document.getElementById("instructions").value;
  let Description = document.getElementById("description").value;

  console.log("Console.log Below");
  console.log(Title, Ingredients, Instructions, Description);

  console.log("Firebase Auth Below");
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("inside If User");
          var currentUser = db.collection("users").doc(user.uid)
          var userID = user.uid;
          //get the document for current user.
          currentUser.get()
              .then(userDoc => {
                  var userEmail = userDoc.data().email;
                  db.collection("recipes").add({
                      title : Title,
                      description: Description,
                      ingredients: Ingredients,
                      instructions: Instructions,
                      author: userID,
                      photo: "drink1",
                      reviewsPercent: "Percent",
                      uploadDate: firebase.firestore.FieldValue.serverTimestamp()
                  }).then(()=>{
                      window.location.href = "main.html"; //new line added
                  })
              })
                 
      } else {
          console.log("Must Log In To Submit Recipe");
      }
  });

}
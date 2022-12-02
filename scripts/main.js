var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global

        // the following functions are always called when someone is logged in
        insertName();
        displayCards("recipes");
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            user_Name = user.displayName;

            //method #1:  insert with html only
            //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
            //method #2:  insert using jquery
            $("#name-goes-here").text(user_Name); //using jquery

        } else {
            console.log("No user signed in");
            // No user is signed in.
        }
    });
}
insertName();

function writeRecipes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var recipesRef = db.collection("Recipes");

    recipesRef.add({
        title: "Casserole",
        author: "User 1",
        photo: "ratatouille",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function displayCards(collection) {
    let cardTemplate = document.getElementById("recipeCardTemplate");
    currentDate = firebase.firestore.FieldValue.serverTimestamp();
    db.collection(collection)
        // .where("title", "==", "testing1234")
        .get()
        .then(snap => {
            snap.forEach(doc => {
                var recipeID = doc;
                var recipeName = doc.data().title;
                var recipeAuthor = doc.data().author;
                var recipePhoto = doc.data().photo;
                var recipeDescription = doc.data().description;
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = recipeName;
                newcard.querySelector('.card-author').innerHTML = recipeAuthor;
                // newcard.querySelector('.card-image').src = `./images/${recipePhoto}.jpg`; 
                newcard.querySelector('a').onclick = () => setRecipeID("Custom");

                newcard.querySelector('.card-description').innerHTML = recipeDescription;
                newcard.querySelector('i').id = 'save-' + recipePhoto;
                // this line will call a function to save the recipes to the user's document             
                newcard.querySelector('i').onclick = () => saveFavourite(recipePhoto);
                currentUser.get().then(userDoc => {
                    //get the user name
                    // var favourites = userDoc.data().favourite;
                    // if (favourites.includes(recipePhoto)) {
                    //     document.getElementById('save-' + recipePhoto).innerText = 'favorite';
                    // }
                })

                newcard.querySelector('.read-more').href = "eachRecipe.html?recipeName="+recipeName +"&id=" + recipePhoto;
                newcard.querySelector('.read-more').href = "recipe.html?recipeID=" + recipeID.id;
                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
}
// displayCards("Recipes");

function setRecipeID(id){
    console.log("setRecipeID called");
    localStorage.setItem ('hikeID', id.textContent);
}

//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the hike to the "bookmarks" array
// Then it will change the bookmark icon from the hollow to the solid version. 
//-----------------------------------------------------------------------------
function saveFavourite(recipePhoto) {
    currentUser.set({
        favourite: firebase.firestore.FieldValue.arrayUnion(recipePhoto)
    }, {
        merge: true
    })
        .then(function () {
            console.log("favourite has been saved for: " + currentUser);
            var iconID = 'save-' + recipePhoto;
            //console.log(iconID);
            //this is to change the icon of the hike that was saved to "filled"
            document.getElementById(iconID).innerText = 'favorite';
        });
}

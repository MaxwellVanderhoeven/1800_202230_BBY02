var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        insertName();
        displayCards();
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
            // Do something for the currently logged-in user here: 
            console.log(user.uid);
            console.log(user.displayName);
            user_Name = user.displayName;

            //method #1:  insert with html only
            //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
            //method #2:  insert using jquery
            $("#name-goes-here").text(user_Name); //using jquery

        } else {
            // No user is signed in.
        }
    });
}
insertName(); //run the function

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

    db.collection(collection).get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var recipeName = doc.data().title;        // get value of the "title" key
                var recipeAuthor = doc.data().author;   // get value of the "author" key
                var recipePhoto = doc.data().photo;
                var recipeDescription = doc.data().description;
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = recipeName;
                newcard.querySelector('.card-author').innerHTML = recipeAuthor;
                newcard.querySelector('.card-description').innerHTML = recipeDescription;
                newcard.querySelector('i').id = 'save-' + recipePhoto;
                // this line will call a function to save the recipes to the user's document             
                newcard.querySelector('i').onclick = () => saveFavourite(recipePhoto);
                currentUser.get().then(userDoc => {
                    //get the user name
                    var favourites = userDoc.data().favourite;
                    if (favourites.includes(recipePhoto)) {
                        document.getElementById('save-' + recipePhoto).innerText = 'favorite';
                    }
                })
                newcard.querySelector('.card-image').src = `./images/${recipePhoto}.jpg`;
                console.log(collection);
                newcard.querySelector('.read-more').href = "eachRecipe.html?recipeName="+recipeName +"&id=" + recipePhoto;
                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                //i++;   //if you want to use commented out section
            })
        })
}
displayCards("recipes");

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

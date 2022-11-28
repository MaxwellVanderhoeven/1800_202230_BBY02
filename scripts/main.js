function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log("user.uid:" + user.uid);
            console.log("user.displayName:" + user.displayName);
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
insertName(); //run the function



function writeRecipes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var recipesRef = db.collection("Recipes");

    recipesRef.add({
        title:"Casserole",
        author: "User 1",   
        photo: "ratatouille",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  
    });
}

function displayCards(collection) {
    console.log("displayCards called");

    let cardTemplate = document.getElementById("recipeCardTemplate");

    db.collection(collection)
    .get()
        .then(snap => {
            snap.forEach(doc => { //iterate thru each doc
                var recipeID = doc;

                console.log("\ndoc: " + doc);
                console.log("recipeID: " + recipeID);
                console.log("Both same: " + (doc == recipeID));
                console.log("recipeID.textContent: " + recipeID.textContent);
                console.log("recipeID.data().id: " + recipeID.data().id);
                console.log("recipeID.data().uid: " + recipeID.data().uid);
                console.log("recipeID.uid: " + recipeID.uid);
                console.log("recipeID.value: " + recipeID.value);
                console.log("recipeID.data().uid: " + recipeID.data().uid);
                console.log("recipeID.id: " + recipeID.id);

                var recipeName = doc.data().title;        // get value of the "title" key
                var recipeAuthor = doc.data().author;   // get value of the "author" key
				var recipePhoto = doc.data().photo;

                let newcard = cardTemplate.content.cloneNode(true);
                // testHikeCard.querySelector('a').onclick = () => setRecipe(hikeID);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = recipeName;
                newcard.querySelector('.card-author').innerHTML = recipeAuthor;
                newcard.querySelector('.card-image').src = `./images/${recipePhoto}.jpg`; 
                newcard.querySelector('a').onclick = () => setRecipeID("Custom");
                //console.log("hikeID:" + hikeID);
                // console.log(collection);

                //attach to gallery
                newcard.querySelector('.read-more').href = "recipe.html?recipeID=" + recipeID.id;
                document.getElementById(collection + "-go-here").appendChild(newcard);
                //i++;   //if you want to use commented out section
            })
        })
}
displayCards("Recipes");

function setRecipeID(id){
    console.log("setRecipeID called");
    localStorage.setItem ('hikeID', id.textContent);
}
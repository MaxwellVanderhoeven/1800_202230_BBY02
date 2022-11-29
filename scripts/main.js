var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global

        // the following functions are always called when someone is logged in
        insertName();
        displayCards();
        showUploadedPicture();
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
            console.log(user.uid);
            console.log(user.displayName);
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

function displayCards(collection) {
    let cardTemplate = document.getElementById("recipeCardTemplate");

    db.collection(collection).orderBy("uploadDate", "desc")
    .limit(10).get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var recipeName = doc.data().title;        // get value of the "title" key
                var recipeAuthor = doc.data().author;   // get value of the "author" key
                var recipePhoto = doc.data().profilePic;
                var recipeDescription = doc.data().description;
                let newcard = cardTemplate.content.cloneNode(true);
                let picUrl = doc.data().profilePic; 

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = recipeName;
                newcard.querySelector('.card-author').innerHTML = recipeAuthor;
                // newcard.querySelector('.card-image').src = `./images/${recipePhoto}.jpg`; 
                newcard.querySelector('a').onclick = () => setRecipeID("Custom");

                newcard.querySelector('.card-description').innerHTML = recipeDescription;
                newcard.querySelector('i').id = 'save-' + recipeDescription;
                // this line will call a function to save the recipes to the user's document             
                newcard.querySelector('i').onclick = () => saveFavourite(recipeDescription);
                currentUser.get().then(userDoc => {
                    //get the user name
                    
                    var favourites = userDoc.data().favourite;
                    if (favourites.includes(recipeDescription)) {
                        document.getElementById('save-' + recipeDescription).innerText = 'favorite';
                        console.log('if favourites: ' + 'save-' + recipeDescription);
                    }

                })
                newcard.querySelector('.card-image').src = picUrl;
                console.log(collection);
                newcard.querySelector('.read-more').href = "eachRecipe.html?recipeName=" + recipeName +"&id=" + recipePhoto;
                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
}
// displayCards("Recipes");

function setRecipeID(id){
    console.log("setRecipeID called");
    localStorage.setItem ('hikeID', id.textContent);
}


function saveFavourite(recipeDescription) {
    currentUser.set({
        favourite: firebase.firestore.FieldValue.arrayUnion(recipeDescription)
    }, {
        merge: true
    })
        .then(function () {
            console.log("favourite has been saved for: " + currentUser);
            var iconID = 'save-' + recipeDescription;
            console.log("icon ID is: " + iconID);
            //this is to change the icon of the recipe that was saved to "filled"
            document.getElementById(iconID).innerText = 'favorite';
        });
}

function showUploadedPicture(){
    const fileInput = document.getElementById("mypic-input");   // pointer #1 (points to input file)
    const image = document.getElementById("mypic-goes-here");   // pointer #2 (points to where picture should be displayed)

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function(e){

        //the change event returns a file "e.target.files[0]"
        var blob = URL.createObjectURL(e.target.files[0]);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}




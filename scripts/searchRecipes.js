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

function searchRecipesByTitle() {
    var input, filter, input2, ing
    input = document.getElementById("Title");
    filter = input.value.toLowerCase();
    var titlesplit = filter.split(" ");
    

}



function displayCards(collection) {
    let cardTemplate = document.getElementById("recipeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var recipeName = doc.data().title;        // get value of the "title" key
                var recipeAuthor = doc.data().author;   // get value of the "author" key
				var recipePhoto = doc.data().profilePic;    
                let newcard = cardTemplate.content.cloneNode(true);
                

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = recipeName;
                newcard.querySelector('.card-author').innerHTML = recipeAuthor;
                newcard.querySelector('.card-image').src = `./images/${recipePhoto}.jpg`; 
                console.log(collection);

                if(titlesplit.includes(recipeName)) {
                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                //i++;   //if you want to use commented out section
                }
            })
        })
}

displayCards("recipes");
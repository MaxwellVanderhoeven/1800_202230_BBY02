// let recipeID = localStorage.getItem("recipeID"); 

//     db.collection("Recipes").where("photo", "==", recipeID) 
//         .get()
//         .then(queryRecipes => {
//             size = queryRecipes.size;
//             Recipes = queryRecipes.docs;
            
        
//             if (size = 1) {
//                 var thisRecipe = Recipes[0].data();
//                 var title = thisRecipe.title;
//                 document.getElementById("RecipeName").innerHTML = title;
//             } else {
//                 console.log("Query has more than one data")
//             }
//         })
//         .catch((error) => {
//             console.log("Error getting documents: ", error);
//         });

function writeRequest() {
    console.log("in")
    let Title = document.getElementById("exampleFormControlInput1").value;
    let Typeappetizer = document.getElementById("appetizer").checked;
    let Typesalad = document.getElementById("salads").checked;
    let Typemaindish = document.getElementById("maindishes").checked;
    let Typesoup = document.getElementById("soups").checked;
    let Typevegetable = document.getElementById("vegetables").checked;
    let Typedessert = document.getElementById("desserts").checked;
    let Max = document.getElementById("exampleFormControlSelect2").value;
    let Description = document.getElementById("comment").value;
    console.log(Title, Max, Typeappetizer, Typesalad, Typemaindish, Description);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("Requests").add({
                        author: userEmail,
                        title: Title,
                        maximum: Max,
                        description: Description,
                        appetizer: Typeappetizer,
                        salad: Typesalad,
                        maindish: Typemaindish,
                        soup: Typesoup,
                        vegetable: Typevegetable,
                        dessert: Typedessert,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "thanks.html";
                    })
                })

        } else {
        }

    });

}

// //-----------------------------------------------------------------------------
// // This function is called whenever the user submits a recipe request.
// // It adds the request to the "requests" array
// //-----------------------------------------------------------------------------
// function saveRequest(requestID) {
//     currentUser.set({
//             requests: firebase.firestore.FieldValue.arrayUnion(requests)
//         }, {
//             merge: true
//         })
//         .then(function () {
//             console.log("request has submitted by: " + currentUser);
//             var iconID = 'save-' + requestID;
//         });
// }

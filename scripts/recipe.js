let params = new URL(window.location.href);
let recipeID = params.searchParams.get("recipeID")

db.collection("recipes").doc(recipeID)
.get()
.then((doc) => {
    if (doc.exists) {
        if (size = 1) {
            var thisRecipe = doc.data();
            recipeName = thisRecipe.title;

            author = thisRecipe.author;
            description = thisRecipe.description;
            ingredients = thisRecipe.ingredients;
            instructions = thisRecipe.instructions;
            // photo = thisRecipe.photo;
            // rating = thisRecipe.reviewsPercent;
            uploadDate = Date(thisRecipe.uploadDate);

            document.getElementById("hikeName").innerHTML = recipeName;
            document.getElementById("authorName").innerHTML = author;
            document.getElementById("description").innerHTML = description;

            let ingredientsList = document.getElementById("ingredients");
            ingredients.forEach((item) => {
                let li = document.createElement("li");
                li.innerHTML = item;
                ingredientsList.appendChild(li);
            });

            let instructionsList = document.getElementById("instructions");
            instructions.forEach((item) => {
                let li = document.createElement("li");
                li.innerHTML = item;
                instructionsList.appendChild(li);
            });

            console.log(instructions);

            document.getElementById("uploadDate").innerHTML = uploadDate;

                        } else {
                console.log("Query has more than one data")
            }


        // console.log(doc);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

    // //see how many results you have got from the query
    // size = queryRecipes.size;
    // console.log("size: " + size);
    // // get the documents of query
    // recipes = queryRecipes.docs;
    // console.log("recipes: " + recipes);

    // // We want to have one document per hike, so if the the result of 
    // //the query is more than one, we can check it right now and clean the DB if needed.
    // if (size = 1) {
    //     var thisRecipe = recipes[0].data();
    //     recipeName = thisRecipe.title;
    //     console.log(recipeName);
    //         author = thisRecipe.author;
    //         description = thisRecipe.description;
    //         ingredients = thisRecipe.ingredients;
    //         instructions = thisRecipe.instructions;
    //         photo = thisRecipe.photo;
    //         rating = thisRecipe.reviewsPercent;
    //         uploadDate = Date(thisRecipe.uploadDate);

    //         document.getElementById("hikeName").innerHTML = recipeName;
    //         document.getElementById("authorName").innerHTML = author;
    //         document.getElementById("description").innerHTML = description;
    //         document.getElementById("ingredients").innerHTML = ingredients;
    //         document.getElementById("instructions").innerHTML = instructions;
    //         document.getElementById("photo").innerHTML = photo;
    //         document.getElementById("rating").innerHTML = rating;
    //         document.getElementById("uploadDate").innerHTML = uploadDate;
    //                 } else {
    //         console.log("Query has more than one data")
    //     }
    // })
    // .catch((error) => {
    // console.log("Error getting documents: ", error);
    // });



// db.collection("recipes").where("code", "==", "hikeID")
// .get()
// .then(queryRecipes => {
//     //see how many results you have got from the query
//     size = queryRecipes.size;
//     console.log("size: " + size);
//     // get the documents of query
//     recipes = queryRecipes.docs;
//     console.log("recipes: " + recipes);

//     // We want to have one document per hike, so if the the result of 
//     //the query is more than one, we can check it right now and clean the DB if needed.
//     if (size = 1) {
//         var thisRecipe = recipes[0].data();
//         recipeName = thisRecipe.title;
//         console.log(recipeName);
//             author = thisRecipe.author;
//             description = thisRecipe.description;
//             ingredients = thisRecipe.ingredients;
//             instructions = thisRecipe.instructions;
//             photo = thisRecipe.photo;
//             rating = thisRecipe.reviewsPercent;
//             uploadDate = Date(thisRecipe.uploadDate);

//             document.getElementById("hikeName").innerHTML = recipeName;
//             document.getElementById("authorName").innerHTML = author;
//             document.getElementById("description").innerHTML = description;
//             document.getElementById("ingredients").innerHTML = ingredients;
//             document.getElementById("instructions").innerHTML = instructions;
//             document.getElementById("photo").innerHTML = photo;
//             document.getElementById("rating").innerHTML = rating;
//             document.getElementById("uploadDate").innerHTML = uploadDate;
//                     } else {
//             console.log("Query has more than one data")
//         }
//     })
//     .catch((error) => {
//     console.log("Error getting documents: ", error);
//     });

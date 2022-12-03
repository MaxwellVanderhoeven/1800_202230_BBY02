function populateRecipe() {
    let requestCardTemplate = document.getElementById("CardTemplate");
    let requestCardGroup = document.getElementById("CardGroup");

    let params = new URL(window.location.href);
    let recipeID = params.searchParams.get("id");

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
                positiveReviews = 0;
                negativeReviews = 0;
                // photo = thisRecipe.photo;
                uploadDate = Date(thisRecipe.uploadDate);

                console.log("authorID: ", thisRecipe.authorID);
                // document.getElementById("recipeName").innerHTML = recipeName;
                // document.getElementById("authorName").innerHTML = author;
                // document.getElementById("description").innerHTML = description;
                // let ingredientsList = document.getElementById("ingredients");
                // ingredients.forEach((item) => {
                //     let li = document.createElement("li");
                //     li.innerHTML = item;
                //     ingredientsList.appendChild(li);
                // });
                // let instructionsList = document.getElementById("instructions");
                // instructions.forEach((item) => {
                //     let li = document.createElement("li");
                //     li.innerHTML = item;
                //     instructionsList.appendChild(li);
                // });
                // document.getElementById("uploadDate").innerHTML = uploadDate;

                let requestCard = requestCardTemplate.content.cloneNode(true);
                    requestCard.querySelector('#recipeName').innerHTML = `${recipeName}`;
                    requestCard.querySelector('#authorName').innerHTML = `${author}`;
                    requestCard.querySelector('#description').innerHTML = `${description}`;

                    ingredientsList = "";
                    for (let timer = 0; timer < ingredients.length; timer++) {
                        ingredientsList += "<li>" + ingredients[timer] + "</li>";
                    }
                    instructionsList = "";
                    for (let timer = 0; timer < instructions.length; timer++) {
                        instructionsList += "<li>" + instructions[timer] + "</li>"
                    }

                    requestCard.querySelector('#ingredients').innerHTML = `${ingredientsList}`;
                    requestCard.querySelector('#instructions').innerHTML =`${instructionsList}`;
                    requestCard.querySelector('#uploadDate').innerHTML = `${uploadDate}`;
                requestCardGroup.appendChild(requestCard);

                // console.log("title: ", recipeName, "\nAuthor: " ,authorName, "\nDescription: ", description, "\nIngredients", ingredients,"\nInstructions: ", instructions, "\nUpload Date: ", uploadDate);
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
}
populateRecipe("recipes");
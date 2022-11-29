function populateRecipes() {
    console.log("in populate recipes");
    let recipeCardTemplate = document.getElementById("CardTemplate");
    let recipeCardGroup = document.getElementById("CardGroup");

    let params = new URL(window.location.href);         //get URL of search bar
    let recipeCode = params.searchParams.get("id");       //get value for key "id"
    console.log(recipeCode);
    let recipeName = params.searchParams.get("recipeName"); //get value for key "hikeNam
    document.getElementById("recipeName").innerHTML = recipeName; 
    let message = "All recipe requirements submitted for " + recipeName;
    message += " &nbsp | Document id is:  " + recipeCode;
    document.getElementById("details-go-here").innerHTML = message; 
    console.log(recipeCode);
    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("recipes").where( "description", "==", recipeCode).get()
        .then(allRecipes => {
            allRecipes.forEach(doc => {
                var title = doc.data().title; //gets the name field
                console.log(title);
                var author = doc.data().author; //gets the unique ID field
                var description = doc.data().description; //gets the description
                var date = doc.data().uploadDate;
                // var instruction = doc.data().instructions;
                // var ingredient = doc.data().ingredients;

                let recipeCard = recipeCardTemplate.content.cloneNode(true);
                recipeCard.querySelector('.title').innerHTML = title;     //equiv getElementByClassName
                recipeCard.querySelector('.author').innerHTML = `Recipe Author: ${author}`;
                recipeCard.querySelector('.description').innerHTML = `Description: ${description}`;
                recipeCard.querySelector('.date').innerHTML = `Posted on: ${date.toDate()}`;
                recipeCardGroup.appendChild(recipeCard);
            })
        })
}
populateRecipes();
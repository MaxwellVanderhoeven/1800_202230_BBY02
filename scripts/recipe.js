let hikeID = localStorage.getItem("hikeID");

db.collection("recipes").where("code", "==", "hikeID")
    .get()
    .then(queryRecipes => {
    // db.collection("recipes").doc("bKUQN8O1LZPPbq2Jm9KJ")
    // .get()
    // .then((snapshot) => {

        // snapshot.docs.forEach(doc => {
        //     console.log(doc.data);
        // });
        
        //see how many results you have got from the query
        size = queryRecipes.size;
        // get the documents of query
        recipes = queryRecipes.docs;


        // We want to have one document per hike, so if the the result of 
        //the query is more than one, we can check it right now and clean the DB if needed.
        if (size = 1) {
            var thisRecipe = recipes[0].data();
            recipeName = thisRecipe.title;
            author = thisRecipe.author;
            description = thisRecipe.description;
            ingredients = thisRecipe.ingredients;
            instructions = thisRecipe.instructions;
            photo = thisRecipe.photo;
            rating = thisRecipe.reviewsPercent;
            uploadDate = Date(thisRecipe.uploadDate);

            document.getElementById("hikeName").innerHTML = recipeName;
            document.getElementById("authorName").innerHTML = author;
            document.getElementById("description").innerHTML = description;
            document.getElementById("ingredients").innerHTML = ingredients;
            document.getElementById("instructions").innerHTML = instructions;
            document.getElementById("photo").innerHTML = photo;
            document.getElementById("rating").innerHTML = rating;
            document.getElementById("uploadDate").innerHTML = uploadDate;
                    } else {
            console.log("Query has more than one data")
        }
    })
    .catch((error) => {
    console.log("Error getting documents: ", error);
    });

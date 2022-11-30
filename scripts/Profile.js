firebase.auth().onAuthStateChanged(user => {
  if (user) {
      getFavourites(user)
  } else {
      console.log("No user is signed in");
  }
});

function getFavourites(user) {
  db.collection("users").doc(user.uid).get()
      .then(userDoc => {
          var favourites = userDoc.data().favourite;
          console.log(favourites);

          let CardTemplate = document.getElementById("CardTemplate");
          favourites.forEach(thisRecipeID => {
              console.log(thisRecipeID);
              db.collection("recipes").where("description", "==", thisRecipeID).get().then(snap => {
                  size = snap.size;
                  queryData = snap.docs;
                  
                  if (size == 1) {
                      var doc = queryData[0].data();
                      var recipeName = doc.title; //gets the name field
                      var recipeID = doc.description; //gets the unique ID field
                      let newCard = CardTemplate.content.cloneNode(true);
                      newCard.querySelector('.card-title').innerHTML = recipeName;
                      newCard.querySelector('.card-text').innerHTML = recipeID;
                      recipeCardGroup.appendChild(newCard);
                  } else {
                      console.log("Query has more than one data")
                  }

              })

          });
      })
}
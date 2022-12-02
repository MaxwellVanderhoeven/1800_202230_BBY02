function populateRequests() {
    let requestCardTemplate = document.getElementById("CardTemplate");
    let requestCardGroup = document.getElementById("CardGroup");

    let params = new URL(window.location.href);         //get URL of search bar
    let requestCode = params.searchParams.get("id");       //get value for key "id"
    let requestName = params.searchParams.get("requestName"); //get value for key "hikeNam
    document.getElementById("requestName").innerHTML = requestName; 
    let message = "All recipe requirements submitted for " + requestName;
    message += " &nbsp | Document id is:  " + requestCode;
    document.getElementById("details-go-here").innerHTML = message; 
    
    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("Requests").where( "description", "==", requestCode).get()
        .then(allRequests => {
            requests=allRequests.docs
            console.log(requests);
            requests.forEach(doc => {
                var title = doc.data().title; //gets the name field
                var author = doc.data().author; //gets the unique ID field
                var description = doc.data().description; //gets the description
                var date = doc.data().timestamp;
                var maximum = doc.data().maximum;
                var appetizer = doc.data().appetizer;
                var salads = doc.data().salad;
                var maindish = doc.data().maindish;
                var soup = doc.data().soup;
                var vegetable = doc.data().vegetable;
                var dessert = doc.data().dessert;
                
                let requestCard = requestCardTemplate.content.cloneNode(true);
     //equiv getElementByClassName
                requestCard.querySelector('.author').innerHTML = `Requester: ${author}`;
                requestCard.querySelector('.description').innerHTML = `Description: ${description}`;
                requestCard.querySelector('.date').innerHTML = `Requested on: ${date.toDate()}`;
                requestCard.querySelector('.maximum').innerHTML = `Maximum number of ingredients: ${maximum}`;

                requestCard.querySelector('.appetizer').innerHTML =`Appetizer? ${appetizer}`;
                requestCard.querySelector('.salad').innerHTML = `Salad? ${salads}`;
                requestCard.querySelector('.maindish').innerHTML = `Main Dish? ${maindish}`;
                requestCard.querySelector('.soup').innerHTML = `Soup? ${soup}`;
                requestCard.querySelector('.vegetable').innerHTML = `Vegetable Dish? ${vegetable}`;
                requestCard.querySelector('.dessert').innerHTML = `Dessert? ${dessert}`;
                requestCardGroup.appendChild(requestCard);
            })
        })
}
populateRequests();
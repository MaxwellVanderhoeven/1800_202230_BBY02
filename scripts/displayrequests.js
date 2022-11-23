function displayCards(collection) {
    let cardTemplate = document.getElementById("CardTemplate");

    db.collection(collection).get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var requestName = doc.data().title;        // get value of the "title" key
				var requestDescription = doc.data().description;    
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = requestName;
                newcard.querySelector('.card-description').innerHTML = requestDescription;
                newcard.querySelector('.card-image').src = "./images/help.png"; 
                console.log(collection);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                //i++;   //if you want to use commented out section
            })
        })
}
displayCards("Requests");

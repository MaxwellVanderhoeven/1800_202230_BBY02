function uploadrecipePic() {
    console.log("uploadrecipePic called");

    firebase.auth().onAuthStateChanged(function (user) {
        var fileInput = document.getElementById("mypic-input");   // pointer #1
        const image = document.getElementById("mypic-goes-here"); // pointer #2

        // listen for file selection
        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            image.src = blob;            // display this image

            //store using this name
            var storageRef = storage.ref("images/" + user.uid + ".jpg"); 
           
					  storageRef.put(file)
				    .then(function(){
							 console.log('Uploaded to Cloud Storage.');
						   storageRef.getDownloadURL()
					     .then(function (url) { // Get URL of the uploaded file
				           console.log("Got the download URL.");
				           db.collection("users").doc(user.uid).update({
				               "profile-pic": url  // Save the URL into users collection
				           })
                   .then(function(){
                        console.log('Added Profile Pic URL to Firestore.');
                   })
					      })
					  })
        })
    })
}

function showUploadedPicture(){
    // console.log("showUploadedPicture called");

    const fileInput = document.getElementById("mypic-input");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function(e){
        console.log("eventListener: change");
        //the change event returns a file "e.target.files[0]"
        var blob = URL.createObjectURL(e.target.files[0]);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}

function displayUserrecipePic() {
  console.log("displayUserrecipePic called");

  firebase.auth().onAuthStateChanged(function (user) {      //get user object
      db.collection("users").doc(user.uid)                  //use user's uid
          .get()                                            //READ the doc
          .then(function (doc) {
              var picUrl = doc.data().recipePic;           //extract pic url

              $("#mypic-goes-here").attr("src", picUrl);
          })
  })
}

uploadrecipePic();             //SOLO          Works if solo disabled
showUploadedPicture();          //SOLO          Works if solo disabled
displayUserrecipePic();        //NOT SOLO      Works if solo disabled


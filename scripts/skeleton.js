// console.log("skeleton.js loaded");

function loadSkeleton(){
    $('#navbarPlaceholder').load('./nav.html');
}
loadSkeleton();  //invoke the function

// if authenticated, use navebar that has profile button. If else, use navbar without profile button. 
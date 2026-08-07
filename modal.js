document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("pinch-zoom-image-id");

    //set tap param
    var Tap = new Hammer.Tap({
      taps: 1
    });

    //get all the img elements
    const myNodelist = document.querySelectorAll("img");
    
    // loop through img elements and assign hammer tap to each
    for (let i = 0; i < myNodelist.length; i++) {
      manager = new Hammer.Manager(myNodelist[i])
      manager.add(Tap);
      manager.on('tap', openModal);
    }

    // displays modal, disables image from reloading on tap, fills modal 
    //image from target src and runs the pinch and zoom functionality from hammer.js
    function openModal(e){
        modal.style.display = "block";
        modalImg.style.pointerEvents = "none";
        modalImg.src = e.target.src;
        viewImg();
    }
});
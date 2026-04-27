document.addEventListener('DOMContentLoaded', function() {
        const overlay = document.getElementById('loading-overlay');
  overlay.style.display = 'none';


    // Get the modal
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("pinch-zoom-image-id");

    
    //set tap param
    var Tap = new Hammer.Tap({
      taps: 1
    });

    //get all the img elements
    const img= document.getElementById("modalImg");
    
    // loop through img elements and assign hammer tap to each

      manager = new Hammer.Manager(img)
      manager.add(Tap);
      manager.on('tap', openModal);
    

    // displays modal, disables image from reloading on tap, fills modal 
    //image from target src and runs the pinch and zoom functionality from hammer.js
    function openModal(e){
        modal.style.display = "block";
        modalImg.style.pointerEvents = "none";
        modalImg.src = `${e.target.src}.modal.jpg`;
        viewImg();
    }
});
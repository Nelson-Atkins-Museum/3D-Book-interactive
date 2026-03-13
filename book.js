document.addEventListener('DOMContentLoaded', function() {
     
    document.querySelector(".container").classList.remove("hidden");

    const pageFlip = new St.PageFlip(
        document.getElementById("Book"),
        {
            width: 450, // base page width
            height: 600, // base page height

             size: "stretch",
            // set threshold values:
            minWidth: 300,
            maxWidth: 450,
            minHeight: 500,
            maxHeight: 600,
            
            flippingTime: 500,
            swipeDistance: 30,
            disableFlipByClick: true,//false: turn page by clicking anywhere on page 
            maxShadowOpacity: 0.5, // shadow intensity
            showCover: false, //false: keeps book open
            mobileScrollSupport: false,// disable content scrolling on mobile devices
            // usePortrait: true,
        }
    );

console.log(pageFlip.width)

    // load pages
    pageFlip.loadFromHTML(document.querySelectorAll(".page"));

    document.querySelector(".page-total").innerText = pageFlip.getPageCount()-1;
    document.querySelector(".page-orientation").innerText = pageFlip.getOrientation();

    // prev/nex button function
   document.querySelector(".btn-prev").addEventListener("click", () => {
      if (pageFlip.getOrientation() == 'landscape') {
                pageFlip.flipPrev(); // Turn to the previous page (with animation)
            } else {
                pageFlip.turnToPrevPage();
            }
       
    });

    document.querySelector(".btn-next").addEventListener("click", () => {
        pageFlip.flipNext(); // Turn to the next page (with animation)
    });

    // triggered by page turning
    pageFlip.on("flip", (e) => {
        document.querySelector(".page-current").innerText = e.data + 1;
    });

    // triggered when the state of the book changes
    pageFlip.on("changeState", (e) => {
        document.querySelector(".page-state").innerText = e.data;
    });

    // triggered when page orientation changes
    pageFlip.on("changeOrientation", (e) => {
        document.querySelector(".page-orientation").innerText = e.data;
    });


    function closeBook(){
 
        while (document.querySelector(".page-current").innerText > 1){
        //    console.log(document.querySelector(".page-current").innerText);
        //    console.log(pageFlip.getCurrentPageIndex());
            if (pageFlip.getOrientation() == 'landscape') {
                pageFlip.flipPrev();
            } else {
                pageFlip.turnToPrevPage();
            }
        
    

        // console.log(document.querySelector(".page-current").innerText);
        // console.log(pageFlip.getCurrentPageIndex());
        

        }
    };

    // home button function
    const home = document.querySelector("#home-btn");
    const close = document.querySelector("#close-btn");

    // Event Listener
    home.addEventListener("click", closeBook);
    close.addEventListener("click", closeBook);




});


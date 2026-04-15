document.addEventListener('DOMContentLoaded', function() {

    const pageFlip = new St.PageFlip(
        document.getElementById("Book"),
        {
            width: 600, // base page width
            height: 800, // base page height

            size: "stretch",
            // set threshold values:
            minWidth: 325,
            maxWidth: 1200,
            minHeight: 400,
            maxHeight: 1200,
            
            flippingTime: 500,
            swipeDistance: 30,
         disableFlipByClick: true,//false: turn page by clicking anywhere on page 
            maxShadowOpacity: 0.5, // shadow intensity
            showCover: false, //false: keeps book open
            mobileScrollSupport:false,// disable content scrolling on mobile devices
            // usePortrait: true,
    
        }
    );

    // load pages
    pageFlip.loadFromHTML(document.querySelectorAll(".page"));

    document.querySelector(".page-total").innerText = pageFlip.getPageCount();
    document.querySelector(".page-orientation").innerText = pageFlip.getOrientation();

    // prev/next button function
    document.querySelector(".btn-prev").addEventListener("click", () => {
        if (pageFlip.getOrientation() == 'portrait') {
            pageFlip.turnToPrevPage();
        } else {
            pageFlip.flipPrev(); // Turn to the previous page (with animation)
        }
    });

    document.querySelector(".btn-next").addEventListener("click", () => {
        pageFlip.flipNext(); // Turn to the next page (with animation)
    });

    // home/close button function
    const home = document.querySelector("#home-btn");
    const close = document.querySelector("#close-btn");

    // Event Listener
    home.addEventListener("click", closeBook);
    close.addEventListener("click", closeBook);

    function closeBook(){
        while(document.querySelector(".page-current").innerText > 1){
        pageFlip.flipPrev();
        }
    }

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
});


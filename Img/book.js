document.addEventListener('DOMContentLoaded', function() {
     
    document.querySelector(".container").classList.remove("hidden");

    const pageFlip = new St.PageFlip(
        document.getElementById("demoBookExample"),
        {
            width: 864, // base page width
            height: 710, // base page height

            size: "fixed",
            
            flippingTime: 500,
            swipeDistance: 30,
            disableFlipByClick: true,//false: turn page by clicking anywhere on page 
            maxShadowOpacity: 0.5, // Half shadow intensity
            showCover: false, //false: keeps book open
            mobileScrollSupport: false // disable content scrolling on mobile devices
        }
    );

    // load pages
    pageFlip.loadFromHTML(document.querySelectorAll(".page"));

    document.querySelector(".page-total").innerText = pageFlip.getPageCount()-1;
    document.querySelector(
        ".page-orientation"
    ).innerText = pageFlip.getOrientation();

    document.querySelector(".btn-prev").addEventListener("click", () => {
        pageFlip.flipPrev(); // Turn to the previous page (with animation)
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

    // home button function
    const home = document.querySelector("#home-btn")

    // Event Listener
    home.addEventListener("click", function (){
        while(document.querySelector(".page-current").innerText > 1){
        pageFlip.flipPrev();
        }
    });


});
// window.addEventListener('load', function() {
//   const overlay = document.getElementById('loading-overlay');
//   overlay.style.display = 'none';
// });

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('#Book img');
    // console.log(images)
    let index = 0;

    function loadNext(element) {
        if (index < element.length) {
            element[index].onload = loadNext; // Load next when current finishes
            index++;
        }
    }

    loadNext(images);



    const pageFlip = new St.PageFlip(
        document.getElementById("Book"),
        {
            width: 600, // base page width
            height: 800, // base page height

            size: "stretch",
            // set threshold values:
            minWidth: 450,
            maxWidth: 1200,
            minHeight: 450,
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
            console.log("flip back portrait")
        } else {
            pageFlip.turnToPrevPage();
            pageFlip.flipPrev(); // Turn to the previous page (with animation)
            console.log("flip back")
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
        let count = 0;
        while(document.querySelector(".page-current").innerText > 1){
         pageFlip.turnToPrevPage();
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


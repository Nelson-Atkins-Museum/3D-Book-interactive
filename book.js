document.addEventListener('DOMContentLoaded', function() {
     
    document.querySelector(".container").classList.remove("hidden");

    const pageFlip = new St.PageFlip(
        document.getElementById("Book"),
        {
            width: 500, // base page width
            height: 600, // base page height

            size: "stretch",
            // set threshold values:
            minWidth: 400,
            maxWidth: 1200,

            minHeight: 300,
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

    document.querySelector(".page-total").innerText = pageFlip.getPageCount()-1;
    document.querySelector(".page-orientation").innerText = pageFlip.getOrientation();

    // prev/nex button function
   document.querySelector(".btn-prev").addEventListener("click", () => {
    // console.log(pageFlip.getOrientation())
      pageFlip.turnToPrevPage();
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
        console.log("page flip")
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


    function closeBook(e){
        let count = document.querySelector(".page-current").innerText;
        let pageNum = parseInt(count);
        console.log(parseInt(count));
 
        while (pageNum > 0) {
        //    console.log(document.querySelector(".page-current").innerText);
        //    console.log(pageFlip.getCurrentPageIndex());
            if (pageFlip.getOrientation() == 'landscape') {
                // console.log(pageFlip.getOrientation())
                pageFlip.flipPrev();
                console.log(pageNum);
            } else if (pageFlip.getOrientation() == 'portrait')  {
                //  console.log(pageFlip.getOrientation())
                pageFlip.turnToPrevPage();
                console.log(pageNum);
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


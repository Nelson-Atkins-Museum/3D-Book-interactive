//generate books and pages
const bookContainer = document.querySelector(".container");
books.forEach(book => {
    const bookWrapper = document.createElement("div");
    bookWrapper.className = "flip-book closed";
    bookWrapper.id = book.id;

    bookWrapper.innerHTML = ` ${book.pages.map(page => ` 
                    <div class=" page page-content">
                        <img id="${page.imgId}" src="${page.imgSrc}" alt="${page.imgAlt}" ></img>
                        
                    </div>
                    `)
                .join("")}`;

    bookContainer.appendChild(bookWrapper);
});

//function to instantiate each PageFlip object
function createBook(bookData) {
    
    const element = document.getElementById(bookData.id);
    pageFlip = new St.PageFlip(element, 
        {
        width:800, // base page width
        height:1000, // base page height

        // size: "fixed",
        
        flippingTime: 500,
        swipeDistance: 30,
        disableFlipByClick: true,//false: turn page by clicking anywhere on page 
        maxShadowOpacity: 0.5, // Half shadow intensity
        showCover: true, //false: keeps book open
        mobileScrollSupport: false // disable content scrolling on mobile devices
    });

    pageFlip.loadFromHTML(
        element.querySelectorAll(".page")
    );

    pageFlip.on("flip", e => {
        // triggered by page turning
         document.querySelector(".page-current").innerText = e.data + 1;
        console.log(`Book: ${book.id}`);
        console.log(`Page: ${e.data}`);
    });

    pageFlip.on("changeState", e => {
        // triggered when the state of the book changes
        document.querySelector(".page-state").innerText = e.data;
    });

    pageFlip.on("changeOrientation", e => {
        // triggered when page orientation changes
        document.querySelector(".page-orientation").innerText = e.data;

    });

    // document.querySelector(".page-total").innerText = pageFlip.getPageCount()-1;
    //             document.querySelector(
    //                 ".page-orientation"
    //             ).innerText = pageFlip.getOrientation();

    //             document.querySelector(".btn-prev").addEventListener("click", () => {
    //                 pageFlip.flipPrev(); // Turn to the previous page (with animation)
    //             });

    //             document.querySelector(".btn-next").addEventListener("click", () => {
    //                 pageFlip.flipNext(); // Turn to the next page (with animation)
    //             });
    // // home button function
    // const home = document.querySelector("#home-btn")

    // // Event Listener
    // home.addEventListener("click", function (){
    //     while(document.querySelector(".page-current").innerText > 1){
    //     pageFlip.flipPrev();
    //     }
    // });
    return pageFlip;
}

//Create books
const pageFlips = {};
books.forEach(book => {
    pageFlips[book.id] = createBook(book);
});



let flipbooks = document.querySelectorAll('.flip-book');
for (let book of flipbooks) {
	book.onclick = function(e) {
        console.log("click triggered");
        if (e.target.classList.contains('opened')) { 
			e.target.classList.remove('opened');
            e.target.classList.add('closed');
            //
        }
        else { 
            e.target.classList.remove('closed');
            e.target.classList.add('opened');
            // show buttons for book navigation
        }
	}
}




// // document.addEventListener('DOMContentLoaded', function() {
// //     console.log("loaded")

// //     document.querySelector(".container").classList.remove("hidden");

// //    

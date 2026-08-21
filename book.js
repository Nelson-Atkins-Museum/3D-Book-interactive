//generate books and pages from manifest.js array
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
            usePortrait: false,
            // minWidth: 200, 
            // maxWidth: 1000, 
            // minHeight: 200, 
            // maxHeight: 1000,

            // size: "stretch",
            
            // flippingTime: 500,
            // swipeDistance: 30,
            maxShadowOpacity: 0.5, // Half shadow intensity
            showCover: true, //false: keeps book open
            mobileScrollSupport: false // disable content scrolling on mobile devices
        });

    pageFlip.loadFromHTML( element.querySelectorAll(".page") );

    return pageFlip;
}

//Create books
const pageFlips = {};
let activeBook = null;
books.forEach(book => {
    pageFlips[book.id] = createBook(book);
});
document.querySelector(".container").classList.remove("hidden");

let flipbooks = document.querySelectorAll('.flip-book');
let homeBtn = document.querySelector(`.home-btn`)
let prevBtn = document.getElementById(`prev-btn`)
let nextBtn = document.getElementById(`next-btn`)
let overlay = document.getElementById("overlay")

//click listeners 
bookContainer.addEventListener('click', (e) => {
    let openedBook = e.target.closest('.flip-book');
    if (!openedBook) return;

    flipbooks.forEach(book => {
            console.log("click triggered");
            //if book clicked is not active book close book??
            if (book === openedBook) {
                    //open book and set which book is active
                book.classList.remove('closed');
                book.classList.add('opened');
                book.classList.add('bring-to-front');
                activeBook = pageFlips[book.id];

                //show controlls
                homeBtn.classList.add('bring-to-front')
                prevBtn.classList.add('bring-to-front')
                nextBtn.classList.add('bring-to-front')
                overlay.classList.remove('hidden')
                homeBtn.classList.remove('hidden')
                prevBtn.classList.remove('hidden')
                nextBtn.classList.remove('hidden')
            
                //update state of book
                activeBook.on("flip", e => {
                    // triggered by page turning
                    document.getElementById(`page-current`).innerText = e.data + 1;
                    // console.log(`Book: ${activeBook.id}`);
                    // console.log(`Page: ${e.data}`);
                    // console.log(`page total: ${activeBook?.getPageCount()}`);
                });

                activeBook.on("changeState", e => {
                    // triggered when the state of the book changes
                    document.getElementById(`page-state`).innerText = e.data;
                });

                activeBook.on("changeOrientation", e => {
                    // triggered when page orientation changes
                    document.getElementById(`page-orientation`).innerText = e.data;

                });

                document.getElementById(`page-total`).innerText = activeBook.getPageCount()-1;
                document.getElementById(`page-orientation`).innerText = activeBook.getOrientation();
            } else {
                book.classList.add('hidden')
            }  
    })
})


document.getElementById(`next-btn`).addEventListener("click", () => {
    activeBook?.flipNext();
});

 document.getElementById(`prev-btn`).addEventListener("click", () => {
    activeBook?.flipPrev();
}); 

document.getElementById(`home-btn`).addEventListener("click", () => {
    while(document.getElementById(`page-current`).innerText > 1){
        activeBook?.flipPrev();
    }

    flipbooks.forEach(book => {
        if ( book.classList.contains('opened')){
            book.classList.remove('opened');
            book.classList.remove('bring-to-front')
            book.classList.add('closed');
            homeBtn.classList.remove('bring-to-front')
            prevBtn.classList.remove('bring-to-front')
            nextBtn.classList.remove('bring-to-front')
            homeBtn.classList.add('hidden')
            prevBtn.classList.add('hidden')
            nextBtn.classList.add('hidden')
            overlay.classList.add('hidden')
        } else if (book.classList.contains('closed')){
            book.classList.remove('hidden')
        }
    })

    activeBook = null;

});



// // document.addEventListener('DOMContentLoaded', function() {
// //     console.log("loaded")

// //     document.querySelector(".container").classList.remove("hidden");

// //    

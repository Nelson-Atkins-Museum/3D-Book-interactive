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

    const prevBtn = document.querySelector(".btn-prev");
    const nextBtn = document.querySelector(".btn-next");

    nextBtn.innerHTML = `
        <!-- Next Button -->
        <button type="button" class="btn-next hidden" id="next-btn-${book.id}">
            <i class="fas fa-chevron-right"></i>
            <p>Next</p>
        </button>`;

    prevBtn.innerHTML = `
        <!-- Previous Button -->
        <button type="button" class="btn-prev hidden" id="prev-btn-${book.id}" >
            <i class="fas fa-chevron-left"></i>
            <p>Previous</p>
        </button>`;

    const homeBtn = document.querySelector(".home-btn");

    homeBtn.innerHTML = `
    <button id="home-btn-${book.id}"  class="hidden">
        <i class="fas fa-book"></i>
        <br>
        <p>Close Book</p>
        <p>[<span class="page-current" id="page-current-${book.id}">1</span> of <span class="page-total" id="page-total-${book.id}>-</span>]</p>
    </button>
    <div style=" display: none; visibility: hidden;">
        State: <i class="page-state" id="page-state-${book.id}">read</i>, orientation: <i class="page-orientation" id="page-orientation-${book.id}">landscape</i>
    </div>
    `;
        
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

    document.addEventListener('DOMContentLoaded', function() {
        console.log("loaded")

        console.log( document.getElementById(`btn-prev-${bookData.id}`))
        document.getElementById(`prev-btn-${bookData.id}`).addEventListener("click", () => {
            pageFlip.flipPrev(); // Turn to the previous page (with animation)
        });

        document.getElementById(`next-btn-${bookData.id}`).addEventListener("click", () => {
            pageFlip.flipNext(); // Turn to the next page (with animation)
        });

        pageFlip.on("flip", e => {
            // triggered by page turning
            document.getElementById(`page-current-${bookData.id}`).innerText = e.data + 1;
            console.log(`Book: ${bookData.id}`);
            console.log(`Page: ${e.data}`);
        });

        pageFlip.on("changeState", e => {
            // triggered when the state of the book changes
            document.getElementById(`page-state-${bookData.id}`).innerText = e.data;
        });

        pageFlip.on("changeOrientation", e => {
            // triggered when page orientation changes
            document.getElementById(`page-orientation-${bookData.id}`).innerText = e.data;

        });

        document.getElementById(`page-total-${book.id}`).innerText = pageFlip.getPageCount()-1;
        document.getElementById(`page-orientation-${bookData.id}`).innerText = pageFlip.getOrientation();

        
        // home button function
        const home = document.getElementById(`home-btn-${book.id}`)

        // Event Listener
        home.addEventListener("click", function (){
            while(document.getElementById(`page-current-${bookData.id}`).innerText > 1){
            pageFlip.flipPrev();
            }
        });
    });
    
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
            // get the id of the book and add or remove it to the buttons
        }
        else { 
            e.target.classList.remove('closed');
            e.target.classList.add('opened');
            let homeBtn = document.getElementById(`home-btn-${book.id}`)
            let prevBtn = document.getElementById(`prev-btn-${book.id}`)
            let nextBtn = document.getElementById(`next-btn-${book.id}`)
            console.log(prevBtn.classList)
            homeBtn.classList.remove('hidden')
            prevBtn.classList.remove('hidden')
            nextBtn.classList.remove('hidden')
            // show buttons for book navigation
        }
	}
}




// // document.addEventListener('DOMContentLoaded', function() {
// //     console.log("loaded")

// //     document.querySelector(".container").classList.remove("hidden");

// //    

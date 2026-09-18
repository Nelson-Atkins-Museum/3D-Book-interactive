const bookContainer = document.querySelector(".container");
const pageFlips     = {};

books.forEach(book => {
    generatePages(book);
    pageFlips[book.id] = createBook(book);
});

bookContainer.classList.remove("hidden");

let flipbooks       = document.querySelectorAll('.flip-book');
let overlay         = document.getElementById("overlay")

let homeBtn         = document.querySelector(`.home-btn`)
let prevBtn         = document.getElementById(`prev-btn`)
let nextBtn         = document.getElementById(`next-btn`)

let currentPage     = document.getElementById(`page-current`)
let pageState       = document.getElementById(`page-state`)
let pageOrientation = document.getElementById(`page-orientation`)
let pageTotal       = document.getElementById(`page-total`)

let footer          = document.querySelector('.footer')
let langToggle      = document.getElementById(`langToggle`)

let language  = 'en';
let activeBook      = null;

//Event Listeners
bookContainer.addEventListener('click', (e) => {
    console.log("click triggered");
    //set which book was clicked on
    let openedBook = e.target.closest('.flip-book');
    if (!openedBook) return;

    flipbooks.forEach(book => {
        if (book === openedBook) {
            setOpenActiveBook(book)
            showControls()

            footer.innerHTML = `<p>${transcription(language, book)}</p>`
           
         //update state of book
            activeBook.on("flip", e => {
                // triggered by page turning
                currentPage.innerText = e.data + 1;
                //transcriptions ???
                footer.innerHTML = `<p>${transcription(language, book, e.data)}</p>`
            });

            activeBook.on("changeState", e => {
                // triggered when the state of the book changes
                pageState.innerText = e.data;
            });

            activeBook.on("changeOrientation", e => {
                // triggered when page orientation changes
                pageOrientation.innerText = e.data;

            });

            pageTotal.innerText = activeBook.getPageCount()-1;
            pageOrientation.innerText = activeBook.getOrientation();

        } else {
            book.classList.add('hidden')
        }  
    })
})


nextBtn.addEventListener("click", () => {
    activeBook?.flipNext();
});

prevBtn.addEventListener("click", () => {
    activeBook?.flipPrev();
}); 

homeBtn.addEventListener("click", () => {
    while(currentPage.innerText > 1){
        activeBook?.flipPrev();
    }

    flipbooks.forEach(book => {
        if ( book.classList.contains('opened')){
            closeBook(book)
            hideControls()
        } else if (book.classList.contains('closed')){
            book.classList.remove('hidden')
        }
    })
});

langToggle.addEventListener('change', (e) =>{
    if (e.target.checked){
        language = 'sp'
    } else {
        language = 'en'
    }
    console.log(language)
//how to get it to change automatically 
})

//function to generate book and book page html elements
function generatePages(bookData) {
    const bookWrapper = document.createElement("div");
    bookWrapper.className = "flip-book closed";
    bookWrapper.id = bookData.id;

    bookWrapper.innerHTML = ` ${bookData.pages.map( page => ` 
                    <div class=" page page-content">
                        <img id="${page.imgId}" src="${page.imgSrc}" alt="${page.imgAlt}" ></img>
                    </div>
                    `)
                .join("")}`;

    bookContainer.appendChild(bookWrapper);
}
   
//function to instantiate each PageFlip object
function createBook(bookData) {
    const element = document.getElementById(bookData.id);
    const settings = bookData.settings

    pageFlip = new St.PageFlip(element, settings);
    
    pageFlip.loadFromHTML( element.querySelectorAll(".page") );

    return pageFlip;
}

//function to open book and set which book is active
function setOpenActiveBook(bookData) {
    bookData.classList.remove('closed');
    bookData.classList.add('opened');
    bookData.classList.add('bring-to-front');
    overlay.classList.remove('hidden')
    activeBook = pageFlips[bookData.id];
}
//function to show controlls (prev next button close book etc)
function showControls(){
    homeBtn.classList.add('bring-to-front')
    prevBtn.classList.add('bring-to-front')
    nextBtn.classList.add('bring-to-front')
    homeBtn.classList.remove('hidden')
    prevBtn.classList.remove('hidden')
    nextBtn.classList.remove('hidden')
}
//function to close book and set which book is active
function closeBook(bookData) {
    bookData.classList.remove('opened');
    bookData.classList.remove('bring-to-front')
    bookData.classList.add('closed');
    overlay.classList.add('hidden')
    activeBook = null;
    footer.innerHTML = null
}

//function to hide controlls (prev next button close book etc)
function hideControls(){
    homeBtn.classList.remove('bring-to-front')
    prevBtn.classList.remove('bring-to-front')
    nextBtn.classList.remove('bring-to-front')
    homeBtn.classList.add('hidden')
    prevBtn.classList.add('hidden')
    nextBtn.classList.add('hidden')
}

//translation for transcription
function transcription(lang, bookData, pageIndex = 0) {
    let pagesArray = books.find(x => x.id === bookData.id).pages;
    return pagesArray[pageIndex].language[`${lang}`]
}
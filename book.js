//generate books and pages html from manifest.js books array
const bookContainer = document.querySelector(".container");
const pageFlips = {};
let activeBook = null;

books.forEach(book => {
    generatePages(book);
    pageFlips[book.id] = createBook(book);
});
document.querySelector(".container").classList.remove("hidden");


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
function transcription(language, bookData, pageIndex = 0) {
    let pagesArray = books.find(x => x.id === bookData.id).pages;
    return pagesArray[pageIndex].language[`${language}`]
}

let flipbooks = document.querySelectorAll('.flip-book');
let homeBtn = document.querySelector(`.home-btn`)
let prevBtn = document.getElementById(`prev-btn`)
let nextBtn = document.getElementById(`next-btn`)
let overlay = document.getElementById("overlay")
let footer = document.querySelector('.footer')
let languageToggle = 'en';

//click listeners 
bookContainer.addEventListener('click', (e) => {
    console.log("click triggered");
    //set which book was clicked on
    let openedBook = e.target.closest('.flip-book');
    if (!openedBook) return;

    flipbooks.forEach(book => {
        if (book === openedBook) {
            setOpenActiveBook(book)
            showControls()

            footer.innerHTML = `<p>${transcription(languageToggle, book)}</p>`
           
            //update state of book
            activeBook.on("flip", e => {
                // triggered by page turning
                document.getElementById(`page-current`).innerText = e.data + 1;
                     //transcriptions ???
                  footer.innerHTML = `<p>${transcription(languageToggle, book, e.data)}</p>`

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
            console.log('hide')
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
            closeBook(book)
            hideControls()
        } else if (book.classList.contains('closed')){
            book.classList.remove('hidden')
        }
    })
});



   

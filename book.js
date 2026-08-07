let books = document.querySelectorAll('.flip-book');
for (let book of books) {
	book.onclick = function(e) {
        console.log("click triggered");
        if (e.target.classList.contains('opened')) { // first page (open book)
					e.target.classList.remove('opened');
        }
        else { // last page (close book)
            e.target.classList.remove('closed');
				e.target.classList.add('opened');
            }
	}
}

 const ids = [1, 2, 3];
    console.log(ids)

   ids.forEach(id => {

        // 1. Select your main flipbook container
        let bookContainer = document.getElementById(`flip-book-${id}`);


        // 2. Define your dynamic page contents (text, images, or markup)
        const pageData = [
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel04.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel05.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel06.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel07.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel08.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel09.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel10.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel11.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel12.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel13.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel14.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel15.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel16.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel17.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel18.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel19.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel20.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel21.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel22.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel23.jpg' , imgAlt: 'Welcome to the interactive digital book!'},
            {  imgId: '', imgSrc: './Img/JPEG/UT_9_5_4_Hay_h_no1_panel25.jpg' , imgAlt: 'Welcome to the interactive digital book!'}
        ];


        // 3. Loop through data to create and append HTML page elements
        pageData.forEach((data, index) => {
            const pageDiv = document.createElement('div');
            // Add required CSS class for StPageFlip selection
            pageDiv.className = `page page-${id} page-bkg`;
            
            // Optional: Set hard or soft density via data attributes
            if (index === 0 || index === pageData.length - 1) {
                pageDiv.setAttribute('data-density', 'hard');
            } else {
                pageDiv.setAttribute('data-density', 'soft');
            }

            // Populate inner HTML content
            pageDiv.innerHTML = `
                <div class="page-content">
                    <img id="${data.imgId}" src="${data.imgSrc}" alt="${data.imgAlt}" ></img>
                    <span class="page-number">-${index + 1}-</span>
                </div>
            `;

            bookContainer.appendChild(pageDiv);
        });

});


document.addEventListener('DOMContentLoaded', function() {
console.log("loaded")
       document.querySelector(".container").classList.remove("hidden");
      ids.forEach(id => {

     

            // 4. Initialize StPageFlip once elements are in the DOM
            const pageFlip = new St.PageFlip(
                document.getElementById(`flip-book-${id}`),
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
                }
            );

            // Load the newly injected HTML elements
            pageFlip.loadFromHTML(document.querySelectorAll(`.page-${id}`));

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


        })

    })


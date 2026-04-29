// // COOKIES MESSAGE https://www.youtube.com/watch?v=AuLMvRcWmss
// // wt_consent using existing google tag to accept tracking
// /**
//  * Set Cookie
//  * 
//  * sets cookie expiration date, and creates cookie name & value
//  *  @param cName
//  *  @param cValue (yes/no)
//  *  @param expDays 
//  */
// setCookie = (cName, cValue, expDays) => {
//   let date = new Date();
//   date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
//   const expires = "expires=" + date.toUTCString();
//   document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
// }

// /**
//  * Get Cookie
//  * 
//  * checks if cookie is already created and decodes value of cookie
//  * https://www.w3schools.com/js/js_cookies.asp
//  *  @param cName
//  *  @retuns value of cookie
//  */
// getCookie = (cName) => {
//   const name = cName + "=";
//   const cDecoded = decodeURIComponent(document.cookie);
//   const cArr = cDecoded.split("; ");
//   let value;
//   cArr.forEach(val => {
//     if(val.indexOf(name) === 0) value = val.substring(name.length);
//   })
//   return value;
// }


// // accept consent
// document.querySelector("#cookies-btn").addEventListener("click", () => {
//   document.querySelector("#cookies").style.display = "none";
//     let cValue = "yes"
//     let cookieVal = `consent:${cValue},action:yes,necessary:yes,functional:${cValue},analytics:${cValue},performance:${cValue},advertisement:${cValue},others:${cValue},cookie_path:/`
//     setCookie("wt_consent", cookieVal, 90);
// })

// //reject consent
// document.querySelector("#cookies-btn-reject").addEventListener("click", () => {
//   document.querySelector("#cookies").style.display = "none";
//     let cValue = "no"
//     let cookieVal = `consent:${cValue},action:yes,necessary:yes,functional:${cValue},analytics:${cValue},performance:${cValue},advertisement:${cValue},others:${cValue},cookie_path:/`
//     setCookie("wt_consent", cookieVal, 90);
// })

// cookieMessage = () => {
//   if(!getCookie("wt_consent") ){
//         document.querySelector("#cookies").style.display = "block";
//     } else {
//         document.querySelector("#cookies").style.display = "none";
//     }
    
// }

// window.addEventListener("load", cookieMessage);



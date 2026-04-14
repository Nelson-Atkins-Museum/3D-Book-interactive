// COOKIES MESSAGE https://www.youtube.com/watch?v=AuLMvRcWmss
// wt_consent using existing google tag to accept tracking
/**
 * Set Cookie
 * 
 * sets cookie expiration date, and creates cookie name & value
 *  @param cName
 *  @param cValue (yes/no)
 *  @param expDays 
 */
setCookie = (cName, cValue, expDays) => {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

/**
 * Get Cookie
 * 
 * checks if cookie is already created and decodes value of cookie
 * https://www.w3schools.com/js/js_cookies.asp
 *  @param cName
 *  @retuns value of cookie
 */
getCookie = (cName) => {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie);
  const cArr = cDecoded.split("; ");
  let value;
  cArr.forEach(val => {
    if(val.indexOf(name) === 0) value = val.substring(name.length);
  })
  return value;
}


// accept consent
document.querySelector("#cookies-btn").addEventListener("click", () => {
  document.querySelector("#cookies").style.display = "none";
    let cValue = "yes"
    let cookieVal = `consent:${cValue},action:yes,necessary:yes,functional:${cValue},analytics:${cValue},performance:${cValue},advertisement:${cValue},others:${cValue},cookie_path:/`
    setCookie("wt_consent", cookieVal, 90);
})

//reject consent
document.querySelector("#cookies-btn-reject").addEventListener("click", () => {
  document.querySelector("#cookies").style.display = "none";
    let cValue = "no"
    let cookieVal = `consent:${cValue},action:yes,necessary:yes,functional:${cValue},analytics:${cValue},performance:${cValue},advertisement:${cValue},others:${cValue},cookie_path:/`
    setCookie("wt_consent", cookieVal, 90);
})

cookieMessage = () => {
  if(!getCookie("wt_consent") ){
        document.querySelector("#cookies").style.display = "block";
    } else {
        document.querySelector("#cookies").style.display = "none";
    }
    
}

window.addEventListener("load", cookieMessage);


// const setDefaultConsentState = require("setDefaultConsentState");
// const gtagSet = require("gtagSet");
// const getCookieValues = require("getCookieValues");
// const updateConsentState = require("updateConsentState");

// let setDefaultSetting = true;
// const regionSettings = data.regionSettings || [];
// const waitForTime = data.waitForTime;

// function getConsentStateForCategory(categoryConsent) {
//   return categoryConsent === "yes" ? "granted" : "denied";
// }

// function setConsentInitStates(consentData) {
//   if (waitForTime > 0) consentData.wait_for_update = waitForTime;
//   setDefaultConsentState(consentData);
// }

// gtagSet({
//   ads_data_redaction: !!data.adsRedaction,
//   url_passthrough: !!data.urlPassThrough,
//   "developer_id.dZDk4Nz": true,
// });

// for (let index = 0; index < regionSettings.length; index++) {
//   const regionSetting = regionSettings[index];
//   const consentRegionData = {
//     ad_storage: regionSetting.advertisement,
//     analytics_storage: regionSetting.analytics,
//     functionality_storage: regionSetting.functional,
//     personalization_storage: regionSetting.functional,
//     security_storage: regionSetting.security,
//     ad_user_data: regionSetting.adUserData,
//     ad_personalization: regionSetting.adPersonal
//   };
//   const regionsToSetFor = regionSetting.regions
//     .split(",")
//     .map((region) => region.trim())
//     .filter((region) => region);
//   if (regionsToSetFor.length > 0 && regionsToSetFor[0].toLowerCase() !== "all")
//     consentRegionData.region = regionsToSetFor;
//   else setDefaultSetting = false;
//   setConsentInitStates(consentRegionData);
// }

// if (setDefaultSetting) {
//   setConsentInitStates({
//     ad_storage: "denied",
//     analytics_storage: "denied",
//     functionality_storage: "denied",
//     personalization_storage: "denied",
//     security_storage: "granted",
//     ad_user_data: "denied",
//     ad_personalization: "denied"
//   });
// }

// const consentString = getCookieValues("wt_consent", false)[0];
// console.log(consentString);
// if (consentString && typeof consentString === "string") {
//   const cookieObj = consentString.split(",").reduce(function (acc, curr) {
//     const cookieValue = curr.trim().split(":");
//     acc[cookieValue[0]] = getConsentStateForCategory(cookieValue[1]);
//     return acc;
//   }, {});

//   updateConsentState({
//     ad_storage: cookieObj.advertisement,
//     analytics_storage: cookieObj.analytics,
//     functionality_storage: cookieObj.functional,
//     personalization_storage: cookieObj.functional,
//     security_storage: cookieObj.necessary,
//     ad_user_data: cookieObj.advertisement,
//     ad_personalization: cookieObj.advertisement,
//   });
// }

// // Success callback
// data.gtmOnSuccess();
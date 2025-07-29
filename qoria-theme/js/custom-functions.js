// https://github.com/dallaslu/bootstrap-5-multi-level-dropdown

//(function($bs) {
//    const CLASS_NAME = 'has-child-dropdown-show';
//    $bs.Dropdown.prototype.toggle = function(_orginal) {
//        return function() {
//            document.querySelectorAll('.' + CLASS_NAME).forEach(function(e) {
//                e.classList.remove(CLASS_NAME);
//            });
//            let dd = this._element.closest('.dropdown').parentNode.closest('.dropdown');
//            for (; dd && dd !== document; dd = dd.parentNode.closest('.dropdown')) {
//                dd.classList.add(CLASS_NAME);
//            }
//            return _orginal.call(this);
//        }
//    }($bs.Dropdown.prototype.toggle);
//
//    document.querySelectorAll('.dropdown').forEach(function(dd) {
//        dd.addEventListener('hide.bs.dropdown', function(e) {
//            if (this.classList.contains(CLASS_NAME)) {
//                this.classList.remove(CLASS_NAME);
//                e.preventDefault();
//            }
//            e.stopPropagation(); // do not need pop in multi level mode
//        });
//    });
//
//    // for hover
//    document.querySelectorAll('.dropdown-hover, .dropdown-hover-all .dropdown').forEach(function(dd) {
//        dd.addEventListener('mouseenter', function(e) {
//            let toggle = e.target.querySelector(':scope>[data-bs-toggle="dropdown"]');
//            if (!toggle.classList.contains('show')) {
//                $bs.Dropdown.getOrCreateInstance(toggle).toggle();
//                dd.classList.add(CLASS_NAME);
//                $bs.Dropdown.clearMenus();
//            }
//        });
//        dd.addEventListener('mouseleave', function(e) {
//            let toggle = e.target.querySelector(':scope>[data-bs-toggle="dropdown"]');
//            if (toggle.classList.contains('show')) {
//                $bs.Dropdown.getOrCreateInstance(toggle).toggle();
//            }
//        });
//    });
//})(bootstrap);
//

// Set all carousel items to the same height
function normaliseSlideHeights() {
    $('.carousel-normalise').each(function(){
      var items = $('.carousel-item', this);
      // reset the height
      items.css('min-height', 0);
      // set the height
      var maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
    })
  }
  
  // Set all selected items to the same height
  function normaliseHeights(classString) {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
      // set the height
      let maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
    //  console.log("normalise run");
  }

  // Set all selected items to the same as the smallest height
  function normaliseHeightsMin(classString) {
      var items = $(classString);
      // reset the height
      items.css('max-height', '');
      // set the height
      let maxHeight = Math.min.apply(null, 
                                     items.map(function(){return $(this).outerHeight()}).get());
      items.css('max-height', maxHeight + 'px');
    //  console.log("normalise run");
  }
  
  // responsive equal heights
  var mediaXs = window.matchMedia("(max-width: 575px)");
  var mediaSm = window.matchMedia("(min-width: 576px)");
  var mediaMd = window.matchMedia("(min-width: 768px)");
  var mediaLg = window.matchMedia("(min-width: 992px)");
  var mediaXl = window.matchMedia("(min-width: 1200px)");
  var mediaXxl = window.matchMedia("(min-width: 1400px)");
  
  function normaliseHeightsXs(classString) {
    if (mediaXs.matches) {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
      // set the height
      var maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
    } else {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
    }
  }
  
  function normaliseHeightsSm(classString) {
    if (mediaSm.matches) {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
      // set the height
      var maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
    } else {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
    }
  }
  
  function normaliseHeightsMd(classString) {
    if (mediaMd.matches) {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
      // set the height
      var maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
    } else {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
    }
  }
  
  function normaliseHeightsLg(classString) {
    if (mediaLg.matches) {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
      // set the height
      var maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
    } else {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
    }
  }
  
  function normaliseHeightsXl(classString) {
    if (mediaXl.matches) {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
      // set the height
      var maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
    } else {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
    }
  }
  
  function normaliseHeightsXxl(classString) {
    if (mediaXxl.matches) {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
      // set the height
      var maxHeight = Math.max.apply(null, 
                                     items.map(function(){
        return $(this).outerHeight()}).get() );
      items.css('min-height', maxHeight + 'px');
    } else {
      var items = $(classString);
      // reset the height
      items.css('min-height', 0);
    }
  }
  
  
  // play video
  function playVideo(videoId) {
    console.log(document.getElementById(videoId));
    document.getElementById(videoId).play();
    document.getElementById(videoId).controls = "controls";
    if (document.getElementById(videoId).parentNode.getElementsByClassName("play-button").length > 0) {
      document.getElementById(videoId).parentNode.getElementsByClassName("play-button")[0].remove();
    }
  };
  // pause video
  function pauseVideo(videoId) {
    //console.log(document.getElementById(videoId));
    document.getElementById(videoId).pause();
  };

// popups
function showPopup(hoverElems, popupElem, breakpoint=mediaMd){
  var count = 0;
  var tolerance = 0;
    $(hoverElems).mouseenter(function(){
      if (breakpoint.matches) {
        console.log("breakpoint matches");
        count++;
        $(popupElem).fadeIn(400);
      }
    }).mouseleave(function(){
      
      if (breakpoint.matches) {
        count--;
        setTimeout(function () {
            if (!count) {
                $(popupElem).fadeOut(100);
            }
        }, tolerance);
      }
    });
}

// counter
function counterAnim(element, start = 0, end, duration = 1000, region = "en-US"){
 // let targetOld = document.querySelector(qSelector);
  let target = element;
  let startTimestamp = null;
  let floorEnd = Math.floor(end);
  let ceilEnd = Math.ceil(end);
  let step = (timestamp) => {
   if (!startTimestamp) startTimestamp = timestamp;
   let progress = Math.min((timestamp - startTimestamp) / duration, 1);
   if (floorEnd == Math.floor(progress * (end - start) + start)){
    target.innerText = new Intl.NumberFormat(region).format(end);
   } else {
    let number = Math.floor(progress * (end - start) + start);
    target.innerText = new Intl.NumberFormat(region).format(number);
   }
   if (progress < 1) {
    window.requestAnimationFrame(step);
   }
  };
  window.requestAnimationFrame(step);
 };

 // run function when element is in window

 function whenInViewport(element, callback){
  var run = false;

  $(window).on('scroll', function(){
    if ( run ) {
      return;
    }
    if (element) {
      if (element.offsetTop <= (window.scrollY + (window.innerHeight/2) + (element.offsetHeight))){
        run = true;
        callback();
      }
    }
  })
 }


 //reset legal/privacy documents styling

function resetLegalStyles(){    
  
  var legalReset = document.querySelectorAll(".legal-reset");

  var allHeadings = document.querySelectorAll(".legal-reset h1, .legal-reset h2, .legal-reset h3, .legal-reset h4, .legal-reset h5, .legal-reset h6");
  var allSpans    = document.querySelectorAll(".legal-reset span");
  var allLinks    = document.querySelectorAll(".legal-reset a");
  var allTables   = document.querySelectorAll(".legal-reset table");
  var allCells    = document.querySelectorAll(".legal-reset td, .legal-reset th");

  $(allHeadings).each(function(i){this.style=""});
  $(allSpans).each(function(i){this.style=""});
  $(allLinks).each(function(i){this.style=""});
  $(allTables).each(function(i){this.classList.add("table", "table-striped"); this.style="";});
  $(allCells).each(function(i){this.style=""});

}


// Create and download a file
// Create an ICS file (for calendars)
// https://codepen.io/posterchild/pen/LYVqabP


function downloadWithBody(filename, fileBody) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(fileBody));
  element.setAttribute('download', filename);
  element.setAttribute('target', '_blank');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


/**
* Returns a date/time in ICS format
* @params {Object} dateTime - A date object you want to get the ICS format for.
* @returns {string} String with the date in ICS format
*/
function convertToICSDate(dateTime) {
  const year = dateTime.getFullYear().toString();
  const month = (dateTime.getMonth() + 1) < 10 ? "0" + (dateTime.getMonth() + 1).toString() : (dateTime.getMonth() + 1).toString();
  const day = dateTime.getDate() < 10 ? "0" + dateTime.getDate().toString() : dateTime.getDate().toString();
  const hours = dateTime.getHours() < 10 ? "0" + dateTime.getHours().toString() : dateTime.getHours().toString();
  const minutes = dateTime.getMinutes() < 10 ? "0" +dateTime.getMinutes().toString() : dateTime.getMinutes().toString();

  return year + month + day + "T" + hours + minutes + "00";
}


/**
* Creates and downloads an ICS file
* @params {string} timeZone - In the format America/New_York
* @params {object} startTime - Valid JS Date object in the event timezone
* @params {object} endTime - Valid JS Date object in the event timezone
* @params {string} title
* @params {string} description
* @params {string} location
*/
function createDownloadICSFile(timezone, startTime, endTime, title, description, location) {
const icsBody = 'BEGIN:VCALENDAR\n' +
'VERSION:2.0\n' +
'PRODID:Calendar\n' +
'CALSCALE:GREGORIAN\n' +
'METHOD:PUBLISH\n' +
'BEGIN:VTIMEZONE\n' +
'TZID:' + timezone + '\n' +
'END:VTIMEZONE\n' +
'BEGIN:VEVENT\n' +
'SUMMARY:' + title + '\n' +
'UID:@Default\n' +
'SEQUENCE:0\n' +
'STATUS:CONFIRMED\n' +
'TRANSP:TRANSPARENT\n' +
'DTSTART;TZID=' + timezone + ':' + convertToICSDate(startTime) + '\n' +
'DTEND;TZID=' + timezone + ':' + convertToICSDate(endTime)+ '\n' +
'DTSTAMP:'+ convertToICSDate(new Date()) + '\n' +
'LOCATION:' + location + '\n' +
'DESCRIPTION:' + description + '\n' +
'END:VEVENT\n' +
'END:VCALENDAR\n';

downloadWithBody(title + '.ics', icsBody);
}

// scroll to top

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function updateHeight(containerId) {

  var container = document.getElementById(containerId).getElementsByClassName("pages-container")[0];
  
  var activePage = container.getElementsByClassName("paginated-page active")[0];
  var containerHeight = activePage.offsetHeight;

  container.style.height = containerHeight + "px";

}

function goToPage(containerId, num){
    pagesContainer = document.getElementById(containerId);
    pagesList = pagesContainer.getElementsByClassName("paginated-page");

    Array.from(pagesList).forEach((item, index) => {
    item.classList.add("d-none");
    item.classList.remove("active");
    if (index + 1 == num) {
      item.classList.remove("d-none");
      item.classList.add("active");
    }
  });

  pagination(containerId, num);
  updateHeight(containerId);

}

function goNext(containerId, curPage){
    goToPage(containerId, curPage+1);
    return curPage++;
}

function goPrev(containerId, curPage){
    goToPage(containerId, curPage-1);
    return curPage--;
}

function pagination(containerId, curPage) {

  const pagesContainer = document.getElementById(containerId);
  const paginationContainer = pagesContainer.getElementsByClassName("pagination-container")[0];
  const pagesList = pagesContainer.getElementsByClassName("paginated-page");
  const total = pagesList.length;
  const numPadding = 2;

  const paginationUl = document.createElement("ul");

  paginationUl.classList.add("pagination", "justify-content-center");

  const prevLi = document.createElement("li");
  prevLi.classList.add("page-item")

  const prevLink = document.createElement("a");
  prevLink.classList.add("page-link");
  prevLink.id = "previousLink";
  prevLink.href="#";
  prevLink.innerHTML = '<i class="fa far fa-chevrons-left fa-2xs"></i> Previous';

  prevLi.appendChild(prevLink);

  if (curPage != 1) {
      paginationUl.appendChild(prevLi);
  }

  var firstEllipses = false;
  var secondEllipses = false;

  for (i=0; i < total; i++){
      
      if (((curPage - numPadding) <= (i+1) && (i+1) <= (curPage + numPadding)) || (i == 0) || (i + 1 == total)) {
          const newPageLi = document.createElement("li");
          newPageLi.classList.add("page-item");
          if (i + 1 == curPage){
              newPageLi.ariaCurrent = "page";
              newPageLi.classList.add("active");
          }

          const newLink = document.createElement("a");
          newLink.classList.add("page-link", "page-link-number");
          newLink.innerHTML = i+1;
          newLink.dataset.destination = i+1;
          newLink.href = "#";
          
          newPageLi.appendChild(newLink);

          paginationUl.appendChild(newPageLi);
      } else {

          if (!firstEllipses) {
              if (1 < (i + 1) && (i + 1) < (curPage - numPadding)) {
              const ellipsesLi = document.createElement("li");
              ellipsesLi.classList.add("page-item","first-ellipses");

              const ellipses = document.createElement("span");
              ellipses.classList.add("page-link");
              ellipses.innerHTML = "...";
              
              ellipsesLi.appendChild(ellipses);

              paginationUl.appendChild(ellipsesLi);


                  firstEllipses = true;
                  continue;
              }
          }

          if (!secondEllipses) {
              if ((curPage + numPadding) < (i + 1) && (i + 1) < total) {
                  const ellipsesLi = document.createElement("li");
                  ellipsesLi.classList.add("page-item","second-ellipses");

                  const ellipses = document.createElement("span");
                  ellipses.classList.add("page-link");
                  ellipses.innerHTML = "...";
                  
                  ellipsesLi.appendChild(ellipses);

                  paginationUl.appendChild(ellipsesLi);

                  secondEllipses = true;
                  continue;
              }
          }
      }
  }

  const nextLi = document.createElement("li");
  nextLi.classList.add("page-item")


  const nextLink = document.createElement("a");
  nextLink.classList.add("page-link");
  nextLink.id = "nextLink";
  nextLink.href="#";
  
  nextLink.innerHTML = 'Next <i class="fa far fa-chevrons-right fa-2xs"></i>';

  nextLi.appendChild(nextLink);
  
  if (curPage != total) {
      paginationUl.appendChild(nextLi);
  }

  paginationContainer.innerHTML = '';
  paginationContainer.appendChild(paginationUl);

  const paginationNumbers = paginationContainer.getElementsByClassName("page-link-number");
  const prevButton = document.getElementById("previousLink");
  const nextButton = document.getElementById("nextLink");

  if (prevButton) {
      prevButton.addEventListener("click", (event) => {
          event.preventDefault();
          goPrev(containerId, curPage);
          curPage--;
      });
  }

  if (nextButton) {
      nextButton.addEventListener("click", (event) => {
          event.preventDefault();
      //    console.log("next");
          goNext(containerId, curPage);
          curPage++;
      //    console.log("current page: " + curPage);
      });
  }

  Array.from(paginationNumbers).forEach((item, index) => {
      let pageIndex = Number(item.dataset.destination);
      if (pageIndex) {
          item.addEventListener("click", () => {
              event.preventDefault();
              goToPage(containerId, pageIndex);
              curPage = pageIndex;
          });
      }
  });

}





function downloadFile(fileUrl, fileName, target) {
  var element = document.createElement('a');
  element.setAttribute('href', fileUrl);
  element.setAttribute('download', fileName);
  element.setAttribute('target', target);

  element.style.display = 'none';
  document.body.appendChild(element);

  //element.click();

  //document.body.removeChild(element);
}

// function downloadFile(url, fileName){
//   fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
//     .then(res => res.blob())
//     .then(res => {
//       const aElement = document.createElement('a');
//       aElement.setAttribute('download', fileName);
//       const href = URL.createObjectURL(res);
//       aElement.href = href;
//       // aElement.setAttribute('href', href);
//       aElement.setAttribute('target', '_blank');
//       aElement.click();
//       URL.revokeObjectURL(href);
//     });
// };


// Cookie functions

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let cookieList = document.cookie.split(';');
  for(let i = 0; i < cookieList.length; i++) {
    let cookie = cookieList[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}


function checkCookie(cname, callback, callbackFalse) {
  let cvalue = getCookie(cname);
  if (cvalue != "") {   
    if (callback && typeof(callback) === "function"){
      callback();
    }
   } else {
      if (callbackFalse && typeof(callbackFalse) === "function"){
      callbackFalse();
    }
  }
}


// Function to paginate an array

function paginate(array, num){
  const pages = [];
  for (let i=0;i<array.length;i+=num){
    pages.push(array.slice(i, i + num));
  }
  return pages;
}


// check if element is in the viewport

function isInViewport(element, percentageScroll = 100) {
  const rect = element.getBoundingClientRect();
  return (
      rect.bottom >= (0 * (percentageScroll/100))  &&
   //   rect.left >= 0 &&
      rect.top <= ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100)) //&&
   //   rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// check if element is fully in the viewport

function isAllInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0  &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));




function fadeInHandler() {

  const fadingElements = document.querySelectorAll(".animate-fade");

  fadingElements.forEach((el) => {
    // check if element is already visible
    if (isInViewport(el, 80)) {
      el.classList.add("animated", "faded"); 
    } else {
      // otherwise hide it
          el.style.opacity = 0;
    }
  });

  window.addEventListener('scroll', () => {
    
    fadingElements.forEach((el) => {

        // check if already animated
        if (!el.classList.contains("animated")) {

          // when element is in screen
          if (isInViewport(el, 50)) {
              // move it to the final position
              el.style.removeProperty("opacity");
              el.classList.add("faded", "animated");
          }
        }
      });
  })
  
}



function slideInHandler(slideFrom) {

  const slidingElements = document.querySelectorAll(".animate-slide");

  slidingElements.forEach((el) => {
    // check if element is already visible
    if (isInViewport(el, 80)) {
      el.classList.add("animated", "slid"); 
    } else {
      // otherwise move it off screen
      
      if (slideFrom == "right") {
          const translateX = (window.innerWidth - el.getBoundingClientRect().left) + 150;
          //console.log(translateX);
          el.style.transform = "translateX(" + translateX + "px)";
      }

      if (slideFrom == "left") {
        const translateX = -(el.getBoundingClientRect().right - 150);
        //console.log(translateX);
        el.style.transform = "translateX(" + translateX + "px)";
      }

      if (slideFrom == "bottom") {
        const translateY = (Math.max(el.getBoundingClientRect().height, 150));
        //console.log(translateY);
        el.style.transform = "translateY(" + translateY + "px)";
      }

    }
  });

  window.addEventListener('scroll', () => {
    
    slidingElements.forEach((el) => {

        // check if already animated
        if (!el.classList.contains("animated")) {

          // when element is in screen
          if (isInViewport(el, 50)) {
              // move it to the final position
              el.style.removeProperty("transform");
              el.classList.add("slid", "animated");
          }
        }
      });
  })
  
}


function cardAnimateHandler() {

  const cardElements = document.querySelectorAll(".animate-card");

  cardElements.forEach((el) => {
    // check if element is already visible
    if (isInViewport(el, 80)) {
      el.classList.add("animated", "slid"); 
    } else {

      el.dataset.offsetLeft = el.getBoundingClientRect().left;


      // otherwise hide it
        const translateX = -150;
        //console.log(translateX);
          el.style.opacity = 0;
          el.style.transform = "translateX(" + translateX + "px)";
    }
  });

  window.addEventListener('scroll', () => {
    
    cardElements.forEach((el) => {

        // check if already animated
        if (!el.classList.contains("animated")) {

          // when element is in screen
          if (isInViewport(el, 90)) {
            // duration for the entire animation
            let duration = 600;
            // delay based on the distance from the left edge of the screen
            let elOffsetLeft = el.dataset.offsetLeft;
            let windowWidth = window.screen.width;
            let timePercentage = elOffsetLeft / windowWidth;

       //     console.log(elOffsetLeft);
       //     console.log(windowWidth);
       //     console.log(timePercentage);

            // therefore the delay on the card is the duration times the percent of the distance from the left 
            let delay = duration * timePercentage;

            setTimeout(() => {
              // move it to the final position
              el.style.removeProperty("opacity");
              el.style.removeProperty("transform");
              el.classList.add("slid", "animated");
            }, delay);
          }
        }
      });
  })
  
}






function fetchRSS(rssURL, limit = 5){

  var xmlhttp;
 
  if (window.XMLHttpRequest)
  {// For IE7 and above, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// For IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.open("GET",rssURL,false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;


// iterate through var x=xmlDoc.getElementsByTagName("item"); items

// <item>s contain
// <guid>
// <title>
// <description>
// <author>?
// <pubDate>
// <enclosure> e.g.  <enclosure length="64948464" type="audio/mpeg" url="https://pdst.fm/e/dts.podtrac.com/redirect.mp3/tracking.swap.fm/track/0bDcdoop59bdTYSfajQW/stitcher.simplecastaudio.com/4ca28c43-1b5a-4fc4-bc21-fc9e79754a3a/episodes/de7efe44-aa91-45ce-a532-e77bf704eda0/audio/128/default.mp3?aid=rss_feed&awCollectionId=4ca28c43-1b5a-4fc4-bc21-fc9e79754a3a&awEpisodeId=de7efe44-aa91-45ce-a532-e77bf704eda0&feed=dCXMIpJz"/>
// <itunes:image> href for episodic images?
// <itunes:duration>
// <itunes:episode>?

var feedJson = {};

var feedJsonItems = [];

var items=xmlDoc.getElementsByTagName("item");

console.log(items);

for (let i=0; i<limit; i++) {
  let newItem = {
    "title": items[i].getElementsByTagName('title')[0].childNodes[0].textContent,
    "description": items[i].getElementsByTagName('description')[0].childNodes[0].textContent
   // "episode": items[i].getElementsByTagName('episode')[0].childNodes[0].textContent
  };

  if (items[i].getElementsByTagNameNS('http://www.itunes.com/dtds/podcast-1.0.dtd','image')[0]) {
    newItem.image = items[i].getElementsByTagNameNS('http://www.itunes.com/dtds/podcast-1.0.dtd','image')[0].attributes.getNamedItem("href").textContent;
  } else {
    newItem.image = xmlDoc.getElementsByTagName("channel")[0].getElementsByTagName("image")[0].getElementsByTagName("url")[0].textContent;
  }

  feedJsonItems.push(newItem);
}

feedJson.items = feedJsonItems;


console.log(feedJson);

return feedJson;

var strBuffer= "";
strBuffer = strBuffer +"<div class='container-fluid padding_top_10' style='max-width: 350px;'>";
var x=xmlDoc.getElementsByTagName("item");
for (i=0;i<x.length;i++)
  {
      var description = (x[i].getElementsByTagName('description')[0].childNodes[0].nodeValue);
    
      var descriptionText = (x[i].getElementsByTagName('description')[0].childNodes[0].textContent);
      var imgUrl = $(descriptionText).find('img').attr('src');
    
      var categories = (x[i].getElementsByTagName("category"));
    
      var loopCount = 0;
      var categoryList = "";
      
      if (categories.length != 0) {
        if (categories.length <= 4) {
          for (j=0;j<categories.length;j++) {
            loopCount = loopCount + 1;
            if (j+1 == categories.length) {
              categoryList = categoryList + "<small class='last-small'>" + categories[j].childNodes[0].textContent + "</small>";      
            } else {
              categoryList = categoryList + "<small>" + categories[j].childNodes[0].textContent + "</small>";      
            }
          }
        } else {
          for (j=0;j<4;j++) {
            loopCount = loopCount + 1;
            if (j == 3) {
              categoryList = categoryList + "<small class='last-small'>" + categories[j].childNodes[0].textContent + "</small>";      
            } else {
              categoryList = categoryList + "<small>" + categories[j].childNodes[0].textContent + "</small>";      
            }
          }
        }
      };
    
    
    
      strBuffer = strBuffer + "<div class='row'><div class='col-sm-12 blog_post_listing mb-3'><div class='card'>";
      strBuffer = strBuffer + "<div class='card-header' style='background-image:url(" + imgUrl + ")'>&nbsp;</div>";
      strBuffer = strBuffer + "<div class='card-body'>" + categoryList + "<h5 class='card-title'><a href='";
      strBuffer = strBuffer + (x[i].getElementsByTagName('link')[0].childNodes[0].nodeValue);
      strBuffer = strBuffer + "' class='stretched-link'>" + (x[i].getElementsByTagName('title')[0].childNodes[0].nodeValue) + "</a></h5>";
      strBuffer = strBuffer + (x[i].getElementsByTagName('description')[0].childNodes[0].nodeValue) + "</div>";
      strBuffer = strBuffer + "<div class='card-footer text-right'><a class='button_readmore pr-0 stretched-link' href='";
      strBuffer = strBuffer + (x[i].getElementsByTagName('link')[0].childNodes[0].nodeValue) + "'>Read more</a></div>";
      strBuffer = strBuffer +"</div></div></div>";
      if(i==10){
        break;
      }
  }
strBuffer = strBuffer +"</div>";


 // callback(feed);


  document.getElementById(containerId).innerHTML =strBuffer;
  $(".blog_post_listing p").addClass("card-text text-left"); 
// standard on load code goes here with $ prefix
// note: the $ is setup inside the anonymous function of the ready command





}
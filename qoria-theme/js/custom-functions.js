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
    document.getElementById(videoId).play();
    document.getElementById(videoId).controls = "controls";
    document.getElementById(videoId).parentNode.getElementsByClassName("play-button")[0].remove();
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
function counterAnim(qSelector, start = 0, end, duration = 1000){
  let target = document.querySelector(qSelector);
  let startTimestamp = null;
  let floorEnd = Math.floor(end);
  let ceilEnd = Math.ceil(end);
  let step = (timestamp) => {
   if (!startTimestamp) startTimestamp = timestamp;
   let progress = Math.min((timestamp - startTimestamp) / duration, 1);
   if (floorEnd == Math.floor(progress * (end - start) + start)){
    target.innerText = end;
   } else {
    target.innerText = Math.floor(progress * (end - start) + start);
   }
   if (progress < 1) {
    window.requestAnimationFrame(step);
   }
  };
  window.requestAnimationFrame(step);
 };

 // run function when element is in window

 function whenInViewport(elementId, callback){
  var run = false, element = document.querySelector(elementId);

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

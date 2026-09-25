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

function normaliseHeights(classString, screenWidth = "xs") {
    const breakpoint = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(`--q-breakpoint-${screenWidth}`);

    const screenSizeQuery = window.matchMedia(`(min-width: ${breakpoint})`);
    const items = document.querySelectorAll(classString);

    if (items.length === 0) return;

    function handleResize() {
        items.forEach((item) => {
            item.style.minHeight = "0";
            if (item.tagName === "IMG") {
                if (!item.complete) {
                    item.addEventListener("load", handleResize);
                }
            }
        });

        if (screenSizeQuery.matches) {
            let maxHeight = 0;
            items.forEach((item) => {
                const currentHeight = item.offsetHeight;

                // console.log(item, currentHeight);
                if (currentHeight > maxHeight) {
                    maxHeight = currentHeight;
                }
            });

            if (maxHeight > 0) {
                items.forEach((item) => {
                    item.style.minHeight = maxHeight + "px";
                });
            }
        }
    }

    screenSizeQuery.addEventListener("change", handleResize);
    handleResize();
}

function normaliseHeightsMin(classString, screenWidth = "xs") {
    const breakpoint = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(`--q-breakpoint-${screenWidth}`);

    const screenSizeQuery = window.matchMedia(`(min-width: ${breakpoint})`);
    const items = document.querySelectorAll(classString);

    if (items.length === 0) return;

    function handleResize() {
        items.forEach((item) => {
            item.style.maxHeight = "";
            if (item.tagName === "IMG") {
                if (!item.complete) {
                    item.addEventListener("load", handleResize);
                }
            }
        });

        if (screenSizeQuery.matches) {
            // initialize with the first item's height instead of 0, otherwise it'll never get past 0
            let minHeight = items[0].offsetHeight;

            items.forEach((item) => {
                const curHeight = item.offsetHeight;
                if (curHeight < minHeight) {
                    minHeight = curHeight;
                }
            });

            items.forEach((item) => {
                item.style.maxHeight = minHeight + "px";
                item.style.overflow = "hidden";
            });
        }
    }

    screenSizeQuery.addEventListener("change", handleResize);
    handleResize();
}

// responsive equal heights
const mediaXs = window.matchMedia("(max-width: 575px)");
const mediaSm = window.matchMedia("(min-width: 576px)");
const mediaMd = window.matchMedia("(min-width: 768px)");
const mediaLg = window.matchMedia("(min-width: 992px)");
const mediaXl = window.matchMedia("(min-width: 1200px)");
const mediaXxl = window.matchMedia("(min-width: 1400px)");

function normaliseHeightsXs(classString) {
    normaliseHeights(classString, "xs");
}

function normaliseHeightsSm(classString) {
    normaliseHeights(classString, "sm");
}

function normaliseHeightsMd(classString) {
    normaliseHeights(classString, "md");
}

function normaliseHeightsLg(classString) {
    normaliseHeights(classString, "lg");
}

function normaliseHeightsXl(classString) {
    normaliseHeights(classString, "xl");
}

function normaliseHeightsXxl(classString) {
    normaliseHeights(classString, "xxl");
}

function playVideo(videoId, event) {
    document.getElementById(videoId).play();
    document.getElementById(videoId).controls = "controls";
    if (
        document
            .getElementById(videoId)
            .parentNode.getElementsByClassName("play-button").length > 0
    ) {
        document
            .getElementById(videoId)
            .parentNode.getElementsByClassName("play-button")[0]
            .remove();
    }
}

function pauseVideo(videoId) {
    document.getElementById(videoId).pause();
}

function initWellbeingFramework(
    container,
    hoverElements = [],
    uniqueParents = [],
    breakpoint = "md",
) {
    if (!container) return;
    const containerElement = container;
    const breakpointValue = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(`--q-breakpoint-${breakpoint}`);
    const screenSizeQuery = window.matchMedia(
        `(min-width: ${breakpointValue})`,
    );
    const uniqueParentGroup = uniqueParents.map((parent) => {
        return containerElement.querySelector(`#${parent}`);
    });

    const uniqueParentAccordions = uniqueParents.map((parent) => {
        return containerElement.querySelector(`#group${parent}`);
    });

    function initWellbeingPopup(popupElementString = "") {
        if (!popupElementString) return;

        const triggers = containerElement.querySelectorAll(
            `#${popupElementString}, #${popupElementString}Popup`,
        );
        const popup = containerElement.querySelector(
            `#${popupElementString}Popup`,
        );

        let count = 0;
        const tolerance = 0;

        function showPopup() {
            popup.classList.add("wellbeing-popup-active");
            popup.style.visibility = "visible";
        }

        function hidePopup() {
            setTimeout(() => {
                if (count <= 0) {
                    popup.style.transition = "opacity 100ms ease";
                    popup.classList.remove("wellbeing-popup-active");

                    setTimeout(() => {
                        if (count <= 0) popup.style.visibility = "hidden";
                    }, 100);

                    setTimeout(() => {
                        popup.style.transition = "";
                    }, 100);
                }
            }, tolerance);
        }

        triggers.forEach((trigger) => {
            trigger.addEventListener("mouseenter", () => {
                if (screenSizeQuery.matches) {
                    count++;
                    showPopup();
                }
            });

            trigger.addEventListener("mouseleave", () => {
                if (screenSizeQuery.matches) {
                    count--;
                    hidePopup();
                }
            });
        });
    }

    hoverElements.forEach((element) => {
        initWellbeingPopup(element);
    });

    uniqueParentGroup.forEach((element, index) => {
        const resultElement = uniqueParentAccordions[index];
        element.addEventListener("click", function (e) {
            if (!screenSizeQuery.matches) {
                uniqueParentGroup.forEach(function (el) {
                    el.style.filter = "opacity(0.5)";
                });
                uniqueParentAccordions.forEach(function (el) {
                    el.style.display = "none";
                });
                this.style.filter = "opacity(1)";
                resultElement.style.display = "block";
            }
        });
    });

    function handleResize() {
        if (screenSizeQuery.matches) {
            uniqueParentGroup.forEach(function (item) {
                item.style.filter = "";
            });
            uniqueParentAccordions.forEach(function (item) {
                item.style.display = "none";
            });
            containerElement.querySelector("#frameworkInstructions").innerHTML =
                "Hover over a section to learn more.";
        } else {
            containerElement.querySelector("#frameworkInstructions").innerHTML =
                "Tap a section to learn more.";
        }
    }

    screenSizeQuery.addEventListener("change", handleResize);
    handleResize();
}

// counter
function counterAnim(
    element,
    start = 0,
    end,
    duration = 1000,
    region = "en-US",
) {
    // let targetOld = document.querySelector(qSelector);
    let target = element;
    let startTimestamp = null;
    let floorEnd = Math.floor(end);
    let ceilEnd = Math.ceil(end);
    let step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        let progress = Math.min((timestamp - startTimestamp) / duration, 1);
        if (floorEnd == Math.floor(progress * (end - start) + start)) {
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
}

// run function when element is in window

function whenInViewport(element, callback) {
    let run = false;

    window.addEventListener("scroll", function () {
        if (run) {
            return;
        }
        if (element) {
            if (
                element.offsetTop <=
                window.scrollY + window.innerHeight / 2 + element.offsetHeight
            ) {
                run = true;
                callback();
            }
        }
    });
}

//reset legal/privacy documents styling

function resetLegalStyles() {
    const allHeadings = document.querySelectorAll(
        ".legal-reset h1, .legal-reset h2, .legal-reset h3, .legal-reset h4, .legal-reset h5, .legal-reset h6",
    );
    const allSpans = document.querySelectorAll(".legal-reset span");
    const allLinks = document.querySelectorAll(".legal-reset a");
    const allTables = document.querySelectorAll(".legal-reset table");
    const allRows = document.querySelectorAll(".legal-reset table tr");
    const allCells = document.querySelectorAll(
        ".legal-reset td, .legal-reset th",
    );

    allHeadings.forEach((el) => {
        el.style = "";
    });
    allSpans.forEach((el) => {
        el.style = "";
    });
    allLinks.forEach((el) => {
        el.style = "";
    });
    allTables.forEach((el) => {
        const tableHeaders = Array.from(el.querySelectorAll("th")).map(
            (th) => th.textContent.trim() || "",
        );
        const tableRows = el.querySelectorAll("tbody tr");
        if (tableHeaders.length > 3) {
            tableRows.forEach((row) => {
                const cells = row.querySelectorAll("td");
                let colIndex = 0;

                cells.forEach((cell) => {
                    if (tableHeaders[colIndex]) {
                        cell.setAttribute("data-label", tableHeaders[colIndex]);
                    }
                    const colSpan = cell.colSpan || 1;
                    colIndex += colSpan;
                });
            });
        }
        if (tableHeaders.length > 3) {
            el.classList.add("table-magic-sm");
        }
        el.classList.add("table", "table-striped");
        el.style = "";
    });
    allRows.forEach((el) => {
        el.style = "";
    });
    allCells.forEach((el) => {
        el.style = "";
    });
}

// Create and download a file
// Create an ICS file (for calendars)
// https://codepen.io/posterchild/pen/LYVqabP

function downloadWithBody(filename, fileBody) {
    var element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/calendar;charset=utf-8," + encodeURIComponent(fileBody),
    );
    element.setAttribute("download", filename);
    element.setAttribute("target", "_blank");

    element.style.display = "none";
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
    const month =
        dateTime.getMonth() + 1 < 10
            ? "0" + (dateTime.getMonth() + 1).toString()
            : (dateTime.getMonth() + 1).toString();
    const day =
        dateTime.getDate() < 10
            ? "0" + dateTime.getDate().toString()
            : dateTime.getDate().toString();
    const hours =
        dateTime.getHours() < 10
            ? "0" + dateTime.getHours().toString()
            : dateTime.getHours().toString();
    const minutes =
        dateTime.getMinutes() < 10
            ? "0" + dateTime.getMinutes().toString()
            : dateTime.getMinutes().toString();

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
function createDownloadICSFile(
    timezone,
    startTime,
    endTime,
    title,
    description,
    location,
) {
    const icsBody =
        "BEGIN:VCALENDAR\n" +
        "VERSION:2.0\n" +
        "PRODID:Calendar\n" +
        "CALSCALE:GREGORIAN\n" +
        "METHOD:PUBLISH\n" +
        "BEGIN:VTIMEZONE\n" +
        "TZID:" +
        timezone +
        "\n" +
        "END:VTIMEZONE\n" +
        "BEGIN:VEVENT\n" +
        "SUMMARY:" +
        title +
        "\n" +
        "UID:@Default\n" +
        "SEQUENCE:0\n" +
        "STATUS:CONFIRMED\n" +
        "TRANSP:TRANSPARENT\n" +
        "DTSTART;TZID=" +
        timezone +
        ":" +
        convertToICSDate(startTime) +
        "\n" +
        "DTEND;TZID=" +
        timezone +
        ":" +
        convertToICSDate(endTime) +
        "\n" +
        "DTSTAMP:" +
        convertToICSDate(new Date()) +
        "\n" +
        "LOCATION:" +
        location +
        "\n" +
        "DESCRIPTION:" +
        description +
        "\n" +
        "END:VEVENT\n" +
        "END:VCALENDAR\n";

    downloadWithBody(title + ".ics", icsBody);
}

// scroll to top

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function updateHeight(containerId) {
    var container = document
        .getElementById(containerId)
        .getElementsByClassName("pages-container")[0];

    var activePage = container.getElementsByClassName(
        "paginated-page active",
    )[0];
    var containerHeight = activePage.offsetHeight;

    container.style.height = containerHeight + "px";
}

function downloadFile(fileUrl, fileName, target) {
    var element = document.createElement("a");
    element.setAttribute("href", fileUrl);
    element.setAttribute("download", fileName);
    element.setAttribute("target", target);

    element.style.display = "none";
    document.body.appendChild(element);
}

// Cookie functions

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let cookieList = document.cookie.split(";");
    for (let i = 0; i < cookieList.length; i++) {
        let cookie = cookieList[i];
        while (cookie.charAt(0) == " ") {
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
        if (callback && typeof callback === "function") {
            callback();
        }
    } else {
        if (callbackFalse && typeof callbackFalse === "function") {
            callbackFalse();
        }
    }
}

// Function to paginate an array

function paginate(array, num) {
    const pages = [];
    for (let i = 0; i < array.length; i += num) {
        pages.push(array.slice(i, i + num));
    }
    return pages;
}

// check if element is in the viewport

function isInViewport(element, percentageScroll = 100) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom >= 0 * (percentageScroll / 100) &&
        //   rect.left >= 0 &&
        rect.top <=
            (window.innerHeight || document.documentElement.clientHeight) *
                (percentageScroll / 100) //&&
        //   rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// check if element is fully in the viewport

function isAllInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

function lerp(x, y, a) {
    return x * (1 - a) + y * a;
}

function clamp(a, min = 0, max = 1) {
    return Math.min(max, Math.max(min, a));
}

function invlerp(x, y, a) {
    return clamp((a - x) / (y - x));
}

function range(x1, y1, x2, y2, a) {
    return lerp(x2, y2, invlerp(x1, y1, a));
}

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

    window.addEventListener("scroll", () => {
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
    });
}

function slideInHandler(slideFrom) {
    const slidingElements = document.querySelectorAll(".animate-slide");

    slidingElements.forEach((el) => {
        // check if element is already visible
        if (isInViewport(el, 80)) {
            el.classList.add("animated", "slid");
        } else {
            // otherwise move it off screen
            if (el.classList.contains("slide-right")) {
                // if (slideFrom == "right") {
                const translateX =
                    window.innerWidth - el.getBoundingClientRect().left + 150;
                //console.log(translateX);
                el.style.transform = "translateX(" + translateX + "px)";
            } else if (el.classList.contains("slide-left")) {
                // if (slideFrom == "left") {
                const translateX = -el.getBoundingClientRect().right - 150;
                //console.log(translateX);
                el.style.transform = "translateX(" + translateX + "px)";
            } else if (el.classList.contains("slide-bottom")) {
                // if (slideFrom == "bottom") {
                const translateY = Math.max(
                    el.getBoundingClientRect().height,
                    150,
                );
                //console.log(translateY);
                el.style.transform = "translateY(" + translateY + "px)";
            }
        }
    });

    window.addEventListener("scroll", () => {
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
    });
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

    window.addEventListener("scroll", () => {
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
    });
}

function fetchRSS(rssURL, limit = 5) {
    let xmlhttp;

    if (window.XMLHttpRequest) {
        // For IE7 and above, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // For IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", rssURL, false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

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

    let feedJson = {};

    let feedJsonItems = [];

    let items = xmlDoc.getElementsByTagName("item");

    // console.log(items);

    for (let i = 0; i < limit; i++) {
        let newItem = {
            title: items[i].getElementsByTagName("title")[0].childNodes[0]
                .textContent,
            description:
                items[i].getElementsByTagName("description")[0].childNodes[0]
                    .textContent,
            // "episode": items[i].getElementsByTagName('episode')[0].childNodes[0].textContent
        };

        if (
            items[i].getElementsByTagNameNS(
                "http://www.itunes.com/dtds/podcast-1.0.dtd",
                "image",
            )[0]
        ) {
            newItem.image = items[i]
                .getElementsByTagNameNS(
                    "http://www.itunes.com/dtds/podcast-1.0.dtd",
                    "image",
                )[0]
                .attributes.getNamedItem("href").textContent;
        } else {
            newItem.image = xmlDoc
                .getElementsByTagName("channel")[0]
                .getElementsByTagName("image")[0]
                .getElementsByTagName("url")[0].textContent;
        }

        feedJsonItems.push(newItem);
    }

    feedJson.items = feedJsonItems;

    // console.log(feedJson);

    return feedJson;

    var strBuffer = "";
    strBuffer =
        strBuffer +
        "<div class='container-fluid padding_top_10' style='max-width: 350px;'>";
    var x = xmlDoc.getElementsByTagName("item");
    for (i = 0; i < x.length; i++) {
        var description =
            x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;

        var descriptionText =
            x[i].getElementsByTagName("description")[0].childNodes[0]
                .textContent;
        var imgUrl = $(descriptionText).find("img").attr("src");

        var categories = x[i].getElementsByTagName("category");

        var loopCount = 0;
        var categoryList = "";

        if (categories.length != 0) {
            if (categories.length <= 4) {
                for (j = 0; j < categories.length; j++) {
                    loopCount = loopCount + 1;
                    if (j + 1 == categories.length) {
                        categoryList =
                            categoryList +
                            "<small class='last-small'>" +
                            categories[j].childNodes[0].textContent +
                            "</small>";
                    } else {
                        categoryList =
                            categoryList +
                            "<small>" +
                            categories[j].childNodes[0].textContent +
                            "</small>";
                    }
                }
            } else {
                for (j = 0; j < 4; j++) {
                    loopCount = loopCount + 1;
                    if (j == 3) {
                        categoryList =
                            categoryList +
                            "<small class='last-small'>" +
                            categories[j].childNodes[0].textContent +
                            "</small>";
                    } else {
                        categoryList =
                            categoryList +
                            "<small>" +
                            categories[j].childNodes[0].textContent +
                            "</small>";
                    }
                }
            }
        }

        strBuffer =
            strBuffer +
            "<div class='row'><div class='col-sm-12 blog_post_listing mb-3'><div class='card'>";
        strBuffer =
            strBuffer +
            "<div class='card-header' style='background-image:url(" +
            imgUrl +
            ")'>&nbsp;</div>";
        strBuffer =
            strBuffer +
            "<div class='card-body'>" +
            categoryList +
            "<h5 class='card-title'><a href='";
        strBuffer =
            strBuffer +
            x[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
        strBuffer =
            strBuffer +
            "' class='stretched-link'>" +
            x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
            "</a></h5>";
        strBuffer =
            strBuffer +
            x[i].getElementsByTagName("description")[0].childNodes[0]
                .nodeValue +
            "</div>";
        strBuffer =
            strBuffer +
            "<div class='card-footer text-right'><a class='button_readmore pr-0 stretched-link' href='";
        strBuffer =
            strBuffer +
            x[i].getElementsByTagName("link")[0].childNodes[0].nodeValue +
            "'>Read more</a></div>";
        strBuffer = strBuffer + "</div></div></div>";
        if (i == 10) {
            break;
        }
    }
    strBuffer = strBuffer + "</div>";

    // callback(feed);

    document.getElementById(containerId).innerHTML = strBuffer;
    $(".blog_post_listing p").addClass("card-text text-left");
    // standard on load code goes here with $ prefix
    // note: the $ is setup inside the anonymous function of the ready command
}

//  parallax images:
function applyParallaxToImages({
    selector = ".parallax-img",
    speed = 0.5,
    easing = 0.1,
    disableOnMobile = true,
} = {}) {
    const mobileThreshold = 768;
    const images = Array.from(document.querySelectorAll(selector));
    const state = new Map();
    let isMobile = window.innerWidth < mobileThreshold;
    let animationFrame;

    // Initialize state and store original transform
    images.forEach((img) => {
        state.set(img, {
            current: 0,
            target: 0,
            originalTransform: getComputedStyle(img).transform || "none",
        });
        img.style.willChange = "transform";
    });

    function updateTargets() {
        if (disableOnMobile && isMobile) return;

        const viewportHeight = window.innerHeight;

        images.forEach((img) => {
            const rect = img.getBoundingClientRect();
            const distanceFromCenter =
                rect.top + rect.height / 2 - viewportHeight / 2;
            const offset = -distanceFromCenter * speed;

            const imgState = state.get(img);
            imgState.target = offset;
        });
    }

    function animate() {
        if (disableOnMobile && isMobile) return;

        images.forEach((img) => {
            const imgState = state.get(img);
            imgState.current += (imgState.target - imgState.current) * easing;
            img.style.transform = `translateY(${imgState.current}px)`;
        });

        animationFrame = requestAnimationFrame(animate);
    }

    function resetToOriginal() {
        images.forEach((img) => {
            const imgState = state.get(img);
            img.style.transform = imgState.originalTransform;
            imgState.current = 0;
            imgState.target = 0;
        });
    }

    function handleResize() {
        const wasMobile = isMobile;
        isMobile = window.innerWidth < mobileThreshold;

        if (disableOnMobile) {
            if (isMobile && !wasMobile) {
                cancelAnimationFrame(animationFrame);
                resetToOriginal();
            } else if (!isMobile && wasMobile) {
                updateTargets();
                animate();
            }
        } else {
            updateTargets();
        }
    }

    window.addEventListener("scroll", updateTargets);
    window.addEventListener("resize", handleResize);

    if (!(disableOnMobile && isMobile)) {
        updateTargets();
        animate();
    }
}

function generateTOC(tocId, contentId, selectorsArray) {
    const tocElement = document.getElementById(tocId);
    const contentEl = document.getElementById(contentId);
    if (!contentEl) {
        throw Error("No content provided for TOC.");
    }
    const selectorString = selectorsArray.join(", ");
    const headings = Array.from(contentEl.querySelectorAll(selectorString));
    if (headings.length === 0) return;

    // create root UL
    let curUl = document.createElement("ul");
    curUl.classList.add("list-unstyled", "m-0");
    curUl.id = "pageContents";
    tocElement.appendChild(curUl);

    // compute min level robustly (handles H10 etc.)
    const levels = headings
        .map((h) => {
            const m = h.tagName.match(/\d+/);
            return m ? parseInt(m[0], 10) : NaN;
        })
        .filter((n) => !Number.isNaN(n));
    const minLevel = levels.length ? Math.min(...levels) : 1;

    // Stack for UL contexts
    const ulStack = [{ level: minLevel, ul: curUl }];
    let previousLevel = null;
    let lastListItem = null;

    // Build TOC list items with nesting
    headings.forEach((heading, index) => {
        // ensure heading has an id
        let id =
            heading.id ||
            (heading.textContent || "")
                .toLowerCase()
                .trim()
                .replace(/[^a-zA-Z0-9]+/g, "-") +
                "-" +
                index;
        if (!heading.id) heading.setAttribute("id", id);

        // create li + anchor
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        const tocLabel = heading.dataset.tocLabel || heading.textContent || "";
        anchor.innerText = tocLabel;
        anchor.id = heading.id + "-link";
        anchor.href = "#" + heading.id;
        const curLevel = heading.tagName.match(/\d+/)
            ? parseInt(heading.tagName.match(/\d+/)[0], 10)
            : 0;
        anchor.classList.add("toc-level-" + curLevel);
        listItem.appendChild(anchor);

        if (previousLevel === null) {
            // first heading
            ulStack[ulStack.length - 1].ul.appendChild(listItem);
        } else if (curLevel > previousLevel) {
            // deeper -> create nested ul under lastListItem
            const subList = document.createElement("ul");
            subList.classList.add("list-unstyled", "ms-0");
            if (lastListItem) {
                lastListItem.appendChild(subList);
                ulStack.push({ level: curLevel, ul: subList });
                subList.appendChild(listItem);
            } else {
                // fallback
                ulStack[ulStack.length - 1].ul.appendChild(listItem);
                ulStack.push({
                    level: curLevel,
                    ul: ulStack[ulStack.length - 1].ul,
                });
            }
        } else if (curLevel === previousLevel) {
            ulStack[ulStack.length - 1].ul.appendChild(listItem);
        } else {
            // shallower: pop until suitable level
            while (
                ulStack.length > 0 &&
                ulStack[ulStack.length - 1].level >= curLevel
            ) {
                ulStack.pop();
            }
            if (ulStack.length === 0) {
                curUl.appendChild(listItem);
                ulStack.push({ level: curLevel, ul: curUl });
            } else {
                ulStack[ulStack.length - 1].ul.appendChild(listItem);
                ulStack.push({
                    level: curLevel,
                    ul: ulStack[ulStack.length - 1].ul,
                });
            }
        }

        lastListItem = listItem;
        previousLevel = curLevel;
    });

    // TOC anchors (li elements)
    const tocAnchors = Array.from(tocElement.querySelectorAll("li"));
    let lastActiveIndex = -1;

    // Update active TOC item: choose closest visible heading to viewport center
    function updateActive() {
        const viewportCenter = window.innerHeight / 2;
        let minDistance = Infinity;
        let activeIndex = -1;

        headings.forEach((h, idx) => {
            const rect = h.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                const headingCenter = rect.top + rect.height / 2;
                const distance = Math.abs(headingCenter - viewportCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    activeIndex = idx;
                }
            }
        });

        if (activeIndex === -1) {
            // Nothing visible -> clear
            if (lastActiveIndex !== -1) {
                tocAnchors.forEach((li) =>
                    li.classList.remove("active", "current"),
                );
                lastActiveIndex = -1;
            }
            return;
        }

        if (activeIndex !== lastActiveIndex) {
            tocAnchors.forEach((li) =>
                li.classList.remove("active", "current"),
            );
            let li = tocAnchors[activeIndex];
            while (li && li.tagName === "LI") {
                li.classList.add("active", "current");
                if (
                    li.parentElement &&
                    li.parentElement.parentElement &&
                    li.parentElement.parentElement.tagName === "LI"
                ) {
                    li = li.parentElement.parentElement;
                } else {
                    break;
                }
            }
            lastActiveIndex = activeIndex;
        }
    }

    // IntersectionObserver to trigger updates when headings become visible
    const obOption = { rootMargin: "0px 0% 0%", threshold: 0 };
    const observer = new IntersectionObserver(() => updateActive(), obOption);
    headings.forEach((h) => observer.observe(h));

    // also update on scroll/resize to be responsive
    let rafPending = false;
    const onScroll = () => {
        if (!rafPending) {
            rafPending = true;
            requestAnimationFrame(() => {
                updateActive();
                rafPending = false;
            });
        }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // initial run
    updateActive();
}

function countdown(endDay, endMonth, endYear, callback) {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    const newDate = new Date(endYear, endMonth - 1, endDay + 1),
        countDown = newDate.getTime();

    // console.log(newDate.toDateString());

    const x = setInterval(function () {
        const now = new Date().getTime(),
            distance = countDown - now;

        (document.getElementById("days").innerText = Math.floor(
            distance / day,
        )),
            (document.getElementById("hours").innerText = String(
                Math.floor((distance % day) / hour),
            ).padStart(2, "0")),
            (document.getElementById("minutes").innerText = String(
                Math.floor((distance % hour) / minute),
            ).padStart(2, "0")),
            (document.getElementById("seconds").innerText = String(
                Math.floor((distance % minute) / second),
            ).padStart(2, "0"));

        //do something later when date is reached
        if (distance < 0) {
            (document.getElementById("days").innerText = "0"),
                (document.getElementById("hours").innerText = "00"),
                (document.getElementById("minutes").innerText = "00");
            document.getElementById("seconds").innerText = "00";

            callback();
            clearInterval(x);
        }
        //seconds
    }, 0);
}

function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

function cssStringSanitiser(string) {
    return string.replace(/[^a-z0-9]/g, function (s) {
        var c = s.charCodeAt(0);
        if (c == 32) return "-";
        if (c >= 65 && c <= 90) return s.toLowerCase();
        return "__" + ("000" + c.toString(16)).slice(-4);
    });
}

function applyClassesToParent(
    placeToStart,
    classToFind,
    classesToAdd,
    callbackFn = () => {},
) {
    if (!classesToAdd) {
        return;
    }
    // console.log("adding classes");
    const classList = classesToAdd.split(" ");
    if (placeToStart.closest("." + classToFind)) {
        if (classToFind == "dnd-row") {
            // For rows, we need to go up two levels to reach the next row element up
            placeToStart
                .closest("." + classToFind)
                .parentElement.closest(".dnd-row")
                .classList.add(...classList);
        } else {
            placeToStart.closest("." + classToFind).classList.add(...classList);
        }
    }

    callbackFn();
}

function manageCookies() {
    const _hsp = (window._hsp = window._hsp || []);
    _hsp.push(["showBanner"]);
}

const youTubeEmbedHandler = {
    players: [],

    init(onReadyCallback) {
        window.onYouTubeIframeAPIReady = () =>
            this.createPlayers(onReadyCallback);

        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.head.appendChild(tag);
        } else {
            this.createPlayers(onReadyCallback);
        }
    },

    createPlayers(onReadyCallback) {
        const videoElements = document.querySelectorAll(
            ".youtube-embed-container > iframe",
        );

        videoElements.forEach((el) => {
            const player = new YT.Player(el, {
                events: {
                    onReady: (event) => onReadyCallback(event, el.id),
                },
            });
            this.players.push(player);
        });
    },
};

function hubDbResourcesListing(
    resourcesArray = [],
    resourcesContainer = null,
    resourcesSettingsDict = {},
    ) {
    // init:
    const contentsAll = Array.isArray(resourcesArray) ? resourcesArray : [];
    const outerContainer = resourcesContainer;

    if (!outerContainer) {
        console.warn("hubDbResourcesListing: no container element provided, aborting.");
        return;
    }

    const settings = resourcesSettingsDict || {};
    settings.categories = Array.isArray(settings.categories) ? settings.categories : [];
    const itemsPerPage = settings.itemsPerPage || 9;
    const pagesContainer = outerContainer.querySelector(".pages-container");
    const modalContainer = outerContainer.querySelector(".modal-container");
    const paginationContainer = outerContainer.querySelector(
        ".pagination-container",
    );

    if (!pagesContainer) {
        console.warn("hubDbResourcesListing: no .pages-container element found, aborting.");
        return;
    }

    //console.log(contentsAll);

    let contents = contentsAll;
    let curPage = 1;

    // print single resource card
    function hubdbResourceTemplate(row, index) {
        let resourceType = "link";
        // get resource type
        if (row.file && row.file.url) {
            if (
                row.file.url.endsWith(".ogg") ||
                row.file.url.endsWith(".mp4") ||
                row.file.url.endsWith(".webm")
            ) {
                resourceType = "video";
            } else {
                resourceType = "file";
            }
        }

        const newCol = document.createElement("div");
        newCol.classList.add("col");

        const newPost = document.createElement("div");
        newPost.classList.add("card-video");
        if (Array.isArray(settings.cardClasses)) {
            newPost.classList.add(...settings.cardClasses);
        } else if (settings.cardClasses) {
            newPost.classList.add(settings.cardClasses);
        }

        for (let i = 0; i < settings.categories.length; i++) {
            const badgeInfo = settings.categories[i];
            if (!badgeInfo) {
                continue;
            }
            const columnName = badgeInfo["name"];

            if (Array.isArray(row[columnName])) {
                for (let j = 0; j < row[columnName].length; j++) {
                    if (!row[columnName][j]) {
                        continue;
                    }
                    let classPart1 = cssStringSanitiser(String(columnName));
                    let classPart2 = cssStringSanitiser(
                        String(row[columnName][j].label),
                    );
                    const newClass = `rc-${classPart1}-${classPart2}`;
                    newPost.classList.add(newClass);
                }
            } else if (row[columnName]) {
                let classPart1 = cssStringSanitiser(String(columnName));
                let classPart2 = cssStringSanitiser(
                    String(row[columnName].label),
                );
                const newClass = `rc-${classPart1}-${classPart2}`;
                newPost.classList.add(newClass);
            }
        }

        const newCardBody = document.createElement("div");
        newCardBody.classList.add("card-body");
        if (Array.isArray(settings.cardBodyClasses)) {
            newCardBody.classList.add(...settings.cardBodyClasses);
        } else if (settings.cardBodyClasses) {
            newCardBody.classList.add(settings.cardBodyClasses);
        }

        let newContent = "";

        const cardHeader = document.createElement("div");
        const featuredImageContainer = document.createElement("div");

        // featured image
        if (row.thumbnail) {
            if (Array.isArray(settings.cardHeaderClasses)) {
                cardHeader.classList.add(...settings.cardHeaderClasses);
            } else if (settings.cardHeaderClasses) {
                cardHeader.classList.add(settings.cardHeaderClasses);
            }

            const featuredImage = document.createElement("img");

            if (row.thumbnail.resized_url_thumb) {
                featuredImage.src = row.thumbnail.resized_url_thumb;
            } else if (row.thumbnail.url) {
                featuredImage.src = row.thumbnail.url;
            }

            featuredImage.classList.add("img-fluid");
            featuredImage.classList.add("card-img");
            featuredImage.classList.add("w-100");
            featuredImage.alt = row.name || "";

            if (
                !Array.isArray(settings.cardHeaderClasses) ||
                !settings.cardHeaderClasses.includes("card-img-top")
            ) {
                featuredImage.classList.add("img-header");
            }

            if (settings.imageLoading) {
                featuredImage.loading = settings.imageLoading;
            }

            featuredImage.style.objectFit = "cover";

            let playButton = null;

            if (resourceType == "video" && settings.playButton) {
                // include play button
                featuredImageContainer.classList.add("position-relative");
                playButton = document.createElement("div");
                playButton.classList.add("play-button");
                if (settings.playButton == "light") {
                    playButton.classList.add("play-button-light");
                } else if (settings.playButton == "dark") {
                    playButton.classList.add("play-button-dark");
                }

                if (settings.useModals) {
                    playButton.dataset.bsToggle = "modal";
                    const modalTarget = `#resourceModal_${outerContainer.id}_${index}`;
                    playButton.dataset.bsTarget = modalTarget;
                    const modalVideo = `video_${outerContainer.id}_${index}`;
                    playButton.addEventListener("click", function () {
                        playVideo(modalVideo);
                    });
                }
            }

            featuredImageContainer.append(featuredImage);

            if (playButton) {
                featuredImageContainer.append(playButton);
            }

            // handle badges
            if (
                settings.categories.some((category) => category && category.badge == "true")
            ) {
                const badgesContainer = document.createElement("div");
                badgesContainer.classList.add("badges-container");

                for (let i = 0; i < settings.categories.length; i++) {
                    if (!settings.categories[i] || settings.categories[i].badge != "true") {
                        continue;
                    }

                    const badgeInfo = settings.categories[i];
                    const columnName = badgeInfo["name"];

                    if (Array.isArray(row[columnName])) {
                        // console.log(row[columnName]);
                        for (let j = 0; j < row[columnName].length; j++) {
                            if (!row[columnName][j]) {
                                continue;
                            }
                            const newBadge = document.createElement("div");
                            newBadge.classList.add(
                                "badge",
                                "rounded-start",
                                "rounded-end-0",
                                "shadow-sm",
                                "mb-2",
                            );
                            let classPart1 = cssStringSanitiser(
                                String(columnName),
                            );
                            let classPart2 = cssStringSanitiser(
                                String(row[columnName][j].name),
                            );
                            const newClass = `rb-${classPart1}-${classPart2}`;
                            newBadge.classList.add(newClass);
                            if (badgeInfo.colour) {
                                newBadge.classList.add(
                                    "badge-" + badgeInfo.colour,
                                );
                            } else {
                                newBadge.classList.add("text-bg-primary");
                            }
                            newBadge.innerHTML = row[columnName][j].label || "";
                            badgesContainer.appendChild(newBadge);
                        }
                    } else if (row[columnName]) {
                        const newBadge = document.createElement("div");
                        newBadge.classList.add(
                            "badge",
                            "rounded-start",
                            "rounded-end-0",
                            "shadow-sm",
                            "mb-2",
                        );

                        let classPart1 = cssStringSanitiser(String(columnName));
                        let classPart2 = cssStringSanitiser(
                            String(row[columnName].name),
                        );
                        const newClass = `rb-${classPart1}-${classPart2}`;
                        newBadge.classList.add(newClass);

                        if (badgeInfo.colour) {
                            newBadge.classList.add("badge-" + badgeInfo.colour);
                        } else {
                            newBadge.classList.add("text-bg-primary");
                        }
                        newBadge.style.backgroundColor = badgeInfo.colour;
                        newBadge.innerHTML = row[columnName].label || "";
                        badgesContainer.appendChild(newBadge);
                    }
                }

                featuredImageContainer.classList.add("position-relative");
                featuredImageContainer.append(badgesContainer);
            }

            cardHeader.append(featuredImageContainer);
        }

        const rowName = row.name || "";

        if (settings.subheadingColumn) {
            const subheading = row[settings.subheadingColumn] || "";
            // print name
            newContent += `<div class="d-flex justify-content-${settings.cardAlignment} mb-2 align-items-center">`;
            newContent += "<div>";
            newContent += `<h5 class="text-${settings.cardAlignment} mb-0">${rowName}</h5>`;
            newContent += "</div>";
            newContent += "</div>";
            if (subheading) {
                // print subheading
                newContent += `<div class="d-flex justify-content-${settings.cardAlignment} mb-2 align-items-center">`;
                newContent += "<div>";
                newContent += `<p class="text-${settings.cardAlignment} mb-0 fw-bold">${subheading}</p>`;
                newContent += "</div>";
                newContent += "</div>";
            }
        } else {
            // print name
            newContent += `<div class="d-flex justify-content-${settings.cardAlignment} mb-3 align-items-center">`;
            newContent += "<div>";
            newContent += `<h5 class="text-${settings.cardAlignment} mb-0">${rowName}</h5>`;
            newContent += "</div>";
            newContent += "</div>";
        }

        // print description
        if (row.description) {
            newContent += `<div class="card-text text-dark">${row.description}</div>`;
        }

        newCardBody.innerHTML = newContent;

        const newFooter = document.createElement("div");

        newFooter.classList.add("card-footer", "d-flex", "align-items-end");

        if (Array.isArray(settings.cardFooterClasses)) {
            newFooter.classList.add(...settings.cardFooterClasses);
        } else if (settings.cardFooterClasses) {
            newFooter.classList.add(settings.cardFooterClasses);
        }

        let newFooterInner = "";

        if (row.duration) {
            newFooterInner += `<span class="me-auto badge badge-blue-subtle"><i class="fal fa-stopwatch me-1 fa-sm"></i> ${row.duration}</span>`;
        }

        const cardLink = document.createElement("a");

        let urlSet = false;
        if (settings.customUrlColumn && !urlSet) {
            if (row[settings.customUrlColumn]) {
                cardLink.href = row[settings.customUrlColumn];
                urlSet = true;
            }
        }
        if (settings.useModals && !urlSet) {
            if (resourceType == "video") {
                cardLink.href = "#";
                cardLink.dataset.bsToggle = "modal";
                const modalTarget = `#resourceModal_${outerContainer.id}_${index}`;
                cardLink.dataset.bsTarget = modalTarget;
                const modalVideo = `video_${outerContainer.id}_${index}`;
                cardLink.setAttribute(
                    "onclick",
                    "playVideo('" + modalVideo + "');",
                );
                cardLink.addEventListener("click", function () {
                    playVideo(modalVideo);
                });
                urlSet = true;
            } else if (resourceType == "file") {
                cardLink.href = "#";
                cardLink.dataset.bsToggle = "modal";
                const modalTarget = `#resourceModal_${outerContainer.id}_${index}`;
                cardLink.dataset.bsTarget = modalTarget;
                urlSet = true;
            }
        }
        if (row.hs_path && !urlSet) {
            cardLink.href = settings.requestPath + "/" + row.hs_path;
            urlSet = true;
        }

        let linkLabel = settings.linkLabel;

        if (settings.ctaColumn) {
            if (row[settings.ctaColumn]) {
                linkLabel = row[settings.ctaColumn];
            }
        }

        cardLink.innerHTML = linkLabel;

        if (Array.isArray(settings.ctaClasses)) {
            cardLink.classList.add(...settings.ctaClasses);
        } else if (settings.ctaClasses) {
            cardLink.classList.add(settings.ctaClasses);
        }

        newFooterInner += cardLink.outerHTML;

        newFooter.innerHTML = newFooterInner;

        newPost.append(cardHeader);
        newPost.append(newCardBody);
        newPost.append(newFooter);

        newCol.append(newPost);

        return newCol;
    }

    // print related modal
    function modalTemplate(row, index) {
        const newModal = document.createElement("div");
        newModal.classList.add("modal", "fade");
        let modalId = `resourceModal_${outerContainer.id}_${index}`;
        newModal.id = modalId;
        newModal.ariaHidden = "true";
        newModal.ariaLabelledby = modalId;
        newModal.tabIndex = "-1";

        let newModalDialog = "";

        newModalDialog +=
            '<div class="modal-dialog modal-lg modal-dialog-centered">';
        newModalDialog += '<div class="modal-content overflow-hidden">';
        newModalDialog += '<div class="modal-body p-0">';
        newModalDialog += '<div class="position-relative">';
        let videoPoster = "";
        if (row.thumbnail && row.thumbnail.url) {
            videoPoster += 'poster="' + row.thumbnail.url + '"';
        }
        newModalDialog += `<video id="video_${outerContainer.id}_${index}" width="100%" class="d-block" preload="metadata" ${videoPoster} controlsList="nodownload noremoteplayback">`;

        let videoUrl = "";
        let videoType = "";

        if (row.video && row.video.url !== undefined) {
            videoUrl = row.video.url.toLowerCase();
        }

        if (videoUrl.includes(".mp4")) {
            videoType = "video/mp4";
        } else if (videoUrl.includes(".ogg")) {
            videoType = "video/ogg";
        } else if (videoUrl.includes(".webm")) {
            videoType = "video/webm";
        }

        newModalDialog += '<source src="' + videoUrl + '" ' + videoType + ">";
        newModalDialog += "Your browser does not support the video tag.";
        newModalDialog += "</video>";

        newModalDialog += `<button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-2" data-bs-dismiss="modal" aria-label="Close" onclick="pauseVideo(\'video_${outerContainer.id}_${index}\')"></button>`;
        newModalDialog += "</div>";
        newModalDialog += "</div>";
        newModalDialog += "</div>";
        newModalDialog += "</div>";

        newModal.innerHTML = newModalDialog;

        return newModal;
    }

    // pagination -
    function pagination(curPage) {
        // if the pagination container doesn't exist, don't bother continuing
        if (!paginationContainer) {
            return;
        }

        var pageCount = Math.ceil(contents.length / itemsPerPage); // total pages
        const numPadding = 2; // how many numbers on either side of the current page number before we break with a "..."

        //    console.log(pageCount);

        // clear existing pagination
        paginationContainer.innerHTML = "";

        // if there's more than one page
        if (pageCount > 1) {
            const paginationUl = document.createElement("ul");
            paginationUl.classList.add("pagination", "justify-content-center");

            // if the page isn't the first page, add a previous link
            if (curPage != 1) {
                const prevLi = document.createElement("li");
                prevLi.classList.add("page-item");

                const prevLink = document.createElement("a");
                prevLink.classList.add("page-link");
                prevLink.id = "previousLink";
                prevLink.href = `#${outerContainer.id}`;
                prevLink.innerHTML =
                    '<i class="fa far fa-chevrons-left fa-2xs"></i> Previous';

                // on previous click, run the goToPage function on the current page value - 1 and update the current page value
                prevLink.addEventListener("click", (event) => {
                    event.preventDefault();
                    goToPage(curPage - 1);
                    outerContainer.scrollIntoView();
                });

                prevLi.appendChild(prevLink);
                paginationUl.appendChild(prevLi);
            }

            // build pagination numbers
            var firstEllipses = false;
            var secondEllipses = false;

            for (let i = 1; i <= pageCount; i++) {
                // if the number is within the padding of the current page, then show it
                if (
                    (curPage - numPadding <= i && i <= curPage + numPadding) ||
                    i == 1 ||
                    i == pageCount
                ) {
                    const newPageLi = document.createElement("li");
                    newPageLi.classList.add("page-item");

                    // highlight the active page number
                    if (i == curPage) {
                        newPageLi.ariaCurrent = "page";
                        newPageLi.classList.add("active");
                    }

                    // add page link to the page number
                    const newLink = document.createElement("a");
                    newLink.classList.add("page-link", "page-link-number");
                    newLink.innerHTML = i;
                    newLink.dataset.destination = i;
                    newLink.href = "#";

                    newLink.addEventListener("click", (event) => {
                        event.preventDefault();
                        goToPage(i);
                        outerContainer.scrollIntoView();
                    });

                    newPageLi.appendChild(newLink);
                    paginationUl.appendChild(newPageLi);
                } else {
                    if (!firstEllipses) {
                        if (1 < i && i < curPage - numPadding) {
                            const ellipsesLi = document.createElement("li");
                            ellipsesLi.classList.add(
                                "page-item",
                                "first-ellipses",
                            );

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
                        if (curPage + numPadding < i && i < pageCount) {
                            const ellipsesLi = document.createElement("li");
                            ellipsesLi.classList.add(
                                "page-item",
                                "second-ellipses",
                            );

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

            // if the page isn't the last page, add a next link
            if (curPage != pageCount) {
                const nextLi = document.createElement("li");
                nextLi.classList.add("page-item");

                const nextLink = document.createElement("a");
                nextLink.classList.add("page-link");
                nextLink.id = "nextLink";
                nextLink.href = "#";

                nextLink.innerHTML =
                    'Next <i class="fa far fa-chevrons-right fa-2xs"></i>';

                nextLink.addEventListener("click", (event) => {
                    event.preventDefault();
                    goToPage(curPage + 1);
                    outerContainer.scrollIntoView();
                });

                nextLi.appendChild(nextLink);
                paginationUl.appendChild(nextLi);
            }

            // replace contents of the pagination container
            paginationContainer.appendChild(paginationUl);
        }
    }

    // to use blogFilter(), set a contentsAll array, include a .filter-tags-container div with a tags that have a data-filter property to filter with

    function blogFilter() {
        contents = contentsAll;
        const filterContainer = outerContainer.getElementsByClassName(
            "filter-tags-container",
        )[0];
        let activeFilters = {
            text: "",
            categories: {},
        };

        if (!filterContainer) {
            return;
        }

        function filterContents() {
            const query = (activeFilters.text || "").toLowerCase();

            contents = contentsAll.filter((content) => {
                if (!content) {
                    return false;
                }

                const matchesText =
                    !query ||
                    (content.name &&
                        content.name.toLowerCase().includes(query)) ||
                    (content.description &&
                        content.description.toLowerCase().includes(query));

                const matchesAllCategories = Object.keys(
                    activeFilters.categories,
                ).every((key) => {
                    const selectedValue = (
                        activeFilters.categories[key] || ""
                    ).toLowerCase();

                    if (selectedValue === "all") {
                        // console.log(`No filter for ${key}, passing by default.`);
                        return true;
                    }
                    const contentValue = content[key];

                    if (Array.isArray(contentValue)) {
                        return contentValue.some(
                            (value) =>
                                value &&
                                value.name &&
                                value.name.toLowerCase() ===
                                    selectedValue.toLowerCase(),
                        );
                    }
                    return (
                        contentValue &&
                        contentValue.name &&
                        contentValue.name.toLowerCase() ===
                            selectedValue.toLowerCase()
                    );
                });
                return matchesText && matchesAllCategories;
            });

            goToPage(1);
        }

        const filterDropdowns = filterContainer.querySelectorAll(
            "select.filter-dropdown",
        );
        const filterButtons = filterContainer.querySelectorAll(
            "a.btn-blog-filter-secondary",
        );
        const searchInput = filterContainer.querySelector("input.search-input");

        if (filterDropdowns) {
            filterDropdowns.forEach(function (i) {
                // when filter dropdown is changed, assign filter, update contents variable, update pagination, and go to page 1
                i.addEventListener("change", function (event) {
                    const selectedIndex = i.selectedIndex;
                    const selectedOption = i.options[selectedIndex];
                    if (
                        selectedOption.dataset.category &&
                        selectedOption.dataset.filter &&
                        selectedOption.dataset.filter != "all"
                    ) {
                        activeFilters.categories[
                            selectedOption.dataset.category
                        ] = selectedOption.dataset.filter;
                    }
                    if (
                        selectedOption.dataset.category &&
                        selectedOption.dataset.filter &&
                        selectedOption.dataset.filter === "all"
                    ) {
                        delete activeFilters.categories[
                            selectedOption.dataset.category
                        ];
                        // console.log("deleted");
                    }
                    // console.log(activeFilters);
                    filterContents();
                    goToPage(1);
                });
            });
        }

        if (filterButtons) {
            const activeButton = filterContainer.querySelector("a.active");
            if (activeButton) {
                if (
                    activeButton.dataset.category &&
                    activeButton.dataset.filter &&
                    activeButton.dataset.filter != "all"
                ) {
                    activeFilters.categories[activeButton.dataset.category] =
                        activeButton.dataset.filter;
                }
            }

            // when filter button is clicked, switch active button, assign filter, update contents variable, update pagination, and go to page 1
            filterButtons.forEach(function (i) {
                i.addEventListener("click", function (event) {
                    event.preventDefault();
                    filterButtons.forEach(function (j) {
                        j.classList.remove("active");
                    });
                    i.classList.add("active");
                    if (
                        i.dataset.category &&
                        i.dataset.filter &&
                        i.dataset.filter != "all"
                    ) {
                        activeFilters.categories[i.dataset.category] =
                            i.dataset.filter;
                    }
                    if (
                        i.dataset.category &&
                        i.dataset.filter &&
                        i.dataset.filter === "all"
                    ) {
                        delete activeFilters.categories[i.dataset.category];
                        // console.log("deleted");
                    }
                    // console.log(activeFilters);
                    filterContents();
                    goToPage(1);
                });
            });
        }

        if (searchInput) {
            // function to debounce:
            function textSearch(value) {
                // console.log("textsearch:",value);
                activeFilters.text = value;
                filterContents();
            }

            const textSearchDebounce = debounce(textSearch, 300);

            searchInput.addEventListener("input", (e) => {
                textSearchDebounce(e.target.value);
            });
        }
    }

    // clear container, and fill with current filtered contents variable items
    // to use goToPage(), set an pagesContainer, modalContainer and an itemTemplate() and contents
    function goToPage(pageNum) {
        pagesContainer.innerHTML = "";
        if (settings.useModals && modalContainer) {
            modalContainer.innerHTML = "";
        }
        curPage = pageNum;

        const prevRange = (pageNum - 1) * itemsPerPage;
        const currRange = pageNum * itemsPerPage;

        if (contents.length > 0) {
            contents.forEach((item, index) => {
                if (!item) {
                    return;
                }
                if (index >= prevRange && index < currRange) {
                    pagesContainer.appendChild(
                        hubdbResourceTemplate(item, index),
                    );
                    if (settings.useModals && modalContainer && item.video) {
                        modalContainer.appendChild(modalTemplate(item, index));
                    }
                }
            });
        } else {
            pagesContainer.innerHTML =
                "<div class='col-12 col-md-12 col-lg-12'><p class='h2'>No results match your filters.</p></div>";
        }

        if (settings.equalHeightImages) {
            setTimeout(
                normaliseHeightsMin,
                300,
                `#${outerContainer.id} .img-normalise`,
            );
        }

        pagination(curPage);
    }

    if (settings.filterContainer) {
        blogFilter();
    }

    window.addEventListener("load", function () {
        if (document.readyState == "complete") {
            goToPage(1);
        }
    });
}




// Custom modal CTA controller (NEEDS VERIFICATION BEFORE USE)

function initCTAModal(config) {
  onBootstrapReady(function() {
    const {
      modalId,
      targeting = {},
      trigger = {},
      frequency = {},
      responsive = {},
      dateRange = {}
    } = config;

    const modalElement = document.getElementById(modalId);
    if (!modalElement) return;

    const bootstrapModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);

    const currentUrl = window.location.href;
    const storageKey = `modal_dismissed_${modalId}`;

    if (responsive.disableOnSmallScreens) {
      const mobileBreakpoint = responsive.breakpoint || 768;
      if (window.innerWidth < mobileBreakpoint) return;
    }

    if (!checkDateRange()) return;

    if (shouldSuppressModal()) return;

    if (!checkUrlTargeting()) return;

    setupCloseTracking();

    setupTrigger();

    function checkDateRange() {
      const now = Date.now();
      if (dateRange.start && now < new Date(dateRange.start).getTime()) return false;
      if (dateRange.end && now > new Date(dateRange.end).getTime()) return false;
      return true;
    }

    function checkUrlTargeting() {
      const evaluateRule = (rule, url) => {
        if (!rule) return false;
        if (rule.contains) return url.includes(rule.contains);
        if (rule.equals) return url === rule.equals;
        if (rule.beginsWith) return url.startsWith(rule.beginsWith);
        return false;
      };

      if (targeting.include && targeting.include.length > 0) {
        const hasMatch = targeting.include.some(rule => evaluateRule(rule, currentUrl));
        if (!hasMatch) return false; 
      }

      if (targeting.exclude && targeting.exclude.length > 0) {
        const hasExcludeMatch = targeting.exclude.some(rule => evaluateRule(rule, currentUrl));
        if (hasExcludeMatch) return false; 
      }
      return true;
    }

    function setStorageItem(key, value, days) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        let expires = "";
        if (days) {
          const date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = `${key}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
      }
    }

    function getStorageItem(key) {
      try {
        const item = localStorage.getItem(key);
        if (item !== null) return item;
      } catch (e) {}
      
      const nameEQ = key + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
      return null;
    }

    function shouldSuppressModal() {
      const rawRecord = getStorageItem(storageKey);
      if (!rawRecord) return false;

      if (frequency.type === 'never') return true;

      if (frequency.type === 'session') {
        try {
          if (sessionStorage.getItem(storageKey) === 'true') return true;
        } catch (e) {
          return true;
        }
      }

      if (frequency.type === 'days' && frequency.value) {
        const record = rawRecord.startsWith('{') ? JSON.parse(rawRecord) : { timestamp: parseInt(rawRecord, 10) };
        const msPassed = Date.now() - record.timestamp;
        const msRequired = frequency.value * 24 * 60 * 60 * 1000;
        return msPassed < msRequired;
      }

      return false;
    }

    function showModal() {
      bootstrapModal.show();
    }

    function setupCloseTracking() {
      modalElement.addEventListener('hidden.bs.modal', function () {
        const expiresDays = frequency.type === 'days' ? frequency.value : 365;
        setStorageItem(storageKey, JSON.stringify({ timestamp: Date.now() }), expiresDays);
        
        if (frequency.type === 'session') {
          try { sessionStorage.setItem(storageKey, 'true'); } catch(e) {}
        }
      });
    }

    function setupTrigger() {
      switch (trigger.type) {
        case 'delay':
          setTimeout(showModal, (trigger.value || 0) * 1000);
          break;

        case 'click':
          const targetBtn = document.querySelector(trigger.value);
          if (targetBtn) targetBtn.addEventListener('click', showModal);
          break;

        case 'scroll':
          const handleScroll = () => {
            const scrollPct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPct >= (trigger.value || 50)) {
              showModal();
              window.removeEventListener('scroll', handleScroll);
            }
          };
          window.addEventListener('scroll', handleScroll);
          break;

        case 'exit':
          const handleExit = (e) => {
            if (e.clientY < 20) {
              showModal();
              document.removeEventListener('mouseleave', handleExit);
            }
          };
          document.addEventListener('mouseleave', handleExit);
          break;

        case 'inactivity':
          let idleTimer;
          const resetTimer = () => {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(showModal, (trigger.value || 30) * 1000);
          };
          ['mousemove', 'keydown', 'click', 'scroll'].forEach(evt => {
            document.addEventListener(evt, resetTimer, { passive: true });
          });
          resetTimer();
          break;
          
        default:
          showModal();
      }
    }
  });
}

function elHeightListener(cssSelector = "body > .header-wrapper", cssVar = "--q-header-height") {
    const trackedElement = document.querySelector(cssSelector);
    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            let height = entry.borderBoxSize 
                ? entry.borderBoxSize[0].blockSize 
                : entry.target.getBoundingClientRect().height;
            document.documentElement.style.setProperty(cssVar, `${height}px`);
        }
    });

    if (trackedElement) {
        resizeObserver.observe(trackedElement);
    }
}

// sticky table header js

function stickyTableHeader() {
    const wraps = document.querySelectorAll('.sticky-table-header');
    
    elHeightListener("body > .header-wrapper", "--q-header-height");
    
    function onscroll() {
        for (let i = 0; i < wraps.length; i++) {
            const wrap = wraps[i];
            const headerRow = wrap.querySelector('thead tr');
            if (!headerRow) continue;

            const rect = wrap.getBoundingClientRect();
            const headerHeight = headerRow.offsetHeight;
            const maxOffset = Math.max(wrap.offsetHeight - headerHeight, 0);

            let offset = 0;
            if (rect.top < 0) {
                offset = Math.min(-rect.top, maxOffset);
            }

            const cells = headerRow.children;
            const transformValue = offset ? 'translateY(calc(var(--q-header-height) + ' + offset + 'px))' : '';
            for (let j = 0; j < cells.length; j++) {
                cells[j].style.transform = transformValue;
            }
        }
    }

    onscroll();
    window.addEventListener('scroll', onscroll);
    window.addEventListener('resize', onscroll);
}

// sticky scrollbar

function stickyScrollbar() {
    const scrollbar = document.createElement('div');
    scrollbar.id = 'stickyScrollbar';
    const fakecontent = document.createElement('div');
    scrollbar.appendChild(fakecontent);
    document.body.appendChild(scrollbar);

    scrollbar.style.display = 'none';
    scrollbar.style.overflowX = 'auto';
    scrollbar.style.position = 'fixed';
    scrollbar.style.width = '100%';
    scrollbar.style.bottom = '0';

    function offsetTop(el) {
        return el.getBoundingClientRect().top + window.pageYOffset;
    }

    function offsetLeft(el) {
        return el.getBoundingClientRect().left + window.pageXOffset;
    }

    function top(el) {
        return offsetTop(el);
    }

    function bottom(el) {
        return offsetTop(el) + el.offsetHeight;
    }

    let active = null;

    function findActive() {
        scrollbar.style.display = '';
        let found = null;

        const candidates = document.querySelectorAll('.sticky-scrollbar');
        for (let i = 0; i < candidates.length; i++) {
            const el = candidates[i];
            if (top(el) < top(scrollbar) && bottom(el) > bottom(scrollbar)) {
                fakecontent.style.width = el.scrollWidth + 'px';
                fakecontent.style.height = '1px';
                found = el;
            }
        }

        fit(found);
        return found;
    }

    function fit(el) {
        if (!el) {
            scrollbar.style.display = 'none';
            return;
        }
        scrollbar.style.left = offsetLeft(el) + 'px';
        scrollbar.style.width = el.offsetWidth + 'px';
        fakecontent.style.width = el.scrollWidth + 'px';
        fakecontent.style.height = '1px';
        lastScroll = undefined;
    }

    function onscroll() {
        let oldactive = active;
        active = findActive();

        if (oldactive && oldactive !== active) {
            oldactive.removeEventListener('scroll', update);
        }
        if (active && active !== oldactive) {
            active.addEventListener('scroll', update);
        }

        update();
    }

    let lastScroll;

    function scroll() {
        if (!active) return;
        if (scrollbar.scrollLeft === lastScroll) return;
        lastScroll = scrollbar.scrollLeft;
        active.scrollLeft = lastScroll;
    }

    function update() {
        if (!active) return;
        if (active.scrollLeft === lastScroll) return;
        lastScroll = active.scrollLeft;
        scrollbar.scrollLeft = lastScroll;
    }

    scrollbar.addEventListener('scroll', scroll);

    onscroll();
    window.addEventListener('scroll', onscroll);
    window.addEventListener('resize', onscroll);
}
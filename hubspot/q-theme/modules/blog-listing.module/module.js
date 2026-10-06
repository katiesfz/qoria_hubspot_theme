(function () {

const BLOG_LISTING_DEFAULTS = {
    postsPerPage: 6,
    cardColourSeq: [],
    filterEnabled: true,
    equalHeights: true,
    minuteRead: " minute read",
    showTag: true,
};


function videoUrl(postBody) {
    const regex = /(?!end_module_block)(?!video_file)https.*?(?=\")(?!end_module_block)/gi;
    const videoURL = postBody.match(regex)[0];
    return videoURL;
}


function blogListing(containerId, blogPostsObj, settings = {}) {
    // settings: merge supplied fields.json-driven settings with fallbacks for null/undefined values
    const config = {
        postsPerPage: settings.postsPerPage ?? BLOG_LISTING_DEFAULTS.postsPerPage,
        cardColourSeq: settings.cardColourSeq ?? BLOG_LISTING_DEFAULTS.cardColourSeq,
        filterEnabled: settings.filterEnabled ?? BLOG_LISTING_DEFAULTS.filterEnabled,
        equalHeights: settings.equalHeights ?? BLOG_LISTING_DEFAULTS.equalHeights,
        minuteRead: settings.minuteRead ?? BLOG_LISTING_DEFAULTS.minuteRead,
        showTag: settings.showTag ?? BLOG_LISTING_DEFAULTS.showTag,
    };

    // init:
    // resolve video URLs client-side (avoids depending on a cross-file videoUrl() call at render time)
    const parsedPosts = JSON.parse(blogPostsObj);
    parsedPosts.forEach((item) => {
        if (item.has_video === "true" && item.post_body) {
            item.video_url = videoUrl(item.post_body);
        }
    });
    const contentsAll = JSON.stringify(parsedPosts);
    let contents = contentsAll;
    const itemsPerPage = config.postsPerPage;
    const outerContainer = document.getElementById(containerId);
    const elementContainer =
        outerContainer.getElementsByClassName("pages-container")[0];
    const paginationContainer = outerContainer.getElementsByClassName(
        "pagination-container",
    )[0];
    let curPage = 1;

    // add the configured card colour classes to an element
    function applyCardColourClasses(element, cardColourSeq) {
        cardColourSeq.forEach((colourClass) => {
            element.classList.add(colourClass);
        });
    }

    // build the shared "length/minute read + author" metadata row markup
    function buildMetadataRow(blog, minuteRead) {
        let metadataRow = '<div class="row metadata mb-3">';

        if (minuteRead != "") {
            metadataRow += '<div class="col text-start">';
            if (!(blog.has_video == "true" && blog.length == "0")) {
                metadataRow +=
                    '<p class="small text-secondary fw-semibold"><i class="fa fas fa-pencil me-1"></i>' +
                    blog.length +
                    minuteRead +
                    "</p>";
            }
            metadataRow += "</div>";
        }

        if (blog.author_name) {
            metadataRow += '<div class="col text-end">';
            metadataRow +=
                '<p class="small text-secondary fw-semibold">' +
                blog.author_name +
                "</p>";
            metadataRow += "</div>";
        }

        metadataRow += "</div>";
        return metadataRow;
    }

    // build the shared featured image + content-type-tag markup
    function buildFeaturedImageBlock(blog, showTag) {
        if (!blog.featured_image) return "";

        let featuredImageBlock =
            '<div class="featured-image-container mb-4 position-relative">';
        featuredImageBlock +=
            '<img src="' +
            blog.featured_image +
            '" alt="' +
            blog.name +
            '" class="rounded featured-image object-fit-cover">';

        if (showTag) {
            featuredImageBlock +=
                '<div class="content-type-tag ' +
                blog.type_colour +
                '">' +
                blog.type +
                "</div>";
        }

        featuredImageBlock += "</div>";
        return featuredImageBlock;
    }

    // print single blog post
    function itemTemplate(blog) {
        const newCol = document.createElement("div");
        newCol.classList.add("col");

        const newPost = document.createElement("div");
        let newContent = "";

        newPost.classList.add(
            "p-3",
            "single-blog",
            "border",
            "border-dark-subtle",
            "h-100",
            "position-relative",
        );

        applyCardColourClasses(newPost, config.cardColourSeq);

        newContent += buildFeaturedImageBlock(blog, config.showTag);
        newContent += buildMetadataRow(blog, config.minuteRead);

        // print name
        newContent += '<h5 class="fw-semibold">' + blog.name + "</h5>";

        // print description
        if (blog.description) {
            newContent += '<p class="mb-0">' + blog.description + "</p>";
        }

        // print link
        newContent +=
            '<a href="' +
            blog.absolute_url +
            '" class="text-reset fw-semibold text-decoration-none stretched-link mt-3"></a>';

        newPost.innerHTML = newContent;

        newCol.append(newPost);

        return newCol;
    }

    // print single pullout post
    function pulloutTemplate(blog) {
        const newCol = document.createElement("div");
        newCol.classList.add("col");

        const newPullout = document.createElement("div");
        let newContent = "";

        const bgClass = "bg-image-" + blog.id;
        newPullout.classList.add(
            "p-3",
            "p-md-5",
            "content-container",
            "bg-image-faded",
            bgClass,
            "pb-md-8",
            "pt-md-6",
            "h-100",
            "position-relative",
        );
        if (blog.background_colour) {
            const bgColourClasses = blog.background_colour.split(" ");
            for (let i = 0; i < bgColourClasses.length; i++) {
                newPullout.classList.add(bgColourClasses[i]);
            }
        }
        newContent +=
            '<div class="position-relative d-flex h-100 flex-column justify-content-center">';

        // print preheading
        newContent +=
            '<p class="mb-3"><strong>' + blog.pre_heading + "</strong></p>";

        // print type and title
        newContent +=
            '<h4 class="fw-bold"><span class="fw-normal">' +
            blog.type +
            ":</span><br>" +
            blog.name +
            "</h4>";

        // print description
        if (blog.description) {
            newContent += '<p class="my-3">' + blog.description + "</p>";
        }

        // print author

        if (blog.author) {
            newContent += "<p><strong>By " + blog.author + "</strong></p>";
        }

        // print link
        newContent +=
            '<a href="' + blog.absolute_url + '" class="stretched-link"></a>';

        newContent += "</div>";

        newPullout.innerHTML = newContent;

        newCol.append(newPullout);

        return newCol;
    }

    // print blog in card style
    function blogCardTemplate(blog) {
        const newCol = document.createElement("div");
        newCol.classList.add("col");

        const newCard = document.createElement("div");
        let newContent = "";

        newCard.classList.add(
            "position-relative",
            "p-4",
            "single-blog",
            "h-100",
        );

        applyCardColourClasses(newCard, config.cardColourSeq);

        newContent += buildFeaturedImageBlock(blog, config.showTag);
        newContent += buildMetadataRow(blog, config.minuteRead);

        // print name
        newContent += '<h5 class="fw-semibold">' + blog.name + "</h5>";

        // print description
        if (blog.description) {
            newContent += '<p class="mb-0">' + blog.description + "</p>";
        }

        // print link
        newContent +=
            '<a href="' +
            blog.absolute_url +
            '" class="text-reset fw-semibold text-decoration-none stretched-link mt-3"></a>';

        newCard.innerHTML = newContent;

        newCol.append(newCard);

        return newCol;
    }

    // print single video post
    function videoTemplate(blog) {
        const newCol = document.createElement("div");
        newCol.classList.add("col");

        const newVideo = document.createElement("div");
        let newContent = "";

        newVideo.classList.add("position-relative");

        applyCardColourClasses(newVideo, config.cardColourSeq);

        // thumbnail
        newContent += '<div class="thumbnail position-relative mb-4">';
        // featured image
        if (blog.featured_image) {
            const featuredImage = document.createElement("img");
            featuredImage.src = blog.featured_image;
            featuredImage.classList.add(
                "featured-image",
                "img-fluid",
                "object-fit-cover",
            );
            featuredImage.alt = blog.name;
            newContent += featuredImage.outerHTML;

            // add play button
            const playButton = document.createElement("div");
            playButton.classList.add(
                "play-button",
                "play-button-dark",
                "position-absolute",
                "top-50",
                "start-50",
                "translate-middle",
            );
            const playButtonInner = document.createElement("div");
            playButtonInner.classList.add(
                "w-100",
                "h-100",
                "position-absolute",
            );
            playButtonInner.dataset.bsToggle = "modal";
            playButtonInner.dataset.bsTarget = "#videoModal-" + blog.id;

            playButton.append(playButtonInner);
            newContent += playButton.outerHTML;
        }
        newContent += "</div>";

        // print description
        const newVidDesc = document.createElement("div");
        newVidDesc.classList.add("text-dark", "video-description", "p-2");

        // add watch time
        newVidDesc.innerHTML +=
            '<span class="x-small text-dark text-opacity-50 fw-bold"><span id="duration-' +
            blog.id +
            '"></span> min watch</span>';
        // add name
        newVidDesc.innerHTML += '<h5 class="fw-bold">' + blog.name + "</h5>";

        newContent += newVidDesc.outerHTML;

        newVideo.innerHTML = newContent;

        newCol.append(newVideo);

        return newCol;
    }

    function videoModal(blog) {
        const modalFragment = new DocumentFragment();

        const newModal = document.createElement("div");
        newModal.classList.add("modal", "fade");
        newModal.id = "videoModal-" + blog.id;
        newModal.tabIndex = "-1";
        newModal.setAttribute("aria-labelledby", "videoModal-" + blog.id);
        newModal.setAttribute("aria-hidden", "true");

        const newModalDialog = document.createElement("div");
        newModalDialog.classList.add(
            "modal-dialog",
            "modal-lg",
            "modal-dialog-centered",
        );

        const newModalContent = document.createElement("div");
        newModalContent.classList.add("modal-content", "overflow-hidden");

        const newModalBody = document.createElement("div");
        newModalBody.classList.add("modal-body", "p-0");

        const newModalBodyInner = document.createElement("div");
        newModalBodyInner.classList.add("position-relative");

        const newModalVideoContainer = document.createElement("div");
        newModalVideoContainer.id = "videoContainer-" + blog.id;

        const newVid = document.createElement("video");
        newVid.id = "video-" + blog.id;
        newVid.classList.add("d-block");
        newVid.style.width = "100%";

        const newSource = document.createElement("source");
        newSource.src = blog.video_url;

        newVid.append(newSource);
        newVid.append("Your browser does not support the video tag.");

        newVid.addEventListener("loadedmetadata", function () {
            const durSpan = document.getElementById("duration-" + blog.id);
            const duration = newVid.duration;
            durSpan.innerText = Math.ceil(duration / 60);
        });

        newModalVideoContainer.append(newVid);

        const newModalCloseButton = document.createElement("button");
        newModalCloseButton.setAttribute("type", "button");
        newModalCloseButton.classList.add(
            "btn-close",
            "btn-close-white",
            "position-absolute",
            "top-0",
            "end-0",
            "m-2",
        );
        newModalCloseButton.dataset.bsDismiss = "modal";
        newModalCloseButton.setAttribute("aria-label", "Close");
        newModalCloseButton.addEventListener("click", function () {
            pauseVideo("video-" + blog.id);
        });

        newModalBodyInner.append(newModalVideoContainer);
        newModalBodyInner.append(newModalCloseButton);

        newModalBody.append(newModalBodyInner);

        newModalContent.append(newModalBody);

        newModalDialog.append(newModalContent);

        newModal.append(newModalDialog);
        newModal.addEventListener("shown.bs.modal", () => {
            playVideo(newVid.id);
        });

        modalFragment.append(newModal);

        return modalFragment;
    }

    // build a single pagination ellipsis list item
    function createEllipsisItem(className) {
        const ellipsesLi = document.createElement("li");
        ellipsesLi.classList.add("page-item", className);

        const ellipses = document.createElement("span");
        ellipses.classList.add("page-link");
        ellipses.innerHTML = "...";

        ellipsesLi.appendChild(ellipses);

        return ellipsesLi;
    }

    // pagination -
    function pagination(curPage) {
        // if the pagination container doesn't exist, don't bother continuing
        if (!paginationContainer) {
            // console.log("no pagination container");
            return;
        }

        const pageCount = Math.ceil(JSON.parse(contents).length / itemsPerPage); // total pages

        const numPadding = 2; // how many numbers on either side of the current page number before we break with a "..."

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
                prevLink.href = "#";
                prevLink.innerHTML =
                    '<i class="fa far fa-chevrons-left fa-2xs"></i> Previous';

                // on previous click, run the goToPage function on the current page value - 1 and update the current page value
                prevLink.addEventListener("click", () => {
                    event.preventDefault();
                    goToPage(curPage - 1);
                });

                prevLi.appendChild(prevLink);
                paginationUl.appendChild(prevLi);
            }

            // build pagination numbers
            let firstEllipses = false;
            let secondEllipses = false;

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

                    newLink.addEventListener("click", () => {
                        event.preventDefault();
                        goToPage(i);
                    });

                    newPageLi.appendChild(newLink);
                    paginationUl.appendChild(newPageLi);
                } else {
                    if (!firstEllipses) {
                        if (1 < i && i < curPage - numPadding) {
                            paginationUl.appendChild(
                                createEllipsisItem("first-ellipses"),
                            );
                            firstEllipses = true;
                            continue;
                        }
                    }

                    if (!secondEllipses) {
                        if (curPage + numPadding < i && i < pageCount) {
                            paginationUl.appendChild(
                                createEllipsisItem("second-ellipses"),
                            );
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

                nextLink.addEventListener("click", () => {
                    event.preventDefault();
                    //    console.log("next");
                    goToPage(curPage + 1);
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
        let activeFilter = document.querySelector(
            ".filter-tags-container .active",
        ).dataset.filter;
        const filterButtons = document.querySelectorAll(
            ".filter-tags-container a",
        );

        // when filter button is clicked, switch active button, assign filter, update contents variable, update pagination, and go to page 1
        filterButtons.forEach(function (i) {
            i.addEventListener("click", function () {
                event.preventDefault();
                filterButtons.forEach(function (j) {
                    j.classList.remove("active");
                });
                i.classList.add("active");
                activeFilter = i.dataset.filter;
                filterContents(activeFilter);
                goToPage(1);
            });
        });

        // filter contents to active filter
        function filterContents(filter) {
            contents = JSON.stringify(
                JSON.parse(contentsAll).filter(function (el) {
                    if (filter == "all") {
                        return true;
                    } else {
                        return el.tag_slugs.includes(filter);
                    }
                }),
            );
        }
    }

    // clear container, and fill with current filtered contents variable items
    // to use goToPage(), set an elementContainer and an itemTemplate() and contents
    function goToPage(pageNum) {
        elementContainer.innerHTML = "";
        curPage = pageNum;
        outerContainer.scrollIntoView({ behavior: "smooth", block: "start" });

        const prevRange = (pageNum - 1) * itemsPerPage;
        const currRange = pageNum * itemsPerPage;

        JSON.parse(contents).forEach((item, index) => {
            if (index >= prevRange && index < currRange) {
                if (item.pullout == "true") {
                    elementContainer.appendChild(pulloutTemplate(item));
                    return;
                }
                if (item.card_style == "blog_post") {
                    elementContainer.appendChild(itemTemplate(item));
                    return;
                }
                if (item.card_style == "blog_card") {
                    elementContainer.appendChild(blogCardTemplate(item));
                    return;
                }
                if (item.card_style == "video") {
                    if (item.has_video == "true") {
                        elementContainer.appendChild(videoTemplate(item));
                        elementContainer.append(videoModal(item)); // MODAL FUNCTION HERE
                    } else {
                        elementContainer.appendChild(itemTemplate(item));
                    }
                    return;
                }
                elementContainer.appendChild(itemTemplate(item));
            }
        });

        if (config.equalHeights == true) {
            setTimeout(
                normaliseHeights,
                300,
                containerId + " .single-blog .featured-image",
            );
        }
        pagination(curPage);
    }

    if (config.filterEnabled == true) {
        blogFilter();
    }

    goToPage(1);

    if (config.equalHeights == true) {
        window.onresize = function () {
            normaliseHeights(containerId + " .single-blog .featured-image");
        };

        window.onload = function () {
            normaliseHeights(containerId + " .single-blog .featured-image");
        };

        screen.orientation.onchange = function () {
            normaliseHeights(containerId + " .single-blog .featured-image");
        };
    }
}

// find every blog-listing instance rendered on the page and initialize it
function initBlogListings() {
    document
        .querySelectorAll(".js-blog-listing[data-blog-listing-config]")
        .forEach((container) => {
            if (container.dataset.blogListingInitialized) return;
            container.dataset.blogListingInitialized = "true";

            const settings = JSON.parse(container.dataset.blogListingConfig);
            const dataScript = document.getElementById(
                container.dataset.blogpostsId,
            );
            const blogPostsObj = dataScript ? dataScript.textContent : "[]";

            blogListing(container.id, blogPostsObj, settings);
        });
}

window.addEventListener("load", initBlogListings);

})();

// Detects which site is currently loaded from the browser's own hostname.
// This runs entirely client-side, so it carries none of the HubL "request.*"
// caching cost - it just returns undefined on domains not listed (e.g.
// HubSpot preview/sandbox domains), in which case the modal never fires.
// A "debugRegion" query param overrides this, for testing on those domains.
function getCurrentRegion() {
    const debugRegion = new URLSearchParams(window.location.search).get("debugRegion")?.toUpperCase();
    if (debugRegion && window.regionDestinations && debugRegion in window.regionDestinations) {
        return debugRegion;
    }

    const hostname = window.location.hostname;
    return Object.keys(window.regionDestinations || {}).filter(function (region) {
        return hostname.indexOf(window.regionDestinations[region]?.domain) !== -1;
    })[0];
}

// Regional redirect modal.
// The location check is only ever run when the "closedRegionModal" cookie
// hasn't been set to "true" - once a visitor has dismissed the modal, this
// never fires again and no lookup request is made.
//
// To test: append ?debugRegion=au&debugCountry=nz to any page URL to force
// the "au" ruleset and simulate a visitor from "nz", skipping the geo-lookup
// fetch entirely. Using either debug param also bypasses the closed-modal
// cookie, so the same URL can be reloaded repeatedly while testing.
function initRegionRedirectModal(geoLookupUrl) {
    const params = new URLSearchParams(window.location.search);
    const isDebugging = params.has("debugRegion") || params.has("debugCountry");

    if (!isDebugging && getCookie("closedRegionModal") === "true") {
        return;
    }

    const currentRegion = getCurrentRegion();
    if (!currentRegion) {
        return;
    }

    const debugCountry = params.get("debugCountry")?.toUpperCase();
    const countryPromise = debugCountry
        ? Promise.resolve(debugCountry)
        : fetch(geoLookupUrl || "/geo-lookup", { credentials: "omit" })
            .then(function (response) { return response.text(); })
            .then(function (html) {
                const el = new DOMParser().parseFromString(html, "text/html").getElementById("geo-country");
                return el ? el.textContent.toUpperCase() : "";
            });

    countryPromise
        .then(function (visitorCountry) {
            visitorCountry = visitorCountry.trim().toUpperCase();

            const destinationRules = window.regionRedirectRules && window.regionRedirectRules[visitorCountry];
            if (!destinationRules) {
                return;
            }

            const destinationKey = destinationRules["redirect_to"];
            const customMessage = destinationRules["custom_message"];

            const destination = destinationKey && destinationKey !== currentRegion && window.regionDestinations
                ? window.regionDestinations[destinationKey]
                : null;
            const curSite = currentRegion && window.regionDestinations
                ? window.regionDestinations[currentRegion]
                : null;

            if (destination && curSite) {
                showRegionRedirectModal(destination, curSite, customMessage, currentRegion);
            }
        })
        .catch(function () {});
}

// Fires the region-redirect custom behavioral event (see the eventId field
// in window.regionDestinations, region-redirect-rules.js). No-ops until a
// real event ID has been configured for the current region.
function trackRegionRedirectEvent(currentRegion, redirected, destinationDomain) {
    const eventId = window.regionDestinations && window.regionDestinations[currentRegion]?.eventId;
    if (!eventId) {
        return;
    }

    window._hsq = window._hsq || [];
    window._hsq.push(["trackCustomBehavioralEvent", {
        name: eventId,
        properties: {
            redirected: redirected ? "true" : "false",
            destination: destinationDomain
        }
    }]);
}

function showRegionRedirectModal(match, curSite, customMessage, currentRegion) {
    const modalEl = document.getElementById("regionModal");
    if (!modalEl) {
        return;
    }

    // Change HTML if the option is there
    if (customMessage && window.regionCustomMessage[customMessage]) {
         modalEl.querySelector(".modal-body").innerHTML = window.regionCustomMessage[customMessage];
    }


    modalEl.querySelectorAll("[data-region-name]").forEach(function (el) {
        el.textContent = match.label;
    });
    modalEl.querySelectorAll("[data-region-link]").forEach(function (el) {
        el.setAttribute("href", match.url);
        el.addEventListener("click", function () {
            trackRegionRedirectEvent(currentRegion, true, match.domain);
        });
    });
    modalEl.querySelectorAll("[data-site-name]").forEach(function (el) {
        el.textContent = curSite.site_name;
    });
    modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(function (el) {
        el.addEventListener("click", function () {
            trackRegionRedirectEvent(currentRegion, false, match.domain);
        });
    });


    onBootstrapReady(function () {
        new bootstrap.Modal(modalEl).show();
    });
}

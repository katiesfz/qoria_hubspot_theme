// Detects which site is currently loaded from the browser's own hostname.
// This runs entirely client-side, so it carries none of the HubL "request.*"
// caching cost - it just returns undefined on domains not listed (e.g.
// HubSpot preview/sandbox domains), in which case the modal never fires.
// A "debugRegion" query param overrides this, for testing on those domains.
function getCurrentRegion() {
    const debugRegion = new URLSearchParams(window.location.search).get("debugRegion");
    if (debugRegion && window.regionDomains && debugRegion in window.regionDomains) {
        return debugRegion;
    }

    const hostname = window.location.hostname;
    return Object.keys(window.regionDomains || {}).filter(function (region) {
        return hostname.indexOf(window.regionDomains[region]) !== -1;
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

    const debugCountry = params.get("debugCountry");
    const countryPromise = debugCountry
        ? Promise.resolve(debugCountry)
        : fetch(geoLookupUrl || "/geo-lookup", { credentials: "omit" })
            .then(function (response) { return response.text(); })
            .then(function (html) {
                const el = new DOMParser().parseFromString(html, "text/html").getElementById("geo-country");
                return el ? el.textContent : "";
            });

    countryPromise
        .then(function (visitorCountry) {
            visitorCountry = visitorCountry.trim().toLowerCase();

            const rules = (window.regionRedirectRules && window.regionRedirectRules[currentRegion]) || {};
            const destinationKey = rules[visitorCountry];
            const destination = destinationKey && window.regionDestinations
                ? window.regionDestinations[destinationKey]
                : null;

            if (destination) {
                showRegionRedirectModal(destination);
            }
        })
        .catch(function () {});
}

function showRegionRedirectModal(match) {
    const modalEl = document.getElementById("regionModal");
    if (!modalEl) {
        return;
    }

    modalEl.querySelectorAll("[data-region-name]").forEach(function (el) {
        el.textContent = match.label;
    });
    modalEl.querySelectorAll("[data-region-link]").forEach(function (el) {
        el.setAttribute("href", match.url);
    });

    onBootstrapReady(function () {
        new bootstrap.Modal(modalEl).show();
    });
}

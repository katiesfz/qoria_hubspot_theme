// Which region each site's own domain belongs to, used to detect the
// current site from location.hostname without needing a per-theme override.
window.regionDomains = {
    au: "linewize.io",
    nz: "linewize.co.nz",
    uk: "smoothwall.com",
    us: "linewize.com"
};

// Where a redirect offer for a given country should point to. Defined once
// here and referenced by country code below, rather than repeated per site.
window.regionDestinations = {
    au: { label: "Australia", url: "https://www.linewize.io/" },
    nz: { label: "New Zealand", url: "https://linewize.co.nz/" },
    uk: { label: "UK", url: "https://smoothwall.com/" },
    us: { label: "US", url: "https://www.linewize.com/" }
};

// Regional redirect rules, grouped by the site the visitor is currently on.
// For each site, maps a detected visitor country to the regionDestinations
// key to offer - the two don't have to match, so a country with no site of
// its own (e.g. India) can still be pointed at an existing destination.
window.regionRedirectRules = {
    au: { nz: "nz", us: "us" },
    nz: { au: "au", us: "us", in: "au" },
    uk: { au: "au", nz: "nz", in: "au" },
    us: { au: "au", nz: "nz", in: "au" }
};

// Where a redirect offer for a given country should point to. Defined once
// here and referenced by country code below, rather than repeated per site.
//
// eventId is the internal name of the HubSpot custom behavioral event to
// fire when the redirect modal is shown on this region's own site (looked
// up by the visitor's *current* region, not the destination they're offered
// - it's unused on an entry when that entry is only acting as a
// destination). Each region's site is deployed to a different HubSpot
// account (LW-ANZ, LW-US, SMW-UK) and custom behavioral events are scoped
// per portal, so each eventId must be the event's internal name from that
// portal (e.g. "pe12345678_region_redirect") - replace the placeholders
// below once the event has been created in each portal's
// Reporting > Events > Custom Behavioral Events, with a boolean
// "redirected" property and a string "destination" property.
window.regionDestinations = {
    AU: { label: "Linewize Asia Pacific", domain: "linewize.io", url: "https://www.linewize.io/", site_name: "Linewize", eventId: "pe7977292_localisation_redirect_modal_closed" },
    NZ: { label: "Linewize New Zealand", domain: "linewize.co.nz", url: "https://linewize.co.nz/", site_name: "Linewize", eventId: "pe7977292_localisation_redirect_modal_closed" },
    GB: { label: "Smoothwall", domain: "smoothwall.com", url: "https://smoothwall.com/", site_name: "Smoothwall", eventId: "pe4139239_localisation_redirect_modal_closed" },
    US: { label: "Linewize", domain: "linewize.com", url: "https://www.linewize.com/", site_name: "Linewize", eventId: "pe5840292_localisation_redirect_modal_closed" },
    ES: { label: "Qoria ES", domain: "qoria.es", url: "https://qoria.es", site_name: "Qoria", eventId: "pe4139239_localisation_redirect_modal_closed" },
    EU: { label: "Qoria EU", domain: "qoria.eu", url: "https://qoria.eu", site_name: "Qoria", eventId: "pe4139239_localisation_redirect_modal_closed" }
};

window.regionCustomMessage = {
    AsiaPacific: `<p class="h3" dir="ltr"><strong>Looks like you’re visiting from Asia Pacific</strong></p>
                <p class="lead" dir="ltr">Schools in your region are supported by Linewize. Would you like to visit the <span data-region-name></span> website?</p>`,
    ES: ``
}

// Maps a detected visitor country to the regionDestinations key to offer -
// the two don't have to match, so a country with no site of its own (e.g.
// India) can still be pointed at an existing destination. Applies the same
// regardless of which site the visitor is currently on; a site is simply
// never offered a redirect to itself. 
// Test with ?debugRegion=au&debugCountry=nz, debugRegion being the region
// of the current site, and debugCountry being the visitor's country
window.regionRedirectRules = {
    AU: { 
        redirect_to: "AU"
    },
    NZ: { 
        redirect_to: "NZ",
    },
    US: { 
        redirect_to: "US",
    },
    PR: { redirect_to: "US" },
    VI: { redirect_to: "US" },
    GB: { 
        redirect_to: "GB",
    },
    IN: { 
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    BD: { 
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    BT: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    BN: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    KH: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    CN: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    HK: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    ID: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    JP: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    LA: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    MO: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    MY: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    MV: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    MN: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    MM: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    NP: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    KP: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    PH: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    SG: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    KR: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    LK: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    TW: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    TH: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    TL: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    VN: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    FJ: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    KI: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    MH: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    NR: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    PW: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    PG: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    WS: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    SB: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    TO: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    TV: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    VU: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    AS: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    CK: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    PF: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    GU: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    NC: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    NU: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    MP: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    NF: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    TK: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    WF: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    FM: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    CX: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    CC: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },
    PN: {
        custom_message: "AsiaPacific",
        redirect_to: "AU"
    },

    // Qoria.es - Spain & Spanish-speaking Latin America
    ES: { redirect_to: "ES" },
    BZ: { redirect_to: "ES" },
    CR: { redirect_to: "ES" },
    SV: { redirect_to: "ES" },
    GT: { redirect_to: "ES" },
    HN: { redirect_to: "ES" },
    NI: { redirect_to: "ES" },
    PA: { redirect_to: "ES" },
    AG: { redirect_to: "ES" },
    BS: { redirect_to: "ES" },
    BB: { redirect_to: "ES" },
    CU: { redirect_to: "ES" },
    DM: { redirect_to: "ES" },
    DO: { redirect_to: "ES" },
    GD: { redirect_to: "ES" },
    HT: { redirect_to: "ES" },
    JM: { redirect_to: "ES" },
    KN: { redirect_to: "ES" },
    LC: { redirect_to: "ES" },
    VC: { redirect_to: "ES" },
    TT: { redirect_to: "ES" },
    AI: { redirect_to: "ES" },
    AW: { redirect_to: "ES" },
    BM: { redirect_to: "ES" },
    VG: { redirect_to: "ES" },
    KY: { redirect_to: "ES" },
    CW: { redirect_to: "ES" },
    GP: { redirect_to: "ES" },
    MQ: { redirect_to: "ES" },
    MS: { redirect_to: "ES" },
    SX: { redirect_to: "ES" },
    TC: { redirect_to: "ES" },
    AR: { redirect_to: "ES" },
    BO: { redirect_to: "ES" },
    CL: { redirect_to: "ES" },
    CO: { redirect_to: "ES" },
    EC: { redirect_to: "ES" },
    PY: { redirect_to: "ES" },
    PE: { redirect_to: "ES" },
    UY: { redirect_to: "ES" },
    VE: { redirect_to: "ES" },

    // Brazil, Guyana, Suriname and French Guiana aren't Spanish-speaking
    BR: { redirect_to: "EU" },
    GF: { redirect_to: "EU" },
    GY: { redirect_to: "EU" },
    SR: { redirect_to: "EU" },

    // Qoria.eu - rest of Europe, Africa & Middle East
    AL: { redirect_to: "EU" },
    AD: { redirect_to: "EU" },
    AT: { redirect_to: "EU" },
    BY: { redirect_to: "EU" },
    BE: { redirect_to: "EU" },
    BA: { redirect_to: "EU" },
    BG: { redirect_to: "EU" },
    HR: { redirect_to: "EU" },
    CY: { redirect_to: "EU" },
    CZ: { redirect_to: "EU" },
    DK: { redirect_to: "EU" },
    EE: { redirect_to: "EU" },
    FI: { redirect_to: "EU" },
    FR: { redirect_to: "EU" },
    DE: { redirect_to: "EU" },
    GR: { redirect_to: "EU" },
    HU: { redirect_to: "EU" },
    IS: { redirect_to: "EU" },
    IE: { redirect_to: "EU" },
    IT: { redirect_to: "EU" },
    XK: { redirect_to: "EU" },
    LV: { redirect_to: "EU" },
    LI: { redirect_to: "EU" },
    LT: { redirect_to: "EU" },
    LU: { redirect_to: "EU" },
    MT: { redirect_to: "EU" },
    MD: { redirect_to: "EU" },
    MC: { redirect_to: "EU" },
    ME: { redirect_to: "EU" },
    NL: { redirect_to: "EU" },
    MK: { redirect_to: "EU" },
    NO: { redirect_to: "EU" },
    PL: { redirect_to: "EU" },
    PT: { redirect_to: "EU" },
    RO: { redirect_to: "EU" },
    RU: { redirect_to: "EU" },
    SM: { redirect_to: "EU" },
    RS: { redirect_to: "EU" },
    SK: { redirect_to: "EU" },
    SI: { redirect_to: "EU" },
    SE: { redirect_to: "EU" },
    CH: { redirect_to: "EU" },
    UA: { redirect_to: "EU" },
    VA: { redirect_to: "EU" },
    GI: { redirect_to: "EU" },
    DZ: { redirect_to: "EU" },
    AO: { redirect_to: "EU" },
    BJ: { redirect_to: "EU" },
    BW: { redirect_to: "EU" },
    BF: { redirect_to: "EU" },
    BI: { redirect_to: "EU" },
    CV: { redirect_to: "EU" },
    CM: { redirect_to: "EU" },
    CF: { redirect_to: "EU" },
    TD: { redirect_to: "EU" },
    KM: { redirect_to: "EU" },
    CG: { redirect_to: "EU" },
    CD: { redirect_to: "EU" },
    DJ: { redirect_to: "EU" },
    EG: { redirect_to: "EU" },
    GQ: { redirect_to: "EU" },
    ER: { redirect_to: "EU" },
    SZ: { redirect_to: "EU" },
    ET: { redirect_to: "EU" },
    GA: { redirect_to: "EU" },
    GM: { redirect_to: "EU" },
    GH: { redirect_to: "EU" },
    GN: { redirect_to: "EU" },
    GW: { redirect_to: "EU" },
    CI: { redirect_to: "EU" },
    KE: { redirect_to: "EU" },
    LS: { redirect_to: "EU" },
    LR: { redirect_to: "EU" },
    LY: { redirect_to: "EU" },
    MG: { redirect_to: "EU" },
    MW: { redirect_to: "EU" },
    ML: { redirect_to: "EU" },
    MR: { redirect_to: "EU" },
    MU: { redirect_to: "EU" },
    MA: { redirect_to: "EU" },
    MZ: { redirect_to: "EU" },
    NA: { redirect_to: "EU" },
    NE: { redirect_to: "EU" },
    NG: { redirect_to: "EU" },
    RW: { redirect_to: "EU" },
    ST: { redirect_to: "EU" },
    SN: { redirect_to: "EU" },
    SC: { redirect_to: "EU" },
    SL: { redirect_to: "EU" },
    SO: { redirect_to: "EU" },
    ZA: { redirect_to: "EU" },
    SS: { redirect_to: "EU" },
    SD: { redirect_to: "EU" },
    TZ: { redirect_to: "EU" },
    TG: { redirect_to: "EU" },
    TN: { redirect_to: "EU" },
    UG: { redirect_to: "EU" },
    ZM: { redirect_to: "EU" },
    ZW: { redirect_to: "EU" },
    BH: { redirect_to: "EU" },
    IR: { redirect_to: "EU" },
    IQ: { redirect_to: "EU" },
    IL: { redirect_to: "EU" },
    JO: { redirect_to: "EU" },
    KW: { redirect_to: "EU" },
    LB: { redirect_to: "EU" },
    OM: { redirect_to: "EU" },
    PS: { redirect_to: "EU" },
    QA: { redirect_to: "EU" },
    SA: { redirect_to: "EU" },
    SY: { redirect_to: "EU" },
    TR: { redirect_to: "EU" },
    AE: { redirect_to: "EU" },
    YE: { redirect_to: "EU" }
};

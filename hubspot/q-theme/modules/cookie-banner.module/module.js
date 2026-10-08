function cookieConsentManager() {

    const consentManager = {
        cookieName: "qoria_cookie_preferences",
        gpcCookieName: "qoria_gpc_dismissed",
        cookieExpiry: 180,
        gpcEnabled: navigator.globalPrivacyControl === true,
        cookieConsentBanner: null,
        cookieConsentModal: null,
        gpcNotification: null,

        init: function() {
            window.dataLayer = window.dataLayer || [];

            this.cookieConsentBanner = bootstrap.Offcanvas.getOrCreateInstance("#cookieConsentBanner", { "scroll": true, "backdrop": false });
            this.gpcNotification     = bootstrap.Offcanvas.getOrCreateInstance("#gpcNotification", { "scroll": true, "backdrop": false });
            this.cookieConsentModal  = bootstrap.Modal.getOrCreateInstance("#cookiePreferences", { "backdrop": "static" });

            this.addEventListeners();
            
            // If GPC enabled and no GPC cookie, reject all and show GPC banner
            if (!this.getCookie(this.gpcCookieName) && this.gpcEnabled) {
                this.rejectAll();
                this.gpcNotification.show();
                return;
            }

            // If consent cookie present, send event to GTM
            if (this.getCookie(this.cookieName)) {
                window.dataLayer.push({
                    event: 'cookie_consent_updated'
                });
            }

            // If no consent cookie, show banner. Actual consent setting is handled by GTM on Consent Initialization
            if (!this.getCookie(this.cookieName)) {
                this.cookieConsentBanner.show();
            }
        },

        acceptAll: function() {
            this.pushConsents(true, true, true, false);
        },

        rejectAll: function() {
            this.pushConsents(false, false, false, true);
        },

        close: function() {
            this.cookieConsentBanner.hide();
            this.cookieConsentModal.hide();
        },

        openBanner: function() {
            this.cookieConsentBanner.show();
        },

        dismissGpc: function() {
            this.setCookie(this.gpcCookieName, "true", this.cookieExpiry);
        },

        savePreferences: function() {
            const analytics = document.getElementById("analyticsSwitch").checked;
            const advertisement = document.getElementById("marketingSwitch").checked;
            const functionality = document.getElementById("functionalSwitch").checked;
            const limitSensitiveInfo = document.getElementById("limitSensitiveInfo").checked;

            this.pushConsents(functionality, analytics, advertisement, limitSensitiveInfo);
        },

        pushConsents: function(functional, analytics, advertisement, limitSensitiveInfo) {
            const consentState = {
                "analytics": analytics,
                "advertisement": advertisement,
                "functional": functional,
                "limitSensitiveInfo": limitSensitiveInfo
            };
            this.setCookie(this.cookieName, JSON.stringify(consentState), this.cookieExpiry);

            // Push a custom event to dataLayer. GTM will listen for this event to update its consent state and HubSpot's consent state
            window.dataLayer.push({
                event: 'cookie_consent_updated'
            });
        },

        syncSwitches: function() {
            // Inversely synchronises the Targeted Advertising Opt-out and the Marketing Cookie consent switches
            const marketingSwitch = document.getElementById('marketingSwitch');
            const optOutTASwitch = document.getElementById('optOutTA');
            if (!marketingSwitch || !optOutTASwitch) return;

            optOutTASwitch.checked = !marketingSwitch.checked;

            marketingSwitch.addEventListener('change', () => {
                optOutTASwitch.checked = !marketingSwitch.checked;
            });

            optOutTASwitch.addEventListener('change', () => {
                marketingSwitch.checked = !optOutTASwitch.checked;
            });
        },

        addEventListeners: function() {
            document.getElementById("btn-accept-all-banner").addEventListener("click", () => {
                this.acceptAll();
                this.close();
            });
            document.getElementById("btn-reject-all-banner").addEventListener("click", () => {
                this.rejectAll();
                this.close();
            });
            document.getElementById("btn-accept-all-modal").addEventListener("click", () => {
                this.acceptAll();
                this.close();
            });
            document.getElementById("btn-reject-all-modal").addEventListener("click", () => {
                this.rejectAll();
                this.close();
            });
            document.getElementById("btn-save-prefs").addEventListener("click", () => {
                this.savePreferences();
                this.close();
            });
            document.getElementById('cookiePreferences').addEventListener('show.bs.modal', () => this.syncSwitches());
            document.getElementById('gpcNotification').addEventListener('hidden.bs.offcanvas', () => this.dismissGpc());
        },

        setCookie: function(name, value, days) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        },

        getCookie: function(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
    };
    consentManager.init();
    return consentManager; // Return the manager object
}

function initCookieConsent() {
    const translations = {
        "en": {
            "cookie_banner_title": "We value your privacy",
            "cookie_banner_text": `<p>We use cookies and similar technologies to make our website work, to understand how it is used, and, with your permission, to personalise content and show you relevant advertising on other platforms. Some of these technologies are provided by our partners. Essential cookies are always on, because the site cannot function without them. Everything else stays off until you choose to turn it on. You can accept all, reject all non-essential cookies, or set your own preferences, and you can change your choice at any time. For more detail, see our <a href="https://qoria.com/privacy/cookies" target="_blank">Cookie Policy</a> and <a href="https://qoria.com/privacy" target="_blank">Privacy Notice</a>.</p>`,
            "cookie_banner_us": `<p><strong>In the US?</strong> You also have the right to opt out of the sale or sharing of your personal information and to limit the use of your sensitive personal information. Manage these under "Your US privacy choices".</p>`,

            "manage_preferences": "Manage preferences",
            "save_preferences": "Save my preferences",
            "accept_all": "Accept all",
            "reject_all": "Reject non-essential",

            "privacy_centre": "Privacy Centre",
            "us_preferences": "Your US privacy choices",
            "preferences_intro": "Choose which cookies and technologies you are comfortable with. Essential cookies keep the site secure and working, so they are always on. You can switch the other categories on or off, then save your choices. You can return here at any time to change them. <a href='https://qoria.com/privacy/cookies' target='_blank'>See our full list of cookies.</a>",

            "strictly_necessary": "Strictly necessary",
            "toggle_strictly_necessary": "Toggle strictly necessary cookies (disabled)",
            "strictly_necessary_description": `<p>These cookies and technologies are needed for the site to work safely and reliably. They support core functions such as security, network management, bot and fraud protection, and remembering your privacy choices. The site cannot run without them, so they cannot be switched off.</p>`,

            "functional": "Functional",
            "toggle_functional": "Toggle functional cookies",
            "functional_description": `<p>We use a set of cookies that are optional for the website to function. They are usually only set in response to information provided to the website to personalize and optimize your experience as well as remember your chat history.</p>`,

            "analytics": "Analytics and performance",
            "toggle_analytics": "Toggle analytics and performance cookies",
            "analytics_description": `<p>These help us understand how visitors find and use our website, including which pages are viewed and how people navigate and interact with them, so we can improve it. Some of this involves recording how pages are used. We do not use this information to advertise to you.</p>`,

            "advertising": "Advertising and marketing",
            "toggle_advertising": "Toggle advertising and marketing cookies",
            "advertising_description": `<p>These let us measure how our campaigns perform and show you relevant advertising on third-party platforms, such as search engines and social media. They involve sharing limited information with advertising partners, who may combine it with data they already hold. For US visitors, turning this category on allows the "sale" and "sharing" of personal information for cross-context behavioral advertising, as those terms are defined under US state privacy laws.</p>`,

            "providers": "Providers",

            "us_intro": `If you are a resident of a US state with a comprehensive privacy law (such as California, Colorado, Connecticut, Texas, Virginia and others), you have additional rights over how your personal information is used. You can exercise the choices below without affecting your access to our website.`,

            "us_advertising_title": "Do Not Sell or Share My Personal Information / Opt out of Targeted Advertising",
            "us_advertising_toggle": "Opt out of Targeted Advertising",
            "us_advertising_description": "When our advertising and marketing technologies are active, we may sell or share your personal information for cross-context behavioral advertising. To opt out, switch off the Advertising and Marketing category above, or use the toggle here.",

            "us_sensitive_title": "Limit the Use of My Sensitive Personal Information",
            "us_sensitive_toggle": "Limit the Use of My Sensitive Personal Information",
            "us_sensitive_description": "Where we process sensitive personal information, such as precise geolocation, you can ask us to limit its use to what is necessary to provide our services and other purposes permitted by law.",

            "us_gpc_title": "Global Privacy Control (GPC)",
            "us_gpc_description": "We recognize browser-based opt-out preference signals. If your browser or device sends a Global Privacy Control signal, we will treat it as a valid request to opt out of the sale and sharing of your personal information for that browser or device.",

            "us_children_title": "Children",
            "us_children_description": "We do not knowingly sell or share the personal information of consumers under 16, and we do not use it for targeted advertising, without the consent required by law. We do not knowingly collect personal information from children under 13 without verifiable parental consent.",

            "update_notice_title": "Changed your mind?",
            "update_notice_text": `You can withdraw or update your consent at any time using the "Cookie settings" link in our website footer.`,

            "gpc_title": "Your GPC signal has been detected",
            "gpc_text": "While some cookies are necessary to make our website and services function properly, consent for all non-essential cookies has been automatically declined. You can change your preferences at any time. To find out more about the cookies we use, see our <a href='https://qoria.com/privacy/cookies' target='_blank'>Cookie Policy</a> and <a href='https://qoria.com/privacy' target='_blank'>Privacy Notice</a>."
        },
        "en-US": {
            "cookie_banner_title": "We value your privacy",
            "cookie_banner_text": `<p>We use cookies and similar technologies to make our website work, to understand how it is used, and, with your permission, to personalise content and show you relevant advertising on other platforms. Some of these technologies are provided by our partners. Essential cookies are always on, because the site cannot function without them. Everything else stays off until you choose to turn it on. You can accept all, reject all non-essential cookies, or set your own preferences, and you can change your choice at any time. For more detail, see our <a href="https://qoria.com/privacy/cookies" target="_blank">Cookie Policy</a> and <a href="https://qoria.com/privacy" target="_blank">Privacy Notice</a>.</p>`,
            "cookie_banner_us": `<p><strong>In the US?</strong> You also have the right to opt out of the sale or sharing of your personal information and to limit the use of your sensitive personal information. Manage these under "Your US privacy choices".</p>`,

            "manage_preferences": "Manage preferences",
            "save_preferences": "Save my preferences",
            "accept_all": "Accept all",
            "reject_all": "Reject non-essential",

            "privacy_centre": "Privacy Center",
            "us_preferences": "Your US privacy choices",
            "preferences_intro": "Choose which cookies and technologies you are comfortable with. Essential cookies keep the site secure and working, so they are always on. You can switch the other categories on or off, then save your choices. You can return here at any time to change them. <a href='https://qoria.com/privacy/cookies' target='_blank'>See our full list of cookies.</a>",

            "strictly_necessary": "Strictly necessary",
            "toggle_strictly_necessary": "Toggle strictly necessary cookies (disabled)",
            "strictly_necessary_description": `<p>These cookies and technologies are needed for the site to work safely and reliably. They support core functions such as security, network management, bot and fraud protection, and remembering your privacy choices. The site cannot run without them, so they cannot be switched off.</p>`,

            "functional": "Functional",
            "toggle_functional": "Toggle functional cookies",
            "functional_description": `<p>We use a set of cookies that are optional for the website to function. They are usually only set in response to information provided to the website to personalize and optimize your experience as well as remember your chat history.</p>`,

            "analytics": "Analytics and performance",
            "toggle_analytics": "Toggle analytics and performance cookies",
            "analytics_description": `<p>These help us understand how visitors find and use our website, including which pages are viewed and how people navigate and interact with them, so we can improve it. Some of this involves recording how pages are used. We do not use this information to advertise to you.</p>`,

            "advertising": "Advertising and marketing",
            "toggle_advertising": "Toggle advertising and marketing cookies",
            "advertising_description": `<p>These let us measure how our campaigns perform and show you relevant advertising on third-party platforms, such as search engines and social media. They involve sharing limited information with advertising partners, who may combine it with data they already hold. For US visitors, turning this category on allows the "sale" and "sharing" of personal information for cross-context behavioral advertising, as those terms are defined under US state privacy laws.</p>`,

            "providers": "Providers",

            "us_intro": `If you are a resident of a US state with a comprehensive privacy law (such as California, Colorado, Connecticut, Texas, Virginia and others), you have additional rights over how your personal information is used. You can exercise the choices below without affecting your access to our website.`,

            "us_advertising_title": "Do Not Sell or Share My Personal Information / Opt out of Targeted Advertising",
            "us_advertising_toggle": "Opt out of Targeted Advertising",
            "us_advertising_description": "When our advertising and marketing technologies are active, we may sell or share your personal information for cross-context behavioral advertising. To opt out, switch off the Advertising and Marketing category above, or use the toggle here.",

            "us_sensitive_title": "Limit the Use of My Sensitive Personal Information",
            "us_sensitive_toggle": "Limit the Use of My Sensitive Personal Information",
            "us_sensitive_description": "Where we process sensitive personal information, such as precise geolocation, you can ask us to limit its use to what is necessary to provide our services and other purposes permitted by law.",

            "us_gpc_title": "Global Privacy Control (GPC)",
            "us_gpc_description": "We recognize browser-based opt-out preference signals. If your browser or device sends a Global Privacy Control signal, we will treat it as a valid request to opt out of the sale and sharing of your personal information for that browser or device.",

            "us_children_title": "Children",
            "us_children_description": "We do not knowingly sell or share the personal information of consumers under 16, and we do not use it for targeted advertising, without the consent required by law. We do not knowingly collect personal information from children under 13 without verifiable parental consent.",

            "update_notice_title": "Changed your mind?",
            "update_notice_text": `You can withdraw or update your consent at any time using the "Cookie settings" link in our website footer.`,

            "gpc_title": "Your GPC signal has been detected",
            "gpc_text": "While some cookies are necessary to make our website and services function properly, consent for all non-essential cookies has been automatically declined. You can change your preferences at any time. To find out more about the cookies we use, see our <a href='https://qoria.com/privacy/cookies' target='_blank'>Cookie Policy</a> and <a href='https://qoria.com/privacy' target='_blank'>Privacy Notice</a>."
        },
        "es": {
            "cookie_banner_title": "Valoramos su privacidad",
            "cookie_banner_text": `<p>Utilizamos cookies y tecnologías similares para que nuestro sitio web funcione, para entender cómo se utiliza y, con su permiso, para personalizar el contenido y mostrarle publicidad relevante en otras plataformas. Algunas de estas tecnologías las proporcionan nuestros socios. Las cookies esenciales están siempre activadas, ya que el sitio no puede funcionar sin ellas. Todo lo demás permanece desactivado hasta que usted decida activarlo. Puede aceptarlas todas, rechazar todas las cookies no esenciales o configurar sus propias preferencias, y puede cambiar su elección en cualquier momento. Para más información, consulte nuestra <a href="https://qoria.com/privacy/cookies" target="_blank">Política de Cookies</a> y nuestro <a href="https://qoria.com/privacy" target="_blank">Aviso de Privacidad</a>.</p>`,
            "cookie_banner_us": `<p><strong>¿Se encuentra en USA?</strong> También tiene derecho a excluirse de la venta o la cesión de su información personal y a limitar el uso de su información personal sensible. Puede gestionar estas opciones en «Sus opciones de privacidad en USA.»</p>`,

            "manage_preferences": "Gestionar preferencias",
            "save_preferences": "Guardar mis preferencias",
            "accept_all": "Aceptar todo",
            "reject_all": "Rechazar lo no esencial",

            "privacy_centre": "Centro de Privacidad",
            "us_preferences": "Sus opciones de privacidad en EE. UU.",
            "preferences_intro": "Elija las cookies y tecnologías con las que se sienta cómodo. Las cookies esenciales mantienen el sitio seguro y operativo, por lo que están siempre activadas. Puede activar o desactivar las demás categorías y, a continuación, guardar sus elecciones. Puede volver aquí en cualquier momento para modificarlas. <a href='https://qoria.com/privacy/cookies' target='_blank'>Consulte nuestra lista completa de cookies.</a>",

            "strictly_necessary": "Estrictamente necesarias",
            "toggle_strictly_necessary": "Activar o desactivar las cookies estrictamente necesarias (deshabilitado)",
            "strictly_necessary_description": `<p>Estas cookies y tecnologías son necesarias para que el sitio funcione de forma segura y fiable. Sirven de apoyo a funciones básicas como la seguridad, la gestión de la red, la protección frente a bots y fraudes, y el recuerdo de sus preferencias de privacidad. El sitio no puede funcionar sin ellas, por lo que no se pueden desactivar.</p>`,

            "functional": "Funcionales",
            "toggle_functional": "Activar o desactivar las cookies funcionales",
            "functional_description": `<p>Utilizamos un conjunto de cookies que son opcionales para el funcionamiento del sitio web. Por lo general, solo se instalan en respuesta a la información facilitada al sitio web, con el fin de personalizar y optimizar su experiencia, así como de recordar su historial de chat.</p>`,

            "analytics": "Analíticas y de rendimiento",
            "toggle_analytics": "Activar o desactivar las cookies analíticas y de rendimiento",
            "analytics_description": `<p>Nos ayudan a entender cómo encuentran y utilizan nuestro sitio web los visitantes, incluidas las páginas que se visitan y la forma en que se navega e interactúa con ellas, para poder mejorarlo. Parte de ello implica registrar cómo se utilizan las páginas. No empleamos esta información para mostrarle publicidad.</p>`,

            "advertising": "Publicidad y marketing",
            "toggle_advertising": "Activar o desactivar las cookies de publicidad y marketing",
            "advertising_description": `<p>Nos permiten medir el rendimiento de nuestras campañas y mostrarle publicidad relevante en plataformas de terceros, como motores de búsqueda y redes sociales. Implican compartir información limitada con socios publicitarios, que pueden combinarla con datos que ya obran en su poder. Para los visitantes de EE. UU., activar esta categoría permite la «venta» y la «cesión» de información personal con fines de publicidad conductual en distintos contextos, según se definen dichos términos en las leyes de privacidad estatales de EE. UU.</p>`,

            "providers": "Proveedores",

            "us_intro": `Si usted reside en un estado de USA con una ley integral de privacidad (como California, Colorado, Connecticut, Texas, Virginia y otros), dispone de derechos adicionales sobre el uso de su información personal. Puede ejercer las opciones que figuran a continuación sin que ello afecte a su acceso a nuestro sitio web.`,

            "us_advertising_title": "No vender ni compartir mi información personal / Excluirme de la publicidad dirigida",
            "us_advertising_toggle": "Excluirme de la publicidad dirigida",
            "us_advertising_description": "Cuando nuestras tecnologías de publicidad y marketing están activas, podemos vender o compartir su información personal con fines de publicidad conductual en distintos contextos. Para excluirse, desactive la categoría Publicidad y marketing anterior o utilice el control de aquí.",

            "us_sensitive_title": "Limitar el uso de mi información personal sensible",
            "us_sensitive_toggle": "Limitar el uso de mi información personal sensible",
            "us_sensitive_description": "Cuando tratamos información personal sensible, como la geolocalización precisa, puede solicitarnos que limitemos su uso a lo necesario para prestar nuestros servicios y a otros fines permitidos por la ley.",

            "us_gpc_title": "Control Global de Privacidad (Global Privacy Control, GPC)",
            "us_gpc_description": "Reconocemos las señales de preferencia de exclusión basadas en el navegador. Si su navegador o dispositivo envía una señal de Global Privacy Control, la trataremos como una solicitud válida de exclusión de la venta y la cesión de su información personal para ese navegador o dispositivo.",

            "us_children_title": "Menores",
            "us_children_description": "No vendemos ni compartimos conscientemente la información personal de consumidores menores de 16 años, ni la utilizamos para publicidad dirigida, sin el consentimiento exigido por la ley. No recopilamos conscientemente información personal de menores de 13 años sin el consentimiento verificable de su padre, madre o tutor.",

            "update_notice_title": "¿Ha cambiado de opinión?",
            "update_notice_text": `Puede retirar o actualizar su consentimiento en cualquier momento mediante el enlace «Configuración de cookies» que figura en el pie de página de nuestro sitio web.`,

            "gpc_title": "Se ha detectado su señal de Global Privacy Control.",
            "gpc_text": `Si bien algunas cookies son necesarias para el correcto funcionamiento de nuestro sitio web y nuestros servicios, el consentimiento para todas las cookies no esenciales ha sido rechazado automáticamente. Puede modificar sus preferencias en cualquier momento. Para obtener más información sobre las cookies que utilizamos, consulte nuestra <a href="https://qoria.com/privacy/cookies" target="_blank">Política de Cookies</a> y nuestro <a href="https://qoria.com/privacy" target="_blank">Aviso de Privacidad</a>.`
        }
    };

    const getBannerHTML = (t) => `
    <div class="offcanvas offcanvas-bottom" tabindex="-1" id="cookieConsentBanner" aria-labelledby="cookieConsentTitle">
        <div class="offcanvas-header pb-0">    
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <h5 class="offcanvas-title" id="cookieConsentTitle">${t.cookie_banner_title}</h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="offcanvas-body">
            <div class="container-fluid">
                <div class="row align-items-start">
                    <div class="col-12 col-md-7 col-lg-7 col-xl-8 col-xxl small">
                        ${t.cookie_banner_text}
                        ${t.cookie_banner_us}
                    </div>
                    <div class="col-12 col-md-5 col-lg-5 col-xl-4 col-xxl-auto text-end pt-5 pt-md-0">
                        <div class="d-flex flex-row flex-wrap-reverse gap-2">
                            <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#cookiePreferences">${t.manage_preferences}</button>
                            <div class="d-flex flex-row flex-wrap gap-2">
                                <button type="button" class="btn btn-secondary btn-sm" id="btn-reject-all-banner">${t.reject_all}</button>
                                <button type="button" class="btn btn-secondary btn-sm" id="btn-accept-all-banner">${t.accept_all}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="offcanvas offcanvas-bottom" tabindex="-1" id="gpcNotification" aria-labelledby="gpcNotificationTitle" style="--q-offcanvas-height: auto; max-height: 33%;">
        <div class="offcanvas-header pb-0">  
            <h5 class="offcanvas-title" id="gpcNotificationTitle">${t.gpc_title}</h5>
            <button type="button" class="btn-close" id="btn-dismiss-gpc" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="row align-items-center">
                <div class="col-12 col-md-10 col-lg-8 small" style="max-width: 1280px;">
                    <p>${t.gpc_text}</p>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="cookiePreferences" tabindex="-1" aria-labelledby="cookiePreferencesTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable" >
            <div class="modal-content">
                <div class="modal-header d-none">
                    <h1 class="modal-title fs-5 fw-bold" id="cookiePreferencesTitle">${t.privacy_centre}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="categoryPreferences-tab" data-bs-toggle="tab" data-bs-target="#categoryPreferences" type="button" role="tab" aria-controls="categoryPreferences" aria-selected="true">${t.privacy_centre}</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="usPreferences-tab" data-bs-toggle="tab" data-bs-target="#usPreferences" type="button" role="tab" aria-controls="usPreferences" aria-selected="false">${t.us_preferences}</button>
                        </li>
                    </ul>

                    <div class="tab-content py-3" id="myTabContent">
                        <div class="tab-pane fade show active" id="categoryPreferences" role="tabpanel" aria-labelledby="categoryPreferences-tab" tabindex="0">
                            <p>${t.preferences_intro}</p>
                            
                            <div class="preferencesDropdowns d-flex flex-column gap-4">
                                <div class="necessaryContainer">
                                    <div class="d-flex flex-row align-items-center gap-2 justify-content-between">
                                        <a class="p fw-bold w-100 text-reset" data-bs-toggle="collapse" href="#necessary" role="button" aria-expanded="true" aria-controls="necessary">
                                            <i class="fa fa-chevron-down me-2" aria-hidden="true"></i>
                                            ${t.strictly_necessary}
                                        </a>
                                        <div class="form-check form-switch fs-5 float-end">
                                            <input class="form-check-input" type="checkbox" role="switch" id="strictlyNecessary" switch checked disabled>
                                            <label class="form-check-label visually-hidden" for="strictlyNecessary">${t.toggle_strictly_necessary}</label>
                                        </div>
                                    </div>
                                    <div class="collapse show" id="necessary">
                                        <div class="card card-body pt-3 small">
                                            <p>${t.strictly_necessary_description}</p>
                                            <p><strong>${t.providers}:</strong> Cloudflare, HubSpot</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="functionalContainer">
                                    <div class="d-flex flex-row align-items-center justify-content-between gap-2">
                                        <a class="p fw-bold w-100 text-reset" data-bs-toggle="collapse" href="#functional" role="button" aria-expanded="true" aria-controls="functional">
                                            <i class="fa fa-chevron-down me-2" aria-hidden="true"></i>
                                            ${t.functional}
                                        </a>
                                        <div class="form-check form-switch fs-5 float-end">
                                            <input class="form-check-input" type="checkbox" role="switch" id="functionalSwitch" switch>
                                            <label class="form-check-label visually-hidden" for="functionalSwitch">${t.toggle_functional}</label>
                                        </div>
                                    </div>
                                    <div class="collapse show" id="functional">
                                        <div class="card card-body pt-3 small">
                                            <p>${t.functional_description}</p>
                                            <p><strong>${t.providers}:</strong> HubSpot</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="analyticsContainer">
                                    <div class="d-flex flex-row align-items-center justify-content-between gap-2">
                                        <a class="p fw-bold w-100 text-reset" data-bs-toggle="collapse" href="#analytics" role="button" aria-expanded="true" aria-controls="analytics">
                                            <i class="fa fa-chevron-down me-2" aria-hidden="true"></i>
                                            ${t.analytics}
                                        </a>
                                        <div class="form-check form-switch fs-5 float-end">
                                            <input class="form-check-input" type="checkbox" role="switch" id="analyticsSwitch" switch>
                                            <label class="form-check-label visually-hidden" for="analyticsSwitch">${t.toggle_analytics}</label>
                                        </div>
                                    </div>
                                    <div class="collapse show" id="analytics">
                                        <div class="card card-body pt-3 small">
                                            <p>${t.analytics_description}</p>
                                            <p><strong>${t.providers}:</strong> Google, Hotjar, HubSpot, Microsoft.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="marketingContainer">
                                    <div class="d-flex flex-row align-items-center justify-content-between gap-2">
                                        <a class="p fw-bold w-100 text-reset" data-bs-toggle="collapse" href="#marketing" role="button" aria-expanded="true" aria-controls="marketing">
                                            <i class="fa fa-chevron-down me-2" aria-hidden="true"></i>
                                            ${t.advertising}
                                        </a>
                                        <div class="form-check form-switch fs-5 float-end">
                                            <input class="form-check-input" type="checkbox" role="switch" id="marketingSwitch" switch>
                                            <label class="form-check-label visually-hidden" for="marketingSwitch">${t.toggle_advertising}</label>
                                        </div>
                                    </div>
                                    <div class="collapse show" id="marketing">
                                        <div class="card card-body pt-3 small">
                                            <p>${t.advertising_description}</p>
                                            <p><strong>${t.providers}:</strong> Google, HubSpot, LinkedIn, Microsoft, Reddit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="usPreferences" role="tabpanel" aria-labelledby="usPreferences-tab" tabindex="0">
                            <div class="usPreferences d-flex flex-column gap-4">
                                <p>${t.us_intro}</p>
                                
                                <div class="advertisingContainer">
                                    <div class="d-flex flex-row align-items-center gap-2 justify-content-between">
                                        <a class="p fw-bold w-100 text-reset" data-bs-toggle="collapse" href="#usAdvertising" role="button" aria-expanded="true" aria-controls="usAdvertising">
                                            <i class="fa fa-chevron-down me-2" aria-hidden="true"></i>
                                            ${t.us_advertising_title}
                                        </a>
                                        <div class="form-check form-switch fs-5 float-end">
                                            <input class="form-check-input" type="checkbox" role="switch" id="optOutTA" switch checked>
                                            <label class="form-check-label visually-hidden" for="optOutTA">${t.us_advertising_toggle}</label>
                                        </div>
                                    </div>
                                    <div class="collapse show" id="usAdvertising">
                                        <div class="card card-body pt-3 small">
                                            <p>${t.us_advertising_description}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="sensitiveInfoContainer">
                                    <div class="d-flex flex-row align-items-center gap-2 justify-content-between">
                                        <a class="p fw-bold w-100 text-reset" data-bs-toggle="collapse" href="#sensitiveInfo" role="button" aria-expanded="true" aria-controls="sensitiveInfo">
                                            <i class="fa fa-chevron-down me-2" aria-hidden="true"></i>
                                            ${t.us_sensitive_title}
                                        </a>
                                        <div class="form-check form-switch fs-5 float-end">
                                            <input class="form-check-input" type="checkbox" role="switch" id="limitSensitiveInfo" switch checked>
                                            <label class="form-check-label visually-hidden" for="limitSensitiveInfo">${t.us_sensitive_toggle}</label>
                                        </div>
                                    </div>
                                    <div class="collapse show" id="sensitiveInfo">
                                        <div class="card card-body pt-3 small">
                                            <p>${t.us_sensitive_description}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="gpcContainer">
                                    <div class="d-flex flex-row align-items-center gap-2 justify-content-between">
                                        <a class="p fw-bold w-100 text-reset" data-bs-toggle="collapse" href="#usGpc" role="button" aria-expanded="true" aria-controls="usGpc">
                                            <i class="fa fa-chevron-down me-2" aria-hidden="true"></i>
                                            ${t.us_gpc_title}
                                        </a>
                                    </div>
                                    <div class="collapse show" id="usGpc">
                                        <div class="card card-body pt-3 small">
                                            <p>${t.us_gpc_description}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="childrenContainer">
                                    <div class="d-flex flex-row align-items-center gap-2 justify-content-between">
                                        <a class="p fw-bold w-100 text-reset" data-bs-toggle="collapse" href="#usChildren" role="button" aria-expanded="true" aria-controls="usChildren">
                                            <i class="fa fa-chevron-down me-2" aria-hidden="true"></i>
                                            ${t.us_children_title}
                                        </a>
                                    </div>
                                    <div class="collapse show" id="usChildren">
                                        <div class="card card-body pt-3 small">
                                            <p>${t.us_children_description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer d-flex justify-content-stretch align-items-center">
                    <p class="small w-100 mb-3"><strong>${t.update_notice_title}</strong><br>${t.update_notice_text}</p>
                    <button type="button" class="btn btn-outline-secondary me-2 btn-sm" data-bs-dismiss="modal" id="btn-save-prefs">${t.save_preferences}</button>
                    <button type="button" class="btn btn-secondary me-2 btn-sm" data-bs-dismiss="modal" id="btn-reject-all-modal">${t.reject_all}</button>
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" id="btn-accept-all-modal">${t.accept_all}</button>
                </div>
            </div>
        </div>
    </div>
    `;

    const docLang = (typeof document !== 'undefined' && document.documentElement.lang) || 'en';
    let t = translations[docLang];
    
    // Resolve translation if exact language code key is not found
    if (!t) {
        const lowerLang = docLang.toLowerCase();
        const caseInsensitiveKey = Object.keys(translations).find(key => key.toLowerCase() === lowerLang);
        if (caseInsensitiveKey) {
            t = translations[caseInsensitiveKey];
        } else {
            const langPrefix = docLang.split('-')[0];
            const prefixKey = Object.keys(translations).find(key => key.toLowerCase() === langPrefix.toLowerCase());
            t = prefixKey ? translations[prefixKey] : translations['en'];
        }
    }

    const bannerHTML = getBannerHTML(t);
    // Inject the banner HTML
    document.body.insertAdjacentHTML('beforeend', bannerHTML);
    // Make cookieConsentManager globally available
    window.qoriaCookieConsentManager = cookieConsentManager();
}

// Trigger cookie consent banner when the page is fully loaded, unless in the editor
if (!window.qoriaIsInEditor) {
    if (document.readyState === 'complete') {
        initCookieConsent();
    } else {
        window.addEventListener('load', initCookieConsent);
    }
}
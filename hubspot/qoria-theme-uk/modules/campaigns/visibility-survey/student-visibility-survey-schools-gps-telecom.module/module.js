document.addEventListener("DOMContentLoaded", function () {
    const appWrapper = document.getElementById("visibility-survey");
    if (!appWrapper) return;

    const version = appWrapper.dataset.version; // string

    function collectFrameworkElements(wrapper) {
        return {
            appContainer        : wrapper.querySelector("#app-container"),
            screenIntro         : wrapper.querySelector("#screen-intro"),
            screenQuestion      : wrapper.querySelector("#screen-question"),
            screenResult        : wrapper.querySelector("#screen-result"),
            logoTarget          : wrapper.querySelector("#smoothwall-logo"),
        }
    }

    function collectSurveyElements(wrapper) {
        return {
            questionWrapper     : wrapper.querySelector("#question-wrapper"),
            questionTextContainer: wrapper.querySelector("#question-text-container"),
            questionText        : wrapper.querySelector("#question-text"),
            dynamicQuestionIcon : wrapper.querySelector("#dynamic-question-icon"),
            dynamicQuestionIcon2: wrapper.querySelector("#dynamic-question-icon-bg"),
            btnStart            : wrapper.querySelector("#btn-start-survey"),
            btnBack             : wrapper.querySelector("#btn-back"),
            btnNext             : wrapper.querySelector("#btn-next"),
            btnSubmit           : wrapper.querySelector("#btn-submit"),
            progressFill        : wrapper.querySelector("#progress-fill"),
            progressText        : wrapper.querySelector("#progress-text"),
            optionBtns          : wrapper.querySelectorAll(".option-btn"),
            gateFormModal       : new bootstrap.Modal(wrapper.querySelector("#gateFormModal"), {
                    keyboard: false,
                    backdrop: 'static'
                })
        }
    }

    function collectResultElements(wrapper) {
        const printArea = wrapper.querySelector("#print-area");
        const screenResult = wrapper.querySelector("#screen-result");
        const furtherInfoContainer = screenResult.querySelector("#furtherInfo");
        const screenCta = screenResult.querySelector("#ctaContainer");

        return {
            btnReload               : wrapper.querySelector("#btn-reload"),
            btnPrint                : wrapper.querySelector("#btn-print"),
            printArea               : wrapper.querySelector("#print-area"),
            formContainer           : wrapper.querySelector("#formContainer"),

            printFinalScore         : printArea.querySelector("#finalScore"),
            printLeadSpan           : printArea.querySelector("#scoreLeadText"),
            printSummarySpan        : printArea.querySelector("#scoreSummaryText"),
            printAnswers            : printArea.querySelector("#printAnswers"),
            printRecommendations    : printArea.querySelector("#printRecommendations"),

            screenFinalScore        : screenResult.querySelector("#scoreNumber"),
            screenLeadSpan          : screenResult.querySelector("#scoreLead"),
            screenSummarySpan       : screenResult.querySelector("#scoreSummary"),        
            resultsContainer        : screenResult.querySelector("#resultsContainer"),
            personalResultsBanner   : screenResult.querySelector("#personalResultsBanner"),
            recommendations         : screenResult.querySelector("#recommendations"),
            screenCta               : screenCta,

            furtherInfoContainer    : furtherInfoContainer,
            furtherInfoHeading      : furtherInfoContainer.querySelector(".further-info-heading"),
            furtherInfoGrid         : furtherInfoContainer.querySelector(".further-info-grid"),
            furtherInfoVideo        : screenResult.querySelector(".fi-video-container"),
            
            screenCtaTitle          : screenCta.querySelector("#screenCtaTitle"),
            screenCtaIntro          : screenCta.querySelector("#screenCtaIntro"),
            screenCtaTitle2         : screenCta.querySelector("#screenCtaTitle2"),
            screenCtaIntro2         : screenCta.querySelector("#screenCtaIntro2"),
            screenCtaBannerText     : screenCta.querySelector(".cta-banner-text"),
            screenCtaBannerBtn      : screenCta.querySelector(".cta-banner-btn"),
            screenCtaBody           : screenCta.querySelector("#ctaBody"),
            screenCtaImages         : screenCta.querySelector("#ctaImages"),
            screenCtaBenefits1      : screenCta.querySelector("#benefitsGrid1"),
            screenCtaBenefits2      : screenCta.querySelector("#benefitsGrid2"),

            formModal               : new bootstrap.Modal(wrapper.querySelector("#formModal"), {
                    keyboard: false,
                    backdrop: 'static'
                }),
        
        }
    }

    function getSurveyConfig(version) {
        const configs = {
            "schools-mats": {
                questions: [
                    {
                        text: "Can you see the websites/URLs your students visit on school devices?",
                        section: "Basic Online Visibility",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/VS-URL-window.png?width=860&t=1774285102160",
                    },
                    {
                        text: "Can the system you are using detect concerning Google searches made by students?",
                        section: "Search Activity",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/google.png?width=860&t=1775507838093",
                    },
                    {
                        text: "Can you see concerning searches on platforms like YouTube?",
                        section: "Search Activity",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/youtube.png?width=860&t=1775507838351",
                    },
                    {
                        text: "Can your system detect potential safeguarding risks in documents students are typing in (e.g. Word, Google Docs, PowerPoint etc)?",
                        section: "Documents & Collaboration",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/word1.png?width=860&t=1775507395521",
                    },
                    {
                        text: "Can you see potential safeguarding risks in student emails (even those not sent or deleted)?",
                        section: "Communication",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/email.png?width=860&t=1775508033151",
                    },
                    {
                        text: "Are you alerted to concerning messages students send through messaging platforms or chat tools?",
                        section: "Communication",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/chats.png?width=860&t=1775507395521",
                    },
                    {
                        text: "Are you alerted to student risks from their digital activity, even if the device is used off school premises?",
                        section: "Device & Activity Visibility",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/home-working.png?width=860&t=1775507395638",
                    },
                    {
                        text: "Can your system detect safeguarding risks in conversations students have with AI chatbots?",
                        section: "Emerging & Evolving Risks",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/AI-chat.png?width=860&t=1775507395540",
                    },
                    {
                        text: "Can your system easily link different online activities from the same student to identify concerning patterns of behaviour?",
                        section: "Connecting Dots",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Connected-Risks.png?width=860&t=1775507395340",
                    },
                    {
                        text: "Can your system detect safeguarding risks hidden in slang, coded language, emojis or abbreviations that students use?",
                        section: "Finding Hidden Meanings",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/emoji.png?width=860&t=1775507395381",
                    },
                    {
                        text: "When a potential safeguarding risk is detected, are staff alerted quickly enough to act before it escalates?",
                        section: "Alerts & Context",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Alerted.png?width=860&t=1775507395428",
                    },
                    {
                        text: "When an alert is raised, are you given enough context to understand the exact nature of the incident?",
                        section: "Alerts & Context",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Context.png?width=860&t=1775507395293",
                    },
                ],
                sectionData: {
                    "Search Activity": {
                        text: "<p>Searches can often reveal the first sign that something isn’t right.</p><p>A student might search for information about self-harm, eating disorders, violence, or other harmful topics.</p><p>Recognising these moments gives safeguarding teams the chance to check in early and offer support when it matters most.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-schools-search.png?width=860&t=1776704326342",
                    },
                    "Documents & Collaboration": {
                        text: "<p>Students use shared documents and collaboration tools as spaces to express thoughts and feelings they may not say aloud.</p><p>These spaces can also be used to target fellow students with harmful comments.</p><p>Visibility of these spaces helps staff intervene sooner and protect students from harm that would otherwise go unnoticed.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-schools-Documents.png?width=860&t=1776704326407",
                    },
                    Communication: {
                        text: "<p>Email, chat platforms and messaging tools can be where arguments escalate, bullying takes hold, or students are contacted by others in ways that put them at risk.</p><p>Having visibility across these conversations helps safeguarding teams step in earlier and maintain a safer digital environment.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-schools-Communication.png?width=860&t=1776704325710",
                    },
                    "Connecting Dots": {
                        text: "<p>A single message or search viewed in isolation is unlikely to tell the full story of what's going on in a student's life.</p><p>But when safeguarding teams can connect the dots across a student’s digital activity, patterns can start to emerge.</p><p>This means concerns such as self-harm, coercion, eating disorders, grooming and suicidal ideation can reveal themselves - even when they’re not expressed directly.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-schools-Connectingdots.png?width=860&t=1776704326344",
                    },
                    "Finding Hidden Meanings": {
                        text: "<p>Emojis, acronyms and everyday phrases don’t always mean what you think they do.</p><p>For students, they can carry hidden meanings - sometimes used to disguise behaviour or conversations that signal a safeguarding concern.</p><p>A single message might not raise eyebrows. But repeated phrases, shifts in tone, or changes in behaviour over time can signal something deeper.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-schools-hiddenmeanings.png?width=860&t=1776704326366",
                    },
                    "Alerts & Context": {
                        text: "<p>Spotting a concern is only the beginning.</p><p>What really helps staff respond effectively is having the right information at the right moment.</p><p>Clear alerts, delivered with the surrounding context of what happened, allow safeguarding teams to understand the situation quickly and take the most appropriate next step to support the student.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-schools-Alertscontext.png?width=860&t=1776704325573",
                    },
                    "Device & Activity Visibility": {
                        text: "<p>Digital risks don’t stop at the school gates.</p><p>If your students are taking school-owned devices home with them, you need to ensure that you can still see potential risk even when the device is away from the school network, so that these concerns can be picked up quickly when they reconnect.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-schools-DeviceatHome.png?width=860&t=1776704326217",
                    },
                    "Emerging & Evolving Risks": {
                        text: "<p>Students adapt quickly to new technologies.</p><p>From AI tools and new social platforms, to coded language used to disguise meaning, online behaviour is constantly evolving.</p><p>Education settings need to stay aware of these changes in order to recognise risks that may appear in new and unexpected ways.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-schools-Newrisks.png?width=860&t=1776704325779",
                    },
                },
                furtherInfo: {
                    monitor: {
                        heading: "Further information on Monitor",
                        links: [
                            {
                                url: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Smoothwall%20Product%20Brochures/Smoothwall%20Monitor%20Product%20Brochure.pdf",
                                imgSrc: "https://4139239.fs1.hubspotusercontent-na1.net/hub/4139239/hubfs/UK_SMW_site_brochure_thumbnails-monitor-1.jpg?width=553&height=782&name=UK_SMW_site_brochure_thumbnails-monitor-1.jpg",
                                imgAlt: "Smoothwall Monitor Brochure",
                            },
                            {
                                url: "https://smoothwall.com/hubfs/UK-SMW-2025-Human-Moderated%20Digital%20Monitoring%20Factsheet.pdf",
                                imgSrc: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/UK-SMW-2025-Human-Moderated-Digital-Monitoring-Factsheet-(1)-1.jpg",
                                imgAlt: "Human Moderated Digital Monitoring Factsheet",
                            },
                        ],
                        video: {
                            videoUrl:
                                "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/UK%20Product%20Videos/Smoothwall%20Monitor.mp4",
                        },
                    },
                    monitoring: {
                        heading: "Learn more about digital monitoring",
                        links: [
                            {
                                url: "https://smoothwall.com/hubfs/Smoothwall%20Monitor%20-%20See%20it%2c%20Stop%20it.pdf",
                                imgSrc: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/UK_SMW_2026_When-You-Can-See-It--Digital-Monitoring---Schools-(1)-1.png",
                                imgAlt: "See it, Stop it",
                            },
                            {
                                url: "https://smoothwall.com/hubfs/Smoothwall%20by%20Qoria%20-%20Whitepapers%20(Rebranded)/Smoothwall%20-%20A%20Complete%20Guide%20to%20Digital%20Monitoring%20for%20Schools.pdf",
                                imgSrc: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Complete%20Guide%20to%20Monitoring-Schools_thumbnail.png",
                                imgAlt: "Guide to Digital Monitoring for Schools",
                            },
                            {
                                url: "https://smoothwall.com/hubfs/Smoothwall%20by%20Qoria%20-%20Whitepapers%20(Rebranded)/Smoothwall%20-%20A%20Complete%20Guide%20to%20Digital%20Monitoring%20for%20MATs%20-Whitepaper.pdf",
                                imgSrc: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/UK_SMW_2025_-A-Complete-Guide-to-Digital-Monitoring-for-Multi-Academy-Trusts-1.png",
                                imgAlt: "Guide to Digital Monitoring for MATs",
                            },
                            {
                                url: "https://smoothwall.com/hubfs/Smoothwall%20by%20Qoria%20-%20Whitepapers%20(Rebranded)/Smoothwall%20-%20A%20Simple%20Guide%20to%20Web%20Filtering%20and%20Digital%20Monitoring.pdf",
                                imgSrc: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Image%20-%20Digital%20Monitoring%20vs%20Web%20Filtering%20Guide%20Resource-1.png",
                                imgAlt: "Digital Monitoring vs Web Filtering",
                            },
                        ],
                        video: {
                            videoUrl: "",
                        },
                    },
                },
                scoreContentMap: {
                    4: {
                        leadText:
                            "It appears you have complete visibility of the risks students may face in their digital lives.",
                        summaryText:
                            "<p>This level of visibility makes it easier for safeguarding teams to identify concerns early and provide support when it's needed most.</p><p>However, as students' digital lives continue to evolve, new behaviours, platforms and risks can emerge.</p><p>Even well-established monitoring approaches should be regularly reviewed to ensure they continue to provide the right level of insight.</p>",
                        ctaTitle:
                            "See the signs of students at risk with Smoothwall Monitor",
                        ctaIntro:
                            "Smoothwall Monitor combines advanced monitoring technology with human moderation to help safeguarding teams gain clear, reliable insight into student digital behaviour.",
                        ctaBody:
                            "<p>By surfacing safeguarding concerns alongside the context surrounding them, Monitor helps DSLs understand risks and take the appropriate next steps with confidence.</p><p>Even if your school or MAT already uses a digital monitoring tool, it may be worth asking whether you have full visibility across the evolving platforms and behaviours students engage with online.</p>",
                        ctaBannerText: "See how Smoothwall Monitor compares",
                        ctaButtonText: "Book a demo",
                        ctaImage: {
                            src: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Monitor-Records-2-1.png",
                            alt: "Smoothwall Monitor"
                        },
                    },
                    3: {
                        leadText:
                            "It appears that you have strong visibility into the risks your students may face in their digital lives.",
                        summaryText:
                            "<p>This kind of visibility makes it easier to spot concerns early and step in when it matters most.</p><p>But students' online habits shift all the time. New platforms come in, behaviours change, and different risks follow.</p><p>It's easy for monitoring to lose pace if it's not reviewed. That's why it's worth taking a fresh look at your current approach.</p><p>Below are a few areas to explore with your current monitoring provider — so you can remain a step ahead of the risks your students may face.</p>",
                        ctaTitle:
                            "See the signs of students at risk with Smoothwall Monitor",
                        ctaIntro:
                            "Smoothwall Monitor combines advanced monitoring technology with human moderation to help safeguarding teams gain clear, reliable insight into student digital behaviour.",
                        ctaBody:
                            "<p>By surfacing safeguarding concerns alongside the context surrounding them, Monitor helps DSLs understand risks and take the appropriate next steps with confidence.</p><p>Even if your school or MAT already uses a digital monitoring tool, it may be worth asking whether you have full visibility across the evolving platforms and behaviours students engage with online.</p>",
                        ctaBannerText: "See how Smoothwall Monitor compares",
                        ctaButtonText: "Book a demo",
                        ctaImage: {
                            src: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Monitor-Records-2-1.png",
                            alt: "Smoothwall Monitor"
                        },
                    },
                    2: {
                        leadText:
                            "It appears you have some visibility into potential student risks beyond what web filtering alone can provide.",
                        summaryText:
                            "<p>Important steps have been taken to strengthen digital safeguarding.</p><p>However, there are some areas where warning signs could be easier to identify or connect.</p><p>As students spend more of their lives online, safeguarding risks can appear across multiple platforms and activities.</p><p>Below you can learn the areas where those signs may emerge, and how improved visibility can help safeguarding teams respond more quickly and confidently.</p>",
                        ctaTitle:
                            "Understand where Smoothwall can help close the visibility gap",
                        ctaIntro:
                            "Smoothwall Monitor gives safeguarding teams a clearer view of risks that don't always surface through existing systems.",
                        ctaBody:
                            "<p>By analysing what students type, search and share across the platforms they use every day, it helps bring potential concerns into focus earlier, with the context you need to understand what's really going on.</p><p>Every serious alert is reviewed by our UK-based moderation team before it reaches you, reducing noise and ensuring the information you receive is relevant, timely and easier to act on.</p>",
                        ctaBannerText:
                            "Book a demo to see how Smoothwall Monitor can reveal students at risk that might otherwise go unnoticed or noticed too late.",
                        ctaButtonText: "Book a demo",
                        ctaImage: {
                            src: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Monitor-Context-1-1.png",
                            alt: "Smoothwall Monitor"
                        },
                        ctaMedBenefits: true
                    },
                    1: {
                        leadText:
                            "It appears you can see some areas where students could be at risk online, but there are still places they can go unseen.",
                        summaryText:
                            "<p>Not all safeguarding concerns show up in behaviour.</p><p>The first signs often appear in a student's online activity - whether that's someone becoming vulnerable, harmful interactions, or something more serious.</p><p>Being able to see the signs means you can step in before issues escalate.</p><p>Below you can learn the areas where these early signs can appear, and why they matter.</p>",
                        ctaTitle:
                            "Improving visibility across students' digital activity can make a real difference in keeping them safe.",
                        ctaIntro:
                            "Today, being able to see and stop potential risks in what students do, say and share online is critical:",
                        ctaBody:
                            "<p>Digital monitoring helps schools and academies recognise the safeguarding risks developing beyond the classroom, beyond physical supervision, and beyond what web filtering alone can see.</p>",
                        ctaBannerText:
                            "Speak to a Smoothwall expert about digital monitoring today",
                        ctaButtonText: "Book a call",
                        ctaImage: {
                            src: "https://4139239.fs1.hubspotusercontent-na1.net/hub/4139239/hubfs/UK_FE_Monitoring-scroll.gif",
                            alt: "FE Monitoring Scroll"
                        },
                        ctaBenefits: true
                    },
                    0: {
                        leadText:
                            "It appears you have limited visibility into the digital risks your students could be facing, or are uncertain about what activity your current systems can reveal.",
                        summaryText:
                            "<p>While filter reports and staff observations can provide useful safeguarding information, they don't show the full picture.</p><p>Some risks simply aren't visible through browsing activity alone. When safeguarding teams can't see those signals, important warning signs can be missed.</p><p>Below you can learn the areas where those signs may emerge, and how improved visibility can help safeguarding teams respond more quickly and confidently.</p>",
                        ctaTitle:
                            "Improving visibility across students' digital activity can make a real difference in keeping them safe.",
                        ctaIntro:
                            "Today, being able to see and stop potential risks in what students do, say and share online is critical:",
                        ctaBody:
                            "<p>Digital monitoring helps schools and academies recognise the safeguarding risks developing beyond the classroom, beyond physical supervision, and beyond what web filtering alone can see.</p>",
                        ctaBannerText:
                            "Speak to a Smoothwall expert about digital monitoring today",
                        ctaButtonText: "Book a call",
                        ctaImage: {
                            src: "https://4139239.fs1.hubspotusercontent-na1.net/hub/4139239/hubfs/UK_FE_Monitoring-scroll.gif",
                            alt: "FE Monitoring Scroll"
                        },
                        ctaBenefits: true
                    },
                },
                gateFormId: "e2930814-d498-4504-8774-ab8b813e1198"
            },
            "fe-colleges": {
                questions: [
                    {
                        text: "Can you see the websites/URLs your students visit on college devices?",
                        section: "Basic Online Visibility",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/VS-URL-window.png?width=860&t=1774285102160",
                    },
                    {
                        text: "Can the system you are using detect concerning Google searches made by students?",
                        section: "Search Activity",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/google.png?width=860&t=1775507838093",
                    },
                    {
                        text: "Can you see concerning searches on platforms like YouTube?",
                        section: "Search Activity",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/visibility-survey-FE-youtude-search%20(1).png?width=860&t=1777475820460",
                    },
                    {
                        text: "Can your system detect potential safeguarding risks in documents students are typing in (e.g. Word, Google Docs, PowerPoint etc)?",
                        section: "Documents & Collaboration",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/word1.png?width=860&t=1775507395521",
                    },
                    {
                        text: "Can you see potential safeguarding risks in student emails (even those not sent or deleted)?",
                        section: "Communication",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/email.png?width=860&t=1775508033151",
                    },
                    {
                        text: "Are you alerted to concerning messages students send through messaging platforms or chat tools?",
                        section: "Communication",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/visibility-survey-FE-Messaging-Platforms%20(1).png?width=860&t=1777475820750",
                    },
                    {
                        text: "Are you alerted to student risks from their digital activity, even if the device is used off college premises?",
                        section: "Device & Activity Visibility",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/visibility-survey-FE-athome%20(1).png?width=860&t=1777475820740",
                    },
                    {
                        text: "Can your system detect safeguarding risks in conversations students have with AI chatbots?",
                        section: "Emerging & Evolving Risks",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/visibility-survey-FE-aiadvice%20(1).png?width=860&t=1777475820631",
                    },
                    {
                        text: "Can your system easily link different online activities from the same student to identify concerning patterns of behaviour?",
                        section: "Connecting Dots",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Connected-Risks.png?width=860&t=1775507395340",
                    },
                    {
                        text: "Can your system detect safeguarding risks hidden in slang, coded language, emojis or abbreviations that students use?",
                        section: "Finding Hidden Meanings",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/emoji.png?width=860&t=1775507395381",
                    },
                    {
                        text: "When a potential safeguarding risk is detected, are staff alerted quickly enough to act before it escalates?",
                        section: "Alerts & Context",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Alerted.png?width=860&t=1775507395428",
                    },
                    {
                        text: "When an alert is raised, are you given enough context to understand the exact nature of the incident?",
                        section: "Alerts & Context",
                        points: 1,
                        icon: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/visibility-survey-FE-level3alert%20(1).png?width=860&t=1777475820581",
                    },
                ],
                sectionData: {
                    "Search Activity": {
                        text: "<p>Searches can often reveal the first sign that something isn’t right.</p><p>A student might search for information about self-harm, eating disorders, violence, or other harmful topics.</p><p>Recognising these moments gives safeguarding teams the chance to check in early and offer support when it matters most.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-FEsearch.png?width=860&t=1776858028461"
                    },
                    "Documents & Collaboration": {
                        text: "<p>Students use shared documents and collaboration tools as spaces to express thoughts and feelings they may not say aloud.</p><p>These spaces can also be used to target fellow students with harmful comments.</p><p>Visibility of these spaces helps staff intervene sooner and protect students from harm that would otherwise go unnoticed.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-FEDocuments.png?width=860&t=1776858028412"
                    },
                    "Communication": {
                        text: "<p>Email, chat platforms and messaging tools can be where arguments escalate, bullying takes hold, or students are contacted by others in ways that put them at risk.</p><p>Having visibility across these conversations helps safeguarding teams step in earlier and maintain a safer digital environment.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-FECommunication.png?width=860&t=1776858028600"
                    },
                    "Connecting Dots": {
                        text: "<p>A single message or search viewed in isolation is unlikely to tell the full story of what's going on in a student's life.</p><p>But when safeguarding teams can connect the dots across a student’s digital activity, patterns can start to emerge.</p><p>This means concerns such as self-harm, coercion, eating disorders, grooming and suicidal ideation can reveal themselves - even when they’re not expressed directly.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-FEConnectingdots.png?width=860&t=1776858028326"
                    },
                    "Finding Hidden Meanings": {
                        text: "<p>Emojis, acronyms and everyday phrases don’t always mean what you think they do.</p><p>For students, they can carry hidden meanings - sometimes used to disguise behaviour or conversations that signal a safeguarding concern.</p><p>A single message might not raise eyebrows. But repeated phrases, shifts in tone, or changes in behaviour over time can signal something deeper.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-FEhiddenmeanings.png?width=860&t=1776858028328"
                    },
                    "Alerts & Context": {
                        text: "<p>Spotting a concern is only the beginning.</p><p>What really helps staff respond effectively is having the right information at the right moment.</p><p>Clear alerts, delivered with the surrounding context of what happened, allow safeguarding teams to understand the situation quickly and take the most appropriate next step to support the student.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-schools-Alertscontext.png?width=860&t=1776704325573"
                    },
                    "Device & Activity Visibility": {
                        text: "<p>Digital risks don’t stop at the college gates.</p><p>If your students are taking college-owned devices home with them, you need to ensure that you can still see potential risk even when the device is away from the college network, so that these concerns can be picked up quickly when they reconnect.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-FEDeviceatHome.png?width=860&t=1776858028600"
                    },
                    "Emerging & Evolving Risks": {
                        text: "<p>Students adapt quickly to new technologies.</p><p>From AI tools and new social platforms, to coded language used to disguise meaning, online behaviour is constantly evolving.</p><p>Education settings need to stay aware of these changes in order to recognise risks that may appear in new and unexpected ways.</p>",
                        image: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/uk_smw_2026_visibilitysurvey-endcards-FENewrisks.png?width=860&t=1776858028563"
                    }
                },
                furtherInfo: {
                    monitor: {
                        heading: "Further information on Monitor",
                        links: [
                            {
                                url: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Smoothwall%20Product%20Brochures/Smoothwall%20Monitor%20Product%20Brochure.pdf",
                                imgSrc: "https://4139239.fs1.hubspotusercontent-na1.net/hub/4139239/hubfs/UK_SMW_site_brochure_thumbnails-monitor-1.jpg?width=553&height=782&name=UK_SMW_site_brochure_thumbnails-monitor-1.jpg",
                                imgAlt: "Smoothwall Monitor Brochure",
                            },
                            {
                                url: "https://smoothwall.com/hubfs/UK-SMW-2025-Human-Moderated%20Digital%20Monitoring%20Factsheet.pdf",
                                imgSrc: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/UK-SMW-2025-Human-Moderated-Digital-Monitoring-Factsheet-(1)-1.jpg",
                                imgAlt: "Human Moderated Digital Monitoring Factsheet",
                            },
                        ],
                        video: {
                            videoUrl:
                                "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/UK%20Product%20Videos/Smoothwall%20Monitor.mp4",
                        },
                    },
                    monitoring: {
                        heading: "Learn more about digital monitoring",
                        links: [
                            {
                                url: "https://smoothwall.com/hubfs/UK%20Whitepapers/Smoothwall_2025_Digital_Monitoring_in_FE.pdf",
                                imgSrc: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Digital-Monitoring-in-FE-(1)-1-1.png",
                                imgAlt: "Digital Monitoring in FE",
                            },
                            {
                                url: "https://smoothwall.com/hubfs/Smoothwall%20by%20Qoria%20-%20Whitepapers%20(Rebranded)/Smoothwall%20-%20A%20Complete%20Guide%20to%20Digital%20Monitoring%20for%20College.pdf",
                                imgSrc: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/UK_SMW_2025_A-Complete-Guide-to-Digital-Monitoring-FE-College-v2-(1)-1.png",
                                imgAlt: "Guide to Digital Monitoring for FE Colleges",
                            }
                        ],
                        video: {
                            videoUrl: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Smoothwall%20Site%20Videos/UK_SMW_2025_ROUNDTABLE_FINAL_FE-LR.mp4",
                            poster: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/FE-Roundtable-Discussion.png?width=860"
                        },
                    },
                },
                scoreContentMap: {
                    4: {
                        leadText:
                            "It appears you have complete visibility of the risks students may face in their digital lives.",
                        summaryText:
                            "<p>This level of visibility makes it easier for safeguarding teams to identify concerns early and provide support when it’s needed most.</p><p>However, as students’ digital lives continue to evolve, new behaviours, platforms and risks can emerge.</p><p>Even well-established monitoring approaches should be regularly reviewed to ensure they continue to provide the right level of insight.</p>",
                        ctaTitle:
                            "See the signs of students at risk with Smoothwall Monitor",
                        ctaIntro:
                            "Smoothwall Monitor combines advanced monitoring technology with human moderation to help safeguarding teams gain clear, reliable insight into student digital behaviour.",
                        ctaBody:
                            "<p>By surfacing safeguarding concerns alongside the context surrounding them, Monitor helps DSLs understand risks and take the appropriate next steps with confidence.</p><p>Even if your FE college already uses a digital monitoring tool, it may be worth asking whether you have full visibility across the evolving platforms and behaviours students engage with online.</p>",
                        ctaBannerText: "See how Smoothwall Monitor compares",
                        ctaButtonText: "Book a demo",
                        ctaImage: {
                            src: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Monitor-Records-2-1.png",
                            alt: "Smoothwall Monitor"
                        },
                    },
                    3: {
                        leadText:
                            "It appears that you have strong visibility into the risks your students may face in their digital lives.",
                        summaryText:
                            "<p>This kind of visibility makes it easier to spot concerns early and step in when it matters most.</p><p>But students’ online habits shift all the time. New platforms come in, behaviours change, and different risks follow.</p><p>It’s easy for monitoring to lose pace if it’s not reviewed. That’s why it’s worth taking a fresh look at your current approach.</p><p>Below are a few areas to explore with your current monitoring provider — so you can remain a step ahead of the risks your students may face.</p>",
                        ctaTitle:
                            "See the signs of students at risk with Smoothwall Monitor",
                        ctaIntro:
                            "Smoothwall Monitor combines advanced monitoring technology with human moderation to help safeguarding teams gain clear, reliable insight into student digital behaviour.",
                        ctaBody:
                            "<p>By surfacing safeguarding concerns alongside the context surrounding them, Monitor helps DSLs understand risks and take the appropriate next steps with confidence.</p><p>Even if your FE college already uses a digital monitoring tool, it may be worth asking whether you have full visibility across the evolving platforms and behaviours students engage with online.</p>",
                        ctaBannerText: "See how Smoothwall Monitor compares",
                        ctaButtonText: "Book a demo",
                        ctaImage: {
                            src: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Monitor-Records-2-1.png",
                            alt: "Smoothwall Monitor"
                        },
                    },
                    2: {
                        leadText:
                            "It appears you have some visibility into potential student risks beyond what web filtering alone can provide.",
                        summaryText:
                            "<p>Important steps have been taken to strengthen digital safeguarding.</p><p>However, there are some areas where warning signs could be easier to identify or connect.</p><p>As students spend more of their lives online, safeguarding risks can appear across multiple platforms and activities.</p><p>Below you can learn the areas where those signs may emerge, and how improved visibility can help safeguarding teams respond more quickly and confidently.</p>",
                        ctaTitle:
                            "Understand where Smoothwall can help close the visibility gap",
                        ctaIntro:
                            "Smoothwall Monitor gives safeguarding teams a clearer view of risks that don’t always surface through existing systems.",
                        ctaBody:
                            "<p>By analysing what students type, search and share across the platforms they use every day, it helps bring potential concerns into focus earlier, with the context you need to understand what’s really going on.</p><p>Every serious alert is reviewed by our UK-based moderation team before it reaches you, reducing noise and ensuring the information you receive is relevant, timely and easier to act on.</p>",
                        ctaBannerText:
                            "Book a demo to see how Smoothwall Monitor can reveal students at risk that might otherwise go unnoticed or noticed too late.",
                        ctaButtonText: "Book a demo",
                        ctaImage: {
                            src: "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/Monitor-Context-1-1.png",
                            alt: "FE Monitoring Scroll"
                        },
                        ctaMedBenefits: true
                    },
                    1: {
                        leadText:
                            "It appears you can see some areas where students could be at risk online, but there are still places they can go unseen.",
                        summaryText:
                            "<p>Not all safeguarding concerns show up in behaviour.</p><p>The first signs often appear in a student’s online activity - whether that’s someone becoming vulnerable, harmful interactions, or something more serious.</p><p>Being able to see the signs means you can step in before issues escalate.</p><p>Below you can learn the areas where these early signs can appear, and why they matter.</p>",
                        ctaTitle:
                            "Improving visibility across students' digital activity can make a real difference in keeping them safe.",
                        ctaIntro:
                            "Today, being able to see and stop potential risks in what students do, say and share online is critical:",
                        ctaBody:
                            "<p>Digital monitoring helps FE colleges recognise the safeguarding risks developing beyond the classroom, beyond physical supervision, and beyond what web filtering alone can see.</p>",
                        ctaBannerText:
                            "Speak to a Smoothwall expert about digital monitoring today",
                        ctaButtonText: "Book a call",
                        ctaImage: {
                            src: "https://4139239.fs1.hubspotusercontent-na1.net/hub/4139239/hubfs/UK_FE_Monitoring-scroll.gif",
                            alt: "FE Monitoring Scroll"
                        },
                        ctaBenefits: true
                    },
                    0: {
                        leadText:
                            "It appears you have limited visibility into the digital risks your students could be facing, or are uncertain about what activity your current systems can reveal.",
                        summaryText:
                            "<p>While filter reports and staff observations can provide useful safeguarding information, they don’t show the full picture.</p><p>Some risks simply aren’t visible through browsing activity alone. When safeguarding teams can’t see those signals, important warning signs can be missed.</p><p>Below you can learn the areas where those signs may emerge, and how improved visibility can help safeguarding teams respond more quickly and confidently.</p>",
                        ctaTitle:
                            "Improving visibility across students’ digital activity can make a real difference in keeping them safe.",
                        ctaIntro:
                            "Today, being able to see and stop potential risks in what students do, say and share online is critical:",
                        ctaBody:
                            "<p>Digital monitoring helps FE colleges recognise the safeguarding risks developing beyond the classroom, beyond physical supervision, and beyond what web filtering alone can see.</p>",
                        ctaBannerText:
                            "Speak to a Smoothwall expert about digital monitoring today",
                        ctaButtonText: "Book a call",
                        ctaImage: {
                            src: "https://4139239.fs1.hubspotusercontent-na1.net/hub/4139239/hubfs/UK_FE_Monitoring-scroll.gif",
                            alt: "FE Monitoring Scroll"
                        },
                        ctaBenefits: true
                    }
                },
                gateFormId: "e2930814-d498-4504-8774-ab8b813e1198"
            },
        };
        return {
            questions: configs[version]?.questions || [],
            sectionData: configs[version]?.sectionData || {},
            furtherInfo: configs[version]?.furtherInfo || {},
            scoreContentMap: configs[version]?.scoreContentMap || {},
            gateFormId: appWrapper.dataset.gate || configs[version]?.gateFormId || ""
        };
    }

    function createSurveyController(refs, config) {

        const isGated = (appWrapper.dataset.gated !== undefined); // boolean

        const state = {
            currentIndex: 0,
            answers: Array(config.questions.length).fill(null),
            isTransitioning: false,
            userResponses: [],
            gateForm: null,
            finalScore: 0
        }

        function hideScreens() {
            if (refs.screenQuestion) refs.screenQuestion.style.display = "none";
            if (refs.screenResult) refs.screenResult.style.display = "none";
        }

        function attachEventListeners() {
            refs.btnStart.addEventListener("click", start);
            refs.btnBack.addEventListener("click", goBack);
            refs.btnNext.addEventListener("click", goNext);
            refs.btnSubmit.addEventListener("click", submit);

            refs.optionBtns.forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    answerQuestion(e.currentTarget)
                });
            })
        }
    
        const btnSkip0 = appWrapper.querySelector("#btn-skip-0");
        if (btnSkip0) {
            function skip(score) {
                const numCorrect = Math.floor((score / 100) * state.answers.length);
                state.answers.fill("No");
                state.answers.fill("Yes", 0, numCorrect);
                state.finalScore = calculateScore();
                showResults();
            }

            // Skip buttons for dev
            const btnSkip0 = appWrapper.querySelector("#btn-skip-0");
            const btnSkip1 = appWrapper.querySelector("#btn-skip-1");
            const btnSkip2 = appWrapper.querySelector("#btn-skip-2");
            const btnSkip3 = appWrapper.querySelector("#btn-skip-3");
            const btnSkip4 = appWrapper.querySelector("#btn-skip-4");

            btnSkip0.addEventListener("click", () => {skip(0);});
            btnSkip1.addEventListener("click", () => {skip(30);});
            btnSkip2.addEventListener("click", () => {skip(60);});
            btnSkip3.addEventListener("click", () => {skip(80);});
            btnSkip4.addEventListener("click", () => {skip(100);});
        }

        function init() {
            attachEventListeners();
            hideScreens();
            renderGateForm(config.gateFormId);
        }
        
        function start() {
            appWrapper.classList.add("bg-questions");
            loadQuestion();
            switchScreen(refs.screenIntro, refs.screenQuestion);
        }
        
        function goNext() {
            if (state.isTransitioning || state.answers[state.currentIndex] === null) return;
            if (state.currentIndex < config.questions.length - 1) {
                transitionToQuestion(state.currentIndex + 1);
            } else {
                renderNavButtons(state.currentIndex, state.answers[state.currentIndex] !== null, config.questions.length);
                submit(isGated);
            }
        }

        function goBack() {
            if (state.isTransitioning || state.currentIndex === 0) return;
            transitionToQuestion(state.currentIndex - 1);
        }

        function renderQuestionText(question) {
            const questionTextEl = refs.questionText;
            if (state.currentIndex != 0) {
                questionTextAnimation(question);
            } else {
                questionTextEl.innerText = question.text;
            }
        }

        function renderQuestionIcon(question) {
            const questionIconBgEl  = refs.dynamicQuestionIcon2;
            const questionIconEl    = refs.dynamicQuestionIcon;

            questionIconBgEl.src = question.icon;
            questionIconEl.classList.remove("show");

            setTimeout(() => {
                questionIconEl.src = question.icon;
                setTimeout(() => {
                    questionIconEl.classList.add("show");
                }, 300);
            }, 500);
        }
        
        async function questionTextAnimation(question) {
            const questionText   = refs.questionTextContainer;
            const questionTextEl = refs.questionText;

            const oldHeight = refs.questionTextContainer.getBoundingClientRect().height;
            questionText.style.height = `${oldHeight}px`;

            questionTextEl.classList.remove('show');

            await new Promise(resolve => setTimeout(resolve, 150));

            questionTextEl.innerText = question.text;
            questionText.style.height = 'auto';

            const newHeight = questionTextEl.getBoundingClientRect().height;

            questionText.style.height = `${oldHeight}px`;
            questionText.offsetHeight;
            questionText.style.height = `${newHeight}px`;

            await new Promise(resolve => setTimeout(resolve, 150));

            questionTextEl.classList.add("show");

            setTimeout(() => {
                questionText.style.height = 'auto';
            }, 300);
        }

        function renderProgress(index, length) {
            const progressPercent =
                ((index + 1) / length) * 100;
            refs.progressFill.style.width = progressPercent + "%";
            refs.progressText.innerText = `${index + 1} / ${length}`;

        }

        function renderSelectedAnswer() {
            refs.optionBtns.forEach((btn) => {
                btn.classList.remove("selected");
            })
            if (state.answers[state.currentIndex] !== null) {
                //const selectedBtn = appWrapper.querySelector(
                //    `.option-btn[data-value="${state.answers[state.currentIndex]}"]`,
                //);
                const selectedBtn = refs.questionWrapper.querySelector(`[data-value="${state.answers[state.currentIndex]}"]`);

                if (selectedBtn) {
                    selectedBtn.classList.add("selected");
                    console.log("selected btn: ", selectedBtn);
                }
            }
        }

        function renderNavButtons(index, hasAnswer, length) {
            refs.btnBack.classList.add("hidden");
            refs.btnNext.classList.add("hidden");
            refs.btnSubmit.classList.add("hidden");

            if (index != 0) {
                refs.btnBack.classList.remove("hidden");
            }

            if (hasAnswer) {
                if (index == length - 1) {
                    refs.btnSubmit.classList.remove("hidden");
                } else {
                    refs.btnNext.classList.remove("hidden");
                }
            }
        }

        function loadQuestion() {
            const question = config.questions[state.currentIndex];

            renderQuestionText(question);
            renderQuestionIcon(question);
            renderProgress(state.currentIndex, config.questions.length);
            renderSelectedAnswer();
            renderNavButtons(state.currentIndex, state.answers[state.currentIndex] !== null, config.questions.length);
        }

        function answerQuestion(element) {
            if (state.isTransitioning) return;

            const btnAnswer = element.getAttribute("data-value");
            state.answers[state.currentIndex] = btnAnswer;

            refs.optionBtns.forEach((btn) => btn.classList.remove("selected"));
            element.classList.add("selected");
            setTimeout(() => {
                goNext();
            }, 350);
            
        }

        function transitionToQuestion(newIndex) {
            state.isTransitioning = true;
            // refs.questionWrapper.style.opacity = 0;
            //refs.questionText.style.opacity = 0;
            setTimeout(() => {
                state.currentIndex = newIndex;
                loadQuestion();
                //refs.questionWrapper.style.opacity = 1;
                //refs.questionText.style.opacity = 1;
                setTimeout(() => {
                    state.isTransitioning = false;
                }, 300);
            }, 300);
        }

        function switchScreen(hideScreen, showScreen) {
            hideScreen.classList.add("hidden");
            setTimeout(() => {
                hideScreen.style.display = "none";
                showScreen.style.display = "block";
                setTimeout(() => showScreen.classList.remove("hidden"), 50);
            }, 300);
        }

        function submit(showGate) {
            if (state.isTransitioning || state.answers[state.currentIndex] === null) return;
            state.finalScore = calculateScore();
            if (showGate) {
                openGate();
            } else {
                showResults();
            }
        }
        
        function calculateScore() {
            let totalScore = 0;
            for (let i = 0; i < config.questions.length; i++) {
                console.log();
                state.userResponses.push({
                    question: config.questions[i].text,
                    section: config.questions[i].section,
                    answer: state.answers[i],
                });
                if (state.answers[i] === "Yes") {
                    totalScore +=
                        config.questions[i].points * (100 / config.questions.length);
                }
            }
            return Math.round(totalScore);
        }

        function renderGateForm(formId) {
            if(window.hbspt) {
                hbspt.forms.create({
                    portalId: "4139239",
                    formId: formId,
                    region: "na1",
                    target: "#gateFormContainer",
                    submitButtonClass: "survey-btn survey-btn-light d-block mt-4",
                    cssClass: 'hs-form form-light',
                    onFormReady: function($form) {
                        state.gateForm = $form; 
                    },
                    onFormSubmitted: function() {
                        refs.gateFormModal.hide(); 
                        showResults();
                    }
                });
            }
        }

        function openGate() {
            if (state.gateForm) {
                const scoreField = state.gateForm.querySelector('input[name="monitor_score"]');
                if(scoreField) { 
                    scoreField.value = state.finalScore; scoreField.dispatchEvent(new Event('change', {bubbles:true})); 
                }
                refs.gateFormModal.show();
            } else {
                console.log("Gating form failed to load.");
                showResults();
            }
        }

        function showResults() {
            refs.appContainer.classList.add("results-mode");
            appWrapper.classList.add("bg-results");
            refs.logoTarget.classList.add("hidden");
            
            //console.log(state.answers);
            //console.log(resultEls);
            //console.log(state.finalScore);

            generateInsightsHTML(resultEls, state.finalScore, state.userResponses, state);

            switchScreen(refs.screenQuestion, refs.screenResult);

            setTimeout(() => {
                animateScore(state.finalScore);
                setupScrollAnimations();
            }, 500);
        }

        return { init };
    }
    
    const config = getSurveyConfig(version);
    const surveyEls = {...collectFrameworkElements(appWrapper), ...collectSurveyElements(appWrapper)};
    const resultEls = {...collectFrameworkElements(appWrapper), ...collectResultElements(appWrapper)};

    const survey = createSurveyController(surveyEls, config);
    survey.init();

    function getScoreContent(score) {
        if (score === 100) {
            return config.scoreContentMap[4];
        } else if (score >= 76) {
            return config.scoreContentMap[3];
        } else if (score >= 41) {
            return config.scoreContentMap[2];
        } else if (score > 10) {
            return config.scoreContentMap[1];
        } else {
            return config.scoreContentMap[0];
        }
    }

    function generateInsightsHTML(refs, score, userResponses, state) {
        //console.log(state);
        function getResultContent() {
            if (state.finalScore >= 41) {
                return {
                    formToLoad: "409db216-dc2c-4d55-bdf0-dbe7f458dae2",
                    furtherInfoContent: config.furtherInfo.monitor
                }
            }
            return {            
                formToLoad: "0c68d7ea-3044-4f39-949f-f94145c0d34",
                furtherInfoContent: config.furtherInfo.monitoring
            }
        }

        const { formToLoad, furtherInfoContent} = getResultContent();
        const scoreContent = getScoreContent(state.finalScore);

        function renderScoreSummary() {
            refs.printFinalScore.innerText =     state.finalScore;
            refs.printLeadSpan.innerText =       scoreContent.leadText;
            refs.printSummarySpan.innerHTML =    scoreContent.summaryText;

            refs.screenFinalScore.innerText =    state.finalScore;
            refs.screenLeadSpan.innerText =      scoreContent.leadText;
            refs.screenSummarySpan.innerHTML =   scoreContent.summaryText;

        }

        function renderFurtherInfo() {
            refs.furtherInfoHeading.innerText =  furtherInfoContent.heading;
            refs.furtherInfoGrid.insertAdjacentHTML('afterbegin', (furtherInfoContent.links).map(link => `
                                                    <div class="col-6 col-md-3">
                                                        <a href="${link.url}" target="_blank" class="fi-card">
                                                            <img src="${link.imgSrc}" alt="${link.imgAlt}">
                                                        </a>
                                                    </div>
                                                `).join(''));

            if (furtherInfoContent.video) {
                if (furtherInfoContent.video.poster) {
                    refs.furtherInfoVideo.querySelector("video").poster = furtherInfoContent.video.poster;
                }
                if (furtherInfoContent.links.length > 2) {
                    refs.furtherInfoVideo.parentElement.classList.add("col-md-12");
                }
                refs.furtherInfoVideo.classList.remove("hidden");
            }

        }

        function printForm(formId) {
            if (window.hbspt) {
                hbspt.forms.create({
                    portalId: "4139239",
                    formId: formId,
                    region: "na1",
                    cssClass: 'hs-form form-light',
                    submitButtonClass: "survey-btn survey-btn-light d-block mt-4",
                    target: "#formContainer",
                });
                formRendered = true;
                currentFormId = formId;
            } else {
                refs.formContainer.innerHTML = 
                '<h2 class="modal-title text-center" id="formModalLabel">Unable to load form script. Please check your connection.</h2>';
            }
        }

        function renderCtaSection() {
            refs.screenCtaTitle.innerText =  scoreContent.ctaTitle;
            refs.screenCtaTitle2.innerText =  scoreContent.ctaTitle;
            refs.screenCtaIntro.innerHTML =  scoreContent.ctaIntro;
            refs.screenCtaIntro2.innerHTML =  scoreContent.ctaIntro;
            refs.screenCtaBody.innerHTML =   scoreContent.ctaBody;
            refs.screenCtaImages.innerHTML = `<img src="${scoreContent.ctaImage.src}?width=700" class="cta-monitor-img-clean" onerror="this.parentElement.style.display='none'">`;

            refs.screenCtaBannerText.innerText = scoreContent.ctaBannerText;
            refs.screenCtaBannerBtn.innerText = scoreContent.ctaButtonText;
            
            refs.screenCtaBannerBtn.addEventListener("click", function() {
                    printForm(formToLoad);
                    refs.formModal.show();
                });

            if (score >= 76) {
                //refs.screenCta.querySelector("#ctaIntro1").classList.remove("hidden");
                refs.screenCta.querySelector("#ctaIntro2").classList.remove("hidden");
            } else {
                refs.screenCta.querySelector("#ctaIntro1").classList.remove("hidden");
                refs.screenCtaBody.classList.add("lead");
                if (scoreContent.ctaBenefits) {
                    refs.screenCtaBenefits1.classList.remove("hidden");
                } else if (scoreContent.ctaMedBenefits) {
                    refs.screenCtaBenefits2.classList.remove("hidden");
                }
            }

        }

        function renderRecommendations() {
            function renderTabsPanel(section, index){
                const newPanel = document.createElement("template");
                newPanel.innerHTML = `
                    <div class="tab-pane fade ${ index == 0 ? "show active" : ""}" id="${index}-tab-pane" role="tabpanel" aria-labelledby="${index}-tab" tabindex="0">
                    <div class="rec-content-inner flex-row row">
                        <div class="col-12 col-md">
                            <h4>${section}</h4>
                            ${config.sectionData[section].text}
                        </div>
                        <div class="col-12 col-md">
                            <div class="rec-image-inner" style="background-image: url('${config.sectionData[section].image}');"></div>
                        </div>
                        </div>
                    </div>
                `;
                return newPanel.content;
            }

            function renderTabsTab(section, index){
                const newNavItem = document.createElement("template");
                newNavItem.innerHTML = `<button class="rec-tab ${ index == 0 ? "active" : ""}" data-bs-toggle="tab" data-bs-target="#${index}-tab-pane" type="button" role="tab" aria-controls="${index}-tab-pane" aria-selected=${ index == 0 ? "true" : "false"} data-section="${section}"><span>${section}</span></button>`;
                return newNavItem.content;
            }

            function renderTabs(sections) {
                const recNav = refs.recommendations.querySelector(".rec-nav");
                const recPanels = refs.recommendations.querySelector(".rec-display-area");

                let sectionIndex = 0;
                sections.forEach((section) => {
                    if (config.sectionData[section]) {
                        recNav.appendChild(renderTabsTab(section, sectionIndex));
                        recPanels.appendChild(renderTabsPanel(section, sectionIndex));
                        sectionIndex++;
                    }
                })
            }

            function renderPrintRecommendations(sections) {
                refs.printRecommendations.innerHTML = sections.map((section) => `
                    <div class="print-section">
                        <hr>
                        <h3>${section}</h3>
                        ${config.sectionData[section].text}
                    </div>
                    `).join("");
            }

            const missedSections = new Set();
            userResponses.forEach((res) => {
                if (res.answer === "No" || res.answer === "Not sure") {
                    if (res.section !== "Basic Online Visibility")
                        missedSections.add(res.section);
                }
            });

            if (missedSections.size > 0) {
                //personalResultsBanner.classList.remove("hidden");
                const missedArray = Array.from(missedSections);
                renderTabs(missedArray);
                renderPrintRecommendations(missedArray);
                //recommendations.classList.remove("hidden");
                if (refs.resultsContainer) {
                    refs.resultsContainer.classList.remove("hidden");
                }
            }
        }

        function renderPrintAnswers() {
            refs.printFinalScore.innerText =     state.finalScore;
            refs.printLeadSpan.innerText =       scoreContent.leadText;
            refs.printSummarySpan.innerHTML =    scoreContent.summaryText;

           // console.log(userResponses);

            refs.printAnswers.innerHTML = userResponses.map((res) => {
                let printStyle =
                    res.answer === "No"
                        ? "color: red;"
                        : res.answer === "Not sure"
                            ? "color: orange;"
                            : "color: green;";
                return `
                    <div class="print-review-item">
                        <div class="print-review-q">${res.question}</div>
                        <div class="print-review-a">Response: <span style="${printStyle}">${res.answer}</span></div>
                    </div>
                `;
            }).join("");
        }

        renderScoreSummary();
        renderFurtherInfo();
        renderCtaSection();
        renderRecommendations();
        renderPrintAnswers();


        refs.btnPrint.addEventListener("click", function() {window.print()});
        refs.btnReload.addEventListener("click", function() {location.reload();});
    }

    function animateScore(targetScore) {
        const circle = appWrapper.querySelector("#progress-circle");
        const scoreText = appWrapper.querySelector("#scoreNumber");
        if (!circle || !scoreText) return;

        const maxDash = 502.65;
        const offset = maxDash - maxDash * (targetScore / 100);
        circle.style.strokeDashoffset = offset;

        let currentNum = 0;
        const duration = 2000;
        const intervalTime = 20;
        const steps = duration / intervalTime;
        const increment = targetScore / steps;

        const timer = setInterval(() => {
            currentNum += increment;
            if (currentNum >= targetScore) {
                currentNum = targetScore;
                clearInterval(timer);
            }
            scoreText.innerText = Math.round(currentNum);
        }, intervalTime);
    }

    function setupScrollAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    }
                });
            },
            { threshold: 0.15 },
        );

        appWrapper.querySelectorAll(".fade-in-section").forEach((el) => {
            observer.observe(el);
        });
    }
});

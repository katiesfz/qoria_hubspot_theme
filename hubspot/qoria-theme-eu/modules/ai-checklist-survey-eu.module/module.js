document.addEventListener('DOMContentLoaded', () => {

    const aiSurveyContainer = document.getElementById("surveyContainer");

    const formId = aiSurveyContainer.dataset.formId;
    const hubId = aiSurveyContainer.dataset.hubId;

    // --- GLOBAL VARIABLES ---
    let protectPctGlobal = 0;
    let detectPctGlobal = 0;
    let empowerPctGlobal = 0;
    let overallAverageGlobal = 0;
    let hubspotForm = null; 
    let finalData = {};
    let gotDetails = false;
    let contactDetails = {};


    const surveyFormModal = new bootstrap.Modal('#surveyFormModal', {
            keyboard: false,
            backdrop: 'static'
        });

    const monitoringCollapse = new bootstrap.Collapse('#monitoring_details_container', {
        toggle: false
    })
        
    // Check initial radio state
    const parentInit = document.querySelector('input[name="q_mon_parent"]:checked');
    if(parentInit && (parentInit.value === 'No' || parentInit.value === 'Not Sure')) {
        monitoringCollapse.hide();
        // showMonitoring(false);
    }

    // --- HUBSPOT FORM INIT ---

    function buildForm() {
        if(window.hbspt) {
            hbspt.forms.create({
                portalId: hubId,
                formId: formId,
                region: "eu1",
                target: "#hubspotFormTarget",
                submitButtonClass: "btn btn-light d-block mt-4",
                cssClass: 'hs-form form-light',
                onFormReady: function($form) {
                    hubspotForm = $form[0]; 
                },
                onFormSubmitted: function($form, data) {
                    surveyFormModal.hide();
                    gotDetails == true;
                    contactDetails = data.submissionValues;
                    calculateAndShowResults();
                    buildForm();
                }
            });
        }
    }

    window.addEventListener('load', function() {
        buildForm();
    });

    // --- NAVIGATION & LOGIC ---

    function showMonitoring(bool) {
        const container = document.getElementById('monitoring_details_container');
        if (bool) {
            container.classList.remove('collapsed');
        } else {
            container.classList.add('collapsed');
        }
    }

    function addPrintClasses() {
        const sections = Array.from(document.getElementsByClassName("dnd-section"));
        
        const nonSurveySections = sections.filter(parentElement => {
            const childWithClass = parentElement.querySelector("#surveyContainer");
            return !childWithClass;
        });

        nonSurveySections.forEach((section) => {
            section.classList.add("hide-on-print");
        });
    }

    function updateLeadWithScores(contactDetailsObject, scoreData) {
        const portalId = hubId;
        const formId = formId;
        const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

        const scoreData = {
            "protect_score": protectPctGlobal,
            "detect_score": detectPctGlobal,
            "empower_score": empowerPctGlobal
        };

        const updatedData = {
            ...contactDetailsObject,
            fields: additionalData.fields.map(field => {
                if (Object.hasOwn(scoreData, field.name)) {
                    return { ...field, value: updates[field.name] };
                }
                return field;
            })
        };

        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        }).then(() => console.log("Initial lead captured."));
    }


    function updateProgressBar(stepNumber) {
        const totalSteps = 5;
        const percentage = (stepNumber / totalSteps) * 100;
        const bar = document.getElementById('progressBar');
        if(bar) bar.style.width = percentage + '%';
        const text = document.getElementById('progressText');
        if(text) text.innerText = `Step ${stepNumber} of ${totalSteps}`;
    }

    function isStepValid(stepElement) {
        const parentMon = document.querySelector('input[name="q_mon_parent"]:checked')?.value;
        const skipHidden = (parentMon === 'No' || parentMon === 'Not Sure');
        const radioGroups = new Set();
        const inputs = stepElement.querySelectorAll('input[type="radio"]');
        inputs.forEach(input => {
            if (skipHidden && (input.name === 'q15' || input.name === 'q16' || input.name === 'q17')) {
                return;
            }
            radioGroups.add(input.name);
        });
        for (let name of radioGroups) {
            const checked = stepElement.querySelector(`input[name="${name}"]:checked`);
            if (!checked) return false;
        }
        return true;
    }

    function nextStep(targetStep) {
        const currentStepEl = document.querySelector('.step.step-active');
        if (isStepValid(currentStepEl)) {
            if (targetStep == 2 && gotDetails == false) {
                openSoftGate();
            }
            currentStepEl.querySelector('.error-message').style.display = 'none';
            currentStepEl.classList.remove('step-active');
            document.getElementById('step' + targetStep).classList.add('step-active');
            updateProgressBar(targetStep);
            document.querySelector('.ai-survey').scrollIntoView({ behavior: 'smooth' });
        } else {
            currentStepEl.querySelector('.error-message').style.display = 'block';
        }
    }

    function prevStep(targetStep) {
        const currentStepEl = document.querySelector('.step.step-active');
        currentStepEl.classList.remove('step-active');
        document.getElementById('step' + targetStep).classList.add('step-active');
        updateProgressBar(targetStep);
        document.querySelector('.ai-survey').scrollIntoView({ behavior: 'smooth' });
    }

    function openSoftGate() {
        const currentStepEl = document.querySelector('.step.step-active');
        if (!isStepValid(currentStepEl)) {
            currentStepEl.querySelector('.error-message').style.display = 'block';
            return;
        }
        
        const formHeader = document.getElementById("formHeader");

        formHeader.innerHTML = `<h3 class="mb-6 border-top border-bottom border-dark py-3 border-2 fw-semibold px-2 d-none">
                                    Almost there!
                                </h3>
                                <p class="lead d-none">
                                    Please complete the form below to access your tailored AI checklist results.
                                </p>`;

        surveyFormModal.show();

        addPrintClasses();
    }

    
    function openHardGate() {
        const currentStepEl = document.querySelector('.step.step-active');
        if (!isStepValid(currentStepEl)) {
            currentStepEl.querySelector('.error-message').style.display = 'block';
            return;
        }
        
        calculateScores();
        
        if (hubspotForm) {

            let pIn = hubspotForm.querySelector('input[name="protect_score"]');
            if(pIn) {pIn.value = protectPctGlobal.toFixed(1); pIn.dispatchEvent(new Event('change', {bubbles:true}));}
            
            let dIn = hubspotForm.querySelector('input[name="detect_score"]');
            if(dIn) { dIn.value = detectPctGlobal.toFixed(1); dIn.dispatchEvent(new Event('change', {bubbles:true})); }
            
            let eIn = hubspotForm.querySelector('input[name="empower_score"]');
            if(eIn) { eIn.value = empowerPctGlobal.toFixed(1); eIn.dispatchEvent(new Event('change', {bubbles:true})); }
        
        } 
        
        if (gotDetails == false) {
            surveyFormModal.show();
        }
        
        if (gotDetails == true) {
            // resubmit form with score


        }

        addPrintClasses();
    }

    function calculateAndShowResults() {
        calculateScores();

        let summaryHTML = '';
        document.querySelectorAll('.question-block').forEach((block) => {

            //if ((document.getElementById("monitoring_details_container").getAttribute('aria-expanded') == "false") && (block.closest("#monitoring_details_container"))) {
            //    return;
            //}
            
            const questionText = block.querySelector('.question-text').innerText;
            const checkedInput = block.querySelector('input:checked');
            let answer = 'Skipped';
            
            // Auto-fill hidden questions with parent answer
            if (!checkedInput && block.closest('#monitoring_details_container') && finalData.q15 === finalData.q_mon_parent) {
                answer = finalData.q_mon_parent; 
            } else if (checkedInput) {
                answer = checkedInput.value;
            }

            let ansClass = answer === 'Yes' ? 'ans-yes' : (answer === 'No' ? 'ans-no' : 'ans-unsure');
            summaryHTML += `<div class="summary-item"><div class="s-quest">${questionText}</div><div class="s-ans ${ansClass}">${answer}</div></div>`;
        });

        document.getElementById('summaryList').innerHTML = summaryHTML;

        document.getElementById('aiSurveyForm').style.display = 'none';
        document.querySelector('.ai-survey-progress-container').style.display = 'none';

        // Show Results
        document.getElementById('results').style.display = 'block';

        const [totalText, totalClass] = getStatus(overallAverageGlobal);
        document.getElementById('totalScoreValue').innerText = totalText;
        document.getElementById('totalScoreValue').className = `big-score ${totalClass}`;

        document.getElementById('protectBar').style.width = `${Math.min(100, protectPctGlobal)}%`;
        const [pText, pClass] = getStatus(protectPctGlobal);
        document.getElementById('protectStatus').innerHTML = `<span class="${pClass}">${pText}</span>`;
        
        document.getElementById('detectBar').style.width = `${Math.min(100, detectPctGlobal)}%`;
        const [dText, dClass] = getStatus(detectPctGlobal);
        document.getElementById('detectStatus').innerHTML = `<span class="${dClass}">${dText}</span>`;

        document.getElementById('empowerBar').style.width = `${Math.min(100, empowerPctGlobal)}%`;
        const [eText, eClass] = getStatus(empowerPctGlobal);
        document.getElementById('empowerStatus').innerHTML = `<span class="${eClass}">${eText}</span>`;

        document.getElementById('protectFeedback').innerHTML = generateProtectFeedback(finalData);
        document.getElementById('detectFeedback').innerHTML = generateDetectFeedback(finalData);
        document.getElementById('empowerFeedback').innerHTML = generateEmpowerFeedback(finalData);

        document.querySelector('.ai-survey').scrollIntoView({ behavior: 'smooth' });
    }

    function calculateScores() {
        const formEl = document.getElementById('aiSurveyForm');
        const formData = new FormData(formEl);
        const rawData = Object.fromEntries(formData.entries());
        
        const parentMon = rawData.q_mon_parent; 
        if (parentMon && parentMon !== 'Yes') {
            rawData.q15 = parentMon;
            rawData.q16 = parentMon;
            rawData.q17 = parentMon;
        }

        let protectScore = 0, detectScore = 0, empowerScore = 0;
        const protectMaxRaw = 13 * 10;
        const detectMaxRaw = 5 * 10; 
        const empowerMaxRaw = 9 * 10; 

        let protectFilteringFlags = 0; 
        let monitorRedFlags = 0; 
        let cloudRedFlag = false; 
        let empowerNegativeCount = 0;
        
        const isNeg = (ans) => (ans === 'No' || ans === 'Not Sure');

        let q20=rawData.q20, q24=rawData.q24, q25=rawData.q25, q26=rawData.q26, q27=rawData.q27;

        for (let i=1; i<=27; i++) {
            let val;
            if (i === 14) val = rawData.q_mon_parent;
            else val = rawData['q'+i];

            let pts = (val === 'Yes') ? 10 : (val === 'No' ? -2 : 0);

            if(i<=13) {
                protectScore += pts;
                if(i>=10 && isNeg(val)) protectFilteringFlags++;
            } else if(i<=18) {
                detectScore += pts;
                if(i>=15 && i<=17 && isNeg(val)) monitorRedFlags++;
                if(i===18 && isNeg(val)) cloudRedFlag = true;
            } else {
                empowerScore += pts;
            }
        }

        protectScore = Math.max(0, protectScore);
        detectScore = Math.max(0, detectScore);
        empowerScore = Math.max(0, empowerScore);

        protectPctGlobal = (protectScore / protectMaxRaw) * 100;
        detectPctGlobal = (detectScore / detectMaxRaw) * 100;
        empowerPctGlobal = (empowerScore / empowerMaxRaw) * 100;

        if (protectFilteringFlags >= 2) protectPctGlobal -= 0.6;
        if (monitorRedFlags >= 2) detectPctGlobal -= 0.5;
        if (cloudRedFlag) detectPctGlobal -= 0.2;

        if (isNeg(q20)) empowerNegativeCount++;
        if (isNeg(q24)) empowerNegativeCount++;
        if (isNeg(q25)) empowerNegativeCount++;
        if (isNeg(q26)) empowerNegativeCount++;
        if (isNeg(q27)) empowerNegativeCount++;
        
        if (empowerNegativeCount >= 3) empowerPctGlobal -= 0.8;
        if (q20==='Yes' && q24==='Yes' && q25==='Yes' && isNeg(q27)) empowerPctGlobal -= 0.2;

        protectPctGlobal = Math.max(0, protectPctGlobal);
        detectPctGlobal = Math.max(0, detectPctGlobal);
        empowerPctGlobal = Math.max(0, empowerPctGlobal);
        overallAverageGlobal = (protectPctGlobal + detectPctGlobal + empowerPctGlobal) / 3;

        finalData = rawData; 
    }

    function countAnswers(data, startQ, endQ, answerType) {
        let count = 0;
        for (let i = startQ; i <= endQ; i++) {
            let val;
            if(i===14) val = data.q_mon_parent;
            else val = data['q'+i];
            if (val === answerType) count++;
        }
        return count;
    }

    function getStatus(percentage) {
        if (percentage >= 75) return ['Excellent', 'status-excellent'];
        if (percentage > 40) return ['Good', 'status-good'];
        if (percentage > 15) return ['Fair', 'status-fair'];
        return ['Getting started', 'status-started'];
    }

    // --- GENERATORS ---

    function generateProtectFeedback(data) {
        const yesCount = countAnswers(data, 1, 13, 'Yes');
        const notSureCount = countAnswers(data, 1, 13, 'Not Sure');
        const total = 13;

        if (yesCount === total) {
            return "<p>You are currently doing everything relatively possible to keep students safe against AI risks. Your focus now should be on monitoring and evaluating these measures regularly to ensure there are no gaps and that policies continue to align as AI usage evolves both inside and outside the classroom.</p>";
        }

        let intro = "";

        let points = [];

        if (data.q6 !== 'Yes') {
            points.push("<strong>Establish an AI Policy:</strong> Establishing a dedicated AI policy is a priority to provide clarity for staff and students. For support in creating one, see our guide on building an effective AI policy.");
        } else if (data.q7 !== 'Yes') {
            points.push("<strong>Cross-reference your policies:</strong> You have an AI policy, which is excellent. However, it is valuable to cross-reference this with your other statutory policies (e.g., Safeguarding, Acceptable Use) to ensure there is no conflict or ambiguity.");
        }

        if (data.q1 === 'No' || data.q1 === 'Not Sure') {
                points.push("<strong>Review Unesco guidance around safe AI use:</strong> Reviewing the <a href='https://unesdoc.unesco.org/ark:/48223/pf0000386693' target='_blank' rel='nofollow noopener'>Unesco guidance on generative AI</a> is a strong starting point to learn recommendations for schools.");
        }

        if (data.q8 === 'Yes' && data.q9 !== 'Yes') {
            points.push("<strong>Put in place a risk assessment process:</strong> While you have assessed current tools, it is equally important to formalise a process for risk-assessing any new AI tools before they are introduced to the setting to prevent the use of unapproved or insecure alternatives.");
        }
        if (data.q8 !== 'Yes') {
            points.push("<strong>Conduct regular risk assessments:</strong> Conducting thorough risk assessments (DPIAs) for all AI tools currently in use is a crucial step to identify data privacy and safeguarding risks.");
        }

        if (data.q11 !== 'Yes') {
            const context = data.q11 === 'Not Sure' ? "You should consider investigating if your web filter can" : "You should consider looking into your web filter to understand the extent to which it can";
            points.push(`<strong>Look into your web filtering:</strong> ${context} block harmful AI-generated content the moment it goes live. Without real-time filtering, there is potential for students to view harmful or inappropriate content generated by AI at speed. You may also want to check what capacity your filter has to blur image and video content generated by AI tools, as this can limit exposure to harmful or explicit images before they’re ever seen.`);
        }

        if (points.length === 0 && notSureCount <= 6) {
            points.push("<strong>Continuously review progress:</strong> Reviewing your risk assessments and ensuring all staff understand the reporting mechanisms for AI concerns.");
        }

        let introHTML = intro ? `<p>${intro}</p>` : '';
        return `${introHTML}<p>${points.join("</p><p>")}</p>`;
    }

    function generateDetectFeedback(data) {
        const parentMon = data.q_mon_parent;
        
        if (parentMon === 'No') {
            return `<p><strong>Consider digital monitoring:</strong> You appear not to have digital monitoring in place at the moment. Without it, it becomes extremely difficult to spot students who may be at risk online - often before those risks surface in the classroom.</p>
            <p>Digital harm doesn’t usually announce itself. Concerns linked to self-harm, mental health, bullying, sexual exploitation, radicalisation, harmful content and misuse of AI tools often show up first in what students type, search, or share digitally. Without monitoring, these early warning signs are easy to miss – meaning schools are left reacting later, when situations are more serious and harder to manage.</p>
            <p>Further information around digital monitoring can be found here - A complete guide to digital monitoring for schools.</p>`;
        }
        if (parentMon === 'Not Sure') {
            return `<p><strong>Find out if you have digital monitoring:</strong>  You appear uncertain about whether your setting currently uses digital monitoring to spot students at risk. It is worth having a conversation with individuals within your setting, such as your safeguarding team, IT leads or even senior leaders with safeguarding responsibilities, to determine what you have in place and the extent to which it can spot AI-related concerns.</p>`;
        }

        const yesCount = countAnswers(data, 15, 18, 'Yes'); 
        const notSureCount = countAnswers(data, 15, 18, 'Not Sure');

        if (yesCount === 4) {
            return "<p>Your detection strategy is comprehensive. Continue to monitor its effectiveness and ensure your DSLs are comfortable interpreting AI-related alerts as the technology evolves.</p>";
        }

        let adviceSegments = [];

        if (data.q15 === 'Yes' && data.q16 === 'Yes' && data.q18 !== 'Yes') {
            adviceSegments.push("<strong>Look at your cloud storage:</strong> Your approach to identifying students at risk through their digital behaviours appears strong, which is excellent. However, to ensure this visibility extends across your entire digital environment, we recommend reviewing your cloud storage protocols. As AI usage in the classroom continues to grow, education settings must be prepared for an increase in AI-generated content appearing on school drives. We recommend assessing your current visibility into images and videos stored in your cloud environment and evaluating how frequently these are checked for harmful or inappropriate content.");
        } 
        else if (notSureCount >= 2) {
            adviceSegments.push("<strong>Find out what your monitoring can and can't do:</strong> You seem unsure about the specifics of your monitoring capabilities regarding AI. We strongly recommend speaking with <strong>internal stakeholders (such as your DSL or IT Lead)</strong> and your monitoring provider to understand exactly what AI-related risks they can detect today.");
        }
        else {
            if (data.q15 === 'Yes' && (data.q16 !== 'Yes' || data.q17 !== 'Yes')) {
                adviceSegments.push("<strong>Consider the effectiveness of your monitoring against AI risks:</strong> You have monitoring in place, which is great. It is valuable to consider *how* effectively it detects serious risks. Automated keywords often miss context. Human-moderated systems can be significantly more effective at spotting subtle warning signs—such as emotional reliance on chatbots or coercion—providing peace of mind that risks beyond a teacher's eyes and ears are being picked up.");
            }
        }

        const bridgeTriggered = (data.q15 === 'Yes' && data.q16 === 'Yes' && data.q18 !== 'Yes');
        if (data.q18 !== 'Yes' && !bridgeTriggered) {
            const prefix = adviceSegments.length > 0 ? "As" : "As"; 
            adviceSegments.push(`<strong>Review your cloud storage:</strong> ${prefix} AI usage in the classroom continues to grow, education settings need to be prepared for an increase in AI-generated content appearing on school drives. We recommend assessing your current visibility into images and videos stored in your cloud storage and evaluating how often these are checked for harmful or inappropriate content.`);
        }

        if (adviceSegments.length === 0) {
                return "<p>Continue to monitor your detection systems regularly.</p>";
        }

        return `<p>${adviceSegments.join("</p><p>")}</p>`;
    }

    function generateEmpowerFeedback(data) {
        const yesCount = countAnswers(data, 19, 27, 'Yes');
        const notSureCount = countAnswers(data, 19, 27, 'Not Sure');

        if (yesCount === 9) {
            return "<p>You are doing an excellent job empowering your community. Your comprehensive approach to training and engagement sets a high standard. Keep this momentum going by regularly refreshing training materials.</p>";
        }

        let intro = "";
        let points = [];

        if (data.q19 === 'Yes' && data.q20 !== 'Yes') {
            points.push("<strong>Train staff on the safe use of AI tools:</strong> You have ensured staff know the rules (Code of Conduct), which is vital. The next step is to provide practical training on <i>how</i> to use these tools effectively and safely in the classroom.");
        }
        if (data.q19 !== 'Yes' && data.q20 !== 'Yes') {
                points.push("<strong>Prioritise staff training:</strong> Staff training appears to be a key area for development. Prioritise sessions that cover both the Code of Conduct and practical, safe usage of AI tools.");
        }

        if (data.q23 !== 'Yes') {
            points.push("<strong>Teach students how to use AI safely:</strong> When reviewing AI education, it’s important to ensure learning is age-appropriate. Expectations around topics such as AI use and ethics will naturally differ between younger pupils and those in Sixth Form.");
        }
        
        if (data.q24 !== 'Yes' || data.q25 !== 'Yes') { 
            points.push("<strong>Have a clear list of approved AI tools:</strong> Defining a clear list of approved AI tools can also help students engage with AI safely, reducing the likelihood of them turning to unverified or unsuitable platforms.");
        }

        if (data.q26 !== 'Yes' || data.q27 !== 'Yes') {
            points.push("<strong>Engage parents and carers around AI safeguarding:</strong> Finally, sharing clear, accessible guidance with parents and carers supports a whole-school approach to AI safety - helping to reinforce consistent messages both in school and beyond the school gates. Reviewing what information is currently shared can help ensure families feel informed and supported when it comes to AI.");
        }

        if (points.length === 0 && yesCount < 9) {
                points.push("<strong>Regularly engage staff and students around AI safeguarding:</strong> Continue to engage with staff and students to ensure they feel confident reporting AI-related issues.");
        }
        
        let introHTML = intro ? `<p>${intro}</p>` : '';

        return `${introHTML}<p>${points.join("</p><p>")}</p>`;
    }

    function handlePrint() {
        const feedbackDetails = document.querySelectorAll('details.feedback-dropdown');
        feedbackDetails.forEach(el => el.setAttribute('open', ''));

        const summaryAcc = document.getElementById('summaryAccordion');
        if(summaryAcc) summaryAcc.open = true;

        setTimeout(() => {
            window.print();
            setTimeout(() => {
                feedbackDetails.forEach(el => el.open = false);
                if(summaryAcc) summaryAcc.open = false;
            }, 500);
        }, 200);
    }

    function handleSkip(e) {
        if(e) e.preventDefault(); 
        surveyFormModal.hide();
        calculateAndShowResults();
    }

    // Button event handlers
    const nextButtons = document.getElementsByClassName('next-btn');
    for (let i = 0; i < nextButtons.length; i++) {
        nextButtons[i].addEventListener('click', function() {
            const step = this.getAttribute('data-step');
            nextStep(step);
        });
    }

    const backButtons = document.getElementsByClassName('back-btn');
    for (let i = 0; i < backButtons.length; i++) {
        backButtons[i].addEventListener('click', function() {
            const step = this.getAttribute('data-step');
            prevStep(step);
        });
    }

    document.getElementById('submitBtn').addEventListener('click', openHardGate);
    document.getElementById('printBtn').addEventListener('click', handlePrint);

    const skipBtn = document.getElementById('skipToResults');
    if(skipBtn) skipBtn.addEventListener('click', handleSkip);

    const monitoringRadios = document.querySelectorAll('input[name="q_mon_parent"]');
    let monitoringRadioPrev = null;

    for (let i = 0; i < monitoringRadios.length; i++) {
        monitoringRadios[i].addEventListener('change', function() {
            if (this.value === "Yes") {
                monitoringCollapse.show();
                //showMonitoring(true)
            } else {
                //showMonitoring(false)
                monitoringCollapse.hide();
            }
        });

    }
});
// --- SCORE VARIABLES (Global) ---
let protectPctGlobal = 0;
let detectPctGlobal = 0;
let empowerPctGlobal = 0;
let overallAverageGlobal = 0;

// --- HUBSPOT FORM INIT ---
window.addEventListener('load', function() {
    if(window.hbspt) {
        hbspt.forms.create({
            portalId: "4139239",
            formId: "f8279705-9592-4493-947a-a963f46f8c30",
            region: "na1",
            target: "#hubspotFormTarget",
            onFormReady: function($form) {
                // Populate Hidden Fields (if they exist)
                // Note: Ensure your HubSpot form has fields with these internal names and they are set to Hidden.
                const protectField = $form.find('input[name="ai_survey_protect_score"]');
                const detectField = $form.find('input[name="ai_survey_detect_score"]');
                const empowerField = $form.find('input[name="ai_survey_empower_score"]');
                
                if(protectField.length) protectField.val(Math.round(protectPctGlobal)).change();
                if(detectField.length) detectField.val(Math.round(detectPctGlobal)).change();
                if(empowerField.length) empowerField.val(Math.round(empowerPctGlobal)).change();
            },
            onFormSubmitted: function($form) {
                closeModal();
                calculateAndShowResults();
            }
        });
    }
});

const totalSteps = 5;

function updateProgressBar(stepNumber) {
    const percentage = (stepNumber / totalSteps) * 100;
    document.getElementById('progressBar').style.width = percentage + '%';
    document.getElementById('progressText').innerText = `Step ${stepNumber} of ${totalSteps}`;
}

function isStepValid(stepElement) {
    const radioGroups = new Set();
    const inputs = stepElement.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => radioGroups.add(input.name));
    for (let name of radioGroups) {
        const checked = stepElement.querySelector(`input[name="${name}"]:checked`);
        if (!checked) return false;
    }
    return true;
}

function nextStep(targetStep) {
    const currentStepEl = document.querySelector('.step.step-active');
    if (isStepValid(currentStepEl)) {
        currentStepEl.querySelector('.error-message').style.display = 'none';
        currentStepEl.classList.remove('step-active');
        document.getElementById('step' + targetStep).classList.add('step-active');
        updateProgressBar(targetStep);
        document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
    } else {
        currentStepEl.querySelector('.error-message').style.display = 'block';
    }
}

function prevStep(targetStep) {
    const currentStepEl = document.querySelector('.step.step-active');
    currentStepEl.classList.remove('step-active');
    document.getElementById('step' + targetStep).classList.add('step-active');
    updateProgressBar(targetStep);
    document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
}

// --- MODAL & PRE-CALC LOGIC ---
function openGate() {
    const currentStepEl = document.querySelector('.step.step-active');
    if (!isStepValid(currentStepEl)) {
        currentStepEl.querySelector('.error-message').style.display = 'block';
        return;
    }
    
    // 1. Calculate Scores immediately so they are ready for the hidden fields
    const formEl = document.getElementById('aiSurveyForm');
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData.entries());
    
    let protectScore = 0, detectScore = 0, empowerScore = 0;
    const protectMaxRaw = 13 * 10;
    const detectMaxRaw = 4 * 10;
    const empowerMaxRaw = 9 * 10;

    for (const [key, value] of Object.entries(data)) {
        const qNum = parseInt(key.replace('q', ''));
        let points = 0;
        if (value === 'Yes') points = 10;
        if (value === 'No') points = -2;
        if (value === 'Not Sure') points = 0;

        if (qNum <= 13) protectScore += points;
        else if (qNum >= 14 && qNum <= 17) detectScore += points;
        else if (qNum >= 18) empowerScore += points;
    }

    protectScore = Math.max(0, protectScore);
    detectScore = Math.max(0, detectScore);
    empowerScore = Math.max(0, empowerScore);

    protectPctGlobal = (protectScore / protectMaxRaw) * 100;
    detectPctGlobal = (detectScore / detectMaxRaw) * 100;
    empowerPctGlobal = (empowerScore / empowerMaxRaw) * 100;
    overallAverageGlobal = (protectPctGlobal + detectPctGlobal + empowerPctGlobal) / 3;


    // Initialise modal //

    const surveyFormModal = new bootstrap.Modal('#surveyFormModal', {
        keyboard: false
    });

    surveyFormModal.show();
}


// --- MAIN RESULTS LOGIC (Executed after Hubspot Submit) ---
function calculateAndShowResults() {
    const formEl = document.getElementById('aiSurveyForm');
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData.entries());

    // Hide Form
    document.getElementById('aiSurveyForm').style.display = 'none';
    document.querySelector('.progress-container').style.display = 'none';

    // Show Results
    document.getElementById('results').style.display = 'block';

    const [totalText, totalClass] = getStatus(overallAverageGlobal);
    document.getElementById('totalScoreValue').innerText = totalText;
    document.getElementById('totalScoreValue').className = `big-score ${totalClass}`;
    document.getElementById('totalScoreMax').innerText = ""; 

    // Update Bars
    document.getElementById('protectBar').style.width = `${Math.min(100, protectPctGlobal)}%`;
    const [pText, pClass] = getStatus(protectPctGlobal);
    document.getElementById('protectStatus').innerHTML = `<span class="${pClass}">${pText}</span>`;
    
    document.getElementById('detectBar').style.width = `${Math.min(100, detectPctGlobal)}%`;
    const [dText, dClass] = getStatus(detectPctGlobal);
    document.getElementById('detectStatus').innerHTML = `<span class="${dClass}">${dText}</span>`;

    document.getElementById('empowerBar').style.width = `${Math.min(100, empowerPctGlobal)}%`;
    const [eText, eClass] = getStatus(empowerPctGlobal);
    document.getElementById('empowerStatus').innerHTML = `<span class="${eClass}">${eText}</span>`;

    // Update Text
    document.getElementById('protectFeedback').innerHTML = generateProtectFeedback(data);
    document.getElementById('detectFeedback').innerHTML = generateDetectFeedback(data);
    document.getElementById('empowerFeedback').innerHTML = generateEmpowerFeedback(data);

    // GENERATE RESPONSE SUMMARY
    const summaryContainer = document.getElementById('summaryList');
    let summaryHTML = '';
    
    const blocks = document.querySelectorAll('.question-block');
    blocks.forEach((block) => {
        const questionText = block.querySelector('.question-text').innerText;
        const checkedInput = block.querySelector('input:checked');
        const answer = checkedInput ? checkedInput.value : 'Skipped';
        
        let ansClass = '';
        if(answer === 'Yes') ansClass = 'ans-yes';
        else if(answer === 'No') ansClass = 'ans-no';
        else ansClass = 'ans-unsure';

        summaryHTML += `
            <div class="summary-item">
                <div class="s-quest">${questionText}</div>
                <div class="s-ans ${ansClass}">${answer}</div>
            </div>
        `;
    });
    summaryContainer.innerHTML = summaryHTML;
    
    document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
}

function countAnswers(data, startQ, endQ, answerType) {
    let count = 0;
    for (let i = startQ; i <= endQ; i++) {
        if (data['q' + i] === answerType) count++;
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
    
    if (yesCount === 13) {
        return "<p>You are currently doing everything relatively possible to keep students safe against AI risks. Your focus now should be on monitoring and evaluating these measures regularly to ensure there are no gaps and that policies continue to align as AI usage evolves both inside and outside the classroom.</p>";
    }

    let intro = "";
    if (notSureCount > 6) {
        intro = "It appears that you may not currently have full oversight of the AI protection measures in place. This is completely understandable given how new this technology is. Your most valuable next step is to gather key stakeholders—such as your IT Lead, DSL, and Data Protection Officer—to investigate these areas further.";
    } else if (yesCount < 7) {
        intro = "Based on your results, it may be helpful to review your current approach to protecting students from AI-related risks. We recommend speaking with key stakeholders within your setting to build a clear understanding of what’s already in place—both in terms of practical safeguards and the policies that support keeping students safe online.";
    } else {
        intro = "You have laid a solid foundation for your Protect strategy. To strengthen this further, consider the following specific areas:";
    }

    let points = [];

    if (data.q6 !== 'Yes') {
        points.push("Establishing a dedicated AI policy is a priority to provide clarity for staff and students. For support in creating one, <a href='https://smoothwall.com/building-an-effective-ai-policy-for-uk-schools' target='_blank'>see our guide on building an effective AI policy for UK schools</a>.");
    } else if (data.q7 !== 'Yes') {
        points.push("You have an AI policy, which is excellent. However, it is valuable to cross-reference this with your other statutory policies (e.g., Safeguarding, Acceptable Use) to ensure there is no conflict or ambiguity.");
    }

    if (data.q1 === 'No' || data.q1 === 'Not Sure') {
            points.push("Reviewing the <a href='https://www.gov.uk/government/collections/using-ai-in-education-settings-support-materials' target='_blank'>Department for Education’s (DfE) guidance on generative AI</a> is a strong starting point to understand the government's position and recommendations for schools.");
    }

    if (data.q8 === 'Yes' && data.q9 !== 'Yes') {
        points.push("While you have assessed current tools, it is equally important to formalise a process for risk-assessing any *new* AI tools before they are introduced to the setting to prevent the use of unapproved or insecure alternatives.");
    }
    if (data.q8 !== 'Yes') {
        points.push("Conducting thorough risk assessments (DPIAs) for all AI tools currently in use is a crucial step to identify data privacy and safeguarding risks.");
    }

    if (data.q11 !== 'Yes') {
        const context = data.q11 === 'Not Sure' ? "investigating if your web filter can" : "looking into your web filter to understand the extent to which it can";
        points.push(`We would advise ${context} block harmful AI-generated content the moment it goes live. Without real-time filtering, there is potential for students to view harmful or inappropriate generated by AI at speed. We would also suggest looking into what capacity your filter can currently blur image and video content generated by AI tools as this can limit exposure of preventing exposure to harmful or explicit images before they’re ever seen.`);
    }

    if (points.length === 0 && notSureCount <= 6) {
        points.push("Reviewing your risk assessments and ensuring all staff understand the reporting mechanisms for AI concerns.");
    }

    return `<p>${intro}</p><p>${points.join("</p><p>")}</p>`;
}

function generateDetectFeedback(data) {
    const yesCount = countAnswers(data, 14, 17, 'Yes');
    const notSureCount = countAnswers(data, 14, 17, 'Not Sure');

    if (yesCount === 4) {
        return "<p>Your detection strategy is comprehensive. Continue to monitor its effectiveness and ensure your DSLs are comfortable interpreting AI-related alerts as the technology evolves.</p>";
    }

    let adviceSegments = [];

    // 1. UNFAMILIAR / NO MONITORING
    if (data.q14 !== 'Yes' || notSureCount >= 3) {
            let advice = "You appear to have limited visibility or oversight regarding digital monitoring for AI. ";
            advice += "We strongly recommend speaking with <strong>internal stakeholders (such as your DSL or IT Lead)</strong> and your monitoring provider to understand exactly what AI-related risks they can detect today. ";
            advice += "To see how digital monitoring can help with spotting students at risk online, <a href='https://smoothwall.com/digital-monitoring-and-ai-risks' target='_blank'>click here</a>.";
            adviceSegments.push(advice);
    }

    // 2. BRIDGE: Good Monitoring, Poor Cloud
    if (data.q14 === 'Yes' && data.q15 === 'Yes' && data.q17 !== 'Yes') {
        adviceSegments.push("Your approach to identifying students at risk through their digital behaviours appears strong, which is excellent. However, to ensure this visibility extends across your entire digital environment, we recommend reviewing your cloud storage protocols. As AI usage in the classroom continues to grow, education settings must be prepared for an increase in AI-generated content appearing on school drives. We recommend assessing your current visibility into images and videos stored in your cloud environment and evaluating how frequently these are checked for harmful or inappropriate content.");
    } 
    
    // 3. MONITORING GAPS
    else if (!(data.q14 !== 'Yes' || notSureCount >= 3)) {
        if (data.q14 === 'Yes' && (data.q15 !== 'Yes' || data.q16 !== 'Yes')) {
            adviceSegments.push("You have monitoring in place, which is great. It is valuable to consider *how* effectively it detects serious risks. Automated keywords often miss context. Human-moderated systems can be significantly more effective at spotting subtle warning signs—such as emotional reliance on chatbots or coercion—providing peace of mind that risks beyond a teacher's eyes and ears are being picked up.");
        }
        if (notSureCount >= 2) {
            adviceSegments.push("You seem unsure about the specifics of your monitoring capabilities regarding AI. We strongly recommend speaking with <strong>internal stakeholders (such as your DSL or IT Lead)</strong> and your monitoring provider to understand exactly what AI-related risks they can detect today.");
        }
    }

    // 4. CLOUD STORAGE (Append logic)
    const bridgeTriggered = (data.q14 === 'Yes' && data.q15 === 'Yes' && data.q17 !== 'Yes');
    if (data.q17 !== 'Yes' && !bridgeTriggered) {
        const prefix = adviceSegments.length > 0 ? "As" : "As"; 
        adviceSegments.push(`${prefix} AI usage in the classroom continues to grow, education settings need to be prepared for an increase in AI-generated content appearing on school drives. We recommend assessing your current visibility into images and videos stored in your cloud storage and evaluating how often these are checked for harmful or inappropriate content.`);
    }

    if (adviceSegments.length === 0) {
            return "<p>Continue to monitor your detection systems regularly.</p>";
    }

    return `<p>${adviceSegments.join("</p><p>")}</p>`;
}

function generateEmpowerFeedback(data) {
    const yesCount = countAnswers(data, 18, 27, 'Yes');
    const notSureCount = countAnswers(data, 18, 27, 'Not Sure');

    if (yesCount === 9) {
        return "<p>You are doing an excellent job empowering your community. Your comprehensive approach to training and engagement sets a high standard. Keep this momentum going by regularly refreshing training materials.</p>";
    }

    let intro = "";
    if (yesCount < 5) {
        intro = "<p>Your results suggest it may be useful to review how AI is currently approached across your setting. Looking at curriculum content and staff training records can help create a clear, shared view of what’s already in place and where further support could add value.</p>";
    } else {
        intro = "<p>Based on your answers, there are several key opportunities to strengthen your strategy:</p>";
    }

    let points = [];

    if (data.q18 === 'Yes' && data.q19 !== 'Yes') {
        points.push("You have ensured staff know the rules (Code of Conduct), which is vital. The next step is to provide practical training on *how* to use these tools effectively and safely in the classroom.");
    }
    if (data.q18 !== 'Yes' && data.q19 !== 'Yes') {
            points.push("Staff training appears to be a key area for development. Prioritise sessions that cover both the Code of Conduct and practical, safe usage of AI tools.");
    }

    if (data.q22 !== 'Yes') {
        points.push("When reviewing AI education, it’s important to ensure learning is age-appropriate. Expectations around topics such as AI use and ethics will naturally differ between younger pupils and those in Sixth Form.");
    }
    
    if (data.q23 !== 'Yes' || data.q24 !== 'Yes') { 
        points.push("Defining a clear list of approved AI tools can also help students engage with AI safely, reducing the likelihood of them turning to unverified or unsuitable platforms.");
    }

    if (data.q25 !== 'Yes' || data.q26 !== 'Yes') {
        points.push("Finally, sharing clear, accessible guidance with parents and carers supports a whole-school approach to AI safety - helping to reinforce consistent messages both in school and beyond the school gates. Reviewing what information is currently shared can help ensure families feel informed and supported when it comes to AI.");
    }

    if (points.length === 0 && yesCount < 9) {
            points.push("Continue to engage with staff and students to ensure they feel confident reporting AI-related issues.");
    }

    return intro + "<p>" + points.join("</p><p>") + "</p>";
}

function handlePrint() {
    const feedbackDetails = document.querySelectorAll('details.feedback-dropdown');
    feedbackDetails.forEach(el => el.open = true);

    const summaryAcc = document.getElementById('summaryAccordion');
    if(summaryAcc) summaryAcc.open = true;

    window.print();

    setTimeout(() => {
        feedbackDetails.forEach(el => el.open = false);
        if(summaryAcc) summaryAcc.open = false;
    }, 1000);
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

document.getElementById('submitBtn').addEventListener('click', openGate);
document.getElementById('printBtn').addEventListener('click', handlePrint);


document.getElementById('skipToResults').addEventListener('click', calculateAndShowResults);
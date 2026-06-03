/**
 * AI Checklist Survey Module - Refactored
 * Implements DRY and SRP principles with centralized configuration
 */

(function() {
    'use strict';

    const questions = [
        // STEP 1: District Approach
        {
            number: 1,
            step: 1,
            text: 'Has your district reviewed federal/state AI guidance and defined which AI tools are approved for staff and student use?',
            category: 'empower'
        },
        {
            number: 2,
            step: 1,
            text: 'Do you have a written AI policy aligned with your acceptable use, code of conduct, and student safety policies?',
            category: 'empower'
        },
        {
            number: 3,
            step: 1,
            text: 'Do you assess each new AI tool for safety and privacy risks before approving it?',
            category: 'protect'
        },
        // STEP 2: Technical Safeguards
        {
            number: 4,
            step: 2,
            text: 'Can your web filter block harmful AI-generated content the moment it appears?',
            category: 'protect'
        },
        {
            number: 5,
            step: 2,
            text: 'Can you control AI tool access by user, role, grade band, or time of day?',
            category: 'protect'
        },
        {
            number: 6,
            step: 2,
            text: 'Does your monitoring solution surface AI-related risks — chatbots, AI-drafted abuse, students confiding self-harm to AI companions?',
            category: 'detect'
        },
        {
            number: 7,
            step: 2,
            text: 'Are monitoring alerts reviewed for context by trained human moderators before reaching your team?',
            category: 'detect'
        },
        // STEP 3: Education & Engagement
        {
            number: 8,
            step: 3,
            text: `Have all staff been trained on your district's AI expectations and code of conduct?`,
            category: 'empower'
        },
        {
            number: 9,
            step: 3,
            text: 'Do you have an age-appropriate AI literacy plan for students and a clear academic integrity policy on AI use?',
            category: 'empower'
        },
        {
            number: 10,
            step: 3,
            text: 'Do you regularly share AI guidance and digital safety updates with parents and caregivers?',
            category: 'empower'
        }
    ];

    // ========================================
    // CONFIG - All survey data and settings
    // ========================================
    const Config = {
        hubspot: {
            region: "na1",
            target: "#hubspotFormTarget",
            submitButtonClass: "btn btn-light d-block mt-4",
            cssClass: 'hs-form form-light'
        },

        survey: {
            selectors: {
                container: '#surveyContainer',
                form: '#aiSurveyForm',
                survey: '#survey',
                results: '#results',
                progressBar: '#progressBar',
                progressText: '#progressText',
                modal: '#surveyFormModal',
                monitoringContainer: '#monitoring_details_container',
                summaryList: '#summaryList',
                summaryAccordion: '#summaryAccordion'
            },
            steps: [
                { number: 1, title: 'District Approach' },
                { number: 2, title: 'Technical Safeguards' },
                { number: 3, title: 'Education & Engagement' },
            ],
            subsections: {
                1: ['District Foundations', 'Policies & Risk'],
                3: ['Education & Literacy', 'Family Engagement'],
            },
            subsectionMap: {
                1: 'District Foundations',
                2: 'Policies & Risk',
                8: 'Education & Literacy',
                10: 'Family Engagement'
            }
        },

        questions: questions,

        

        scoring: {
            protect: { maxRaw: questions.filter(q => q.category === 'protect').length * 10},
            detect: { maxRaw: questions.filter(q => q.category === 'detect').length * 10},
            empower: { maxRaw: questions.filter(q => q.category === 'empower').length * 10},
            answerPoints: {
                'Yes': 10,
                'No': 0,
                'Not Sure': 0
            }
        },

        thresholds: [
            { 
                min: 70, 
                label: 'Good',
                class: 'status-excellent',
                description: `You're ahead of most districts. Here's how to stay there.`,
                overallFeedback: `<p>You're ahead of most districts. Focus on staying current as AI evolves.</p>
                <p><strong>Prevent ‘policy drift’ as new tools emerge:</strong> Schedule a quarterly review of your approved tools list. Allocate time to refresh your AI policy annually.</p>
                <p><strong>Pressure-test your defense systems:</strong> Work closely with your filtering provider to ensure that your filter can keep up with evolving workarounds and AI-generated content.</p>
                <p><strong>Fine-tune your risk monitoring and alerts:</strong> Work with your monitoring provider to reduce false positives and sharpen alerts to ensure your team is seeing the priority risks that require attention. See whether any student risks are going undetected, with a free 30-day <a href="https://www.linewize.com/student-safety-audit" target='_blank' class="text-secondary">Student Safety Audit</a>.</p>
                <p><strong>Deepen the school-to-parent partnership:</strong> Consider offering a parent control app to give families. Look for resources to keep your community informed as AI evolves, such as through <a href="https://www.linewize.com/solutions/linewize-parent" target='_blank' class="text-secondary">Linewize Parent</a> (included free for Linewize Filter and Classwize customers).</p>`
            },
            { 
                min: 40, 
                label: 'Okay', 
                class: 'status-fair',
                description: `You're on your way — here's where to push next.`,
                overallFeedback: `<p>You've laid important groundwork. Now it’s time to close any gaps.</p>
                <p><strong>Standardize your AI governance:</strong> Formalize your process for vetting AI tools by creating a repeatable risk-assessment rubric. Reconcile your AI policy with your AUP and data privacy frameworks.</p>
                <p><strong>Fill in technical gaps:</strong> If you don't have real-time filtering that can block harmful AI-generated content, that's the most urgent gap to fill. After that, look at your monitoring coverage and ensure it extends to all the places students use AI tools and share AI-generated content.</p>
                <p><strong>Verify your risk monitoring and get a baseline:</strong> Confirm that your student risk monitoring solution covers AI chatbots, Microsoft 365, Google Workspace, and offline documents. To see exactly where your district stands, request a free 30-day <a href="https://www.linewize.com/student-safety-audit" target='_blank' class="text-secondary">Student Safety Audit</a>, and receive a comprehensive report of the actual risks occurring in your district.</p>
                <p><strong>Confirm that your filter blocks harmful AI-generated content:</strong> Traditional URL filtering is just a baseline. Speak with your filter provider about capabilities for blocking harmful imagery and video in real time, even in thumbnails, proxy sites, or embedded on approved URLs.</p>
                <p><strong>Build an ongoing bridge to parents:</strong> Choose solutions that facilitate ongoing dialogue with parents, like Linewize Parent (free to districts using Linewize Filter or Classwize).</p>`
            },
            { 
                min: 0, 
                label: 'Low', 
                class: 'status-started',
                description: `Your AI safety blueprint starts here.`,
                overallFeedback: `<p>Most districts start here. The path forward is clearer than you think.</p>
                <p><strong>Create an AI policy:</strong> Draft a written AI use policy and build a list of approved tools informed by federal and state AI guidance.</p>
                <p><strong>Update your filtering:</strong> Look for real-time, content-aware filtering that blocks AI-generated harmful content before it loads — <a href="https://www.linewize.com/solutions/linewize-filter" target='_blank' class="text-secondary">Linewize Filter</a> is built for this.</p>
                <p><strong>Audit your district for digital risks:</strong> See what AI risks are already happening in your district with a free <a href="https://www.linewize.com/student-safety-audit" target='_blank' class="text-secondary">Student Safety Audit</a>.</p>`
            }
        ]
    };

    function getQuestionName(questionOrNumber) {
        let question;
        if (typeof questionOrNumber === 'object') {
            question = questionOrNumber;
        } else {
            question = findQuestionByNumber(questionOrNumber);
        }
        return `q${question.number}`;
    }

    function findQuestionByName(inputName) {
        return Config.questions.find(q => getQuestionName(q) === inputName);
    }

    function findQuestionByNumber(questionNumber) {
        return Config.questions.find(q => q.number === questionNumber);
    }

    // ========================================
    // HTML GENERATOR - Dynamically build survey from config
    // ========================================
    const HTMLGenerator = {
        generateQuestionHTML(question) {
            const inputName = getQuestionName(question);
            const questionNum = question.number;
            
            let html = `<div class="question-block"${question.toggles ? ` id="q_${inputName}"` : ''}>`;
            html += `<span class="question-text">${questionNum}. ${question.text}</span>`;
            
            if (question.subtext) {
                html += `<div class="question-subtext">${question.subtext}</div>`;
            }
            
            html += '<div class="options-group">';
            html += `<input type="radio" id="${inputName}_yes" name="${inputName}" value="Yes" />`;
            html += `<label for="${inputName}_yes" class="option-label">Yes</label>`;
            html += `<input type="radio" id="${inputName}_no" name="${inputName}" value="No" />`;
            html += `<label for="${inputName}_no" class="option-label">No</label>`;
            html += `<input type="radio" id="${inputName}_unsure" name="${inputName}" value="Not Sure"/>`;
            html += `<label for="${inputName}_unsure" class="option-label">Not sure</label>`;
            html += '</div></div>';
            
            return html;
        },

        generateStepHTML(stepNumber) {
            const stepTitle = this.getStepTitle(stepNumber);
            let html = `<div id="step${stepNumber}" class="step${stepNumber === 1 ? ' step-active' : ''}" data-step="${stepNumber}">`;
            html += `<h2 class="section-header">${stepNumber}. ${stepTitle}</h2>`;
            
            // Get all questions for this step, ordered by number
            const questionsInStep = Config.questions
                .filter(q => q.step === stepNumber && !q.dependsOn)
                .sort((a, b) => a.number - b.number);
            
            // Track added question numbers to avoid duplicates
            const addedNumbers = new Set();
            
            // Add subsection headers and questions per step
            const subsections = this.getSubsections(stepNumber);
            let currentSubsection = null;
            
            for (const question of questionsInStep) {
                // Check if we need to add a subsection header
                const nextSubsection = this.getSubsectionForQuestion(question);
                if (nextSubsection && nextSubsection !== currentSubsection) {
                    html += `<h3 class="subsection-header">${nextSubsection}</h3>`;
                    currentSubsection = nextSubsection;
                }
                
                html += this.generateQuestionHTML(question);
                addedNumbers.add(question.number);
                
                // If this question has toggles (children), add them in a collapsible section
                if (question.toggles) {
                    html += `<div id="monitoring_details_container" class="collapse" aria-expanded="false">`;
                    for (const childNum of question.toggles) {
                        const childQ = findQuestionByNumber(childNum);
                        if (childQ) {
                            html += this.generateQuestionHTML(childQ);
                            addedNumbers.add(childNum);
                        }
                    }
                    html += '</div>';
                }
            }
            
            // Navigation buttons
            html += '<div class="survey-btn-group">';
            if (stepNumber > 1) {
                html += `<button type="button" class="btn back-btn" data-step="${stepNumber - 1}">&larr; Back</button>`;
            }
            if (stepNumber < Config.survey.steps.length) {
                html += `<button type="button" class="next-btn" data-step="${stepNumber + 1}"><span>Next &rarr;</span></button>`;
            } else {
                html += '<button type="button" id="submitBtn" class="submit-btn"><span>Complete Checklist</span></button>';
            }
            html += '</div>';
            html += '<div class="error-message">Please answer all questions before proceeding.</div>';
            html += '</div>';
            
            return html;
        },

        getSubsections(stepNumber) {
            return Config.survey.subsections[stepNumber] || [];
        },

        getSubsectionForQuestion(question) {
            return Config.survey.subsectionMap[question.number] || null;
        },

        getStepTitle(stepNumber) {
            const step = Config.survey.steps.find(s => s.number === stepNumber);
            return step?.title || '';
        },

        generateFormHTML() {
            let html = '<form id="aiSurveyForm">';
            for (let step = 1; step <= Config.survey.steps.length; step++) {
                html += this.generateStepHTML(step);
            }
            html += '</form>';
            return html;
        }
    };

    // ========================================
    // STATE - Application state management
    // ========================================
    const State = {
        surveyData: {},
        scores: {
            protect: 0,
            detect: 0,
            empower: 0,
            overall: 0
        },
        percentages: {
            protect: 0,
            detect: 0,
            empower: 0,
            overall: 0
        },
        hubspotForm: null,

        setSurveyData(data) {
            this.surveyData = { ...data };
        },

        setScores(scores) {
            this.scores = { ...scores };
        },

        setPercentages(percentages) {
            this.percentages = { ...percentages };
        },

        getResponseForQuestion(questionId) {
            return this.surveyData[questionId];
        }
    };

    // ========================================
    // UI - DOM manipulation and rendering
    // ========================================
    const UI = {
        elements: {},

        cache() {
            this.elements = {
                container: document.querySelector(Config.survey.selectors.container),
                form: document.querySelector(Config.survey.selectors.form),
                survey: document.querySelector(Config.survey.selectors.survey),
                results: document.querySelector(Config.survey.selectors.results),
                progressBar: document.querySelector(Config.survey.selectors.progressBar),
                progressText: document.querySelector(Config.survey.selectors.progressText),
                monitoringContainer: document.querySelector(Config.survey.selectors.monitoringContainer),
                summaryList: document.querySelector(Config.survey.selectors.summaryList),
                summaryAccordion: document.querySelector(Config.survey.selectors.summaryAccordion)
            };
        },

        updateProgressBar(stepNumber) {
            const percentage = (stepNumber / Config.survey.steps.length) * 100;
            if (this.elements.progressBar) {
                this.elements.progressBar.style.width = percentage + '%';
            }
            if (this.elements.progressText) {
                this.elements.progressText.innerText = `Step ${stepNumber} of ${Config.survey.steps.length}`;
            }
        },

        showStep(stepNumber) {
            document.querySelectorAll('.step').forEach(el => el.classList.remove('step-active'));
            const stepElement = document.getElementById(`step${stepNumber}`);
            if (stepElement) {
                stepElement.classList.add('step-active');
                this.updateProgressBar(stepNumber);
                this.elements.survey.scrollIntoView({ behavior: 'smooth' });
            }
        },

        toggleMonitoringDetails(show) {
            if (!this.elements.monitoringContainer) return;

            const collapse = new bootstrap.Collapse(this.elements.monitoringContainer, {
                toggle: false
            });

            if (show) {
                collapse.show();
            } else {
                collapse.hide();
            }
        },

        showErrorMessage(stepNumber) {
            const stepElement = document.getElementById(`step${stepNumber}`);
            if (stepElement) {
                const errorEl = stepElement.querySelector('.error-message');
                if (errorEl) {
                    errorEl.style.display = 'block';
                }
            }
        },

        hideErrorMessage(stepNumber) {
            const stepElement = document.getElementById(`step${stepNumber}`);
            if (stepElement) {
                const errorEl = stepElement.querySelector('.error-message');
                if (errorEl) {
                    errorEl.style.display = 'none';
                }
            }
        },

        showResults() {
            if (this.elements.survey) {
                this.elements.survey.style.display = 'none';
            }
            const progressContainer = document.querySelector('.ai-survey-progress-container');
            if (progressContainer) {
                progressContainer.style.display = 'none';
            }
            if (this.elements.results) {
                this.elements.results.style.display = 'block';
            }
            this.elements.survey.scrollIntoView({ behavior: 'smooth' });
        },

        hideSurvey() {
            if (this.elements.survey) {
                this.elements.survey.style.display = 'none';
            }
            const progressContainer = document.querySelector('.ai-survey-progress-container');
            if (progressContainer) {
                progressContainer.style.display = 'none';
            }
        },

        renderResults() {
           // this.renderScoreCard('protect');
           // this.renderScoreCard('detect');
           // this.renderScoreCard('empower');
            this.renderScoreCard('overall');
            this.renderTotalScore();
            this.renderTotalScoreDescription();
            this.renderSummary();
        },

        renderScoreCard(category) {
            const scoreCard = document.getElementById(`${category}ScoreCard`);
            if (scoreCard) {
                scoreCard.style.display = 'block';
            }

            const percentage = State.percentages[category];
            const [label, statusClass] = this.getStatus(percentage);
            
            const barElement = document.getElementById(`${category}Bar`);
            if (barElement) {
                barElement.style.width = `${Math.min(100, percentage)}%`;
            }

            const statusElement = document.getElementById(`${category}Status`);
            if (statusElement) {
                statusElement.innerHTML = `<span class="${statusClass}">${label}</span>`;
            }

            const feedbackElement = document.getElementById(`${category}Feedback`);
            if (feedbackElement) {
                feedbackElement.innerHTML = Results.generateFeedback(category);
            }
        },

        renderTotalScore() {
            const [label, statusClass] = this.getStatus(State.percentages.overall);
            const totalElement = document.getElementById('totalScoreValue');
            if (totalElement) {
                totalElement.innerText = label;
                totalElement.className = `big-score ${statusClass}`;
            }
        },

        renderTotalScoreDescription() {
            const [label, statusClass, description] = this.getStatus(State.percentages.overall);
            const totalDescriptionElement = document.getElementById('totalScoreMax');
            if (totalDescriptionElement) {
                totalDescriptionElement.innerText = description;
            }
        },

        renderSummary() {
            if (!this.elements.summaryList) return;

            let summaryHTML = '';
            Config.questions.forEach(question => {
                const answer = State.getResponseForQuestion(getQuestionName(question.number)) || 'Skipped';
                const ansClass = answer === 'Yes' ? 'ans-yes' : (answer === 'No' ? 'ans-no' : 'ans-unsure');
                summaryHTML += `<div class="summary-item"><div class="s-quest">${question.text}</div><div class="s-ans ${ansClass}">${answer}</div></div>`;
            });

            this.elements.summaryList.innerHTML = summaryHTML;
        },

        getStatus(percentage) {
            for (let threshold of Config.thresholds) {
                if (percentage >= threshold.min) {
                    return [threshold.label, threshold.class, threshold.description, threshold.overallFeedback];
                }
            }
            return ['Error', 'status-error', '', ''];
        },

        addPrintClasses() {
            const sections = Array.from(document.getElementsByClassName("dnd-section"));
            const nonSurveySections = sections.filter(parentElement => {
                return !parentElement.querySelector("#surveyContainer");
            });
            nonSurveySections.forEach(section => {
                section.classList.add("hide-on-print");
            });
        },

        expandFeedbackForPrint() {
            this.elements.container.querySelectorAll('.collapse').forEach(el => {
                el.classList.add('show');
            });
        }
    };

    // ========================================
    // VALIDATOR - Validates survey responses
    // ========================================
    const Validator = {
        isStepValid(stepNumber) {
            const stepElement = document.getElementById(`step${stepNumber}`);
            if (!stepElement) return false;

            const parentMonValue = this.getMonitoringParentValue();
            const shouldSkipHidden = parentMonValue === 'No' || parentMonValue === 'Not Sure';

            const radioGroups = new Set();
            const inputs = stepElement.querySelectorAll('input[type="radio"]');

            inputs.forEach(input => {
                // Skip conditional questions if their parent is not "Yes"
                const question = findQuestionByName(input.name);
                if (question && question.dependsOn && shouldSkipHidden) {
                    return;  // Skip adding this to required groups
                }
                radioGroups.add(input.name);
            });

            // Check all required radio groups have a selection
            for (let groupName of radioGroups) {
                if (!stepElement.querySelector(`input[name="${groupName}"]:checked`)) {
                    return false;
                }
            }

            return true;
        },

        isConditionalQuestion(questionId, parentId) {
            const question = findQuestionByName(questionId);
            return question && question.dependsOn === parentId;
        },

        getMonitoringParentValue() {
            return document.querySelector('input[name="q_mon_parent"]:checked')?.value;
        }
    };

    // ========================================
    // CALCULATOR - Scoring logic
    // ========================================
    const Calculator = {
        calculate(rawData) {
            const scores = this.calculateCategoryScores(rawData);
            const percentages = this.calculatePercentages(scores);

            State.setSurveyData(rawData);
            State.setScores(scores);
            State.setPercentages(percentages);

            return { scores, percentages };
        },

        calculateCategoryScores(rawData) {
            const scores = {
                protect: 0,
                detect: 0,
                empower: 0
            };

            Config.questions.forEach(question => {
                const questionId = getQuestionName(question.number);
                const answer = rawData[questionId];

                if (!answer) return;

                const points = Config.scoring.answerPoints[answer] || 0;
                if (scores.hasOwnProperty(question.category)) {
                    scores[question.category] += points;
                }
            });

            // Ensure no negative scores
            Object.keys(scores).forEach(key => {
                scores[key] = Math.max(0, scores[key]);
            });

            return scores;
        },

        calculatePercentages(scores) {
            const protectPct = (scores.protect / Config.scoring.protect.maxRaw) * 100;
            const detectPct = (scores.detect / Config.scoring.detect.maxRaw) * 100;
            const empowerPct = (scores.empower / Config.scoring.empower.maxRaw) * 100;

            return {
                protect: Math.max(0, protectPct),
                detect: Math.max(0, detectPct),
                empower: Math.max(0, empowerPct),
                overall: (protectPct + detectPct + empowerPct) / 3
            };
        }
    };

    // ========================================
    // RESULTS - Generates feedback
    // ========================================
    const Results = {
        generateFeedback(category) {
            if (category === 'overall') {
                const overallPct = State.percentages.overall;
                
                // getStatus now returns the overall feedback as the 4th item in the array
                const [, , , overallFeedback] = UI.getStatus(overallPct);
                return overallFeedback || '';
            }
        },

        countAnswersInCategory(data, category, answerType) {
            let count = 0;
            Config.questions.forEach(question => {
                if (question.category === category && data[getQuestionName(question.number)] === answerType) {
                    count++;
                }
            });
            return count;
        },

        getMaxQuestionsForCategory(category) {
            return Config.questions.filter(q => q.category === category).length;
        }
    };

    // ========================================
    // HANDLERS - Event listeners
    // ========================================
    const Handlers = {
        init() {
            this.attachButtonHandlers();
            this.attachMonitoringRadioHandlers();
            this.attachHubSpotFormHandlers();
        },

        attachButtonHandlers() {
            document.querySelectorAll('.next-btn').forEach(btn => {
                btn.addEventListener('click', e => this.handleNextClick(e));
            });

            document.querySelectorAll('.back-btn').forEach(btn => {
                btn.addEventListener('click', e => this.handleBackClick(e));
            });

            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.addEventListener('click', () => this.handleSubmit());
            }

            const printBtn = document.getElementById('printBtn');
            if (printBtn) {
                printBtn.addEventListener('click', () => this.handlePrint());
            }

            const skipBtn = document.getElementById('skipToResults');
            if (skipBtn) {
                skipBtn.addEventListener('click', () => this.handleSkip());
            }
        },

        attachMonitoringRadioHandlers() {
            const monitoringRadios = document.querySelectorAll('input[name="q_mon_parent"]');
            monitoringRadios.forEach(radio => {
                radio.addEventListener('change', () => this.handleMonitoringChange());
            });
        },

        attachHubSpotFormHandlers() {
            window.addEventListener('load', () => {
                if (window.hbspt) {
                    hbspt.forms.create({
                        portalId: UI.elements.container.dataset.hubId,
                        formId: UI.elements.container.dataset.formId,
                        region: Config.hubspot.region,
                        target: Config.hubspot.target,
                        submitButtonClass: Config.hubspot.submitButtonClass,
                        cssClass: Config.hubspot.cssClass,
                        onFormReady: ($form) => {
                            State.hubspotForm = $form[0];
                        },
                        onFormSubmitted: () => {
                            this.handleFormSubmitted();
                        }
                    });
                }
            });
        },

        handleNextClick(e) {
            const btn = e.target.closest('.next-btn');
            const targetStep = parseInt(btn.dataset.step);
            const currentStepElement = document.querySelector('.step.step-active');
            const currentStep = parseInt(currentStepElement.dataset.step);

            if (Validator.isStepValid(currentStep)) {
                UI.hideErrorMessage(currentStep);
                UI.showStep(targetStep);
            } else {
                UI.showErrorMessage(currentStep);
            }
        },

        handleBackClick(e) {
            const btn = e.target.closest('.back-btn');
            const targetStep = parseInt(btn.dataset.step);
            UI.showStep(targetStep);
        },

        handleMonitoringChange() {
            const parentMonValue = Validator.getMonitoringParentValue();
            const shouldShow = parentMonValue === 'Yes';
            UI.toggleMonitoringDetails(shouldShow);
        },

        handleSubmit() {
            const currentStepElement = document.querySelector('.step.step-active');
            const currentStep = parseInt(currentStepElement.dataset.step);

            if (!Validator.isStepValid(currentStep)) {
                UI.showErrorMessage(currentStep);
                return;
            }

            // Collect and calculate
            const formData = new FormData(UI.elements.form);
            const rawData = Object.fromEntries(formData.entries());
            
            Calculator.calculate(rawData);

            // Update HubSpot form if available
            this.populateHubSpotForm();

            // Show modal or results
            const modal = new bootstrap.Modal(Config.survey.selectors.modal);
            modal.show();

            UI.addPrintClasses();
        },

        handleFormSubmitted() {
            const modal = bootstrap.Modal.getInstance(document.querySelector(Config.survey.selectors.modal));
            if (modal) {
                modal.hide();
            }
            this.displayResults();
        },

        handleSkip() {
            const modal = bootstrap.Modal.getInstance(document.querySelector(Config.survey.selectors.modal));
            if (modal) {
                modal.hide();
            }
            this.displayResults();
        },

        handlePrint() {
            UI.expandFeedbackForPrint();
            setTimeout(() => {
                window.print();
            }, 200);
        },

        displayResults() {
            UI.showResults();
            UI.renderResults();
        },

        populateHubSpotForm() {
            if (!State.hubspotForm) return;

            const fieldMap = {
                'ai_survey_protect_score': 'protect',
                'ai_survey_detect_score': 'detect',
                'ai_survey_empower_score': 'empower',
                'ai_survey_overall_score': 'overall',
            };

            Object.entries(fieldMap).forEach(([fieldName, category]) => {
                const input = State.hubspotForm.querySelector(`input[name="${fieldName}"]`);
                if (input) {
                    input.value = State.percentages[category].toFixed(2);
                }
            });

            const overallPct = State.percentages.overall;
            const label = UI.getStatus(overallPct)[0];

            const overallRatingInput = State.hubspotForm.querySelector(`input[name="ai_survey_overall_rating"]`);
            if (overallRatingInput) {
                overallRatingInput.value = label;
            }
        }
    };

    // ========================================
    // INITIALIZATION
    // ========================================
    function init() {
        // 1. Generate and inject form HTML first
        const surveyContainer = document.getElementById('survey');
        if (surveyContainer && surveyContainer.children.length === 0) {
            surveyContainer.innerHTML = HTMLGenerator.generateFormHTML();
        }

        // 2. Cache UI elements (after HTML is injected)
        UI.cache();
        Handlers.init();

        // 3. Set initial monitoring state
        const parentInit = Validator.getMonitoringParentValue();
        if (parentInit && (parentInit === 'No' || parentInit === 'Not Sure')) {
            UI.toggleMonitoringDetails(false);
        }
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

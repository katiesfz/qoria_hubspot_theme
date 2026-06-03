/**
 * AI Checklist Survey Module - Refactored
 * Implements DRY and SRP principles with centralized configuration
 */

(function() {
    'use strict';

    // ========================================
    // CONFIG - All survey data and settings
    // ========================================
    const Config = {
        hubspot: {
            portalId: "4139239",
            formId: "f8279705-9592-4493-947a-a963f46f8c30",
            region: "na1",
            target: "#hubspotFormTarget",
            submitButtonClass: "btn btn-light d-block mt-4",
            cssClass: 'hs-form form-light'
        },

        survey: {
            totalSteps: 5,
            selectors: {
                form: '#aiSurveyForm',
                survey: '#survey',
                results: '#results',
                progressBar: '#progressBar',
                progressText: '#progressText',
                modal: '#surveyFormModal',
                monitoringContainer: '#monitoring_details_container',
                summaryList: '#summaryList',
                summaryAccordion: '#summaryAccordion'
            }
        },

        questions: [
            // STEP 1: School Approach
            {
                number: 1,
                step: 1,
                text: 'Have you read the relevant materials from the DfE?',
                subtext: 'For example, the <a href="https://www.gov.uk/government/publications/generative-artificial-intelligence-in-education/generative-artificial-intelligence-ai-in-education" target="_blank" rel="noopener">Generative AI Policy Paper</a> and <a href="https://www.gov.uk/government/collections/using-ai-in-education-settings-support-materials" target="_blank" rel="noopener">Using AI in education settings: Support materials</a>.',
                category: 'protect'
            },
            {
                number: 2,
                step: 1,
                text: 'Do you have a specific AI platform or platforms that are used across your setting?',
                subtext: 'For example, CENTURY, ChatGPT, Google AI Tools (Gemini, Notebook LM, AI Studio), Learnt.ai, Olex.AI.',
                category: 'protect'
            },
            {
                number: 3,
                step: 1,
                text: 'Do you know whether your staff understand how to use AI?',
                category: 'protect'
            },
            {
                number: 4,
                step: 1,
                text: 'Have you set up an AI working party consisting of all stakeholders to support your strategy?',
                subtext: 'Stakeholders include the SLT, DSLs, IT teams, and governors.',
                category: 'protect'
            },
            {
                number: 5,
                step: 1,
                text: 'If so, do you have regular check-ins to assess progress?',
                category: 'protect'
            },
            // STEP 2: Policies & Risk Assessments
            {
                number: 6,
                step: 2,
                text: 'Do you have an AI Policy?',
                category: 'protect'
            },
            {
                number: 7,
                step: 2,
                text: 'If so, has this been cross-referenced with other policies (Acceptable Use, Code of Conduct, Safeguarding, etc.)?',
                category: 'protect'
            },
            {
                number: 8,
                step: 2,
                text: 'Have you assessed the risks of approved AI tools to understand how they may be used/misused?',
                category: 'protect'
            },
            {
                number: 9,
                step: 2,
                text: 'If so, are further risk assessments carried out every time a new AI tool is introduced?',
                category: 'protect'
            },
            // STEP 3: Technical Safeguards
            {
                number: 10,
                step: 3,
                text: 'Have you applied your AI policy to your web filtering?',
                category: 'protect'
            },
            {
                number: 11,
                step: 3,
                text: 'Does your web filtering currently block harmful AI content (including image and video) the moment it appears online?',
                category: 'protect'
            },
            {
                number: 12,
                step: 3,
                text: 'Can you control or restrict access to AI chatbots by age group or role?',
                category: 'protect'
            },
            {
                number: 13,
                step: 3,
                text: 'Do you have clear visibility and reporting on AI-related activity to support safeguarding decisions?',
                category: 'protect'
            },
            {
                number: 14,
                step: 3,
                text: 'Does your setting currently use digital monitoring to spot students at risk?',
                category: 'detect',
                inputName: 'q_mon_parent',
                toggles: [15, 16, 17]
            },
            {
                number: 15,
                step: 3,
                text: 'Can your monitoring tools identify harmful AI-generated content and images?',
                category: 'detect',
                dependsOn: 14
            },
            {
                number: 16,
                step: 3,
                text: 'Can your monitoring tools flag potential uses of AI to generate harmful content or bypass safeguards?',
                category: 'detect',
                dependsOn: 14
            },
            {
                number: 17,
                step: 3,
                text: 'Does your system provide AI-aware alerts to your DSLs?',
                category: 'detect',
                dependsOn: 14
            },
            {
                number: 18,
                step: 3,
                text: 'Is your cloud storage regularly checked for inappropriate/harmful AI-generated content?',
                category: 'detect'
            },
            // STEP 4: Education & Expectations
            {
                number: 19,
                step: 4,
                text: 'Have all staff received training relating to the code of conduct and expectations of the use of AI?',
                category: 'empower'
            },
            {
                number: 20,
                step: 4,
                text: 'Have staff received training on how to use AI tools effectively?',
                subtext: 'For example, prompt engineering, identifying outputs, and responsible use.',
                category: 'empower'
            },
            {
                number: 21,
                step: 4,
                text: 'Are all staff aware of your data protection policy and how this applies to the use of technology, including AI tools?',
                category: 'empower'
            },
            {
                number: 22,
                step: 4,
                text: 'Do you have a clear assessment and homework policy that is communicated to students and staff regarding the use of AI tools?',
                category: 'empower'
            },
            {
                number: 23,
                step: 4,
                text: 'Have you considered how you will provide age-appropriate AI education for students?',
                category: 'empower'
            },
            {
                number: 24,
                step: 4,
                text: 'Do you know which tools you will use to talk to students about this topic?',
                category: 'empower'
            },
            {
                number: 25,
                step: 4,
                text: 'Do you understand how these tools are going to be used, and the awareness staff and students will need in order to use them?',
                category: 'empower'
            },
            // STEP 5: Community Engagement
            {
                number: 26,
                step: 5,
                text: 'Have you delivered information, advice and guidance for parents and carers about the safe use of AI for their children?',
                category: 'empower'
            },
            {
                number: 27,
                step: 5,
                text: 'Do you regularly share updates with parents regarding all aspects of digital safeguarding including AI?',
                category: 'empower'
            }
        ],

        scoring: {
            protect: { maxRaw: 13 * 10, questionRange: [1, 13] },
            detect: { maxRaw: 5 * 10, questionRange: [15, 18] },
            empower: { maxRaw: 9 * 10, questionRange: [19, 27] },
            answerPoints: {
                'Yes': 10,
                'No': -2,
                'Not Sure': 0
            },
            penalties: {
                protectFiltering: { threshold: 2, amount: 0.6 },
                monitorRedFlags: { threshold: 2, amount: 0.5 },
                cloudRedFlag: { amount: 0.2 },
                empowerNegativeCount: { threshold: 3, amount: 0.8 },
                empowerCombo: { amount: 0.2 }
            }
        },

        thresholds: [
            { min: 75, label: 'Excellent', class: 'status-excellent' },
            { min: 40, label: 'Good', class: 'status-good' },
            { min: 15, label: 'Fair', class: 'status-fair' },
            { min: 0, label: 'Getting started', class: 'status-started' }
        ],

        feedback: {
            protect: {
                perfect: "You are currently doing everything relatively possible to keep students safe against AI risks. Your focus now should be on monitoring and evaluating these measures regularly to ensure there are no gaps and that policies continue to align as AI usage evolves both inside and outside the classroom.",
                incomplete: [
                    {
                        check: data => data.q6 !== 'Yes',
                        message: "<strong>Establish an AI Policy:</strong> Establishing a dedicated AI policy is a priority to provide clarity for staff and students. For support in creating one, <a href='https://smoothwall.com/building-an-effective-ai-policy-for-uk-schools' target='_blank'>see our guide on building an effective AI policy for UK schools</a>."
                    },
                    {
                        check: data => data.q6 === 'Yes' && data.q7 !== 'Yes',
                        message: "<strong>Cross-reference your AI Policy:</strong> Ensure your AI policy is aligned and referenced across all relevant policies (Acceptable Use, Code of Conduct, Safeguarding) to provide comprehensive guidance."
                    },
                    {
                        check: data => data.q1 === 'No' || data.q1 === 'Not Sure',
                        message: "<strong>Review DfE guidance around safe AI use:</strong> Reviewing the <a href='https://www.gov.uk/government/collections/using-ai-in-education-settings-support-materials' target='_blank'>Department for Education's (DfE) guidance on generative AI</a> is a strong starting point to understand the government's position and recommendations for schools."
                    },
                    {
                        check: data => data.q8 === 'Yes' && data.q9 !== 'Yes',
                        message: "<strong>Put in place a risk assessment process:</strong> While you have assessed current tools, it is equally important to formalise a process for risk-assessing any *new* AI tools before they are introduced to the setting to prevent the use of unapproved or insecure alternatives."
                    },
                    {
                        check: data => data.q8 !== 'Yes',
                        message: "<strong>Conduct regular risk assessments:</strong> Conducting thorough risk assessments (DPIAs) for all AI tools currently in use is a crucial step to identify data privacy and safeguarding risks."
                    },
                    {
                        check: data => data.q11 !== 'Yes',
                        message: data => {
                            const context = data.q11 === 'Not Sure' ? "You should consider investigating if your web filter can" : "You should consider looking into your web filter to understand the extent to which it can";
                            return `<strong>Look into your web filtering:</strong> ${context} block harmful AI-generated content the moment it goes live. Without real-time filtering, there is potential for students to view harmful or inappropriate content generated by AI at speed. You may also want to check what capacity your filter has to blur image and video content generated by AI tools, as this can limit exposure to harmful or explicit images before they're ever seen.`;
                        }
                    }
                ]
            },
            detect: {
                noMonitoring: "<p><strong>Consider digital monitoring:</strong> You appear not to have digital monitoring in place at the moment. Without it, it becomes extremely difficult to spot students who may be at risk online - often before those risks surface in the classroom.</p><p>Digital harm doesn't usually announce itself. Concerns linked to self-harm, mental health, bullying, sexual exploitation, radicalisation, harmful content and misuse of AI tools often show up first in what students type, search, or share digitally. Without monitoring, these early warning signs are easy to miss – meaning schools are left reacting later, when situations are more serious and harder to manage.</p><p>Further information around digital monitoring can be found here - <a href='https://smoothwall.com/a-complete-guide-to-digital-monitoring-for-schools' target='_blank' style='color:#58b78e;'>A complete guide to digital monitoring for schools</a>.</p>",
                notSure: "<p><strong>Find out if you have digital monitoring:</strong> You appear uncertain about whether your setting currently uses digital monitoring to spot students at risk. It is worth having a conversation with individuals within your setting, such as your safeguarding team, IT leads or even senior leaders with safeguarding responsibilities, to determine what you have in place and the extent to which it can spot AI-related concerns.</p>",
                perfect: "<p>Your detection strategy is comprehensive. Continue to monitor its effectiveness and ensure your DSLs are comfortable interpreting AI-related alerts as the technology evolves.</p>",
                incomplete: [
                    {
                        check: data => data.q15 === 'Yes' && data.q16 === 'Yes' && data.q18 !== 'Yes',
                        message: "<strong>Look at your cloud storage:</strong> Your approach to identifying students at risk through their digital behaviours appears strong, which is excellent. However, to ensure this visibility extends across your entire digital environment, we recommend reviewing your cloud storage protocols. As AI usage in the classroom continues to grow, education settings must be prepared for an increase in AI-generated content appearing on school drives. We recommend assessing your current visibility into images and videos stored in your cloud environment and evaluating how frequently these are checked for harmful or inappropriate content."
                    },
                    {
                        check: data => data.q18 !== 'Yes',
                        message: "<strong>Review your cloud storage:</strong> As AI usage in the classroom continues to grow, education settings need to be prepared for an increase in AI-generated content appearing on school drives. We recommend assessing your current visibility into images and videos stored in your cloud storage and evaluating how often these are checked for harmful or inappropriate content."
                    }
                ]
            },
            empower: {
                perfect: "<p>You are doing an excellent job empowering your community. Your comprehensive approach to training and engagement sets a high standard. Keep this momentum going by regularly refreshing training materials.</p>",
                incomplete: [
                    {
                        check: data => data.q19 === 'Yes' && data.q20 !== 'Yes',
                        message: "<strong>Train staff on the safe use of AI tools:</strong> You have ensured staff know the rules (Code of Conduct), which is vital. The next step is to provide practical training on <i>how</i> to use these tools effectively and safely in the classroom."
                    },
                    {
                        check: data => data.q19 !== 'Yes' && data.q20 !== 'Yes',
                        message: "<strong>Provide comprehensive staff training:</strong> Begin with foundational training on AI policies and expectations, then move to practical training on how to use these tools effectively in the classroom."
                    },
                    {
                        check: data => data.q23 !== 'Yes',
                        message: "<strong>Develop age-appropriate AI education:</strong> Consider how you will introduce AI literacy to students in a way that is developmentally appropriate and supports your overall safeguarding strategy."
                    },
                    {
                        check: data => data.q24 !== 'Yes' || data.q25 !== 'Yes',
                        message: "<strong>Clarify your educational approach:</strong> Ensure staff and students understand which tools will be used for AI education, how they will be used, and what awareness is required for effective and safe usage."
                    },
                    {
                        check: data => data.q26 !== 'Yes' || data.q27 !== 'Yes',
                        message: "<strong>Engage with parents and carers:</strong> Share information, advice and guidance with families about safe AI use, and maintain regular communication about digital safeguarding including AI topics."
                    }
                ]
            }
        }
    };

    function getQuestionName(questionOrNumber) {
        let question;
        if (typeof questionOrNumber === 'object') {
            question = questionOrNumber;
        } else {
            question = findQuestionByNumber(questionOrNumber);
        }
        return question?.inputName || `q${question.number}`;
    }

    function findQuestionByName(inputName) {
        return Config.questions.find(q => getQuestionName(q) === inputName);
    }

    function findQuestionByNumber(questionNumber) {
        return Config.questions.find(q => q.number === questionNumber);
    }

    function getParentQuestion(question) {
        if (question.dependsOn) {
            return findQuestionByNumber(question.dependsOn);
        }
        return null;
    }

    function getChildQuestions(question) {
        if (question.toggles) {
            return question.toggles.map(num => findQuestionByNumber(num));
        }
        return [];
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
            if (stepNumber < Config.survey.totalSteps) {
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
            const subsections = {
                2: ['Policies', 'Risk Assessments'],
                3: ['Filtering', 'Monitoring'],
                4: ['Staff Training & Expectations', 'AI Literacy for Staff and Students']
            };
            return subsections[stepNumber] || [];
        },

        getSubsectionForQuestion(question) {
            const subsectionMap = {
                6: 'Policies',
                8: 'Risk Assessments',
                10: 'Filtering',
                14: 'Monitoring',
                19: 'Staff Training & Expectations',
                23: 'AI Literacy for Staff and Students',
                26: 'Community Engagement'
            };
            return subsectionMap[question.number] || null;
        },

        getStepTitle(stepNumber) {
            const titles = {
                1: 'A School, College, MAT Approach',
                2: 'Policies & Risk Assessments',
                3: 'Technical Safeguards',
                4: 'Education & Expectations',
                5: 'Community Engagement'
            };
            return titles[stepNumber] || '';
        },

        generateFormHTML() {
            let html = '<form id="aiSurveyForm">';
            for (let step = 1; step <= Config.survey.totalSteps; step++) {
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
            empower: 0
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
            const percentage = (stepNumber / Config.survey.totalSteps) * 100;
            if (this.elements.progressBar) {
                this.elements.progressBar.style.width = percentage + '%';
            }
            if (this.elements.progressText) {
                this.elements.progressText.innerText = `Step ${stepNumber} of ${Config.survey.totalSteps}`;
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
            this.renderScoreCard('protect');
            this.renderScoreCard('detect');
            this.renderScoreCard('empower');
            this.renderTotalScore();
            this.renderSummary();
        },

        renderScoreCard(category) {
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
                    return [threshold.label, threshold.class];
                }
            }
            return ['Error', 'status-error'];
        },

        addPrintClasses() {
            const sections = Array.from(document.getElementsByClassName("dnd-section"));
            const nonSurveySections = sections.filter(parentElement => {
                return !parentElement.querySelector("#survey");
            });
            nonSurveySections.forEach(section => {
                section.classList.add("hide-on-print");
            });
        },

        expandFeedbackForPrint() {
            document.querySelectorAll('details.feedback-dropdown').forEach(el => {
                el.setAttribute('open', '');
            });
            if (this.elements.summaryAccordion) {
                const collapseEl = this.elements.summaryAccordion.querySelector('[data-bs-toggle="collapse"]');
                if (collapseEl) {
                    collapseEl.click();
                }
            }
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
                // Skip conditional questions if conditions not met
                if (shouldSkipHidden && this.isConditionalQuestion(input.name, 'q_mon_parent')) {
                    return;
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
            const parentQuestion = findQuestionByNumber(14);
            const parentName = getQuestionName(parentQuestion);
            const parentMonValue = rawData[parentName];

            if (parentQuestion && parentQuestion.toggles && parentMonValue && parentMonValue !== 'Yes') {
                parentQuestion.toggles.forEach(toggleNumber => {
                    rawData[getQuestionName(toggleNumber)] = parentMonValue;
                });
            }

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

            // Apply penalties
            this.applyPenalties(scores, rawData);

            // Ensure no negative scores
            Object.keys(scores).forEach(key => {
                scores[key] = Math.max(0, scores[key]);
            });

            return scores;
        },

        applyPenalties(scores, rawData) {
            // Protect penalties
            const protectFiltering = this.countNegativeAnswers(rawData, [20, 24, 25, 26, 27]);
            if (protectFiltering >= Config.scoring.penalties.protectFiltering.threshold) {
                scores.protect -= Config.scoring.penalties.protectFiltering.amount;
            }

            // Detect penalties
            const detectRedFlags = this.countNegativeAnswers(rawData, [15, 16, 17]);
            if (detectRedFlags >= Config.scoring.penalties.monitorRedFlags.threshold) {
                scores.detect -= Config.scoring.penalties.monitorRedFlags.amount;
            }

            if (rawData.q18 !== 'Yes') {
                scores.detect -= Config.scoring.penalties.cloudRedFlag.amount;
            }

            // Empower penalties
            const empowerNegativeCount = this.countNegativeAnswers(rawData, [20, 24, 25, 26, 27]);
            if (empowerNegativeCount >= Config.scoring.penalties.empowerNegativeCount.threshold) {
                scores.empower -= Config.scoring.penalties.empowerNegativeCount.amount;
            }

            if (rawData.q20 === 'Yes' && rawData.q24 === 'Yes' && 
                rawData.q25 === 'Yes' && this.isNegative(rawData.q27)) {
                scores.empower -= Config.scoring.penalties.empowerCombo.amount;
            }
        },

        countNegativeAnswers(data, questionNumbers) {
            let count = 0;
            questionNumbers.forEach(num => {
                const questionId = getQuestionName(num);
                if (this.isNegative(data[questionId])) {
                    count++;
                }
            });
            return count;
        },

        isNegative(answer) {
            return answer === 'No' || answer === 'Not Sure';
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
            const categoryConfig = Config.feedback[category];
            const data = State.surveyData;

            // Handle special cases
            if (category === 'detect') {
                const parentMonValue = data.q_mon_parent;
                if (parentMonValue === 'No') {
                    return categoryConfig.noMonitoring;
                }
                if (parentMonValue === 'Not Sure') {
                    return categoryConfig.notSure;
                }
            }

            // Check if perfect score
            const yesCount = this.countAnswersInCategory(data, category, 'Yes');
            const maxQuestions = this.getMaxQuestionsForCategory(category);
            if (yesCount === maxQuestions) {
                return `<p>${categoryConfig.perfect}</p>`;
            }

            // Generate incomplete feedback
            return this.generateIncompleteMessages(categoryConfig.incomplete, data);
        },

        generateIncompleteMessages(feedbackRules, data) {
            let messages = [];

            feedbackRules.forEach(rule => {
                if (typeof rule.message === 'function') {
                    if (rule.check(data)) {
                        messages.push(rule.message(data));
                    }
                } else {
                    if (rule.check(data)) {
                        messages.push(rule.message);
                    }
                }
            });

            if (messages.length === 0) {
                return "<p>Continue to review your progress regularly.</p>";
            }

            return `<p>${messages.join("</p><p>")}</p>`;
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
                        portalId: Config.hubspot.portalId,
                        formId: Config.hubspot.formId,
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
                'protect_score': 'protect',
                'detect_score': 'detect',
                'empower_score': 'empower'
            };

            Object.entries(fieldMap).forEach(([fieldName, category]) => {
                const input = State.hubspotForm.querySelector(`input[name="${fieldName}"]`);
                if (input) {
                    input.value = State.percentages[category].toFixed(2);
                }
            });
        }
    };

    // ========================================
    // INITIALIZATION
    // ========================================
    function init() {
        UI.cache();
        Handlers.init();

        // Set initial monitoring state
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

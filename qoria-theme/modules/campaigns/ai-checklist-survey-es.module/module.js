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
        
        const formHeader = document.getElementById("surveyFormModal").getElementById("formHeader");

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
            return "<p>Actualmente estás haciendo todo lo posible para mantener a los estudiantes seguros frente a los riesgos de la IA. Tu enfoque ahora debería centrarse en supervisar y evaluar estas medidas regularmente para garantizar que no haya brechas y que las políticas sigan alineadas a medida que el uso de la IA evoluciona tanto dentro como fuera del aula.</p>";
        }

        let intro = "";

        let points = [];

        if (data.q6 !== 'Yes') {
            points.push("<strong>Establece una política de IA:</strong> Establecer una política específica sobre IA es una prioridad para proporcionar claridad al personal y a los estudiantes. Para obtener apoyo en su creación, consulta nuestro contenido sobre cómo desarrollar una política de IA eficaz.");
        } else if (data.q7 !== 'Yes') {
            points.push("<strong>Haz un cruce entre tus políticas:</strong> Tienes una política de IA, lo cual es excelente. Sin embargo, es importante vincularla con otras políticas obligatorias (por ejemplo, Protección y Salvaguarda, Práctica de buenas conductas) para asegurarse de que no exista ningún conflicto o ambigüedad.");
        }

        if (data.q1 === 'No' || data.q1 === 'Not Sure') {
                points.push("<strong>Revisa las directrices de la UNESCO sobre el uso seguro de la IA:</strong> Revisar las <a href='https://www.unesco.org/es/articles/guia-para-el-uso-de-ia-generativa-en-educacion-e-investigacion' target='_blank' rel='nofollow noopener'>recomendaciones de la UNESCO sobre IA generativa</a> es un buen punto de partida para conocer orientaciones dirigidas a centros educativos.");
        }

        if (data.q8 === 'Yes' && data.q9 !== 'Yes') {
            points.push("<strong>Establece un proceso de evaluación de riesgos:</strong> Aunque ya has evaluado las herramientas actuales, es igualmente importante formalizar un proceso para evaluar los riesgos de cualquier nueva herramienta de IA antes de introducirla en el entorno educativo, con el fin de evitar el uso de alternativas no aprobadas o inseguras.");
        }
        if (data.q8 !== 'Yes') {
            points.push("<strong>Realiza evaluaciones de riesgo periódicas:</strong> Llevar a cabo evaluaciones de impacto y riesgo exhaustivas (DPIA) para todas las herramientas de IA que se utilizan actualmente es un paso crucial para identificar riesgos relacionados con la privacidad de los datos y la protección de los estudiantes.");
        }

        if (data.q11 !== 'Yes') {
            const context = data.q11 === 'Not Sure' ? "Deberías considerar investigar si tu filtro web puede" : "Deberías considerar revisar tu filtro web para entender hasta qué punto puede";
            points.push(`<strong>Revisa tu filtrado web:</strong> ${context} bloquear contenido dañino generado por IA en el momento en que aparece en línea. Sin filtrado en tiempo real, existe el riesgo de que los estudiantes vean contenido dañino o inapropiado generado por IA. También podrías comprobar qué capacidad tiene tu filtro para difuminar imágenes y vídeos generados por herramientas de IA, ya que esto puede limitar la exposición a imágenes dañinas o explícitas antes incluso de que sean vistas.`);
        }

        if (points.length === 0 && notSureCount <= 6) {
            points.push("<strong>Revisa continuamente el progreso:</strong> Revisa tus evaluaciones de riesgo y asegúrate de que todo el personal entienda los mecanismos para informar sobre preocupaciones relacionadas con la IA.");
        }

        let introHTML = intro ? `<p>${intro}</p>` : '';
        return `${introHTML}<p>${points.join("</p><p>")}</p>`;
    }

    function generateDetectFeedback(data) {
        const parentMon = data.q_mon_parent;
        
        if (parentMon === 'No') {
            return `<p><strong>Considera la monitorización digital:</strong> Parece que actualmente no cuentas con monitorización digital. Sin ella, resulta extremadamente difícil detectar a estudiantes que puedan estar en riesgo en línea, a menudo antes de que esos riesgos aparezcan en el aula.</p>
            <p>El daño digital rara vez se anuncia por sí mismo. Las preocupaciones relacionadas con autolesiones, salud mental, acoso, explotación sexual, radicalización, contenido dañino y el uso indebido de herramientas de IA suelen aparecer primero en lo que los estudiantes escriben, buscan o comparten digitalmente. Sin monitorización, estas primeras señales de alerta son fáciles de pasar por alto, lo que significa que los centros educativos terminan reaccionando más tarde, cuando las situaciones son más graves y difíciles de gestionar.</p>
            <p>Puedes encontrar más información sobre la monitorización digital aquí: <a href="">Guía completa sobre monitorización digital para centros educativos</a>.</p>`;
        }
        if (parentMon === 'Not Sure') {
            return `<p><strong>Averigua si tienes monitorización digital:</strong> Parece que no estás seguro de si tu centro utiliza actualmente monitorización digital para detectar estudiantes en riesgo. Merece la pena hablar con personas dentro de tu centro, como el equipo de protección y salvaguarda, responsables de TI o incluso líderes con responsabilidades en protección, para determinar qué herramientas existen y hasta qué punto pueden detectar preocupaciones relacionadas con la IA.</p>`;
        }

        const yesCount = countAnswers(data, 15, 18, 'Yes'); 
        const notSureCount = countAnswers(data, 15, 18, 'Not Sure');

        if (yesCount === 4) {
            return "<p>Tu estrategia de detección es completa. Continúa supervisando su eficacia y asegúrate de que los responsables de salvaguarda y bienestar se sientan cómodos interpretando alertas relacionadas con la IA a medida que la tecnología evoluciona.</p>";
        }

        let adviceSegments = [];

        if (data.q15 === 'Yes' && data.q16 === 'Yes' && data.q18 !== 'Yes') {
            adviceSegments.push("<strong>Revisa tu almacenamiento en la nube:</strong> Tu enfoque para identificar estudiantes en riesgo a través de su comportamiento digital parece sólido, lo cual es excelente. Sin embargo, para asegurar que esta visibilidad se extienda a todo tu entorno digital, recomendamos revisar los protocolos de almacenamiento en la nube. A medida que el uso de la IA en el aula continúa creciendo, los centros educativos deben prepararse para un aumento del contenido generado por IA en los sistemas de almacenamiento del centro. Recomendamos evaluar tu visibilidad actual sobre imágenes y vídeos almacenados en la nube y revisar con qué frecuencia se analizan para detectar contenido dañino o inapropiado.");
        } 
        else if (notSureCount >= 2) {
            adviceSegments.push("<strong>Averigua qué puede y qué no puede hacer tu sistema de monitorización:</strong> Parece que no estás seguro de las capacidades específicas de tu monitorización respecto a la IA. Recomendamos encarecidamente hablar con las <strong>partes interesadas internas (como tu responsable de salvaguarda o responsable de TI)</strong> y con tu proveedor de monitorización para entender exactamente qué riesgos relacionados con la IA pueden detectar actualmente.");
        }
        else {
            if (data.q15 === 'Yes' && (data.q16 !== 'Yes' || data.q17 !== 'Yes')) {
                adviceSegments.push("<strong>Considera la eficacia de tu monitorización frente a riesgos de IA:</strong> Tener monitorización es un gran paso. Sin embargo, es importante considerar hasta qué punto detecta riesgos graves. Los sistemas basados únicamente en palabras clave suelen perder el contexto. Los sistemas moderados por personas pueden ser mucho más eficaces para detectar señales de alerta sutiles —como dependencia emocional de chatbots o situaciones de coerción— ofreciendo mayor tranquilidad de que riesgos que escapan a la vista de profesores están siendo identificados.");
            }
        }

        const bridgeTriggered = (data.q15 === 'Yes' && data.q16 === 'Yes' && data.q18 !== 'Yes');
        if (data.q18 !== 'Yes' && !bridgeTriggered) {
            adviceSegments.push(`<strong>Revisa tu almacenamiento en la nube:</strong> A medida que aumenta el uso de la IA en el aula, los centros educativos deben prepararse para un incremento de contenido generado por IA en sus sistemas de almacenamiento. Recomendamos evaluar la visibilidad actual sobre imágenes y vídeos almacenados en la nube y revisar con qué frecuencia se analizan para detectar contenido dañino o inapropiado.`);
        }

        if (adviceSegments.length === 0) {
                return "<p>Continúa revisando regularmente tus sistemas de detección.</p>";
        }

        return `<p>${adviceSegments.join("</p><p>")}</p>`;
    }

    function generateEmpowerFeedback(data) {
        const yesCount = countAnswers(data, 19, 27, 'Yes');
        const notSureCount = countAnswers(data, 19, 27, 'Not Sure');

        if (yesCount === 9) {
            return "<p>Estás haciendo un excelente trabajo empoderando a tu comunidad. Tu enfoque integral en formación y participación establece un estándar muy alto. Mantén este impulso actualizando periódicamente los materiales de formación.</p>";
        }

        let intro = "";
        let points = [];

        if (data.q19 === 'Yes' && data.q20 !== 'Yes') {
            points.push("<strong>Forma al personal en el uso seguro de herramientas de IA:</strong> Has asegurado que el personal conozca las normas (Código de Conducta), lo cual es fundamental. El siguiente paso es proporcionar formación práctica sobre cómo usar estas herramientas de forma eficaz y segura en el aula.");
        }
        if (data.q19 !== 'Yes' && data.q20 !== 'Yes') {
                points.push("<strong>Prioriza la formación del personal:</strong> La formación del personal parece ser un área clave de desarrollo. Prioriza sesiones que cubran tanto el Código de Conducta como el uso práctico y seguro de herramientas de IA.");
        }

        if (data.q23 !== 'Yes') {
            points.push("<strong>Enseña a los estudiantes a usar la IA de forma segura:</strong> Al revisar la educación sobre IA, es importante asegurar que el aprendizaje sea apropiado para la edad. Las expectativas sobre temas como el uso de la IA y la ética variarán naturalmente entre estudiantes más jóvenes y aquellos en Bachillerato o etapas superiores.");
        }
        
        if (data.q24 !== 'Yes' || data.q25 !== 'Yes') { 
            points.push("<strong>Define una lista clara de herramientas de IA aprobadas:</strong> Establecer una lista clara de herramientas de IA aprobadas también puede ayudar a que los estudiantes interactúen con la IA de forma segura, reduciendo la probabilidad de que recurran a plataformas no verificadas o inadecuadas.");
        }

        if (data.q26 !== 'Yes' || data.q27 !== 'Yes') {
            points.push("<strong>Involucra a padres y cuidadores en la seguridad de la IA:</strong> Compartir orientación clara y accesible con padres y cuidadores respalda un enfoque de centro completo para la seguridad en IA, ayudando a reforzar mensajes coherentes tanto dentro del centro como fuera de él. Revisar qué información se comparte actualmente puede ayudar a garantizar que las familias se sientan informadas y apoyadas en relación con la IA.");
        }

        if (points.length === 0 && yesCount < 9) {
                points.push("<strong>Involucra regularmente al personal y a los estudiantes en la seguridad de la IA:</strong> Continúa trabajando con el personal y los estudiantes para asegurarte de que se sientan seguros y confiados al reportar problemas relacionados con la IA.");
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
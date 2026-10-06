/* ============================================================
   Digital Safeguarding Checklist  (KCSIE 2026)
   Content (sections / questions / recommendations / icons): DATA below.
   Flow: grid -> section (Yes/No/Not sure) -> recommendations.
   Persistence: localStorage + shareable URL. Accessible + printable.
   ============================================================ */
(function () {
  "use strict";

  /* Icon asset base (HubSpot file manager) */
  var IB = "https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/UK_SMW_2026_KCSIE%20Best%20Practice%20Checklist_Icons_";
  function W(n) { return IB + "White-" + n + ".png"; }
  function P(n) { return IB + "Purple-" + n + ".png"; }

  /* Each section: t=title, c=accent, fa=fallback icon, iw/ip=icon URLs (blank = use fa)
     items: [ {g:"Group label"}  OR  {q:"question", r:"recommendation"} ]
     Only {q} items are counted / scored. */
  var DATA = [
    {
      t: "Leadership & Culture", c: "#515BA5", fa: "fa-solid fa-shield-halved", iw: W("14"), ip: P("05"),
      items: [
        { q: "Does your setting demonstrate a genuine whole-school approach to online safety, with digital safeguarding and wellbeing treated as a priority across every area?",
          r: "Embed digital safeguarding and wellbeing as a whole-school priority — visible in strategy, meetings and day-to-day practice. (See further information, advice and guidance in Keeping Children Safe In Education Paragraph 117-119)" },
        { q: "Is there a clear, non-victim-blaming culture when responding to incidents and disclosures (e.g. avoiding statements like \u201cyou shouldn't be on social media\u201d), and can this be evidenced?",
          r: "Adopt and evidence a non-victim-blaming response culture, and train staff on the language they use with pupils and in the record management system (such as CPOMS and MyConcern)." },
        { q: "Does your approach deliberately balance celebrating positive online experiences with addressing online harms?",
          r: "Ensure your approach celebrates positive online experiences as well as tackling online risk and harms. This can be supported by a cross curricular approach to online safety." },
        { q: "Do you have clear strategies to <em>identify</em> and to <em>intervene on</em> mental health and wellbeing concerns among both pupils and staff?",
          r: "Put clear strategies in place to identify and act on mental health and wellbeing concerns for both pupils and staff (See further information, advice and guidance in Keeping Children Safe In Education Paragraph 45-48, 224-232)." },
        { q: "Do you have clear strategies and policies relating to sports activities, taking into account safeguarding obligations and the importance of ensuring sport is safe and fair?",
          r: "Develop clear strategies and policies covering safeguarding in sport, ensuring activities are safe and fair. (See further information, advice and guidance in Keeping Children Safe In Education Paragraph 95-98)" },
        { q: "Do you have clear regulations and safeguarding requirements relating to school premises such as toilets, changing rooms and showers?",
          r: "Set clear safeguarding regulations for premises such as toilets, changing rooms and showers (See further information, advice and guidance in Keeping Children Safe In Education Paragraph 105-116)." },
        { q: "Do you have a clear strategy and policy regarding the safe and legal responsibilities relating to the use of generative AI?",
          r: "Create a clear strategy and policy covering the safe and legal use of generative AI (See further information, advice and guidance in <a class='dsc__link' href='https://assets.publishing.service.gov.uk/media/6a4cf903b7203c4c023fd2f3/Keeping_children_safe_in_education_2026_.pdf' target='_blank' rel='noopener noreferrer'>Keeping Children Safe In Education</a>, <a class='dsc__link' href='https://www.gov.uk/government/publications/generative-artificial-intelligence-in-education/generative-artificial-intelligence-ai-in-education' target='_blank' rel='noopener noreferrer'>Generative AI In Education</a>, <a class='dsc__link' href='https://www.gov.uk/government/publications/ai-in-schools-and-further-education-findings-from-early-adopters/the-biggest-risk-is-doing-nothing-insights-from-early-adopters-of-artificial-intelligence-in-schools-and-further-education-colleges' target='_blank' rel='noopener noreferrer'>The biggest risk is doing nothing</a>, <a class='dsc__link' href='https://www.gov.uk/data-protection' target='_blank' rel='noopener noreferrer'>Data Protection</a>, <a class='dsc__link' href='https://www.gov.uk/government/publications/generative-ai-product-safety-standards' target='_blank' rel='noopener noreferrer'>Generative AI: Product Safety Expectations</a>)." },
        { q: "Where applicable, do you have clear strategies and procedures to support boarding and residential accommodation?",
          r: "Where applicable, establish clear strategies and procedures to safeguard boarding and residential accommodation. (See further information, advice and guidance in Keeping Children Safe In Education Paragraph 192-202)" },
        { q: "Do you have clear strategies and procedures for the limited circumstances where reasonable force may be used to safeguard children?",
          r: "Document clear procedures for the limited circumstances in which reasonable force may be used to safeguard children. (See further information, advice and guidance in Keeping Children Safe In Education Paragraph 203-205)" },
        { q: "Do you have clear strategies, policies and procedures relating to the management of children's medical conditions?",
          r: "Put clear policies and procedures in place for managing children's medical conditions. (See further information, advice and guidance in Keeping Children Safe In Education Paragraph 250)" },
        { q: "Do you have clear strategies, policies and procedures in relation to children who are questioning their gender?",
          r: "Establish clear, sensitive strategies and procedures to support children who are questioning their gender. (See further information, advice and guidance in Keeping Children Safe In Education Paragraph 252-282)" }
      ]
    },
    {
      t: "Governance, Standards & Accountability", c: "#58B78E", fa: "fa-solid fa-scale-balanced", iw: W("12"), ip: P("03"),
      items: [
        { g: "Roles & responsibilities" },
        { q: "Have all staff read and understood <a class='dsc__link' href='https://assets.publishing.service.gov.uk/media/6a47c29b1c8bd7ce25a5eb6d/Keeping_children_safe_in_education_2026__part_one.pdf' target='_blank' rel='noopener noreferrer'>Part 1 of Keeping Children Safe in Education</a>?",
          r: "Ensure all staff have read and understood <a class='dsc__link' href='https://assets.publishing.service.gov.uk/media/6a47c29b1c8bd7ce25a5eb6d/Keeping_children_safe_in_education_2026__part_one.pdf' target='_blank' rel='noopener noreferrer'>Part 1 of Keeping Children Safe in Education</a>, and record it. This could involve questions during a staff meeting or a quiz to confirm that all staff fully understand their safeguarding duty." },
        { q: "Do you have a designated safeguarding lead and deputy/deputies clearly allocated across the school, college or MAT?",
          r: "Formally allocate a DSL and deputy/deputies across the school, college or MAT." },
        { q: "Do you have robust cover arrangements for periods when the DSL is unavailable (for example, a confidential shared mailbox so concerns are received, monitored and acted upon without delay)?",
          r: "Set up robust DSL cover for absences, including a monitored confidential mailbox so concerns are never missed. This ensures that safeguarding concerns are dealt with efficiently and that there is no delay in response and support. (See further information, advice and guidance in Keeping Children Safe In Education Paragraph 105-116)" },
        { q: "Is it clear that the DSL team owns the filtering and monitoring provision (including changes and updates), supported by the technical team?",
          r: "Make clear that the DSL team owns the filtering and monitoring provision, supported by the technical team and members of the senior leadership team. (See further information, advice and guidance in Keeping Children Safe In Education and the <a class='dsc__link' href='https://www.gov.uk/guidance/meeting-digital-and-technology-standards-in-schools-and-colleges' target='_blank' rel='noopener noreferrer'>Digital Technology Standards</a>)" },
        { q: "Do you have a named safeguarding governor and a governor responsible for overseeing filtering and monitoring?",
          r: "Appoint a named safeguarding governor and a governor responsible for overseeing filtering and monitoring." },
        { q: "Does the safeguarding governor regularly meet with and review safeguarding (including digital) with the safeguarding team?",
          r: "Schedule regular meetings for the safeguarding governor to review safeguarding, including digital, with the wider safeguarding team (including IT, SMT and Safeguarding team)." },
        { q: "Do governors review the filtering and monitoring provision at least annually and receive regular updates on its effectiveness?",
          r: "Have governors formally review filtering and monitoring at least annually and receive regular effectiveness updates. (See further information in the <a class='dsc__link' href='https://www.gov.uk/guidance/meeting-digital-and-technology-standards-in-schools-and-colleges/filtering-and-monitoring-core-standard' target='_blank' rel='noopener noreferrer'>Filtering and Monitoring Standards</a>)" },
        { q: "Have you reviewed your policies, procedures and approach to cyber security?",
          r: "Review your policies, procedures and overall approach to cyber security. (See further information within <a class='dsc__link' href='https://www.gov.uk/guidance/meeting-digital-and-technology-standards-in-schools-and-colleges/filtering-and-monitoring-core-standard' target='_blank' rel='noopener noreferrer'>Filtering and Monitoring Standards</a>)" },
        { q: "Have you implemented measures in line with the <a class='dsc__link' href='https://cyber-security-hub.education.gov.uk/meeting-dfe-cyber-standards' target='_blank' rel='noopener noreferrer'>Cyber Security Standards</a>?",
          r: "Implement measures that meet the <a class='dsc__link' href='https://cyber-security-hub.education.gov.uk/meeting-dfe-cyber-standards' target='_blank' rel='noopener noreferrer'>Cyber Security Standards</a>." },
        { g: "Recruitment & assurance" },
        { q: "Do you carry out enhanced DBS and children's barred list checks on all staff, governors and volunteers, with a clear process for recording visitors and additional staff on the Single Central Record (SCR)?",
          r: "Carry out enhanced DBS and barred-list checks for all staff, governors and volunteers, and record everyone correctly on the SCR. (See further information, advice and guidance in Keeping Children Safe In Education)" },
        { q: "Do you have a clear, regular SCR review process?",
          r: "Establish a clear, regular SCR review process with named ownership. (See further information, advice and guidance in <a class='dsc__link' href='https://assets.publishing.service.gov.uk/media/6a4cf903b7203c4c023fd2f3/Keeping_children_safe_in_education_2026_.pdf' target='_blank' rel='noopener noreferrer'>Keeping Children Safe In Education</a>)" },
        { g: "Standards & self-evaluation" },
        { q: "Are SLT and governors aware of the <a class='dsc__link' href='https://www.gov.uk/guidance/meeting-digital-and-technology-standards-in-schools-and-colleges' target='_blank' rel='noopener noreferrer'>Digital and Technology Standards</a>, and have you reviewed them and set out a plan to achieve full compliance by 2030?",
          r: "Brief SLT and governors on the <a class='dsc__link' href='https://www.gov.uk/guidance/meeting-digital-and-technology-standards-in-schools-and-colleges' target='_blank' rel='noopener noreferrer'>Digital and Technology Standards</a> and set a plan for full compliance by 2030." },
        { q: "Do you complete an annual digital safeguarding audit, such as 360 degree safe or the LGfL online safety audit?",
          r: "Complete an annual digital safeguarding audit, such as <a class='dsc__link' href='https://360safe.org.uk/' target='_blank' rel='noopener noreferrer'>360 degree safe</a> or the <a class='dsc__link' href='https://lgfl.net/TypesOfHarm/OnlineSafetyAudit' target='_blank' rel='noopener noreferrer'>LGfL online safety audit</a>." },
        { q: "Has your filtering and/or monitoring provider completed a UK Safer Internet Centre submission, and have your DSL, SLT, governors and technical team read and understood it?",
          r: "Obtain your provider's UK Safer Internet Centre submission and ensure key stakeholders have read and understood it. This can be found on the <a class='dsc__link' href='https://saferinternet.org.uk/guide-and-resource/teachers-and-school-staff/appropriate-filtering-and-monitoring' target='_blank' rel='noopener noreferrer'>UKSIC website</a>." },
        { q: "Do you regularly check your educational setting's digital footprint and take action accordingly?",
          r: "Regularly review your setting's digital footprint and take action on what you find. Some settings pay for the monitoring of the school digital reputation and others utilise tools such as <a class='dsc__link' href='https://support.google.com/websearch/answer/4815696?hl=en' target='_blank' rel='noopener noreferrer'>Google Alerts</a>." }
      ]
    },
    {
      t: "Policies & Procedures", c: "#515BA5", fa: "fa-solid fa-file-shield", iw: W("13"), ip: P("04"),
      items: [
        { q: "Does your setting have clear digital safeguarding policies and procedures in place?",
          r: "Put clear digital safeguarding policies and procedures in place. Schools are legally and ethically obligated to implement robust safeguarding policies to ensure student welfare. These policies establish a unified framework for abuse prevention, early identification of vulnerable children, online safety management, and the oversight of staff conduct. By doing so, schools cultivate a secure atmosphere that is essential for student success and development." },
        { q: "Do you have an updated and current Child Protection Policy covering areas such as child-on-child abuse, harmful sexual behaviours, sexual violence and harassment, and the making or sharing of nudes and semi-nudes (including AI-generated)?",
          r: "Ensure your Child Protection Policy is current and covers child-on-child abuse, harmful sexual behaviour and AI-generated nudes. Schools must maintain a current child protection policy to meet their legal and moral obligations to keep students safe. A dynamic document ensures the institution complies with statutory guidance and provides staff with actionable steps to identify and report abuse or neglect. (KCSIE 2026, <a class='dsc__link' href='https://assets.publishing.service.gov.uk/media/6a47c29b1c8bd7ce25a5eb6d/Keeping_children_safe_in_education_2026__part_one.pdf#page=50' target='_blank' rel='noopener noreferrer'>pages 50 and 51</a>)" },
        { q: "Do your policies clearly cross-reference one another (e.g. Child Protection, Safeguarding, Behaviour, Prevent, Anti-bullying, AI, ICT/Online Safety, Data Protection)?",
          r: "It is important that all policies are cross-referenced so they work as a joined-up set rather than in isolation." },
        { q: "Do you have a clear AI policy that underpins your AI strategy and is cross-referenced into other relevant policies?",
          r: "Create an AI policy that underpins your AI strategy and links to other relevant policies. There are a number of AI policy templates available. One such template has been created by the <a class='dsc__link' href='https://swgfl.org.uk/magazine/integrating-ai-in-schools-new-policy-template-available/' target='_blank' rel='noopener noreferrer'>SWGfL</a>. Further guidance can be found in the document: <a class='dsc__link' href='https://www.gov.uk/government/publications/generative-artificial-intelligence-in-education/generative-artificial-intelligence-ai-in-education' target='_blank' rel='noopener noreferrer'>Generative AI in Education</a>." },
        { q: "Are you a mobile phone free environment, as required by the statutory guidance '<a class='dsc__link' href='https://www.gov.uk/government/publications/mobile-phones-in-schools/mobile-phones-in-schools' target='_blank' rel='noopener noreferrer'>Mobile Phones in Schools</a>'?",
          r: "Consult and adhere to the statutory <a class='dsc__link' href='https://www.gov.uk/government/publications/mobile-phones-in-schools/mobile-phones-in-schools' target='_blank' rel='noopener noreferrer'>Mobile Phones in Schools</a> guidance for a mobile-free environment." },
        { q: "Do you have a defined staff code of conduct?",
          r: "Put a defined staff code of conduct in place. This clear code of conduct for staff is crucial for safeguarding children, as it defines appropriate professional boundaries and helps prevent inappropriate relationships or harm." },
        { q: "Do you have acceptable use policies (AUPs) for pupils, governors and visitors?",
          r: "Introduce acceptable use policies (AUPs) for pupils, governors and visitors. These should be clear and easy for all stakeholders to understand. For example, how do you communicate the AUP to young children?" },
        { q: "Is your whole community able to influence the development of policies and procedures (e.g. pupil voice, staff consultation, parent/carer feedback)?",
          r: "Create mechanisms for pupil, staff and parent/carer voice to shape policy development. Surveys, interviews and committees are some of the ways that establishments gather these vital views to shape and focus their responses." },
        { q: "Do you have clear policies and procedures when transferring or sharing data with other agencies for safeguarding purposes?",
          r: "Establish clear policies and procedures for transferring or sharing data with other agencies for safeguarding purposes. See further guidance in <a class='dsc__link' href='https://assets.publishing.service.gov.uk/media/6a4cf903b7203c4c023fd2f3/Keeping_children_safe_in_education_2026_.pdf' target='_blank' rel='noopener noreferrer'>Keeping Children Safe in Education</a>." }
      ]
    },
    {
      t: "Technology: Filtering, Monitoring & AI", c: "#58B78E", fa: "fa-solid fa-sitemap", iw: W("17"), ip: P("08"),
      items: [
        { q: "Does your current filtering and monitoring provision meet the <a class='dsc__link' href='https://www.gov.uk/guidance/meeting-digital-and-technology-standards-in-schools-and-colleges/filtering-and-monitoring-core-standard' target='_blank' rel='noopener noreferrer'>DfE's Filtering and Monitoring Standards</a>?",
          r: "Assess your filtering and monitoring provision against the DfE's <a class='dsc__link' href='https://www.gov.uk/guidance/meeting-digital-and-technology-standards-in-schools-and-colleges/filtering-and-monitoring-core-standard' target='_blank' rel='noopener noreferrer'>Filtering and Monitoring Standards</a> and close any gaps." },
        { q: "Do all relevant stakeholders (staff, governors, pupils and parents) know what filtering and monitoring systems are in place, how they work, and how they are reviewed?",
          r: "Ensure staff, governors, pupils and parents know what systems are in place, how they work and how they're reviewed. These should also be communicated in relevant policies." },
        { q: "Do your DSL team and technical team review the filtering and monitoring provision together on a regular basis?",
          r: "Have your DSL and technical teams review the filtering and monitoring provision together on a regular basis." },
        { q: "Do you review the effectiveness of your filtering at least termly, including using a tool such as <a class='dsc__link' href='https://testfiltering.com/' target='_blank' rel='noopener noreferrer'>testfiltering.com</a>?",
          r: "Review filtering effectiveness at least termly, using a tool such as <a class='dsc__link' href='https://testfiltering.com/' target='_blank' rel='noopener noreferrer'>testfiltering.com</a>. Further guidance on how to use and what to look for can be found <a class='dsc__link' href='https://www.youtube.com/watch?v=W53989MVoZI&t=33s' target='_blank' rel='noopener noreferrer'>in this video</a>." },
        { q: "Do you review the effectiveness of your monitoring at least termly?",
          r: "Review monitoring effectiveness at least termly. This may involve penetration testing on the monitoring system, integration with record management systems such as CPOMS and MyConcern for effective recording and tracking." },
        { q: "Do you review your filtering and monitoring in response to new curriculum needs and requirements?",
          r: "Review filtering and monitoring in response to new curriculum needs and requirements. This involves understanding that the filtering should not overblock to ensure curriculum coverage. Most schools compile lists of websites and resources that are going to be used in lessons and ensure these are unblocked accordingly." },
        { q: "Is there a clear, well-understood process for staff and pupils to report over-blocking and to request that sites be blocked or unblocked?",
          r: "Provide a clear, well-understood process for reporting over-blocking and requesting sites be blocked or unblocked. This is important as the needs of the curriculum may change, therefore requiring quick responses to unblocking requests." },
        { q: "Have you created a clear strategy to ensure AI is used safely by both pupils and staff?",
          r: "Create a clear strategy to ensure AI is used safely by pupils and staff. The DfE has shared lots of useful materials including the <a class='dsc__link' href='https://www.gov.uk/government/publications/generative-artificial-intelligence-in-education/generative-artificial-intelligence-ai-in-education' target='_blank' rel='noopener noreferrer'>Generative AI in Education</a> document, <a class='dsc__link' href='https://www.gov.uk/government/publications/ai-in-schools-and-further-education-findings-from-early-adopters/the-biggest-risk-is-doing-nothing-insights-from-early-adopters-of-artificial-intelligence-in-schools-and-further-education-colleges' target='_blank' rel='noopener noreferrer'>The biggest risk is doing nothing</a> (research and analysis report) and specific courses for school leadership and staff." }
      ]
    },
    {
      t: "Training & Professional Development", c: "#515BA5", fa: "fa-solid fa-chalkboard-user", iw: W("15"), ip: P("06"),
      items: [
        { q: "Do all staff attend annual, up-to-date safeguarding training that includes digital safeguarding and wellbeing, and filtering and monitoring?",
          r: "Deliver annual safeguarding training for all staff covering digital safeguarding, wellbeing, and filtering and monitoring. It is important that staff receive up to date and regular information, advice and guidance to ensure that all safeguarding concerns are picked up and shared with the safeguarding team appropriately. Staff's eyes and ears are so important alongside digital indicators through filtering and monitoring and it's important for staff to understand how these fit together as part of a cohesive safeguarding strategy. (See further information, advice and guidance in Keeping Children Safe In Education Paragraph 151-155)" },
        { q: "Are all staff aware of the process for community-based family help assessments?",
          r: "Make sure all staff understand the process for community-based family help assessments. (See further information, advice and guidance in Keeping Children Safe In Education Paragraph 62)" },
        { q: "Have all staff read relevant statutory guidance and can they demonstrate they understand and apply your policies (e.g. via quizzes or questionnaires)?",
          r: "Ensure staff have read relevant statutory guidance and check understanding through quizzes or questionnaires." },
        { q: "Are all staff aware of the indicators of abuse, neglect, exploitation and modern slavery?",
          r: "Train all staff to recognise the indicators of abuse, neglect, exploitation and modern slavery." },
        { q: "Are all staff aware of the 4 Cs of digital safeguarding risk (content, contact, conduct and commerce)?",
          r: "Ensure all staff understand the 4 Cs of online risk: content, contact, conduct and commerce. This is important for staff to understand and see how there could be clear early warning signs in digital spaces. (See further information, advice and guidance in Keeping Children Safe In Education Paragraph 163)" },
        { q: "Are all staff aware of harms such as domestic abuse, teenage relationship abuse, criminal and financial exploitation, serious youth violence, county lines and radicalisation?",
          r: "Train staff on the full range of harms, including domestic and teenage relationship abuse, exploitation, county lines and radicalisation." },
        { q: "Do all staff understand that children can abuse other children online, including harassment, the non-consensual sharing of nudes, and sharing abusive images or pornography?",
          r: "Ensure staff understand child-on-child online abuse, including harassment, non-consensual sharing of nudes, and abusive content in chat groups." },
        { q: "Do all staff have an awareness that mental health problems can, in some cases, develop into safeguarding concerns, including self-harm and suicidal ideation?",
          r: "Help staff recognise when mental health difficulties, including self-harm and suicidal ideation, become safeguarding concerns." },
        { q: "Do all staff understand their role in promoting good wellbeing, identifying concerns early, and referring to specialist services where needed?",
          r: "Ensure staff understand their role in promoting wellbeing, spotting concerns early, and referring to specialist support." },
        { q: "Do all staff complete Prevent training at least every two years?",
          r: "Ensure all staff complete Prevent training at least every two years." },
        { q: "Do technical staff receive sufficient training on key safeguarding elements, with a focus on AI, cyber security and filtering and monitoring?",
          r: "Give technical staff sufficient safeguarding training, focused on AI, cyber security and filtering and monitoring to assist with safeguarding across the organisation." },
        { q: "Do all staff understand data protection laws?",
          r: "Ensure all staff understand data protection law and apply this across your organisation." },
        { q: "Do all staff take part in cyber security training and penetration testing, with regular best-practice reminders (passwords, phishing, reporting)?",
          r: "Provide cyber security training and penetration testing, with regular reminders on passwords, phishing and reporting." },
        { q: "Have you conducted a whole-staff skills audit covering all aspects of safeguarding, including digital (e.g. AI and deepfakes, HSB, exploitation, county lines, radicalisation, FMSE, FGM)?",
          r: "Conduct a whole-staff skills audit covering all safeguarding topics, including digital, AI and deepfakes. By doing this it will provide a gap analysis that can support staff CPD." },
        { q: "Have staff received clear guidance on which AI platforms to use to support their own role?",
          r: "Give staff clear guidance on which AI platforms to use to support their role. This should be reiterated through training and policies." },
        { q: "Do you maintain a central record of all training completed by staff and governors, and report on it?",
          r: "Maintain and report on a central training record covering both staff and governors." },
        { q: "Do governors attend regular, up-to-date safeguarding training, including its digital aspects?",
          r: "Ensure governors attend regular, up-to-date safeguarding training, including its digital aspects. This type of training equips the governing body to provide strategic challenge, ensure policies are effective, and oversee a robust whole-school safeguarding culture." }
      ]
    },
    {
      t: "Curriculum & Pupil Education", c: "#58B78E", fa: "fa-solid fa-graduation-cap", iw: W("11"), ip: P("02"),
      items: [
        { q: "Do you provide a flexible, relevant and engaging curriculum that promotes digital resilience, wellbeing and positive online behaviours, embedded across all subjects?",
          r: "Deliver a flexible, engaging curriculum that builds digital resilience and positive online behaviour, embedded across all subjects." },
        { q: "Are staff empowered to adapt the curriculum in real time to address immediate pupil needs and emerging trends?",
          r: "Empower staff to adapt the curriculum in real time to address emerging pupil needs and trends." },
        { q: "Have you recently reviewed the curriculum to ensure it builds pupils' digital safeguarding skills, and do you review it in response to issues, concerns and learner voice?",
          r: "Regularly review the curriculum to strengthen pupils' digital safeguarding skills, informed by concerns and learner voice." },
        { q: "Have you created a culture of zero tolerance for sexism, racism, misogyny/misandry, homophobia, sexual violence and harassment, and other derogatory behaviour?",
          r: "Build a culture of zero tolerance for sexism, racism, misogyny, misandry, homophobia, sexual harassment and violence." },
        { q: "Have you reviewed your RSE provision to meet the revised statutory guidance?",
          r: "Review your RSE provision against the <a class='dsc__link' href='https://assets.publishing.service.gov.uk/media/6970e7e67e827090d02d42e0/Relationships_education_relationships_and_sex_education__RSE__and_health_education__for_intro_1_September_2026_.pdf' target='_blank' rel='noopener noreferrer'>revised statutory guidance</a> so you can ensure you are meeting it." },
        { q: "Are pupils taught about cyber security (passwords, phishing, reporting) and how to keep their data and personal information safe?",
          r: "Teach pupils about cyber security and how to keep their data and personal information safe through a robust and integrated curriculum." },
        { q: "Has guidance been given on which AI platforms pupils should use to support curriculum exploration?",
          r: "Give pupils clear guidance on which AI platforms to use for curriculum exploration and how to use them safely, ethically and responsibly." },
        { q: "Do you have a clear assembly structure covering all areas of safeguarding, including digital?",
          r: "Create an assembly structure that covers all areas of safeguarding, including digital." },
        { q: "Do you have peer mentoring programmes in place?",
          r: "Establish peer mentoring programmes to extend safeguarding reach among pupils." },
        { q: "Do you engage with national events (e.g. Safer Internet Day, Anti-Bullying Week) to promote digital safeguarding?",
          r: "Take part in national events such as Safer Internet Day, Anti-Bullying Week and Mental Health Awareness Week." },
        { q: "Does your provision give specific consideration to vulnerable pupils, such as those with SEND or other vulnerabilities?",
          r: "Give specific consideration to vulnerable pupils, including those with SEND, in your provision." }
      ]
    },
    {
      t: "Reporting & Responding to Concerns", c: "#515BA5", fa: "fa-solid fa-flag", iw: W("10"), ip: P("01"),
      items: [
        { q: "Is it clear in your policies and culture that safeguarding is everyone's responsibility?",
          r: "Make clear in policy and culture that safeguarding is everyone's responsibility." },
        { q: "Do all stakeholders (staff, governors, pupils, parents and visitors) know how to report concerns and understand the channels of escalation?",
          r: "Ensure all stakeholders know how to report concerns and understand the escalation routes. This should be checked through training and CPD." },
        { q: "Do all staff \u2014 including non-specialist, supply, temporary and technical staff \u2014 apply a consistent approach to capturing and recording incidents?",
          r: "Give all staff, including supply, temporary and technical, a consistent approach to recording incidents and who they are to speak to regarding safeguarding concerns." },
        { q: "Are there easily accessible report-abuse buttons and clear, child-friendly ways for learners to reach out for help?",
          r: "Provide accessible report-abuse buttons and clear, child-friendly routes for learners to seek help. Use pupil voice to check if these measures of support are effective and usable. Through student voice, learners may have other ideas of accessible ways of reaching out for help and support." },
        { q: "Do you provide an anonymous reporting route accessible both in and out of the setting (e.g. via your website), alongside tools such as worry boxes?",
          r: "Offer an anonymous reporting route accessible in and out of the setting, alongside tools like worry boxes or monsters. Some communities find pastoral pop-ins have had a positive impact." },
        { q: "Is your monitoring integrated into your safeguarding record-management system (e.g. CPOMS, MyConcern)?",
          r: "Integrate monitoring into your safeguarding record management system, such as CPOMS or MyConcern. This ensures data capturing is effective and records can be viewed and actioned in a timely manner." },
        { q: "Are all reports reviewed and actioned, with the DSL and deputies acting on digital safeguarding reports from all relevant sources?",
          r: "Review and action all reports, with the DSL team acting on digital reports from every relevant source." }
      ]
    },
    {
      t: "Engagement, Communication & Voice", c: "#58B78E", fa: "fa-solid fa-comments", iw: W("18"), ip: P("09"),
      items: [
        { q: "Are all stakeholders aware of who is on the safeguarding team, and kept informed of the policies and updates relevant to them?",
          r: "Ensure all stakeholders know the safeguarding team and stay informed of relevant policies and updates. Some establishments place posters or safeguarding boards around so that all stakeholders have regular reminders of who they are speaking to and the processes surrounding safeguarding." },
        { q: "Does leadership communicate regularly with all four pillars (staff, governors, parents/carers and pupils) on digital safeguarding and wellbeing?",
          r: "Have leadership communicate regularly with all four pillars: staff, governors, parents/carers and pupils. This could include newsletters, bulletins, posters or training sessions." },
        { q: "Do parents/carers receive regular information, advice and guidance on digital risks and harms, including online or face-to-face training and support?",
          r: "Give parents/carers regular guidance on digital risks, including online or face-to-face training and support. Alongside this, communicate regularly with parents around safeguarding (including digital safeguarding) through resources such as newsletters, bulletins or posters. It can be helpful to survey your parental community to see what information they would find useful or what time would work best for the training session." },
        { q: "Do parents/carers know how to access support, and is there a dedicated area on your website with resources for them (and a separate area for pupils)?",
          r: "Make support easy to find, with a dedicated resources area for parents/carers and a separate area for pupils." },
        { q: "Do governors and parents receive information about how to report content or harms online?",
          r: "Provide governors and parents with clear information on how to report all types of harmful content, conduct, contact and commerce online." },
        { q: "Do you carry out regular pupil and parent/carer voice activities (surveys, drop-ins, polls, interviews), and use the findings to update curriculum, policies and procedures?",
          r: "Run regular pupil and parent/carer voice activities and use the findings to update curriculum, interventions, assemblies, training, policies and procedures." },
        { q: "Have you consulted parents/carers on the implementation of the RSE curriculum?",
          r: "Consult parents/carers on how you implement the RSE curriculum." },
        { q: "Do you host regular drop-in sessions for your community to access support and raise concerns?",
          r: "Host regular community drop-in sessions to offer support and hear concerns." },
        { q: "Do you connect with other local settings to share safeguarding practice, including digital?",
          r: "Connect with other local settings to share safeguarding practice, including digital." },
        { q: "Do you report to governors on the impact of parental and pupil engagement?",
          r: "Report regularly to governors on the impact of parental and pupil engagement." }
      ]
    }
  ];

  /* Bold summarising titles for the recommendations page, one per question in
     order (group sub-headings are not counted). Keep in step with DATA. */
  var TITLES = [
    [ // 1 Leadership & Culture
      "Make it a whole-school priority", "Build a non-blaming culture", "Balance positives with harms",
      "Support mental health and wellbeing", "Establish safeguarding in sport", "Set clear premises safeguards",
      "Set a generative AI policy", "Safeguard boarding provision", "Define reasonable-force procedures",
      "Manage medical conditions safely", "Support children questioning gender"
    ],
    [ // 2 Governance, Standards & Accountability
      "Ensure staff read KCSIE Part 1", "Allocate a DSL and deputies", "Put DSL cover in place",
      "Clarify DSL ownership of filtering", "Appoint safeguarding governors", "Schedule governor safeguarding reviews",
      "Review filtering with governors annually", "Review your cyber security approach", "Meet the Cyber Security Standards",
      "Complete DBS checks and the SCR", "Establish an SCR review process", "Plan for the Technology Standards",
      "Run an annual safeguarding audit", "Review your provider's UKSIC submission", "Check your digital footprint"
    ],
    [ // 3 Policies & Procedures
      "Put core policies in place", "Update your Child Protection Policy", "Cross-reference your policies",
      "Create an AI policy", "Become a mobile-free setting", "Define a staff code of conduct",
      "Introduce acceptable use policies", "Let your community shape policy", "Set data-sharing procedures"
    ],
    [ // 4 Technology: Filtering, Monitoring & AI
      "Meet the Filtering and Monitoring Standards", "Make systems understood by all", "Review filtering as a team",
      "Test filtering every term", "Review monitoring every term", "Adapt to curriculum needs",
      "Provide an over-blocking process", "Set a safe-AI strategy"
    ],
    [ // 5 Training & Professional Development
      "Deliver annual safeguarding training", "Explain family-help assessments", "Check policy understanding",
      "Train on indicators of abuse", "Teach the 4 Cs of online risk", "Cover the full range of harms",
      "Train on child-on-child abuse", "Spot mental-health safeguarding risks", "Clarify staff wellbeing roles",
      "Keep Prevent training current", "Train your technical staff", "Cover data protection law",
      "Run cyber security training", "Audit whole-staff skills", "Guide staff on AI tools",
      "Keep a central training record", "Train your governors"
    ],
    [ // 6 Curriculum & Pupil Education
      "Build a resilience-focused curriculum", "Adapt the curriculum in real time", "Review the curriculum regularly",
      "Set a zero-tolerance culture", "Update your RSE provision", "Teach pupils cyber security",
      "Guide pupils on AI tools", "Plan safeguarding assemblies", "Set up peer mentoring",
      "Join national safeguarding events", "Consider vulnerable pupils"
    ],
    [ // 7 Reporting & Responding to Concerns
      "Make safeguarding everyone's job", "Clarify how to report and escalate", "Standardise incident recording",
      "Provide easy reporting routes", "Offer anonymous reporting", "Integrate monitoring with records",
      "Review and action every report"
    ],
    [ // 8 Engagement, Communication & Voice
      "Keep stakeholders informed", "Communicate with all four pillars", "Guide parents on digital risks",
      "Make support easy to find", "Show parents how to report", "Gather pupil and parent voice",
      "Consult parents on RSE", "Host community drop-ins", "Share practice with other settings",
      "Report engagement impact to governors"
    ]
  ];
  var STORAGE_KEY = "dsc_kcsie_v2";
  var CONSENT_COOKIE_KEY = "qoria_cookie_preferences";
  var RING_C = 2 * Math.PI * 25; /* r = 25 */

  var root, kicker, A = {};
  var lastFocused = null, modalEl = null, bsModal = null;

  function qs(sel) { return root.querySelector(sel); }
  function key(si, qi) { return si + "_" + qi; }

  function questions(si) {
    var out = [], qi = 0;
    DATA[si].items.forEach(function (it) {
      if (it.q !== undefined) { out.push({ item: it, qi: qi }); qi++; }
    });
    return out;
  }
  function total(si) { return questions(si).length; }
  function count(si, val) {
    return questions(si).filter(function (x) {
      var a = A[key(si, x.qi)];
      return val ? a === val : a !== undefined;
    }).length;
  }
  function answered(si) { return count(si); }
  function statusOf(si) {
    var a = answered(si), t = total(si);
    if (a === 0) return "empty";
    if (a === t) return "done";
    return "progress";
  }
  /* For "not sure" answers, prompt the person to confirm the current position
     before acting on the recommendation itself. */
  var KCSIE_URL = "https://assets.publishing.service.gov.uk/media/6a4cf903b7203c4c023fd2f3/Keeping_children_safe_in_education_2026_.pdf";
  /* Turn any plain-text mention of "Keeping Children Safe in Education" into a
     link, without touching text that is already inside an <a> tag. */
  function linkifyKCSIE(html) {
    if (!html) return html;
    var parts = String(html).split(/(<a\b[^>]*>[\s\S]*?<\/a>)/gi);
    for (var i = 0; i < parts.length; i += 2) {
      parts[i] = parts[i].replace(/Keeping Children Safe [Ii]n Education/g,
        '<a href="' + KCSIE_URL + '" target="_blank" rel="noopener noreferrer">$& <span class="visually-hidden">(opens in a new tab)</span></a>');
    }
    return parts.join("");
  }
  function recBody(item, ans) {
    if (ans === "unsure") {
      return "Confirm what you currently have in place or do here before acting on this \u2014 if there's a gap: " + item.r;
    }
    return item.r;
  }
  function inProgressSections() {
    var out = [];
    DATA.forEach(function (_, si) {
      var a = answered(si), t = total(si);
      if (a > 0 && a < t) out.push(si);
    });
    return out;
  }
  function anyAnswered() { return DATA.some(function (_, si) { return answered(si) > 0; }); }

  /* ---------------- Icons ---------------- */
  /* mode "swap": white (default) + purple (active) imgs, FA fallback
     mode "single": one icon for a white-on-gradient context */
  function iconMarkup(si, mode) {
    var s = DATA[si], iw = s.iw, ip = s.ip;
    var wc = s.whiten ? " dsc__icon--whiten" : "";
    if (mode === "single") {
      var src = iw || ip;
      if (src) return '<img class="dsc__icon-single' + wc + '" src="' + src + '" alt="">';
      return '<i class="' + s.fa + '" aria-hidden="true"></i>';
    }
    /* swap */
    if (iw || ip) {
      var wUrl = iw || ip, pUrl = ip || iw;
      return '<img class="dsc__icon-white' + wc + '" src="' + wUrl + '" alt="">' +
             '<img class="dsc__icon-purple" src="' + pUrl + '" alt="">';
    }
    return '<i class="' + s.fa + '" aria-hidden="true"></i>';
  }

  function ringSVG(pct, fillColour, transparentTrack) {
    var offset = RING_C * (1 - pct / 100);
    var trackStyle = transparentTrack ? ' style="stroke:transparent"' : '';
    return '<svg viewBox="0 0 60 60" aria-hidden="true">' +
      '<circle class="dsc__ring-track" cx="30" cy="30" r="25"' + trackStyle + '></circle>' +
      '<circle class="dsc__ring-fill" cx="30" cy="30" r="25" stroke="' + fillColour + '" ' +
      'stroke-dasharray="' + RING_C.toFixed(1) + '" stroke-dashoffset="' + offset.toFixed(1) + '"></circle>' +
      '</svg>';
  }

  /* ---------------- Persistence & sharing ---------------- */
  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }
  function hasConsent() {
    let consent = false;
    const qoriaConsent = getCookie(CONSENT_COOKIE_KEY);
    const hsConsent = getCookie("__hs_cookie_cat_pref");
    if (qoriaConsent) {
      consent = JSON.parse(qoriaConsent).functional;
    }
    if (hsConsent) {
      consent = hsConsent.split("_").map(function (entry) {
        return entry.trim().split(":")[1] || "false";
      }).filter(function (entry) {
        return entry.length !== 0;
      })[2];
    }
    return consent == "true" || consent == "1" || consent == true || consent == 1 || consent == "yes" || consent == "y" || consent == "on" || consent == "allowed";
  }
  function save() {
    if (!hasConsent()) {
      try {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(A));
      } catch (e) {}
      return;
    } else {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(A));
      } catch (e) {}
    }

  }
  function loadStorage() {
    try {
      let s = {};
      if (!hasConsent()) {
        localStorage.removeItem(STORAGE_KEY);
        s = sessionStorage.getItem(STORAGE_KEY);
      } else {
        s = localStorage.getItem(STORAGE_KEY);
      }
      if (s) { var p = JSON.parse(s); if (p && Object.keys(p).length) A = p; }
    } catch (e) {}
  }
  function encode() {
    var parts = [];
    Object.keys(A).forEach(function (k) {
      var v = A[k];
      parts.push(k + ":" + (v === "yes" ? "y" : v === "no" ? "n" : "u"));
    });
    if (!parts.length) return "";
    try { return btoa(parts.join(",")); } catch (e) { return ""; }
  }
  function decode(enc) {
    var res = {};
    try {
      atob(enc).split(",").forEach(function (part) {
        var b = part.split(":");
        if (b.length === 2) res[b[0]] = b[1] === "y" ? "yes" : b[1] === "n" ? "no" : "unsure";
      });
    } catch (e) {}
    return res;
  }
  function loadURL() {
    var d = new URLSearchParams(window.location.search).get("d");
    if (!d) return;
    var dec = decode(d);
    if (Object.keys(dec).length) {
      A = dec; save();
      history.replaceState({}, "", window.location.pathname);
    }
  }
  function shareURL() {
    var enc = encode();
    var base = window.location.href.split("?")[0].split("#")[0];
    return enc ? base + "?d=" + enc : base;
  }
  function copyShare(btn) {
    var url = shareURL();
    var done = function () {
      var label = btn.querySelector(".dsc__share-btn-label");
      if (!label) return;
      var old = label.textContent;
      label.textContent = "Link copied";
      setTimeout(function () { label.textContent = old; }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(function () { legacyCopy(url, done); });
    } else { legacyCopy(url, done); }
  }
  function legacyCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.focus(); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) {}
    document.body.removeChild(ta);
  }

  /* ---------------- View switching ---------------- */
  function showView(id) {
    root.querySelectorAll(".dsc__view").forEach(function (v) { v.classList.remove("is-active"); });
    var view = qs("#" + id);
    if (view && !view.hasAttribute("tabindex")) {
      view.setAttribute("tabindex", "-1");
    }
    view.classList.add("is-active");
    root.classList.toggle("is-recs", id === "dsc-view-recs");
    if (view) view.focus({ preventScroll: true });
    root.scrollIntoView({ block: "start", behavior: "auto" });
  }

  /* ---------------- Grid ---------------- */
  function buildGrid() {
    var g = qs("#dsc-grid");
    g.setAttribute("role", "list");
    g.innerHTML = "";
    DATA.forEach(function (sec, si) {
      var a = answered(si), t = total(si);
      var pct = t ? Math.round(a / t * 100) : 0;
      var st = statusOf(si);
      var fillColour = st === "done" ? "#58B78E" : (st === "progress" ? "#F5BA00" : "transparent");
      var transparentTrack = st !== "empty";
      var actionLabel = st === "done" ? "View answers" : "Complete";
      var statusText = st === "empty" ? "Not started" : (a + " of " + t + " answered");

      var wrap = document.createElement("div");
      wrap.setAttribute("role", "listitem");
      wrap.className = "col d-flex";

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dsc__card";
      btn.setAttribute("aria-label", sec.t + ". " + statusText + ". " + actionLabel + ".");
      btn.innerHTML =
        '<span class="dsc__card-top">' +
          '<span class="dsc__ring">' + ringSVG(pct, fillColour, transparentTrack) +
            '<span class="dsc__ring-icon">' + iconMarkup(si, "swap") + '</span></span>' +
          '<span class="dsc__card-info">' +
            '<span class="dsc__card-title">' + sec.t + '</span>' +
            '<span class="dsc__card-count">' + statusText + '</span>' +
          '</span>' +
        '</span>' +
        '<span class="dsc__card-action">' + actionLabel +
          ' <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>';
      btn.addEventListener("click", function () { showSection(si); });

      wrap.appendChild(btn);
      g.appendChild(wrap);
    });
    updateCTA();
  }
  function updateCTA() { qs("#dsc-get-recs").disabled = !anyAnswered(); }

  /* ---------------- Section view ---------------- */
  function showSection(si) { renderSection(si); showView("dsc-view-section"); }

  function renderSection(si) {
    var sec = DATA[si];
    var t = total(si), a = answered(si);
    var pct = t ? Math.round(a / t * 100) : 0;

    var html =
      (kicker ? '<p class="dsc__kicker">' + kicker + '</p>' : '') +
      '<div class="dsc__sec-headrow">' +
        '<span class="dsc__sec-icon">' + iconMarkup(si, "single") + '</span>' +
        '<h2 class="dsc__sec-title h2 fw-bold mb-0">' + sec.t + '</h2>' +
      '</div>' +
      '<div class="dsc__sec-progress"><div class="dsc__sec-progress-fill" data-fill style="width:' + pct + '%"></div></div>' +
      '<div class="dsc__sec-meta"><span>' + t + ' questions in this section.</span><span data-pct>' + pct + '%</span></div>' +
      '<button type="button" class="dsc__back" data-back><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> All sections</button>' +
      '<div class="dsc__panel">';

    var num = 0;
    sec.items.forEach(function (it) {
      if (it.g !== undefined) { html += '<p class="dsc__group">' + it.g + '</p>'; return; }
      num++;
      var qi = num - 1;
      var ans = A[key(si, qi)];
      var stateCls = ans ? " is-" + ans : "";
      var nm = "dsc-q-" + si + "-" + qi, lbl = "dsc-lbl-" + si + "-" + qi;
      html +=
        '<div class="dsc__q' + stateCls + '" data-q="' + qi + '">' +
          '<span class="dsc__q-num">' + (num < 10 ? "0" + num : num) + '</span>' +
          '<p class="dsc__q-legend" id="' + lbl + '">' + it.q + '</p>' +
          '<div class="dsc__opts" role="radiogroup" aria-labelledby="' + lbl + '">' +
            opt(nm, "yes", "Yes", ans) + opt(nm, "no", "No", ans) + opt(nm, "unsure", "Not sure", ans) +
          '</div>' +
        '</div>';
    });

    html += '</div>' +
      '<div class="dsc__sec-foot">' +
        '<div class="dsc__stats">' +
          '<span>Answered: <b data-a>' + a + '</b>/' + t + '</span>' +
          '<span>Yes: <b data-y>' + count(si, "yes") + '</b></span>' +
          '<span>No: <b data-n>' + count(si, "no") + '</b></span>' +
          '<span>Not Sure: <b data-u>' + count(si, "unsure") + '</b></span>' +
        '</div>' +
        '<button type="button" class="dsc__cta dsc__complete" data-back>Complete section</button>' +
      '</div>' +
      '<nav class="dsc__nav" aria-label="Section navigation">' +
        (si > 0 ? navBtn("prev", si - 1, DATA[si - 1].t) : '<span></span>') +
        (si < DATA.length - 1 ? navBtn("next", si + 1, DATA[si + 1].t) : '') +
      '</nav>';

    var body = qs("#dsc-section-body");
    body.innerHTML = html;

    body.querySelectorAll(".dsc__opts input").forEach(function (input) {
      input.addEventListener("change", function () {
        var qEl = input.closest(".dsc__q");
        pick(si, parseInt(qEl.getAttribute("data-q"), 10), input.value, qEl);
      });
    });
    body.querySelectorAll("[data-nav]").forEach(function (b) {
      b.addEventListener("click", function () { showSection(parseInt(b.getAttribute("data-nav"), 10)); });
    });
  }

  function opt(name, val, label, current) {
    var checked = current === val ? " checked" : "";
    return '<label class="dsc__opt dsc__opt--' + val + '">' +
      '<input type="radio" name="' + name + '" id="' + name + '-' + val + '" value="' + val + '"' + checked + '>' +
      '<span>' + label + '</span></label>';
  }
  function navBtn(dir, si, title) {
    return '<button type="button" class="dsc__nav-btn dsc__nav-btn--' + dir + '" data-nav="' + si + '">' +
      (dir === "prev"
        ? '<i class="fa-solid fa-arrow-left" aria-hidden="true"></i> ' + title
        : title + ' <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>') +
      '</button>';
  }

  function pick(si, qi, val, qEl) {
    A[key(si, qi)] = val;
    qEl.className = "dsc__q is-" + val;
    qEl.setAttribute("data-q", qi);
    var body = qs("#dsc-section-body");
    var t = total(si), a = answered(si);
    var pct = t ? Math.round(a / t * 100) : 0;
    var fill = body.querySelector("[data-fill]"); if (fill) fill.style.width = pct + "%";
    var pctEl = body.querySelector("[data-pct]"); if (pctEl) pctEl.textContent = pct + "%";
    body.querySelector("[data-a]").textContent = a;
    body.querySelector("[data-y]").textContent = count(si, "yes");
    body.querySelector("[data-n]").textContent = count(si, "no");
    body.querySelector("[data-u]").textContent = count(si, "unsure");
    updateCTA();
    save();
  }

  /* ---------------- Recommendations ---------------- */
  /* returns { label, bar, barText, scoreOnWhite } */
  function scoreBand(pct) {
    if (pct >= 75) return { label: pct === 100 ? "Excellent" : "Good", bar: "#58b78e", barText: "#fff", scoreOnWhite: "#58b78e" };
    if (pct >= 50) return { label: "Developing", bar: "#f2c464", barText: "#fff", scoreOnWhite: "#f2c464" };
    return { label: "Needs attention", bar: "#d96a71", barText: "#fff", scoreOnWhite: "#d96a71" };
  }

  function buildRecs() {
    var content = qs("#dsc-rec-content");
    if (!anyAnswered()) {
      content.innerHTML = '<div class="dsc__nodata">Complete at least one section to generate recommendations.</div>';
    } else {
      var scored = [];
      DATA.forEach(function (sec, si) {
        var a = answered(si);
        if (a === 0) return;
        scored.push({ si: si, pct: Math.round(count(si, "yes") / a * 100) });
      });
      scored.sort(function (x, y) { return x.pct - y.pct; });

      var html = "";
      scored.forEach(function (row, idx) {
        var si = row.si, sec = DATA[si], band = scoreBand(row.pct);
        var issues = [];
        questions(si).forEach(function (x) {
          var ans = A[key(si, x.qi)];
          if (ans === "no" || ans === "unsure") issues.push({ item: x.item, ans: ans, qi: x.qi });
        });
        var bodyId = "dsc-recbody-" + si;
        var expanded = false;
        var vars = "--dsc-bar:" + band.bar + ";--dsc-bar-text:" + band.barText +
                   ";--dsc-sec:#515ba5;--dsc-score-on-white:" + band.scoreOnWhite;

        html +=
          '<div class="dsc__rec-card" style="' + vars + '">' +
            '<button type="button" class="dsc__rec-toggle" data-bs-toggle="collapse" data-bs-target="#' + bodyId + '" aria-expanded="' + expanded + '" aria-controls="' + bodyId + '">' +
              '<span class="dsc__rec-icon">' + iconMarkup(si, "swap") + '</span>' +
              '<span class="dsc__rec-title">' + sec.t + '</span>' +
              '<span class="dsc__rec-score">' + band.label + ' - ' + row.pct + '%</span>' +
              '<i class="fa-solid fa-chevron-down dsc__rec-chevron" aria-hidden="true"></i>' +
            '</button>' +
            '<div class="dsc__rec-body collapse" id="' + bodyId + '">';

        if (issues.length === 0) {
          html += '<p class="dsc__rec-success"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> All answered questions here are marked Yes \u2014 great work.</p>';
        } else {
          html += '<p class="dsc__rec-label">Areas to develop:</p><div class="dsc__rec-items">';
          issues.forEach(function (iss) {
            var title = (TITLES[si] && TITLES[si][iss.qi]) ? TITLES[si][iss.qi] : "";
            var titleHtml = title ? '<strong class="dsc__rec-item-title">' + title + ': </strong>' : '';
            html += '<div class="dsc__rec-item"><span class="dsc__rec-dot"></span>' +
              '<span class="dsc__rec-item-text">' + titleHtml + linkifyKCSIE(iss.item.r) + '</span></div>';
          });
          html += '</div>';
        }
        html += '</div></div>';
      });
      content.innerHTML = html;

      //content.querySelectorAll(".dsc__rec-toggle").forEach(function (tog) {
      //  tog.addEventListener("click", function () {
      //    var open = tog.getAttribute("aria-expanded") === "true";
      //    tog.setAttribute("aria-expanded", String(!open));
      //    var b = qs("#" + tog.getAttribute("aria-controls"));
      //    if (b) { if (open) b.setAttribute("hidden", ""); else b.removeAttribute("hidden"); }
      //  });
      //});
    }
    var pd = qs("#dsc-print-date");
    if (pd) pd.textContent = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    showView("dsc-view-recs");
  }

  /* ---------------- Modal (portaled to <body> so it sits above site chrome) ---------------- */
  function openModal() {
    if (bsModal) {
      bsModal.show();
    } else {
      lastFocused = document.activeElement;
      modalEl.removeAttribute("hidden");
      document.documentElement.classList.add("dsc-modal-open");
      document.body.classList.add("dsc-modal-open");
      modalEl.querySelector("#dsc-modal-return").focus();
      document.addEventListener("keydown", modalKeys);
    }
  }
  function closeModal() {
    if (bsModal) {
      bsModal.hide();
    } else {
      modalEl.setAttribute("hidden", "");
      document.documentElement.classList.remove("dsc-modal-open");
      document.body.classList.remove("dsc-modal-open");
      document.removeEventListener("keydown", modalKeys);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }
  }
  function modalKeys(e) {
    if (e.key === "Escape") { closeModal(); return; }
    if (e.key !== "Tab") return;
    var f = modalEl.querySelectorAll("button");
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function handleGetRecs() {
    var incomplete = inProgressSections();
    if (incomplete.length) {
      var names = incomplete.map(function (si) { return "<b>" + DATA[si].t + "</b>"; }).join(", ");
      modalEl.querySelector("#dsc-modal-body").innerHTML = "You've started " + names +
        " but not finished. Complete those sections for a more accurate set of recommendations.";
      openModal();
    } else { buildRecs(); }
  }

  /* ---------------- PDF (own document via hidden iframe: no site footer / URL) ---------------- */
  function ragFor(ans) {
    if (ans === "yes") return { label: "Yes", bg: "#CEEDDD", fg: "#1B6F50" };
    if (ans === "unsure") return { label: "Not sure", bg: "#FFE9B2", fg: "#7E5500" };
    if (ans === "no") return { label: "No", bg: "#FFDADB", fg: "#79242F" };
    return { label: "Not answered", bg: "#eeeeee", fg: "#666666" };
  }
  function printDocCSS() {
    return "*{box-sizing:border-box}" +
      "@font-face {font-family: 'Quicksand'; src: url('https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/raw_assets/public/q-theme/assets/fonts/Quicksand-VariableFont_wght.woff2') format('woff2 supports variations'),url('https://4139239.fs1.hubspotusercontent-na1.net/hubfs/4139239/raw_assets/public/q-theme/assets/fonts/Quicksand-VariableFont_wght.woff2') format('woff2-variations'); font-stretch: 75% 125%; font-style: normal; font-display: swap; font-weight: 300 700; unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD,U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF }" +
      "body{font-family:'Quicksand','Open Sans',Arial,sans-serif;color:#212529;margin:24px;-webkit-print-color-adjust:exact;print-color-adjust:exact}" +
      "h1{font-size:22px;margin:0 0 4px;color:#3f4890}" +
      "p.sub{margin:0 0 12px;color:#666;font-size:12px}" +
      ".key{display:flex;gap:16px;flex-wrap:wrap;margin:0 0 20px;font-size:10px;color:#444}" +
      ".key span{display:inline-flex;align-items:center;gap:5px}" +
      ".key i{width:12px;height:12px;display:inline-block;border:1px solid #dee2e6;-webkit-print-color-adjust:exact;print-color-adjust:exact}" +
      "h2{font-size:16px;margin:24px 0 8px;color:#515BA5;border-bottom:2px solid #dee2e6;padding-bottom:4px}" +
      "h2.areas{margin-top:30px}" +
      "h3{font-size:13px;margin:14px 0 4px;color:#212529}" +
      "table{width:100%;border-collapse:collapse;margin-bottom:6px}" +
      "th,td{text-align:left;vertical-align:top;padding:6px 8px;border:1px solid #dee2e6;font-size:11px}" +
      "th{background:#f4f4f6}" +
      "th.rcol,td.rcol{width:90px;text-align:center}" +
      "th.rcol{white-space:nowrap}" +
      "td.rcol{vertical-align:middle;font-weight:700;border:0 !important;border-bottom:1px solid #fff !important;-webkit-print-color-adjust:exact;print-color-adjust:exact}" +
      "td.grp{background:#f0eef7;font-weight:700;color:#515BA5;font-size:10px;text-transform:uppercase;letter-spacing:.04em}" +
      "td.rec{background:#f2f2f2;font-size:10.5px;color:#333;line-height:1.45;-webkit-print-color-adjust:exact;print-color-adjust:exact}" +
      ".rec-label{font-weight:700}" +
      "tr{page-break-inside:avoid}" +
      "ul{margin:4px 0 12px;padding-left:18px}" +
      "li{font-size:11px;margin-bottom:5px;line-height:1.45}" +
      ".fl{font-weight:700}.fl.no{color:#d96a71}.fl.unsure{color:#7E5500}" +
      ".ok{font-size:11px;color:#198754;margin:2px 0 12px}" +
      "a{color:#58B78E;text-decoration:underline}" +
      ".pdiv{border:0;border-top:2px solid #dee2e6;margin:28px 0 18px}" +
      "h2.cta{border-bottom:0;margin:22px 0 8px}" +
      ".prods{display:grid;grid-template-columns:1fr 1fr;gap:12px 28px;margin:0 0 18px}" +
      ".prod{page-break-inside:avoid}" +
      ".prod h3{font-size:12px;margin:0 0 3px;color:#212529}" +
      ".prod p{font-size:11px;line-height:1.45;margin:0;color:#333}" +
      ".ctatext{font-size:11px;line-height:1.5;margin:0 0 12px;color:#333}" +
      ".btn{display:inline-block;background:#515BA5;color:#fff;padding:11px 22px;border-radius:6px;text-decoration:none;font-weight:700;font-size:12px;-webkit-print-color-adjust:exact;print-color-adjust:exact}" +
      "em{font-style:italic}";
  }
  function buildPrintDoc() {
    var today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    var b = '<h1>A Whole-School Approach to Digital Safeguarding</h1>' +
            '<p class="sub">Your Recommendations &mdash; ' + today + '</p>';
            //'<div class="key">' +
            //  '<span><i style="background:#58B78E"></i>Yes</span>' +
            //  '<span><i style="background:#F5BA00"></i>Not sure</span>' +
            //  '<span><i style="background:#d96a71"></i>No</span>' +
            //  '<span><i style="background:#eeeeee"></i>Not answered</span>' +
            //'</div>';

    /* Per-section breakdown (answered sections only); the recommendation for any
       No / Not sure answer sits directly beneath the question in a grey row. */
    var any = false;
    DATA.forEach(function (sec, si) {
      if (answered(si) === 0) return;
      any = true;
      b += '<h2>' + sec.t + '</h2>' +
           '<table><thead><tr><th class="qcol">Question</th><th class="rcol">Response</th></tr></thead><tbody>';
      var num = 0;
      sec.items.forEach(function (it) {
        if (it.g !== undefined) { b += '<tr><td class="grp" colspan="2">' + it.g + '</td></tr>'; return; }
        var ans = A[key(si, num)]; num++;
        var rag = ragFor(ans);
        var hasRec = (ans === "no" || ans === "unsure");
        b += '<tr><td class="qcol">' + it.q + '</td>' +
             '<td class="rcol"' + (hasRec ? ' rowspan="2"' : '') + ' style="background:' + rag.bg + '; color: ' + rag.fg + '">' + rag.label +'</td></tr>';
        if (hasRec) {
          b += '<tr><td class="rec"><span class="rec-label">Recommendation:</span> ' + linkifyKCSIE(recBody(it, ans)) + '</td></tr>';
        }
      });
      b += '</tbody></table>';
    });
    if (!any) { b += '<p class="ok">No sections answered yet.</p>'; }

    /* Bottom section (mirrors the on-screen block) with a link to the booking
       form instead of the embedded form. */
    b += '<hr class="pdiv">' +
      '<h2 class="cta">How to close the gaps in your digital safeguarding</h2>' +
      '<p class="ctatext">The checklist you\'ve just completed reflects how much is now expected of a setting\'s digital safeguarding: annual filtering and monitoring reviews, a clear approach to AI, updated staff training and regular check-ins with parents.</p>' +
      '<p class="ctatext">Smoothwall supports schools, colleges and MATs across all these areas, through technology and expert-led support. We help you keep pace with the online risks students face, and act sooner when concerns arise.</p>' +
      '<div class="prods">' +
        '<div class="prod"><h3>Human-moderated monitoring</h3><p>Smoothwall Monitor uses real human insight to quickly flag students who may be at risk online and give your safeguarding team the context they need to step in early.</p></div>' +
        '<div class="prod"><h3>100% real-time content filtering</h3><p>Smoothwall Filter analyses online content in real time, including new AI-generated sources, and blocks harmful material before it reaches students, so they can explore and learn freely.</p></div>' +
        '<div class="prod"><h3>Parental / staff engagement and education</h3><p>Smoothwall Online Safety Hub gives your wider community practical resources, guides and how-tos on online safety. Share them so parents, carers and staff feel confident having the conversations that matter.</p></div>' +
        '<div class="prod"><h3>Training for your school / college / MAT</h3><p>Our dedicated team delivers up-to-date training on student digital safeguarding - virtually or in person. Training is shaped around your setting\'s needs, helping your community feel confident on all aspects of digital safety.</p></div>' +
      '</div>' +
      '<h2 class="cta">See how you can close the gaps.</h2>' +
      '<p class="ctatext">Select the areas you\'d like to speak to us about, and we\'ll be in touch to arrange a date and time that works best for you. We\'ll show you how they work, how they might compare to what you have at the moment and answer any questions you may have.</p>' +
      '<p><a class="btn" href="https://share.hsforms.com/1t1WY_MVZT9-yLxPTsSbDLQ2gpuv" target="_blank" rel="noopener noreferrer">Book a call</a></p>';

    return '<!DOCTYPE html><html lang="en-GB"><head><meta charset="utf-8">' +
      '<title>Digital Safeguarding Checklist \u2013 Recommendations</title>' +
      '<style>' + printDocCSS() + '</style></head><body>' + b + '</body></html>';
  }
  function printRecs() {
    var old = document.getElementById("dsc-print-frame");
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var iframe = document.createElement("iframe");
    iframe.id = "dsc-print-frame";
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
    document.body.appendChild(iframe);
    var doc = iframe.contentWindow.document;
    doc.open(); doc.write(buildPrintDoc()); doc.close();
    var done = false;
    function go() {
      if (done) return; done = true;
      try { iframe.contentWindow.focus(); iframe.contentWindow.print(); } catch (e) {}
      setTimeout(function () { if (iframe.parentNode) iframe.parentNode.removeChild(iframe); }, 1500);
    }
    iframe.onload = go;
    setTimeout(go, 600);
  }

  /* ---------------- Init ---------------- */
  function init() {
    root = document.getElementById("dsc-root");
    if (!root) return;
    kicker = root.getAttribute("data-kicker") || "";

    modalEl = document.getElementById("dsc-modal");
    
    if (modalEl && typeof bootstrap !== "undefined" && bootstrap.Modal) {
      bsModal = new bootstrap.Modal(modalEl);
    }

    loadURL();
    if (!Object.keys(A).length) loadStorage();
    buildGrid();

    qs("#dsc-copy-btn").addEventListener("click", function () { copyShare(this); });
    qs("#dsc-get-recs").addEventListener("click", handleGetRecs);
    qs("#dsc-print-btn").addEventListener("click", printRecs);

    modalEl.querySelector("#dsc-modal-return").addEventListener("click", closeModal);
    modalEl.querySelector("#dsc-modal-continue").addEventListener("click", function () {
      inProgressSections().forEach(function (si) {
        questions(si).forEach(function (x) { if (A[key(si, x.qi)] === undefined) A[key(si, x.qi)] = "no"; });
      });
      save(); closeModal(); buildRecs();
    });
    if (!bsModal) {
      modalEl.addEventListener("click", function (e) { if (e.target === modalEl) closeModal(); });
    }

    /* Portal the modal out of #dsc-root's stacking context so it sits above
       the global header/footer (fixes footer text bleeding over it on scroll). */
    if (modalEl.parentNode !== document.body) document.body.appendChild(modalEl);

    root.addEventListener("click", function (e) {
      if (e.target.closest("[data-back]")) { buildGrid(); showView("dsc-view-grid"); }
    });
  }

  if (["interactive", "complete"].indexOf(document.readyState) >= 0) init();
  else document.addEventListener("DOMContentLoaded", init);
})();
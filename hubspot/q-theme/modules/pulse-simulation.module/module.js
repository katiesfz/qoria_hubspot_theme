var pulseQuestions = [{
    "id": 1,
    "question": "Hi ${contact.firstname}, how are you feeling today?",
    "subtext": "Who sees my responses?",
    "options": [
        {
            "text": "<i class='fa fas fa-circle' style='color: #62bc45'></i> I'm feeling great",
            "status": "active"
        },
        {
            "text": "<i class='fa fas fa-circle' style='color: #82dd63'></i> I'm feeling positive",
            "status": "disabled"
        },
        {
            "text": "<i class='fa fas fa-circle' style='color: #fde201'></i> I'm feeling in the middle",
            "status": "disabled"
        },
        {
            "text": "<i class='fa fas fa-circle' style='color: #ff8002'></i> I'm feeling negative",
            "status": "disabled"
        },
        {
            "text": "<i class='fa fas fa-circle' style='color: #fd2502'></i> I need some help",
            "status": "active"
        }
    ]        
    },{
    "id": 2,
    "question": "Which of these best describes how you are feeling?",
    "subtext": "Who sees my responses?",
    "options": [
        {
            "text": "Proud",
            "status": "active"
        },
        {
            "text": "Excited",
            "status": "active"
        },
        {
            "text": "Loved",
            "status": "active"
        },
        {
            "text": "Interested",
            "status": "active"
        },
        {
            "text": "Balanced",
            "status": "active"
        },
        {
            "text": "Neutral",
            "status": "active"
        },
        {
            "text": "Calm",
            "status": "active"
        },
        {
            "text": "Satisfied",
            "status": "active"
        },
        {
            "text": "Confident",
            "status": "active"
        },
        {
            "text": "Happy",
            "status": "active"
        },
        {
            "text": "Inspired",
            "status": "active"
        },
        {
            "text": "Indifferent",
            "status": "active"
        },
        {
            "text": "Content",
            "status": "active"
        },
        {
            "text": "Grateful",
            "status": "active"
        },
        {
            "text": "Serene",
            "status": "active"
        },
        {
            "text": "Fulfilled",
            "status": "active"
        },
        {
            "text": "Wondrous",
            "status": "active"
        },
        {
            "text": "Hopeful",
            "status": "active"
        }
    ]
},
{
    "id": 3,
    "question": "Do you feel confident that you can go to a teacher if you are worried or concerned about something?",
    "subtext": "Who sees my responses?",
    "options": [
        {
            "text": "All the time",
            "status": "active"
        },
        {
            "text": "Most of the time",
            "status": "active"
        },
        {
            "text": "Sometimes",
            "status": "active"
        },
        {
            "text": "Unsure",
            "status": "active"
        },
        {
            "text": "Not at all",
            "status": "active"
        }
    ]
},
{
    "id": 4,
    "question": "Hey ${contact.firstname}, sorry to hear you're not feeling great, but that's why we're here.</p><p>Who would you like to ask for help?",
    "subtext": "Who sees my responses?",
    "options": [
        {
            "text": "Terry Teacher",
            "status": "active"
        },
        {
            "text": "Carol Counsellor",
            "status": "active"
        },
        {
            "text": "Yvette French",
            "status": "active"
        },
        {
            "text": "Patricia Principal",
            "status": "active"
        }
    ]
},
{
    "id": 5,
    "question": "All set, you'll receive a notification when $answer4 sees your message. Need help right now?",
    "subtext": "Who sees my responses?",
    "options": [
        {
            "text": "Childline",
            "status": "active"
        },
        {
            "text": "Samaritans",
            "status": "active"
        },
        {
            "text": "No thanks",
            "status": "active"
        }
    ]
}
];


const container = document.getElementById("pulseSimContainer");
const question = container.getElementById("question");
const answers = container.getElementById("answers");

function showQuestion(id = 1) {

    let question = pulseQuestions.find(item => item.id === id);

    // clear question and answer container

    question.innerHTML = "";
    answers.innerHTML = "";


    // print new question
    
    const newQuestion = document.createDocumentFragment;
    
    let newQuestionText = document.createElement("p");
    newQuestionText.classList.add("question");
    newQuestionText.innerText = question["question"];

    newQuestion.append(newQuestionText);
    question.append(newQuestion);

    // print answers

    const newAnswers = document.createDocumentFragment;
    var answers = question["options"];
    for (let i=0; i < answers.length; i++) {
        let newOption = document.createElement("a");
        newOption.innerText = answers[i].text;
        if (answers[i].status == "disabled") {
            newOption.classList.add("btn-disabled");
        }
        newOption.classList.add("btn","btn-small");
        
        newAnswers.append(newOption);
    }
    answers.append(newAnswers);

}
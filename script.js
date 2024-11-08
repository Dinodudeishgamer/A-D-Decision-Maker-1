const questions = {
    "q1": {
        question: "Should Dino come and get Abby from McKinney? Or do they meet separately in Sugar Land?",
        options: {
            "Get Abby from McKinney": "q2A",
            "Meet separately in SLTX": "q2B"
        }
    },
    "q2A": {
        question: "When should Dino get to McKinney?",
        options: {
            "Friday evening": "q3",
            "Early Saturday Morning": "q3"
        }
    },
    "q2B": {
        question: "When should A&D meet in SLTX?",
        options: {
            "Friday late evening": "q4A",
            "Saturday early afternoon": "q4B"
        }
    },
    "q3": {
        question: "When should Abby and Dino leave for Sugar Land from McKinney?",
        options: {
            "Friday late evening": "q4B",
            "Early Saturday morning": "q4B"
        }
    },
    "q4A": {
        question: "Where do we spend the night?",
        options: {
            "On the side of the road like hobos": "q5",
            "Patti and Gary's": "q5"
        }
    },
    "q4B": {
        question: "What do we do after the concert?",
        options: {
            "Head straight back to McKinney": "q6",
            "Spend the night in SLTX": "q4A"
        }
    },
    "q5": {
        question: "When do we leave SLTX?",
        options: {
            "Whatever time gets us to McKinney by 10AM, with a potential Buc-ee's stop": "q6",
            "Super duper early. Like super duper early": "q6"
        }
    },
    "q6": {
        question: "Does Dino spend the night Sunday night?",
        options: {
            "Nah, get him outta McKinney!": "end1",
            "Yes!": "q7"
        }
    },
    "q7": {
        question: "Does Dino take Abby to work Monday morning?",
        options: {
            "Nah, won't need to. She can drive herself.": "end2",
            "Yes!": "end3"
        }
    },
    "end1": { question: "End: Dino heads back to Austin after the party.", options: {} },
    "end2": { question: "End: Dino stays over and Abby drives herself to work.", options: {} },
    "end3": { question: "End: Dino stays over and takes Abby to work in the morning.", options: {} }
};

let answers = [];
let currentQuestionId = "q1";

function showQuestion() {
    const questionData = questions[currentQuestionId];
    document.getElementById("question").textContent = questionData.question;

    if (Object.keys(questionData.options).length > 0) {
        document.getElementById("option1").style.display = "inline-block";
        document.getElementById("option2").style.display = "inline-block";
        const [option1Text, option2Text] = Object.keys(questionData.options);
        document.getElementById("option1").textContent = option1Text;
        document.getElementById("option2").textContent = option2Text;
    } else {
        document.getElementById("option1").style.display = "none";
        document.getElementById("option2").style.display = "none";
    }
}

function selectOption(option) {
    const questionData = questions[currentQuestionId];
    const selectedOptionText = option === "option1" ? Object.keys(questionData.options)[0] : Object.keys(questionData.options)[1];
    answers.push({ question: questionData.question, answer: selectedOptionText });

    currentQuestionId = questionData.options[selectedOptionText];

    if (questions[currentQuestionId].options && Object.keys(questions[currentQuestionId].options).length > 0) {
        showQuestion();
    } else {
        displaySchedule();
    }
}

function displaySchedule() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("result").style.display = "block";

    let scheduleText = "Your Itinerary based on your choices:\n\n";
    answers.forEach((answer, index) => {
        scheduleText += `- ${answer.answer} (In response to: "${answer.question}")\n`;
    });

    document.getElementById("schedule").textContent = scheduleText;
}

function restart() {
    currentQuestionId = "q1";
    answers = [];
    document.getElementById("question-container").style.display = "block";
    document.getElementById("result").style.display = "none";
    showQuestion();
}

function downloadSchedule() {
    html2canvas(document.getElementById("schedule")).then(function(canvas) {
        const image = canvas.toDataURL("image/png");
        
        // Create a link to download the image
        const link = document.createElement("a");
        link.href = image;
        link.download = "schedule.png"; // Name of the image file
        link.click(); // Simulate the click to start the download
    });
}

showQuestion();

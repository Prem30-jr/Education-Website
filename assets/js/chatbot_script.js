const userMessage = [
    ["hi", "hey", "hello"],
    ["sure", "yes", "no"],
    ["are you genius", "are you nerd", "are you intelligent"],
    ["i hate you", "i don't like you"],
    ["how are you", "how is life", "how are things", "how are you doing"],
    ["how is corona", "how is covid 19", "how is covid19 situation"],
    ["what are you doing", "what is going on", "what is up"],
    ["how old are you"],
    ["who are you", "are you human", "are you bot", "are you human or bot"],
    ["who created you", "who made you", "who is your creator"],
    ["your name please", "your name", "may I know your name", "what is your name", "what do you call yourself"],
    ["i love you"],
    ["happy", "good", "fun", "wonderful", "fantastic", "cool", "very good"],
    ["bad", "bored", "tired"],
    ["help me", "tell me a story", "tell me a joke"],
    ["ah", "ok", "okay", "nice", "welcome"],
    ["thanks", "thank you"],
    ["what should I eat today"],
    ["bro"],
    ["what", "why", "how", "where", "when"],
    ["corona", "covid19", "coronavirus"],
    ["you are funny"],
    ["I don't know"],
    ["boring"],
    ["I'm tired"]
];

const botReply = [
    ["Hello!", "Hi!", "Hey!", "Hi there!"],
    ["Okay"],
    ["Yes I am!"],
    ["I'm sorry about that. But I like you too."],
    ["Fine... how are you?", "Pretty well, how are you?", "Fantastic, how are you?"],
    ["Getting better. There?", "Somewhat okay!", "Yeah fine. Better stay home!"],
    ["Nothing much", "About to go to sleep", "Can you guess?", "I don't know actually"],
    ["I am always young."],
    ["I am just a bot", "I am a bot. What are you?"],
    ["Sabitha Kuppusamy"],
    ["I am nameless", "I don't have a name"],
    ["I love you too", "Me too"],
    ["Have you ever felt bad?", "Glad to hear it"],
    ["Why?", "Why? You shouldn't!", "Try watching TV", "Chat with me."],
    ["What about?", "Once upon a time..."],
    ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
    ["You're welcome"],
    ["Biryani", "Burger", "Sushi", "Pizza"],
    ["Dude!"],
    ["Yes?"],
    ["Please stay home"],
    ["Glad to hear it"],
    ["Say something interesting"],
    ["Sorry for that. Let's chat!"],
    ["Take some rest, Dude!"]
];

const alternative = [
    "Same here, dude.",
    "That's cool! Go on...",
    "Dude...",
    "Ask something else...",
    "Hey, I'm listening..."
];

const synth = window.speechSynthesis;

function voiceControl(string) {
    let u = new SpeechSynthesisUtterance(string);
    u.text = string;
    u.lang = "en-aus";
    u.volume = 1;
    u.rate = 1;
    u.pitch = 1;
    synth.speak(u);
}

function sendMessage() {
    const inputField = document.getElementById("input");
    let input = inputField.value.trim();
    if (input !== "") {
        output(input);
    }
    inputField.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            let input = inputField.value.trim();
            if (input !== "") {
                output(input);
            }
            inputField.value = "";
        }
    });
});

function output(input) {
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "")
        .replace(/[\W_]/g, " ")
        .replace(/ a /g, " ")
        .replace(/i feel /g, "")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "")
        .trim();

    let response = compare(userMessage, botReply, text);
    if (!response) {
        response = alternative[Math.floor(Math.random() * alternative.length)];
    }
    addChat(input, response);
}

function compare(triggerArray, replyArray, string) {
    for (let x = 0; x < triggerArray.length; x++) {
        for (let y = 0; y < triggerArray[x].length; y++) {
            if (triggerArray[x][y] === string) {
                let replies = replyArray[x];
                return replies[Math.floor(Math.random() * replies.length)];
            }
        }
    }
    return containMessageCheck(string);
}

function containMessageCheck(string) {
    const expectedReply = [
        ["Good Bye, dude", "Bye, See you!", "Dude, Bye. Take care of your health in this situation."],
        ["Good Night, dude", "Have a sound sleep", "Sweet dreams"],
        ["Have a pleasant evening!", "Good evening too", "Evening!"],
        ["Good morning, Have a great day!", "Morning, dude!"],
        ["Good Afternoon", "Noon, dude!", "Afternoon, dude!"]
    ];
    const expectedMessage = [
        ["bye", "tc", "take care"],
        ["night", "good night"],
        ["evening", "good evening"],
        ["morning", "good morning"],
        ["noon"]
    ];

    for (let x = 0; x < expectedMessage.length; x++) {
        if (expectedMessage[x].includes(string)) {
            let replies = expectedReply[x];
            return replies[Math.floor(Math.random() * replies.length)];
        }
    }
    return null;
}

function addChat(input, response) {
    const mainDiv = document.getElementById("message-section");

    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.classList.add("message");
    userDiv.innerHTML = `<span id="user-response">${input}</span>`;
    mainDiv.appendChild(userDiv);

    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.classList.add("message");
    botDiv.innerHTML = `<span id="bot-response">${response}</span>`;
    mainDiv.appendChild(botDiv);

    var scroll = document.getElementById("message-section");
    scroll.scrollTop = scroll.scrollHeight;
    voiceControl(response);
}

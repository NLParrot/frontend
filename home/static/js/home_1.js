//start message (intro)
document.addEventListener("DOMContentLoaded", () => {
    const messageInput = document.getElementById("message-input");
    const chatBody = document.getElementById("chat-body");

    let responseContainer = document.createElement("div");
    responseContainer.classList.add("message", "response");

    let responseMessage = document.createElement("p");
    responseMessage.textContent = "저는 서강대 관련 정보를 알려주는 챗봇 알렉스입니다. 원하시는 내용을 물어봐주세요.";

    responseContainer.appendChild(responseMessage);
    chatBody.appendChild(responseContainer);
})




// Display the user's sent message 
function displaySentMessage(messageInput) {
    let sentMessageContainer = document.createElement("div");
    sentMessageContainer.classList.add("message", "sent");

    let chatBody = document.getElementById("chat-body");
    let sentMessage = document.createElement("p");
    sentMessage.textContent = messageInput.value;

    sentMessageContainer.appendChild(sentMessage);
    chatBody.appendChild(sentMessageContainer);

    // Clear the input field after sending the message
    messageInput.value = "";

    return sentMessageContainer
}

var state = {
    "intent1": "",
    "intent2": "",
    "slot": "",
    "user_text": ""
}


function displayBotTypingIndicator(sentMessageContainer) {
    // Display the typing indicator for the bot
    let typingIndicator = document.createElement("span");
    typingIndicator.classList.add("typing-indicator");
    sentMessageContainer.appendChild(typingIndicator);

    return typingIndicator;
}

// Display the bot's response message
function displayResponseMessage(response_message) {
    let chatBody = document.getElementById("chat-body");
    var responseContainer = document.createElement("div");
    responseContainer.classList.add("message", "response");

    var responseMessage = document.createElement("p");
    responseMessage.textContent = response_message;

    responseContainer.appendChild(responseMessage);
    chatBody.appendChild(responseContainer);

    chatBody.scrollTop = chatBody.scrollHeight;

    return responseContainer;
}

function sendMessage() {
    let messageInput = document.getElementById("message-input");
    let chatBody = document.getElementById("chat-body");

    let message = messageInput.value;

    if (message.trim() == "") {
        return;
    }

    let sentMessageContainer = displaySentMessage(messageInput);
    let typingIndicator = displayBotTypingIndicator(sentMessageContainer);

    // Scroll to the bottom of the chat body to show the latest message
    chatBody.scrollTop = chatBody.scrollHeight;

    state["user_text"] = message
    send_json = JSON.stringify(state)

    fetch("http://127.0.0.1:5000/api/chat/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: send_json
    })
        .then(data => data.json())
        .then(data => {
            console.log(data);
            console.log("Parent node:", sentMessageContainer);
            console.log("Child node to remove:", typingIndicator);
            state = data;
            sentMessageContainer.removeChild(typingIndicator);
            displayResponseMessage(data["response_text"]);
        })
        .catch(data => {
            console.log(data);
            sentMessageContainer.removeChild(typingIndicator);
            response = "There was an error\n";
            response += "lasdkjf a;sdkjf a;lsdjf ;askdf \n ;aksdjf a;lksdjf a;sdlkf ;askldjf; a;sdklf ;asldkf;kasd dfasdfadfasdfadsfasdfasdfasdfasdfasdfasdfasdfasdffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
            displayResponseMessage(response);
        })
}

document.getElementById("message-input").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
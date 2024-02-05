//start message (intro)
var messageInput = document.getElementById("message-input");
var chatBody = document.getElementById("chat-body");

var responseContainer = document.createElement("div");
responseContainer.classList.add("message", "response");

var responseMessage = document.createElement("p");
responseMessage.textContent = "저는 서강대 관련 정보를 알려주는 챗봇 알렉스입니다. 원하시는 내용을 물어봐주세요.";

responseContainer.appendChild(responseMessage);
chatBody.appendChild(responseContainer);

function sendMessage() {
  var messageInput = document.getElementById("message-input");
  var chatBody = document.getElementById("chat-body");

  if (messageInput.value.trim() !== "") {
    // Display the user's sent message
    var sentMessageContainer = document.createElement("div");
    sentMessageContainer.classList.add("message", "sent");

    var sentMessage = document.createElement("p");
    sentMessage.textContent = messageInput.value;
    
    sentMessageContainer.appendChild(sentMessage);
    chatBody.appendChild(sentMessageContainer);

    // Display the typing indicator for the bot
    var typingIndicator = document.createElement("span");
    typingIndicator.classList.add("typing-indicator");
    sentMessageContainer.appendChild(typingIndicator);

    // Clear the input field after sending the message
    messageInput.value = "";

    // Scroll to the bottom of the chat body to show the latest message
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simulate a delayed response from the bot after 1 second
    setTimeout(function() {
      // Remove the typing indicator
      sentMessageContainer.removeChild(typingIndicator);

      // Display the bot's response message
      var responseContainer = document.createElement("div");
      responseContainer.classList.add("message", "response");

      var responseMessage = document.createElement("p");
      responseMessage.textContent = "This is a simulated response from the bot.";

      responseContainer.appendChild(responseMessage);
      chatBody.appendChild(responseContainer);

      // Scroll to the bottom again after receiving the response
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 3000); //1000ms = 1s?
  }
}
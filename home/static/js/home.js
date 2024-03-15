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

var slot = {
    "intent1": "",
    "intent2": "",
    "status": "normal",
    "user_text": "",
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

function displayLocationMap(response_container, location_name, coordinates) {
    let container = document.createElement("div");
    container.style.width = '30em';
    container.style.height = '22em';
    response_container.getElementsByTagName('p')[0].appendChild(container);

    let lat = coordinates['latitude'];
    let lng = coordinates['longitude'];
    let options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3 // zoom level
    };

    let map = new kakao.maps.Map(container, options);
    let marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lng),
        map: map
    });

    let style = "padding:5px; color:black; margin-left:auto; margin-right:auto";
    let infoWindow = new kakao.maps.InfoWindow({
        content: `<div style="${style}">${location_name}</div>`
    });

    infoWindow.open(map, marker);
}

function displayPathMap(response_container, start_name, goal_name, start, goal, path) {
    let container = document.createElement("div");
    let message_container = response_container.getElementsByTagName('p')[0];

    container.style.width = '95%';
    container.style.height = '50vh';
    message_container.appendChild(container);
    message_container.style.width='95%';

    let lat = (start['latitude'] + goal['latitude']) / 2;
    let lng = (start['longitude'] + goal['longitude']) / 2;
    let options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3 // zoom level
    };

    let map = new kakao.maps.Map(container, options);
    let start_marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(start['latitude'], start['longitude']),
        map: map
    });
    let goal_marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(goal['latitude'], goal['longitude']),
        map: map
    });

    let style = "padding:5px; color:black; margin-left:auto; margin-right:auto;";
    let startInfoWindow = new kakao.maps.InfoWindow({
        content: `<div style="${style}">${start_name}</div>`
    });
    let goalInfoWindow = new kakao.maps.InfoWindow({
        content: `<div style="${style}">${goal_name}</div>`
    });

    startInfoWindow.open(map, start_marker);
    goalInfoWindow.open(map, goal_marker);


    // draw path
    let path_kakao = path.map((x) => new kakao.maps.LatLng(x['latitude'], x['longitude']));
    let polyline = new kakao.maps.Polyline({
        map: map,
        path: path_kakao,
        strokeWeight: 3,
        strokeColor: '#FF0000',
        strokeOpacity: 0.9,
        strokeStyle: 'solid'
    });
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

    slot["user_text"] = message
    let send_json = JSON.stringify(slot)

    fetch("http://sogangalex.kro.kr:5000/api/chat/message", {
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
            slot = data;
            sentMessageContainer.removeChild(typingIndicator);
            let response_container = displayResponseMessage(data["response_text"]);
            if ('display_location_map' in slot) {
                displayLocationMap(response_container, slot['location_name'], slot['coordinate']);
                delete slot.display_location_map;
            }
            else if ('display_path_map' in slot) {
                let start = slot['path'][0];
                let goal = slot['path'][slot['path'].length - 1];
                displayPathMap(response_container, slot['location_from'], slot['location_to'], start, goal, slot['path']);
                delete slot.display_path_map;
            }
        })
        .catch(data => {
            console.log(data);
            sentMessageContainer.removeChild(typingIndicator);
            displayResponseMessage("There was an Error");
        })
}

document.getElementById("message-input").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

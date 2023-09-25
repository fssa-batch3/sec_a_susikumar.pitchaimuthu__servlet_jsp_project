
// Emoji shwoing function

 function emojiShow() {
  let emojiContainDiv = document.querySelector(".emoji-input-div-container");
  console.log(emojiContainDiv);

  if (emojiContainDiv.style.display === "none") {
    emojiContainDiv.style.display = "block";
  } else {
    emojiContainDiv.style.display = "none";
  }
}


// Emoji add function to the input

function inputEmoji(emojis) {
  // getting the emails details from the input field
  let emojiInput = document.querySelector("#chat-input");
  emojiInput.value += emojis;
}

// Chat send function

 function sendChat() {
  let chatMessage = document.querySelector("#chat-input").value.trim();
  console.log(chatMessage);

  if (chatMessage == null || chatMessage.trim() === "") {
  alert("You can't send an empty chat");
  return;
}

const chatData = {
  chatMessage: chatMessage, 
  chatId: chatId
};

const url = "/appfreshnest/ChatSendServlet";

axios.post(url, chatData, {
    headers: {
        "Content-Type": "application/json"
    }
})
.then(function (response) {
    // handle success
    let chatSendResponse = response.data;
    console.log(chatSendResponse);
    if (chatSendResponse === "success") {
        document.querySelector("#chat-input").value = "";
        getSpecificChatGroupDetails(chatId, chatType);
    }
})
.catch(function (error) {
    // handle error
    console.log(error);
});

  
}

// Chat voice to text converter
function voiceText() {
  let speech = true;

  alert("Voice recognition started.");

  window.SpeechRecognition = window.webkitSpeechRecognition;

  let recognition = new SpeechRecognition();

  recognition.addEventListener("result", (e) => {
    let transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript);

    // Handle the transcript data here
    console.log(transcript);

    let chatInputField = document.querySelector("#chat-input");

    chatInputField.value = transcript;
  });

  recognition.addEventListener("end", () => {
    alert("Voice recognition ended.");
  });

  if (speech == true) {
    recognition.start();
  }
}


// Edit chat Message option div

function editChatMessage(messageId){
	
let updateInput = prompt("Please enter your update:", "");

  // Here say the one condition if input value is null  return

  if (updateInput === "") {
    alert("Please type some text");
    return;
  }

  let chatUpdateObject = {
    updateMessage: updateInput,
    messageId: messageId
  };
	
	 const url = "/appfreshnest/ChatEditServlet";

            axios.post(url, chatUpdateObject, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                // handle success
                let chatSendResponse = response.data;
                console.log(chatSendResponse);
              if(chatSendResponse == "success"){
               document.querySelector("#chat-input").value = "";
               getSpecificChatGroupDetails(chatId, chatType);
              }
         })
            .catch(function (error) {
                // handle error
                console.log(error);
         });
}


// Delete chat Message option div

function deleteChatMessage(messageId){
		const url = "/appfreshnest/ChatDeleteServlet?messageId=" + messageId;
	   axios.get(url)
			  .then(function (response) {
			    // handle success
			    console.log(response.data);
			    let chatDeleteResponse = response.data;
			    if(chatDeleteResponse === "success"){
				 getSpecificChatGroupDetails(chatId, chatType);
				}
			    
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			
	   		  })
    }






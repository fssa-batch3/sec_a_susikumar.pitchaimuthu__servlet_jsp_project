
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

  if (chatMessage == null || chatMessage == "") {
    alert("You can send empty chat");
    return;
  }

  let chatData = {
    chatMessage: chatMessage,
    chatId: chatId
  };


  const url = "http://localhost:8080/appfreshnest/ChatSendServlet";

            axios.post(url, chatData, {
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
	
	 const url = "http://localhost:8080/appfreshnest/ChatEditServlet";

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
		const url = "http://localhost:8080/appfreshnest/ChatDeleteServlet?messageId=" + messageId;
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






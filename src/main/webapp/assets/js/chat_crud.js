
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


// Chat group creation feature showing option

function showGroupCreationOption(){
	let groupElement = document.querySelector(".add-group-section-div");
	
	if(groupElement.style.display === "none"){
		groupElement.style.display = "block";
		removeGroupUserCard();
		GerUserChatFriendsForSuggestion();
		
	}else {
    	groupElement.style.display = "none";

	}
	
	
}

// remove group user card function
function removeGroupUserCard(){
	let userCard = document.querySelectorAll(".group-user-card-div-container");
	
	for(let card of userCard){
		card.remove();
	}
	
}

 let chatGroup;
function GerUserChatFriendsForSuggestion(){
	const url = "/appfreshnest/GetUserFriends";
			axios.get(url)
			  .then(function (response) {
			    // handle success
			     chatGroup = response.data;
			    console.log(chatGroup);
			    createGroupElement(chatGroup);
			    
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
	
}



// Show Group user card element

function createGroupElement(chatGroup){
for(let group of chatGroup){
	
	// Create the main container div
const groupUserCardContainer = document.createElement("div");
groupUserCardContainer.className = "group-user-card-div-container";
groupUserCardContainer.setAttribute("id", group["userId"]);
groupUserCardContainer.addEventListener("click", function(){
	let selectorId = this.id;
	chatGroupParticipantSelection(selectorId);
})

// Create the inner div
const groupUserCardInsideDiv = document.createElement("div");
groupUserCardInsideDiv.className = "group-user-card-inside-div";

// Create the profile image div
const groupUserProfileImageDiv = document.createElement("div");
groupUserProfileImageDiv.className = "group-user-profile-image-div";

// Create the profile image element
const userProfileImage = document.createElement("img");
userProfileImage.className = "group-user-image";
userProfileImage.src = group["profileImage"]; 
userProfileImage.alt = "user-profile-image";

// Create the name and theme div
const groupUserNameAndThemeDiv = document.createElement("div");
groupUserNameAndThemeDiv.className = "group-user-name-and-theme-div";

// Create the username paragraph
const groupUsernamePara = document.createElement("p");
groupUsernamePara.className = "group-username-para";
groupUsernamePara.textContent = group["username"]; 

// Create the user theme paragraph
const groupUserThemePara = document.createElement("p");
groupUserThemePara.className = "group-user-theme-para";
groupUserThemePara.textContent = group["userTheme"]; 

// Append elements to build the structure
groupUserProfileImageDiv.appendChild(userProfileImage);
groupUserNameAndThemeDiv.appendChild(groupUsernamePara);
groupUserNameAndThemeDiv.appendChild(groupUserThemePara);
groupUserCardInsideDiv.appendChild(groupUserProfileImageDiv);
groupUserCardInsideDiv.appendChild(groupUserNameAndThemeDiv);
groupUserCardContainer.appendChild(groupUserCardInsideDiv);

// Append the main container to the document
document.querySelector(".user-showing-inside-div-container").appendChild(groupUserCardContainer); // You can append it to a different parent element if needed
}
}


// Chat Group creation function
let chatParticipant = [];
	
	let chatGroupName;
	let chatGroupImage;
	let chatGroupTheme;
	
function chatGroupParticipantSelection(selectorId){
chatParticipant.push(selectorId);

let userObject = chatGroup.find((e) => e.userId == selectorId);

selectorCardCreation(userObject);

}	

// Seleter card creation function

function selectorCardCreation(userObject){
	// Create the outer div with class "selected-user-name-and-cancel-div"
const outerDiv = document.createElement("div");
outerDiv.classList.add("selected-user-name-and-cancel-div");
outerDiv.setAttribute("id", userObject["userId"]);

// Create the inner div with class "selected-user-name-and-cancel-inside-div"
const innerDiv = document.createElement("div");
innerDiv.classList.add("selected-user-name-and-cancel-inside-div");

// Create the img element with class "selected-user-image"
const imgElement = document.createElement("img");
imgElement.classList.add("selected-user-image");
imgElement.src = userObject["profileImage"]; // Set the src attribute as needed
imgElement.alt = "user-image"; // Set the alt attribute as needed

// Create the p element with class "selected-user-name-para"
const pElement = document.createElement("p");
pElement.classList.add("selected-user-name-para");
pElement.innerText = userObject["username"];

// Create the i element with class "bi bi-x-lg" for the cancel icon
const iElement = document.createElement("i");
iElement.classList.add("bi", "bi-x-lg");
iElement.setAttribute("id", userObject["userId"]);
iElement.addEventListener("click", function (){
	let removerId = this.id;
	chatParticipantRemove(removerId);
})

// Append the elements to construct the structure
innerDiv.appendChild(imgElement);
innerDiv.appendChild(pElement);
innerDiv.appendChild(iElement);
outerDiv.appendChild(innerDiv);

document.querySelector(".selected-user-inside-div").append(outerDiv);
}
	

// Chat participant remove Id function

function chatParticipantRemove(removeId){
	
	let selectedElements = document.querySelectorAll(".selected-user-name-and-cancel-div");
	
	for(let element of selectedElements){
		if(element.id == removeId){
			element.remove();
			chatParticipant = chatParticipant.filter(item => item !== removeId);
			break;
		}
	}
	
}

// Create the chat group function
function chatGroupCreation(){
	
	if (chatParticipant.length === 0) {
      alert("Please select your chat participants");
      return;
    }
	
	if(chatGroupName == null){
		chatGroupName = "New Group";
	}
	
	if(chatGroupImage == null){
		chatGroupImage = "https://about.fb.com/wp-content/uploads/2014/11/groupslogo2.jpg";
	}
	
	if(chatGroupTheme == null){
		chatGroupTheme = "We are the friends in the freshnest";
	}
	
	let createObject = {
		chatGroupName,
		chatGroupImage,
		chatGroupTheme,
		chatParticipant
	}
	
	
	    const url = "/appfreshnest/chatGroupCreationServlet";

            axios.post(url, createObject, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                // handle success
                let serverMessage = response.data;
                console.log(serverMessage);
              if(serverMessage == "success"){
                 alert("Success");
                 getUserChatFriends();
              }
              
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
}




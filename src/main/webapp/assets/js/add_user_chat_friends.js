
// get user from the url

let userId;

function findUserProfileDetails(){
		const url = "/appfreshnest/UserProfileDetails";
			axios.get(url)
			  .then(function (response) {
			    // handle success
			   let  profileUser = response.data;
			    displayProfileImageAndName(profileUser);
			    defaultTimeTalseElementCreation(profileUser);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
}
findUserProfileDetails();


function displayProfileImageAndName(profileUser){
try {
  
  // profile image and details adding elements

  userId = profileUser["userId"]
  let profile_image = document.querySelector("#profile-image");
  let profile_name = document.querySelector(".name");
  let profile_profession = document.querySelector(".profession");

  profile_image.setAttribute("src", profileUser["profileImage"]);
  profile_name.innerHTML = profileUser["username"];
  
  if(profile_profession != null){
  profile_profession.innerHTML = profileUser["userTheme"];
  }
  
} catch (error) {
  console.log("An error occurred while find the profile user :", error);
}
}




function getUserChatGroups(){
	
	const url = "/appfreshnest/GetUserChatGroupsServlet";
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    const chatGroup = response.data;
			    console.log(chatGroup);
			    if(chatGroup.length == 0){
					getConnectionMessage();
				}else {
				chatGroup.sort(compareTimestamps);
			    showAllUserChatFriends(chatGroup);
				}
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
	
}
  
  getUserChatGroups();
  // const intervalId = setInterval(getUserChatGroups, 5000);
  
  // Function to compare timestamps and sort in descending order
function compareTimestamps(a, b) {
  const timestampA = new Date(a.timestamp);
  const timestampB = new Date(b.timestamp);
  return timestampB - timestampA;
}


  // Removing previous chat cards by removing all child nodes
  function chatCardRemoveFunction() {
  const chatContainer = document.querySelector(".chat-member-inside-container");
  while (chatContainer.firstChild) {
    chatContainer.removeChild(chatContainer.firstChild);
  }
}

// If there is no chat group means guide them

function getConnectionMessage(){
	
	let paraDiv = document.createElement("div");
	paraDiv.setAttribute("class", "get-connection-div");
	
    let paraInsideDiv = document.createElement("div");
	paraInsideDiv.setAttribute("class", "get-connection-inside-div");
	paraDiv.append(paraInsideDiv);
		
	let firstPara = document.createElement("p");
	firstPara.setAttribute("class", "connection-message-para");
	firstPara.innerHTML = "Ooops! you don't have the chat group to message.";
	paraInsideDiv.append(firstPara);
	
	let secondPara = document.createElement("p");
	secondPara.setAttribute("class", "connection-message-para");
	secondPara.innerHTML = "No Problem. Go to home page and made connection";
	paraInsideDiv.append(secondPara);
	
	let navigationAnchor = document.createElement("a");
    navigationAnchor.setAttribute("class", "navigation-span");
    navigationAnchor.setAttribute("id", "home");
    navigationAnchor.setAttribute("href", "../pages/home.html"); 
    navigationAnchor.innerHTML = " Go Home";
    secondPara.append(navigationAnchor);

	
	document.querySelector(".chat-member-inside-container").append(paraDiv);
	
}





// Declare the chat id and chat type
let ChatId;
let chatType;
  
  
 function showAllUserChatFriends(chatGroup){
	 
  chatCardRemoveFunction();
  
  for (const friendData of chatGroup) {
      let div = document.createElement("div");
      div.setAttribute(
        "class",
        "user-card-container" + " " + friendData["username"]
      );

      let usercardContainerInsideDiv = document.createElement("div");
      usercardContainerInsideDiv.setAttribute("class", "user-card-inside-container");
      usercardContainerInsideDiv.setAttribute("id", friendData["chatId"]);
      usercardContainerInsideDiv.setAttribute("data-chat-type", friendData["chatType"]); // Store chat type here
      usercardContainerInsideDiv.addEventListener("click", function() {
      chatId = this.id;
      chatType = this.getAttribute("data-chat-type");
      getSpecificChatGroupDetails(chatId, chatType);
     });
      div.append(usercardContainerInsideDiv);

      let image_div = document.createElement("div");

      image_div.setAttribute("class", "image-name");
      usercardContainerInsideDiv.append(image_div);

      let image = document.createElement("div");
      image.setAttribute("class", "image");
      image_div.append(image);

      let img = document.createElement("img");
      img.setAttribute("class", "member-image");
	  img.setAttribute("src", friendData["groupImage"]);
	  img.setAttribute("data-group-type", friendData["chatType"]);
	  img.addEventListener("click", function () {
      let chatId = friendData["chatId"]; 
      let chatType = img.getAttribute("data-group-type");
      GetChatGroupDetails(chatId, chatType);
    });
      image.append(img);

      let nameOne = document.createElement("div");
      nameOne.setAttribute("class", "name");
      image_div.append(nameOne);

      let para = document.createElement("p");
      para.innerHTML = friendData["chatName"];
      nameOne.append(para);
      
      let isReadAndChatMessageDivContainer = document.createElement("div");
      isReadAndChatMessageDivContainer.setAttribute("class", "is-read-and-message-div-container");
      nameOne.append(isReadAndChatMessageDivContainer);
      
      if(friendData["lastMessageSender"] == "user"){
 	  let isReadI = document.createElement("i");
      isReadI.setAttribute("class" , "bi bi-check2-all");
      
      if(friendData["doesEveryoneReadMessage"]){
		isReadI.setAttribute("style", "color: rgb(97, 97, 248)");
	  }
      	isReadAndChatMessageDivContainer.append(isReadI);
      }
      
      let paragraph = document.createElement("p");
      if(friendData["chatMessage"]== undefined || friendData["chatMessage"] == null){
		 paragraph.innerText = "start conversation";
	  }else {  
		  if(friendData["lastMessageSender"] == "user"){
	 		 paragraph.innerText = "You : " + friendData["chatMessage"] ;
		  }else {
     		 paragraph.innerText = friendData["username"]+ ":" +  friendData["chatMessage"];
     	 }
	  }
      paragraph.setAttribute("class", "chat-message-para");
      isReadAndChatMessageDivContainer.append(paragraph);

      let timeCountDiv = document.createElement("div");
      timeCountDiv.setAttribute("class", "chat-count-div");
      usercardContainerInsideDiv.append(timeCountDiv);

      let countContainer = document.createElement("div");
      countContainer.setAttribute("class", "count-container");
      timeCountDiv.append(countContainer);

      // creating for loop to show the user unread chat count

      if (friendData["unReadMessageCount"] != 0) {
        let countDiv = document.createElement("div");
        countDiv.setAttribute("class", "count-div");
        countContainer.append(countDiv);

        let countPara = document.createElement("p");
        countPara.setAttribute("class", "count-para");
        countPara.innerText = friendData["unReadMessageCount"];
        countDiv.append(countPara);
      }
      
      // Convert the time of the message using localeDate
       timestamp = new Date(friendData["timestamp"]);

      // Format the timestamp with AM and PM
       let  formattedTime = timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
       
       if(formattedTime === "Invalid Date"){
		   const currentTime = new Date();
          formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', hour12: true }).toUpperCase();
	   }

      let timeAgo = document.createElement("div");
      timeAgo.setAttribute("id", "time-ago" );
      timeCountDiv.append(timeAgo);

      let time = document.createElement("p");
      time.innerHTML = formattedTime;
      timeAgo.append(time);

      document.querySelector(".chat-member-inside-container").append(div);
    }
  }
   
    
function  getSpecificChatGroupDetails(chatId, chatType){
	
const url = "/appfreshnest/GetChatGroupMessages?chatId=" + chatId + "&chatType=" + chatType;
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    const chatGroupDetails = response.data;
			    chatCard(chatGroupDetails);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
	
}      
 
    
    
   
// avatar emoji part removing function

function removeAvatar() {
  // remve emoji div container

  let emojiDivs = document.querySelector(".emoji-name-div-container");

  if (emojiDivs != null) {
    emojiDivs.remove();
  }
}

// user profile card emoji removing function

function profileRemove() {
  let checkUserData = document.querySelector(".user-profile-show-div");

  if (checkUserData !== null) {
    document.querySelector(".user-profile-show-div").remove();
  }
}

//

function removingInput() {
  let nullInput = document.querySelector("#chat-input-form");

  if (nullInput !== null) {
    document.querySelector("#chat-input-form").remove();
  }
}

// chat is read true function


let userSelectId;
function chatCard(userSelectionIdFind) {
      // removing user profiel if already there
      removeAvatar();

      profileRemove();

      // Elelements are created for showing chat user Datails in the top of the chat

      let userNameDivContainer = document.createElement("div");
      userNameDivContainer.setAttribute("class", "user-profile-show-div");

      let userNameDiv = document.createElement("div");
      userNameDiv.setAttribute("class", "user-name-lastseen-div");
      userNameDivContainer.append(userNameDiv);

      let chatPersonDiv = document.createElement("div");
      chatPersonDiv.setAttribute("class", "chat-person-profile-div");
      userNameDiv.append(chatPersonDiv);

      let chatUserImage = document.createElement("img");
      chatUserImage.setAttribute("class", "chat-user-image");
      chatUserImage.setAttribute("src", userSelectionIdFind["chatGroupDetails"]["profileImage"]);
      chatPersonDiv.append(chatUserImage);

      let chatPersonContentDiv = document.createElement(
        "div",
        "chat-person-name-lastseen-div"
      );
      chatPersonContentDiv.setAttribute(
        "class",
        "chat-person-name-lastseen-div"
      );
      userNameDiv.append(chatPersonContentDiv);

      let nameH3 = document.createElement("h3");
      nameH3.setAttribute("id", "chat-user-name");
      nameH3.innerHTML = userSelectionIdFind["chatGroupDetails"]["username"];
      chatPersonContentDiv.append(nameH3);

      let contentPara = document.createElement("p");
      contentPara.setAttribute("id", "chat-user-last-content");
      chatPersonContentDiv.append(contentPara);


     
      document
        .querySelector(".chat-member-option-div")
        .append(userNameDivContainer);

      // write the code to null the data

      removingInput();

      // create dynamic element for the input field

      let inputForm = document.createElement("div");
      inputForm.setAttribute("id", "chat-input-form");

      let emojiDiv = document.createElement("div");
      emojiDiv.setAttribute("class", "emoji-div");
      inputForm.append(emojiDiv);

      let smileI = document.createElement("i");
      smileI.setAttribute("class", "fa-regular fa-face-smile");
      smileI.setAttribute("onclick", "emojiShow()")
      emojiDiv.append(smileI);

      let emojiInputDiv = document.createElement("div");
      emojiInputDiv.setAttribute("class", "emoji-input-div-container");
      emojiInputDiv.setAttribute("style", "display:none;");
      emojiDiv.append(emojiInputDiv);

      let emojiInsideDiv = document.createElement("div");
      emojiInsideDiv.setAttribute("class", "emoji-input-inside-div-container");
      emojiInputDiv.append(emojiInsideDiv);

      let InputDiv = document.createElement("div");
      InputDiv.setAttribute("class", "input-div");
      emojiInsideDiv.append(InputDiv);

      let emojiInpt = document.createElement("input");
      emojiInpt.setAttribute("id", "emoji-input");
      emojiInpt.setAttribute("placeholder", "Search");
      InputDiv.append(emojiInpt);

      let emojiDivContainer = document.createElement("div");
      emojiDivContainer.setAttribute("class", "emoji-div-container");
      emojiInsideDiv.append(emojiDivContainer);

      let emojiRangeStart = 0x1f600;
      let emojiRangeEnd = 0x1f64f;

      for (
        let emojiCode = emojiRangeStart;
        emojiCode <= emojiRangeEnd;
        emojiCode++
      ) {
        let emoji = document.createElement("span");
        emoji.setAttribute("class", "span-emoji " + emojiCode);
        emoji.innerHTML = String.fromCodePoint(emojiCode);
        emoji.addEventListener("click", () => { 
        let clickedEmoji = emoji.innerHTML; 
        
        inputEmoji(clickedEmoji);
        });
        emojiDivContainer.appendChild(emoji);
      }

      let chatInputDiv = document.createElement("div");
      chatInputDiv.setAttribute("class", "chat-input-div");
      inputForm.append(chatInputDiv);

      let chatInput = document.createElement("input");
      chatInput.setAttribute("id", "chat-input");
      chatInput.addEventListener("keydown", function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    sendChat();
                }
            });
      chatInputDiv.append(chatInput);

      let chatFileOptionDiv = document.createElement("div");
      chatFileOptionDiv.setAttribute("class", "chat-file-option-div");
      inputForm.append(chatFileOptionDiv);

      let fileI = document.createElement("i");
      fileI.setAttribute("class", "fa fa-file");
     chatFileOptionDiv.append(fileI);

      let mikeI = document.createElement("i");
      mikeI.setAttribute("class", "fa fa-microphone");
      mikeI.setAttribute("onclick", "voiceText()");
      chatFileOptionDiv.append(mikeI);

      let chatSubmitDiv = document.createElement("div");
      chatSubmitDiv.setAttribute("class", "chat-submit-button-div");
      inputForm.append(chatSubmitDiv);

      let sendButton = document.createElement("button");
      sendButton.setAttribute("class", "chat-submit");
      sendButton.setAttribute("onclick", "sendChat()")
      chatSubmitDiv.append(sendButton);

      let sendIcon = document.createElement("i");
      sendIcon.setAttribute("class", "bi bi-send");
      sendButton.append(sendIcon);

      let Span = document.createElement("span");
      Span.setAttribute("class", "submit-span");
      Span.innerHTML = "Submit";
      sendButton.append(Span);

      let sendI = document.createElement("i");
      sendI.setAttribute("class", "send-i");
      sendButton.append(sendI);

      document.querySelector(".chat-input-option-div").append(inputForm);
      
     removeUserChats();
     // Chat message divide function call
     chatMessageDivide(userSelectionIdFind["chatMessages"]);


    }
    
    
 function chatMessageDivide(chatMessage){     
   for (let senders of chatMessage) {
    if (senders["senderId"] == userId ) {
      // usrer chat elemeent creation function
      userSendChats(senders);
    } else {
      friendChatCreation(senders);
    }
  }
  // Scroll to the bottom of the chat container
    goToBottom();
  
  }


// User chat card creation

 function userSendChats(senders) {
// Create the main message container div
const messageContainer = document.createElement("div");
messageContainer.classList.add("msg", "right-msg");
messageContainer.setAttribute("id", "chat-div-for-user");

// Create the message image div
const messageImageDiv = document.createElement("div");
messageImageDiv.classList.add("profile-image-div");

// Create the message image element
const messageImage = document.createElement("img");
messageImage.classList.add("msg-img");
messageImage.setAttribute("src", senders["profileImage"]);
messageImage.setAttribute("alt", "user-image");

// Append the image to its container
messageImageDiv.appendChild(messageImage);

// Create the message bubble div
const messageBubbleDiv = document.createElement("div");
messageBubbleDiv.classList.add("msg-bubble");

// Create the message info div
const messageInfoDiv = document.createElement("div");
messageInfoDiv.classList.add("msg-info");

// Create the message info name div
const messageInfoNameDiv = document.createElement("div");
messageInfoNameDiv.classList.add("msg-info-name");

// Create the name paragraph
const nameParagraph = document.createElement("p");
nameParagraph.textContent = senders["username"];

// Append the name paragraph to its container
messageInfoNameDiv.appendChild(nameParagraph);

// Create the message info time div
const messageInfoTimeDiv = document.createElement("div");
messageInfoTimeDiv.classList.add("msg-info-time");

// Create the time div
const timeDiv = document.createElement("div");
timeDiv.classList.add("time-div");

let formattedTime = timeConverstion(senders["timestamp"]);
// Create the time paragraph
const timeParagraph = document.createElement("p");
timeParagraph.textContent = formattedTime;

// Append the time paragraph to its container
timeDiv.appendChild(timeParagraph);

// Create the message edit option div
const messageEditOptionDiv = document.createElement("div");
messageEditOptionDiv.classList.add("msg-edit-option-div");
messageEditOptionDiv.setAttribute("id", senders["messageId"]);
messageEditOptionDiv.addEventListener("click", function() {
    let messageId = this.id;
      ShowEditOptionDiv(messageId);
 });


// Create the three-dots icon
const threeDotsIcon = document.createElement("i");
threeDotsIcon.classList.add("bi", "bi-three-dots");

// Create the option div
const optionDiv = document.createElement("div");
optionDiv.classList.add("option-div");
optionDiv.setAttribute("style", "display:none;");

// Create the option inside div
const optionInsideDiv = document.createElement("div");
optionInsideDiv.classList.add("option-inside-div");

// Create the edit paragraph
const editParagraph = document.createElement("p");
editParagraph.classList.add("edit-para");
editParagraph.setAttribute("id", senders["messageId"]);
editParagraph.addEventListener("click", function() {
    let messageId = this.id;
    editChatMessage(messageId);
 });
editParagraph.textContent = "Edit";

// Create the delete paragraph
const deleteParagraph = document.createElement("p");
deleteParagraph.classList.add("delete-para");
deleteParagraph.setAttribute("id", senders["messageId"]);
deleteParagraph.addEventListener("click", function() {
    let messageId = this.id;
    deleteChatMessage(messageId);
 });
deleteParagraph.textContent = "Delete";

// Append the edit and delete paragraphs to their container
optionInsideDiv.appendChild(editParagraph);
optionInsideDiv.appendChild(deleteParagraph);

// Append all elements to their respective parent elements
messageInfoTimeDiv.appendChild(timeDiv);
messageInfoTimeDiv.appendChild(messageEditOptionDiv);
messageEditOptionDiv.appendChild(threeDotsIcon);
messageEditOptionDiv.appendChild(optionDiv);
optionDiv.appendChild(optionInsideDiv);

messageInfoDiv.appendChild(messageInfoNameDiv);
messageInfoDiv.appendChild(messageInfoTimeDiv);

messageBubbleDiv.appendChild(messageInfoDiv);

// Create the message text div
const messageTextDiv = document.createElement("div");
messageTextDiv.classList.add("msg-text");
messageTextDiv.textContent = senders["chatMessage"];

messageBubbleDiv.appendChild(messageTextDiv);

messageContainer.appendChild(messageImageDiv);
messageContainer.appendChild(messageBubbleDiv);

  document.querySelector(".right-side-container").append(messageContainer);
}

// friends chat function creation

 function friendChatCreation(senders) {
  // Create the main message container div
const messageContainer = document.createElement("div");
messageContainer.classList.add("msg", "left-msg");
messageContainer.setAttribute("id", "chat-div-for-user");


// Create the message image div
const messageImageDiv = document.createElement("div");
messageImageDiv.classList.add("profile-image-div");

let messageImage = document.createElement("img");
messageImage.classList.add("msg-img");
messageImage.setAttribute("src", senders["profileImage"])
messageImage.setAttribute("alt", "profile-image");
messageImageDiv.append(messageImage);

// Create the message bubble div
const messageBubbleDiv = document.createElement("div");
messageBubbleDiv.classList.add("msg-bubble");

// Create the message info div
const messageInfoDiv = document.createElement("div");
messageInfoDiv.classList.add("msg-info");

// Create the message info name div
const messageInfoNameDiv = document.createElement("div");
messageInfoNameDiv.classList.add("msg-info-name");
messageInfoNameDiv.textContent = senders["username"];


let formattedTime = timeConverstion(senders["timestamp"]);
// Create the message info time div
const messageInfoTimeDiv = document.createElement("div");
messageInfoTimeDiv.classList.add("msg-info-time");
messageInfoTimeDiv.textContent = formattedTime;

// Append the name and time divs to the message info div
messageInfoDiv.appendChild(messageInfoNameDiv);
messageInfoDiv.appendChild(messageInfoTimeDiv);

// Create the message text div
const messageTextDiv = document.createElement("div");
messageTextDiv.classList.add("msg-text");
messageTextDiv.textContent = senders["chatMessage"];

// Append all elements to their respective parent elements
messageContainer.appendChild(messageImageDiv);
messageContainer.appendChild(messageBubbleDiv);
messageBubbleDiv.appendChild(messageInfoDiv);
messageBubbleDiv.appendChild(messageTextDiv);


  document.querySelector(".right-side-container").append(messageContainer);
}

// Here creating a function to say go the bottom

 function goToBottom() {
  let chatContainer = document.querySelector(".right-side-container");
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Remove the previous chats before show the  new chats

function removeUserChats() {
  let chageChat = document.querySelectorAll("#chat-div-for-user");

  if (chageChat[0] != undefined) {
    for (let chatG of chageChat) {
      chatG.remove();
    }
  }
}


// Time converstion function timeStamp to time

function timeConverstion(unformattedTime){
	
const timestamp = unformattedTime;
const dateObject = new Date(timestamp);

// Extract the hour and minute
const hours = dateObject.getHours();
const minutes = dateObject.getMinutes();

// Determine whether it's AM or PM
const amOrPm = hours >= 12 ? 'PM' : 'AM';

// Convert to 12-hour format
const hours12 = hours % 12 || 12; 

// Format the time as HH:MM AM/PM
const formattedTime = `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${amOrPm}`;

return formattedTime;
}  


// Show the chat edit option div

function ShowEditOptionDiv(messageId) {
  let getAllEditOptionDiv = document.querySelectorAll(".msg-edit-option-div");

  for (let div of getAllEditOptionDiv) {
    if (div.id === messageId) {
      // Find the nested option-div element
      let optionDiv = div.querySelector(".option-div");

      // Toggle the display property between "block" 
      if (optionDiv.style.display === "none") {
        optionDiv.style.display = "block";
      } else {
        optionDiv.style.display = "none";
      }
      
      break;
    }
  }
}

// Message isRead Function

function chatMessageIsReadFunction(chatId){
	
	const url = "/appfreshnest/SetChatMessageIsRead?chatId=" + chatId;
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    const chatGroupDetails = response.data;
			    console.log(chatGroupDetails);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
	
	
}



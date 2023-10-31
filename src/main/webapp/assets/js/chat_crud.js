
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

  if (chatMessage == null || chatMessage.trim() === "") {
  alert("You can't send an empty chat");
  return;
  }

const chatData = {
  chatMessage: chatMessage, 
  chatId: chatId
};

console.log(chatData);

const url = "/appfreshnest/ChatSendServlet";

axios.post(url, chatData, {
    headers: {
        "Content-Type": "application/json"
    }
})
.then(function (response) {
    // handle success
    let chatSendResponse = response.data;
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
	   let parentElment = document.querySelector(".user-showing-inside-div-container");
		GetUserChatFriendsForSuggestion(parentElment);
		
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

function GetUserChatFriendsForSuggestion(parentElement) {
    const url = "/appfreshnest/GetUserFriends";
    axios.get(url)
        .then(function (response) {
            // handle success
            chatGroup = response.data;
            createGroupElement(chatGroup, parentElement);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}



// Show Group user card element

function createGroupElement(chatGroup, parentElement){
for(let group of chatGroup){
	
	// Create the main container div
const groupUserCardContainer = document.createElement("div");
groupUserCardContainer.className = "group-user-card-div-container " + group["username"];
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
parentElement.appendChild(groupUserCardContainer); 
}
}


// Chat Group creation function
let chatParticipant = [];
	
	let chatGroupName;
    let chatGroupImage = "https://about.fb.com/wp-content/uploads/2014/11/groupslogo2.jpg"; 
	let chatGroupTheme;
	
function chatGroupParticipantSelection(selectorId) {
    // Check if the selectorId is already in chatParticipant
    if (chatParticipant.includes(selectorId)) {
        // Display an alert message here
        alert("User is already in the group.");
        return;
    }

    chatParticipant.push(selectorId);

    let userObject = chatGroup.find((e) => e.userId == selectorId);

    selectorCardCreation(userObject);
}	

// Seleter card creation function

function selectorCardCreation(userObject){
	// Create the outer div with class "selected-user-name-and-cancel-div"
const outerDiv = document.createElement("div");
outerDiv.classList.add("selected-user-name-and-cancel-div" );
outerDiv.setAttribute("id", userObject["userId"]);

// Create the inner div with class "selected-user-name-and-cancel-inside-div"
const innerDiv = document.createElement("div");
innerDiv.classList.add("selected-user-name-and-cancel-inside-div");

// Create the img element with class "selected-user-image"
const imgElement = document.createElement("img");
imgElement.classList.add("selected-user-image");
imgElement.src = userObject["profileImage"];
imgElement.alt = "user-image"; 

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
    
    let chatGroupNameInput = document.querySelector(".group-name");
    let chatInputThemeInput = document.querySelector(".group-theme");

    // Trim and check if the input value is empty
    let chatGroupName = chatGroupNameInput.value.trim() || "New Group";
    let chatGroupTheme = chatInputThemeInput.value.trim() || "We are the friends in the freshnest";
		
	let createObject = {
		chatGroupName,
		chatGroupImage,
		chatGroupTheme,
		chatParticipant
	}
	
	console.log(createObject);
	    const url = "/appfreshnest/ChatGroupCreationServlet";

            axios.post(url, createObject, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                // handle success
                let serverMessage = response.data;
              if(serverMessage == "success"){
                 showToast("Chat grop Created successfully!", "success");
                 getUserChatFriends();
              }else {
   				 showToast("Oops! There was a problem creating the chat group.", "error");
			  }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
            
}

function getChatGroupImage() {
  let fileInput = document.createElement("input");
  fileInput.type = "file";

  let imageElement = document.createElement("img");
  imageElement.setAttribute("class", "sending-image");

  fileInput.click(); 

  fileInput.addEventListener("change", function (e) {
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = function (e) {
      let fileContent = e.target.result;
      
      chatGroupImage = fileContent;
    };
    reader.readAsDataURL(file);
  });
}
 

// Function to filter cards based on input
function filterCards(inputSelector) {
  try {
    // Get input value and convert to lowercase
    let input = document.querySelector(inputSelector).value.toLowerCase();

    let spaceRegex = / /g;

    // Replace spaces with an underscore
    let dashedText = input.replace(spaceRegex, "_");
    // Get list items
    let userCards = document.querySelectorAll(".group-user-card-div-container");

    // Loop through all items
    for (let searchItem of userCards) {
      let item = searchItem;
      let itemName = item.textContent.toLowerCase();

      // Check if the item name contains the search input
      if (itemName.includes(dashedText)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    }
  } catch (error) {
    console.log("An error occurred while searching:", error);
  }
}

// Event listener for create group search input
let createGroupSearchInput = document.querySelector(".create-chat-group-search-input");
createGroupSearchInput.addEventListener("input", function () {
  filterCards(".create-chat-group-search-input");
});

// Event listener for chat group filter input
let chatGroupFilterInput = document.querySelector(".group-search-input");
chatGroupFilterInput.addEventListener("input", function () {
  filterCards(".group-search-input");
});


// Chat group details showing div container

function GetChatGroupDetails(chatId, chatType){
const url = "/appfreshnest/GetChatGroupDetails?chatId="+ chatId + "&chatType=" + chatType ;
  axios
    .get(url)
    .then(function (response) {
      const chatGroupObject = response.data;
      console.log(chatGroupObject);
      showTheChatGroupDetails(chatGroupObject);
    })
    .catch(function (error) {
      console.log(error);
    });
}


function showTheChatGroupDetails(chatGroupObject){
	let groupDetailsDiv = document.querySelector(".group-details-div");
	if(groupDetailsDiv.style.display === "none"){
		groupDetailsDiv.style.display = "block";
		createGroupMemberCards(chatGroupObject.participant,chatGroupObject.isAdmin);
		setChatGroupImageAndName(chatGroupObject);
	}else{
		groupDetailsDiv.style.display = "none";
	}
}

function setChatGroupImageAndName(chatGroupObject){
	 document.querySelector(".group-image").src = chatGroupObject["groupImage"];
	 document.querySelector(".group-name-input").value = chatGroupObject["groupName"];
	 document.querySelector(".group-theme-input").value = chatGroupObject["groupTheme"];
	
}

function removeChatGroupUserCards(){
	let userCards = document.querySelectorAll(".group-user-card-div-container");
	
	for(let card of userCards){
		card.remove();
	}
}


function createGroupMemberCards(participants, admin){
// Remove user cards before show the user

 removeChatGroupUserCards();
 
 if(admin){
	  createUserAddMembetElmentCreation();
  }else {
	let buttonDiv = document.querySelector(".chat-group-details-button-div");
	let editGroupProfileOption = document.querySelector(".chat-group-profile-edit");
    let groupNameInput = document.querySelector(".group-name-input");
	let groupThemeInput = document.querySelector(".group-theme-input");
	buttonDiv.style.display = "none";
	editGroupProfileOption.style.display = "none";
	groupNameInput.setAttribute("disabled", true);
	groupThemeInput.setAttribute("disabled", true);
  }

for(let part of participants){	
   chatGroupUserParticipantCardCreation(part);
   
   if(admin && part.user["userId"] != userId){
	   showUserOptionForChatGroup(part);
   }
   
}
}

// Create admin add member option div
function createUserAddMembetElmentCreation(){
// Remove previous div	
removePreviousAddMemberDiv();
	
const groupAddUserDiv = document.createElement("div");
groupAddUserDiv.className = "group-add-user-div group-options";
groupAddUserDiv.setAttribute("data-group-option", "add-member");
groupAddUserDiv.onclick = function() {
    showChatGroupOptionDetails(this);
};

// Remove the previous add member option div

function removePreviousAddMemberDiv(){
	let elements = document.querySelectorAll(".group-add-user-div");
	
	for(let ele of elements){
		ele.remove();
	}
}

// Create the <i> (icon) element
const iconElement = document.createElement("i");
iconElement.className = "bi bi-person-plus-fill";

// Create the <p> (paragraph) element
const paragraphElement = document.createElement("p");
paragraphElement.textContent = "Add Member";

// Append the <i> and <p> elements to the main div
groupAddUserDiv.appendChild(iconElement);
groupAddUserDiv.appendChild(paragraphElement);

document.querySelector(".group-details-option-showing-inside-div").append(groupAddUserDiv);
}

function chatGroupUserParticipantCardCreation(part){
	// Create a div element with class "group-user-card-container"
let groupUserCardContainer = document.createElement("div");
groupUserCardContainer.className = "group-user-card-container group-user-card-div-container " + part["user"]["username"] ;

// Create a div element with class "group-user-inside-div"
let groupUserInsideDiv = document.createElement("div");
groupUserInsideDiv.className = "group-user-inside-div";

// Create the group image and name container div
let groupUserImageAndNameDiv = document.createElement("div");
groupUserImageAndNameDiv.className = "group-user-image-and-name-div";
groupUserImageAndNameDiv.setAttribute("id", part.user["userId"]);

// Create the group user image div
let groupUserImageDiv = document.createElement("div");
groupUserImageDiv.className = "group-user-image-div";

// Create an img element for the user image
let userImage = document.createElement("img");
userImage.className = "group-user-image";
userImage.src = part.user["profileImage"];
userImage.alt = "group-user-image";

// Append the user image to the group user image div
groupUserImageDiv.appendChild(userImage);

// Create the group user name and theme container div
let groupUserNameThemeDivContainer = document.createElement("div");
groupUserNameThemeDivContainer.className = "group-user-name-theme-div-container";

// Create an h4 element for the user name
let userName = document.createElement("h4");
userName.className = "group-user-name";
if (userId == part.user["userId"]){
	userName.textContent = "You"
 }else {
    userName.textContent = part.user["username"];
}

// Create a span element for the checkmark icon
if(part.admin){
let checkmarkIcon = document.createElement("span");
checkmarkIcon.innerHTML = '<i class="bi bi-check2-circle"></i>';

// Append the checkmark icon to the user name
userName.appendChild(checkmarkIcon);	
}

// Create a p element for the user theme
let userTheme = document.createElement("p");
userTheme.className = "group-user-theme";
userTheme.textContent = part.user["userTheme"];

// Append the user name and theme elements to the group user name and theme container
groupUserNameThemeDivContainer.appendChild(userName);
groupUserNameThemeDivContainer.appendChild(userTheme);

// Append the group user image div and group user name and theme container to the group image and name div
groupUserImageAndNameDiv.appendChild(groupUserImageDiv);
groupUserImageAndNameDiv.appendChild(groupUserNameThemeDivContainer);

groupUserInsideDiv.appendChild(groupUserImageAndNameDiv);

// Append the group user inside div to the group user card container
groupUserCardContainer.appendChild(groupUserInsideDiv);

document.querySelector(".group-users-showing-inside-div").appendChild(groupUserCardContainer);

}

// Is user admin show user details change option for chat group

function showUserOptionForChatGroup(part){
// Create the group user option div
let groupUserOptionDiv = document.createElement("div");
groupUserOptionDiv.className = "group-user-opiton-icon-div";

// Create an i element for the three dots vertical icon
let threeDotsIcon = document.createElement("i");
threeDotsIcon.className = "bi bi-three-dots-vertical";
threeDotsIcon.setAttribute("id", part.user["userId"]);
threeDotsIcon.setAttribute("onclick", "showChatGroupUserDetailsUpdateOption(this.id)");


// Create the group user option inside div
let groupUserOptionInsideDiv = document.createElement("div");
groupUserOptionInsideDiv.className = "group-user-option-div";
groupUserOptionInsideDiv.setAttribute("id", part.user["userId"]);
groupUserOptionInsideDiv.setAttribute("style", "display:none;")


let groupuserOptionInsideInsideDiv = document.createElement("div");
groupuserOptionInsideInsideDiv.className = "group-user-option-inside-div";
groupUserOptionInsideDiv.append(groupuserOptionInsideInsideDiv);

// Create a p element for "Make Admin"
let makeAdminPara = document.createElement("p");
makeAdminPara.className = "admin-para";
makeAdminPara.setAttribute("id", part.user["userId"]);
makeAdminPara.setAttribute("onclick", "makeAdmin(this.id)");
if(part["admin"]){
	makeAdminPara.textContent = "Revoke Admin";
}else {
	makeAdminPara.textContent = "Make Admin";
}

// Create a p element for "Remove"
let removePara = document.createElement("p");
removePara.className = "remove-para";
removePara.setAttribute("id", part.user["userId"]);
removePara.setAttribute("onclick", "removeUser(this.id)");
removePara.textContent = "Remove";

// Append "Make Admin" and "Remove" elements to the group user option inside div
groupuserOptionInsideInsideDiv.appendChild(makeAdminPara);
groupuserOptionInsideInsideDiv.appendChild(removePara);

// Append the three dots icon and group user option inside div to the group user option div
groupUserOptionDiv.appendChild(threeDotsIcon);
groupUserOptionDiv.appendChild(groupUserOptionInsideDiv);

// Append the group user image and name div and group user option div to the group user inside div
let currentElement = findAppendElement(document.querySelectorAll(".group-user-image-and-name-div"), part.user["userId"]);
currentElement.appendChild(groupUserOptionDiv);
	
}

// Fiind the append element
function findAppendElement(elements , userId){
	for(let ele of elements){
		if(ele.id == userId){
			return ele;
		}
	}
	
}

// Show appriate deatails for the chat group 

function showChatGroupOptionDetails(element) {
  removeSelected();
  element.classList.add("selected");
  if(element.getAttribute("data-group-option") === "add-member"){
	  removeChatGroupUserCards();
	  let parentElement = document.querySelector(".group-users-showing-inside-div");
	  GetUserChatFriendsForSuggestion(parentElement);
  }else {
	  removeGroupUserCard();
	  GetChatGroupDetails(chatId, chatType);
  }
}

// Selected remove function
function removeSelected() {
  let selectedElements = document.querySelectorAll(".selected");

  selectedElements.forEach(function(element) {
    element.classList.remove("selected");
  });
}



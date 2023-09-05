import database from "./db.js";

import {
  onValue,
  ref,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

console.log(database);

import { userSelectId } from "./add_user_friends.js";

// getting the firebase database data

let currentChatData = [];

onValue(ref(database, `freshchat/`), (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    // Get the key and value of each child node
    const key = childSnapshot.key;

    const value = childSnapshot.val();

    let chatObject = {
      chatkey: key,
    };

    let chatAssign = Object.assign(value, chatObject);

    currentChatData.push(chatAssign);

    console.log(currentChatData);
  });
});

console.log(currentChatData);

// exporting the all the function to another function

// creating function to is the chat data is null return

export function checkChatData() {
  if (currentChatData == null) {
    return;
  }
}

// delete the all user chat before show the new chats

export function removeUserChats() {
  let chageChat = document.querySelectorAll(".chat-div-for-user");

  if (chageChat[0] != undefined) {
    for (let chatG of chageChat) {
      chatG.remove();
    }
  }
}

export function boostChat() {
  // checking the chats for to show the respective chat to respective person
  checkChatData();

  let unique = [];

  for (let firebaseData of currentChatData) {
    if (
      (firebaseData["chatterId"] == findUser["userId"] &&
        firebaseData["chatReceiverId"] == userSelectId) ||
      (firebaseData["chatReceiverId"] == findUser["userId"] &&
        firebaseData["chatterId"] == userSelectId)
    ) {
      unique.push(firebaseData);
    }
  }

  console.log(unique);

  let sender = unique.filter(
    (obj, index, self) =>
      index === self.findIndex((o) => o.chatkey === obj.chatkey)
  );

  console.log(sender);
  // adding read true to the all chats

  removeUserChats();

  // chat content element creation

  for (let senders of sender) {
    if (
      senders["chatReceiverId"] == userSelectId &&
      senders["chatterId"] == findUser["userId"]
    ) {
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

export function userSendChats(senders) {
  let chatDivUser = document.createElement("div");
  chatDivUser.setAttribute("class", "chat-div-for-user");

  let chatUserInsideDiv = document.createElement("div");
  chatUserInsideDiv.setAttribute("class", "chat-user-inside-div");
  chatUserInsideDiv.setAttribute("id", senders["chatkey"]);
  chatDivUser.append(chatUserInsideDiv);

  let chatDiv = document.createElement("div");
  chatDiv.setAttribute("class", "chat-div");
  chatUserInsideDiv.append(chatDiv);

  let chatInsideDiv = document.createElement("div");
  chatInsideDiv.setAttribute("class", "chat-inside-div");
  chatDiv.append(chatInsideDiv);

  let chatContentTimeDiv = document.createElement("div");
  chatContentTimeDiv.setAttribute("class", "chat-content-time-div");
  chatInsideDiv.append(chatContentTimeDiv);

  let chatContentTimeInsideDiv = document.createElement("div");
  chatContentTimeInsideDiv.setAttribute(
    "class",
    "chat-content-time-inside-div"
  );
  chatContentTimeDiv.append(chatContentTimeInsideDiv);

  let chatContentDiv = document.createElement("div");
  chatContentDiv.setAttribute("class", "chat-content-div");
  chatContentTimeInsideDiv.append(chatContentDiv);

  let chatContent = document.createElement("p");
  chatContent.setAttribute("class", "chat-content");
  chatContent.innerHTML = senders["chat"];
  chatContentDiv.append(chatContent);

  let chatTimeDiv = document.createElement("div");
  chatTimeDiv.setAttribute("class", "chat-time-div");
  chatContentTimeInsideDiv.append(chatTimeDiv);

  let timePara = document.createElement("p");
  timePara.setAttribute("class", "time-para");
  timePara.innerHTML = senders["chatTime"];
  chatTimeDiv.append(timePara);

  let userProfileDiv = document.createElement("div");
  userProfileDiv.setAttribute("class", "user-profile-div");
  chatInsideDiv.append(userProfileDiv);

  let usrImage = document.createElement("img");
  usrImage.setAttribute("alt", "chat-image");
  usrImage.setAttribute("class", "chatter-image");
  usrImage.setAttribute("src", findUser["avatarUrl"]);
  userProfileDiv.append(usrImage);

  // chat update and delete option element

  let div = document.createElement("div");
  div.setAttribute("class", "update-delete-option-div");
  div.setAttribute("id", senders["chatkey"]);
  chatContentTimeDiv.prepend(div);

  let editOptionInsideDiv = document.createElement("div");
  editOptionInsideDiv.setAttribute("class", "edit-option-inside-div");
  div.append(editOptionInsideDiv);

  let chatEditdiv = document.createElement("div");
  chatEditdiv.setAttribute("class", "edit-option-div");
  chatEditdiv.setAttribute("id", senders["chatId"]);
  editOptionInsideDiv.append(chatEditdiv);

  let editFa = document.createElement("i");
  editFa.setAttribute("class", "bi bi-pencil-square");
  editFa.setAttribute("id", senders["chatkey"]);
  chatEditdiv.append(editFa);

  let deleteFa = document.createElement("i");
  deleteFa.setAttribute("class", "bi bi-trash");
  deleteFa.setAttribute("id", senders["chatkey"]);
  chatEditdiv.append(deleteFa);

  document.querySelector(".right-side-container").append(chatDivUser);
}

// friends chat function creation

export function friendChatCreation(senders) {
  let chatDivUser = document.createElement("div");
  chatDivUser.setAttribute("class", "chat-div-for-user");

  let chatUserInsideDiv = document.createElement("div");
  chatUserInsideDiv.setAttribute("class", "chat-friends-inside-div");
  chatDivUser.append(chatUserInsideDiv);

  let chatDiv = document.createElement("div");
  chatDiv.setAttribute("class", "chat-div");
  chatUserInsideDiv.append(chatDiv);

  let chatInsideDiv = document.createElement("div");
  chatInsideDiv.setAttribute("class", "chat-inside-div");
  chatDiv.append(chatInsideDiv);

  let userProfileDiv = document.createElement("div");
  userProfileDiv.setAttribute("class", "user-profile-div");
  chatInsideDiv.append(userProfileDiv);

  let usrImage = document.createElement("img");
  usrImage.setAttribute("alt", "chat-image");
  usrImage.setAttribute("class", "chatter-image");
  usrImage.setAttribute("src", senders["chatSenderImage"]);
  userProfileDiv.append(usrImage);

  let chatContentTimeDiv = document.createElement("div");
  chatContentTimeDiv.setAttribute("class", "chat-content-time-div");
  chatInsideDiv.append(chatContentTimeDiv);

  let chatContentTimeInsideDiv = document.createElement("div");
  chatContentTimeInsideDiv.setAttribute(
    "class",
    "chat-content-time-inside-div"
  );
  chatContentTimeDiv.append(chatContentTimeInsideDiv);

  let chatContentDiv = document.createElement("div");
  chatContentDiv.setAttribute("class", "chat-content-div");
  chatContentTimeInsideDiv.append(chatContentDiv);

  let chatContent = document.createElement("p");
  chatContent.setAttribute("class", "chat-content");
  chatContent.innerHTML = senders["chat"];
  chatContentDiv.append(chatContent);

  let chatTimeDiv = document.createElement("div");
  chatTimeDiv.setAttribute("class", "chat-time-div");
  chatContentTimeInsideDiv.append(chatTimeDiv);

  let timePara = document.createElement("p");
  timePara.setAttribute("class", "time-para");
  timePara.innerHTML = senders["chatTime"];
  chatTimeDiv.append(timePara);

  document.querySelector(".right-side-container").append(chatDivUser);
}

// Here creating a function to say go the bottom

export function goToBottom() {
  let chatContainer = document.querySelector(".right-side-container");
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

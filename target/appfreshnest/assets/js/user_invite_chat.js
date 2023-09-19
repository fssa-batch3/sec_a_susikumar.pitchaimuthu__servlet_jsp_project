// user friends showing div container

function inviteChatNotification(noti) {
  try {
    console.log(noti);

    let inviteNotificationArr = [];

    if (localStorage.getItem("inviteNotificationData") !== null) {
      inviteNotificationArr = JSON.parse(
        localStorage.getItem("inviteNotificationData")
      );
    }

    let findCurrentUser = JSON.parse(localStorage.getItem("userInvites"));

    let findObjectInvites = findCurrentUser.find(
      (inviteObj) => inviteObj["inviteId"] == noti
    );
    console.log(findObjectInvites);

    let inviteChat = document.getElementById("invite-reply-input").value;

    let inviteNotiId = Date.now();
    let inviteTime = moment().format("LT");
    let inviteDate = moment().format("L");
    let invite_person_url = findUser["avatarUrl"];
    let notification_person = findUser["userName"];
    let inviter_id = findObjectInvites["inviterId"];
    let notificationer_id = findUser["userId"];
    let notification_file = findObjectInvites["inviteImage"];

    let inviteObject = {
      message: inviteChat,
      messageId: inviteNotiId,
      messageTime: inviteTime,
      messageDate: inviteDate,
      messager: notification_person,
      message_person_url: invite_person_url,
      messager_id: notificationer_id,
      message_receiver_id: inviter_id,
      notification_file,
      purpose: "invite-chat",
      isRead: false,
    };

    console.log(inviteObject);
    inviteNotificationArr.push(inviteObject);

    document.querySelector("#invite-reply-input").value = "";

    localStorage.setItem(
      "otherNotification",
      JSON.stringify(inviteNotificationArr)
    );
  } catch (error) {
    console.log("An error occurred while setting the invite chat :", error);
  }
}

// invite reation showing function

let inviteDatas = JSON.parse(localStorage.getItem("userInvites"));
console.log(inviteDatas);

// heart function

function likeHeart(e) {
  try {
    console.log(e);

    let findInvite = inviteDatas.find((end) => end["inviteId"] == e);
    console.log(findInvite);

    let LikeIndex = inviteDatas.indexOf(findInvite);
    console.log(LikeIndex);

    let likeButton = document.querySelector(".heart-div").firstChild;
    console.log(likeButton);

    let buttonValue = likeButton.classList["value"];

    if (buttonValue == "bi bi-heart") {
      likeButton.remove("bi bi-heart");

      let likeFill = document.createElement("i");
      likeFill.setAttribute("class", "bi bi-heart-fill");
      document.querySelector(".heart-div").append(likeFill);

      let heartArray = findInvite["inviteHeart"];
      console.log(heartArray);

      heartArray.push(findUser["userId"]);

      localStorage.setItem("userInvites", JSON.stringify(inviteDatas));
      return;
    } else {
      likeButton.remove("bi bi-heart-fill");

      let likeFill = document.createElement("i");
      likeFill.setAttribute("class", "bi bi-heart");
      document.querySelector(".heart-div").append(likeFill);

      let heartIndex;

      for (let inivteHearts of findInvite["inviteHeart"]) {
        if (inivteHearts == findUser["userId"]) {
          heartIndex = findInvite["inviteHeart"].indexOf(inivteHearts);
        }
      }
      console.log(heartIndex);

      findInvite["inviteHeart"].splice(heartIndex);

      localStorage.setItem("userInvites", JSON.stringify(inviteDatas));
    }
  } catch (error) {
    console.log("An error occurred while adding the like :", error);
  }
}

// thumbs up function

function thumbsUp(e) {
  try {
    let findInvite = inviteDatas.find((end) => end["inviteId"] == e);
    console.log(findInvite);

    let LikeIndex = inviteDatas.indexOf(findInvite);
    console.log(LikeIndex);
    // Here thumbsUpfill already there remove that

    let thumbsDownFill = document.querySelector(".sorry-div").firstChild;

    let fillValue = thumbsDownFill.classList["value"];

    if (fillValue == "bi bi-hand-thumbs-down-fill") {
      thumbsDownFill.remove("bi bi-hand-thumbs-down-fill");

      // instead of that element adding normal element

      let sorryFill = document.createElement("i");
      sorryFill.setAttribute("class", "bi bi-hand-thumbs-down");
      document.querySelector(".sorry-div").append(sorryFill);
      let dislikeIndex;

      for (let invNos of findInvite["inviteNo"]) {
        if (invNos == findUser["userId"]) {
          dislikeIndex = findInvite["inviteNo"].indexOf(invNos);
        }
      }

      findInvite["inviteNo"].splice(dislikeIndex);

      localStorage.setItem("userInvites", JSON.stringify(inviteDatas));
    }

    //  creating a function to add and delete count fo the invite

    console.log(e);

    let okButton = document.querySelector(".ok-div").firstChild;

    let okValue = okButton.classList["value"];

    if (okValue == "bi bi-hand-thumbs-up") {
      okButton.remove(" bi bi-hand-thumbs-up");

      let likeFill = document.createElement("i");
      likeFill.setAttribute("class", "bi bi-hand-thumbs-up-fill");
      document.querySelector(".ok-div").append(likeFill);

      let likeArray = findInvite["inviteLike"];

      likeArray.push(findUser["userId"]);

      localStorage.setItem("userInvites", JSON.stringify(inviteDatas));
    } else {
      okButton.remove(" bi bi-hand-thumbs-up-fill");

      let likeFill = document.createElement("i");
      likeFill.setAttribute("class", "bi bi-hand-thumbs-up");
      document.querySelector(".ok-div").append(likeFill);

      let thumbsUpIndex;

      for (let invLikes of findInvite["inviteLike"]) {
        if (invLikes == findUser["userId"]) {
          thumbsUpIndex = findInvite["inviteLike"].indexOf(invLikes);
        }
      }

      console.log(thumbsUpIndex);

      findInvite["inviteLike"].splice(thumbsUpIndex);

      localStorage.setItem("userInvites", JSON.stringify(inviteDatas));
    }
  } catch (error) {
    console.log("An error occurred while the thumbsUp :", error);
  }
}

// thumbs down function

function thumbsDown(e) {
  try {
    let findInvite = inviteDatas.find((end) => end["inviteId"] == e);
    console.log(findInvite);

    let LikeIndex = inviteDatas.indexOf(findInvite);
    console.log(LikeIndex);
    // Here thumbsUpfill already there remove that

    let thumbsFill = document.querySelector(".ok-div").firstChild;

    let fillValue = thumbsFill.classList["value"];

    if (fillValue == "bi bi-hand-thumbs-up-fill") {
      thumbsFill.remove("bi bi-hand-thumbs-up-fill");

      // instead of that element adding normal element

      let likeFill = document.createElement("i");
      likeFill.setAttribute("class", "bi bi-hand-thumbs-up");
      document.querySelector(".ok-div").append(likeFill);

      let thumbsUpIndex;

      for (let i = 0; i < findInvite["inviteLike"].length; i++) {
        if (findInvite["inviteLike"][i] == findUser["userId"]) {
          thumbsUpIndex = findInvite["inviteLike"].indexOf(
            findInvite["inviteLike"][i]
          );
        }
      }

      console.log(thumbsUpIndex);

      findInvite["inviteLike"].splice(thumbsUpIndex);

      localStorage.setItem("userInvites", JSON.stringify(inviteDatas));
    }

    //  creating a function to add and delete count fo the invite
    console.log(e);

    let thumbsDownElement = document.querySelector(".sorry-div").firstChild;

    let sorryValue = thumbsDownElement.classList["value"];

    if (sorryValue == "bi bi-hand-thumbs-down") {
      thumbsDownElement.remove("bi bi-hand-thumbs-down");

      let likeFill = document.createElement("i");
      likeFill.setAttribute("class", "bi bi-hand-thumbs-down-fill");
      document.querySelector(".sorry-div").append(likeFill);

      let dislikeArray = findInvite["inviteNo"];

      dislikeArray.push(findUser["userId"]);

      localStorage.setItem("userInvites", JSON.stringify(inviteDatas));
    } else {
      thumbsDownElement.remove("bi bi-hand-thumbs-down-fill");

      let likeFill = document.createElement("i");
      likeFill.setAttribute("class", "bi bi-hand-thumbs-down");
      document.querySelector(".sorry-div").append(likeFill);

      let dislikeIndex;

      for (let noInivte of findInvite["inviteNo"]) {
        if (noInivte == findUser["userId"]) {
          dislikeIndex = findInvite["inviteNo"].indexOf(noInivte);
        }
      }

      findInvite["inviteNo"].splice(dislikeIndex);

      localStorage.setItem("userInvites", JSON.stringify(inviteDatas));
    }
  } catch (error) {
    console.log("An error occured while thumbs down :", error);
  }
}

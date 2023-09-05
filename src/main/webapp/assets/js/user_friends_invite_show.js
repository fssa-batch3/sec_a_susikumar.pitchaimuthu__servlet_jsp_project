// chack the invite id
let presentInvId;

let inviteBackgroundImageDiv = document.createElement("div");
inviteBackgroundImageDiv.setAttribute("class", "invite-background-image-div");
inviteBackgroundImageDiv.innerHTML = `<div class="ivnite-background-image-inside-div">
  <img
    class="invite-background-image"
    src="../assets/images/Birhday ballons/invite background imge.jpg"
    alt="invite-background-image"
  />
</div>`;

document
  .querySelector(".invite-details-showing-container")
  .append(inviteBackgroundImageDiv);

// creating funciton remove the all card before pushing

// deleting the background card

function removeBackground() {
  let backgroundImage = document.querySelector(".invite-background-image-div");

  if (backgroundImage != null) {
    backgroundImage.remove();
  }
}

function reomoveInvite() {
  // deleting the card
  let all = document.querySelector(".invite-inside-details-div-container");

  if (all != null) {
    document.querySelector(".invite-inside-details-div-container").remove();
  }
}

let findPresentInvite;
function showInvite(invId) {
  try {
    presentInvId = invId;
    // checking invite to know whose invite is this...

    findPresentInvite = friendsInvitesData.find(
      (preInv) => preInv["inviteId"] == presentInvId
    );
    console.log(findPresentInvite);

    let userLike = false;

    for (let invLike of findPresentInvite["inviteLike"]) {
      if (invLike == findUser["userId"]) {
        userLike = true;
      }
    }

    let userDislike = false;
    for (let inviteNo of findPresentInvite["inviteNo"]) {
      if (inviteNo == findUser["userId"]) {
        userDislike = true;
      }
    }

    let userHeart = false;
    for (let invHeart of findPresentInvite["inviteHeart"]) {
      if (invHeart == findUser["userId"]) {
        userHeart = true;
      }
    }

    // invite type showing container

    removeBackground();

    reomoveInvite();

    // element creation

    let inviteShowingContainer = document.createElement("div");
    inviteShowingContainer.setAttribute(
      "class",
      "invite-inside-details-div-container"
    );

    document
      .querySelector(".invite-details-showing-container")
      .append(inviteShowingContainer);

    let inviteDetailsShowInsideDiv = document.createElement("div");
    inviteDetailsShowInsideDiv.setAttribute(
      "class",
      "invite-details-showing-inside-div"
    );

    inviteShowingContainer.append(inviteDetailsShowInsideDiv);

    let inviteImage = document.createElement("img");
    inviteImage.setAttribute("class", "invite-images");
    inviteImage.setAttribute("src", findPresentInvite["inviteImage"]);
    inviteDetailsShowInsideDiv.append(inviteImage);

    // invite option like and comment option

    let likeCommentOptionDivContainer = document.createElement("div");
    likeCommentOptionDivContainer.setAttribute(
      "class",
      "like-comment-option-whole-div-container"
    );

    inviteShowingContainer.append(likeCommentOptionDivContainer);

    let inviteDetailsContentContainer = document.createElement("div");
    inviteDetailsContentContainer.setAttribute(
      "class",
      "invite-details-content-container"
    );
    likeCommentOptionDivContainer.append(inviteDetailsContentContainer);

    let inviteDetailsInsideContentDiv = document.createElement("div");
    inviteDetailsInsideContentDiv.setAttribute(
      "class",
      "invite-details-inside-content-div"
    );
    inviteDetailsContentContainer.append(inviteDetailsInsideContentDiv);

    let burgerDiv = document.createElement("div");
    burgerDiv.setAttribute("class", "invite-burger-div");
    burgerDiv.setAttribute("onclick", "showInviteEra()");
    inviteDetailsInsideContentDiv.append(burgerDiv);

    let burgerIcon = document.createElement("i");
    burgerIcon.setAttribute("class", "bi bi-list");
    burgerDiv.append(burgerIcon);

    let inviteContentContainer = document.createElement("div");
    inviteContentContainer.setAttribute("class", "invite-content-container");
    inviteContentContainer.setAttribute("style", "display:none;");
    inviteDetailsInsideContentDiv.append(inviteContentContainer);

    let inviteContentInsideContainer = document.createElement("div");
    inviteContentInsideContainer.setAttribute(
      "class",
      "invite-content-inside-container"
    );
    inviteContentContainer.append(inviteContentInsideContainer);

    let inviteContentInsideDiv = document.createElement("div");
    inviteContentInsideDiv.setAttribute("class", "invite-content-inside-div");
    inviteContentInsideContainer.append(inviteContentInsideDiv);

    let inviteGlimpseDiv = document.createElement("div");
    inviteGlimpseDiv.setAttribute("class", "invite-glimpse-div");
    inviteContentInsideDiv.append(inviteGlimpseDiv);

    let glimpseHead = document.createElement("h4");
    glimpseHead.setAttribute("class", "glimpse-head");
    glimpseHead.innerHTML = "Invite Glimpse";
    inviteGlimpseDiv.append(glimpseHead);

    let glimpsePara = document.createElement("p");
    glimpsePara.setAttribute("class", "glipse-para");
    glimpsePara.innerHTML = findPresentInvite["inviteGlimpse"];
    inviteGlimpseDiv.append(glimpsePara);

    let eraDiv = document.createElement("era-div");
    eraDiv.setAttribute("class", "era-div");
    inviteContentInsideDiv.append(eraDiv);

    let eraHead = document.createElement("h4");
    eraHead.setAttribute("class", "era-head");
    eraHead.innerHTML = "Invite Explanation";
    eraDiv.append(eraHead);

    let eraPara = document.createElement("p");
    eraPara.setAttribute("class", "era-para");
    eraPara.innerHTML = findPresentInvite["inviteExplanation"];
    eraDiv.append(eraPara);

    let commentAndInputAreaContainer = document.createElement("div");
    commentAndInputAreaContainer.setAttribute(
      "class",
      "comment-and-input-area-container"
    );
    likeCommentOptionDivContainer.append(commentAndInputAreaContainer);

    let likeCommentDivContainer = document.createElement("div");
    likeCommentDivContainer.setAttribute("class", "like-comment-div-container");
    commentAndInputAreaContainer.append(likeCommentDivContainer);

    let likeCommentInsideDiv = document.createElement("div");
    likeCommentInsideDiv.setAttribute("class", "like-comment-inside-div");
    likeCommentDivContainer.append(likeCommentInsideDiv);

    let heartDiv = document.createElement("div");
    heartDiv.setAttribute("class", "heart-div");
    heartDiv.setAttribute("id", findPresentInvite["inviteId"]);
    heartDiv.setAttribute("onclick", "likeHeart(this.id)");
    likeCommentInsideDiv.append(heartDiv);

    console.log(findPresentInvite["inviteLike"].length);

    if (userHeart == true) {
      let heartI = document.createElement("i");
      heartI.setAttribute("class", "bi bi-heart-fill");
      heartDiv.append(heartI);
    } else {
      let heartSecond = document.createElement("i");
      heartSecond.setAttribute("class", "bi bi-heart");
      heartDiv.append(heartSecond);
    }

    let okDiv = document.createElement("div");
    okDiv.setAttribute("class", "ok-div");
    okDiv.setAttribute("id", findPresentInvite["inviteId"]);
    okDiv.setAttribute("onclick", "thumbsUp(this.id)");
    likeCommentInsideDiv.append(okDiv);

    if (userLike == true) {
      let okI = document.createElement("i");
      okI.setAttribute("class", "bi bi-hand-thumbs-up-fill");
      okDiv.append(okI);
    } else {
      let okISecond = document.createElement("i");
      okISecond.setAttribute("class", "bi bi-hand-thumbs-up");
      okDiv.append(okISecond);
    }

    let sorryDiv = document.createElement("div");
    sorryDiv.setAttribute("class", "sorry-div");
    sorryDiv.setAttribute("id", findPresentInvite["inviteId"]);
    sorryDiv.setAttribute("onclick", "thumbsDown(this.id)");
    likeCommentInsideDiv.append(sorryDiv);

    if (userDislike == true) {
      let sorryI = document.createElement("i");
      sorryI.setAttribute("class", "bi bi-hand-thumbs-down-fill");
      sorryDiv.append(sorryI);
    } else {
      let sorryI = document.createElement("i");
      sorryI.setAttribute("class", "bi bi-hand-thumbs-down");
      sorryDiv.append(sorryI);
    }

    // user profile and chat input feild creation

    let inviteprofileNameDivContainer = document.createElement("div");
    inviteprofileNameDivContainer.setAttribute(
      "class",
      "invite-profile-name-div-container"
    );
    commentAndInputAreaContainer.append(inviteprofileNameDivContainer);

    let inviteProfileNameInsideDiv = document.createElement("div");
    inviteProfileNameInsideDiv.setAttribute(
      "class",
      "invite-profile-name-inside-div"
    );
    inviteprofileNameDivContainer.append(inviteProfileNameInsideDiv);

    let inviterUserProfileDiv = document.createElement("div");
    inviterUserProfileDiv.setAttribute("class", "inviter-user-profile-div");
    inviteProfileNameInsideDiv.append(inviterUserProfileDiv);

    const arrayBuffer = findPresentInvite["inviterImage"];

    // Get the first two bytes of the binary data

    let videofile = false;
    let imagefile = false;

    if (arrayBuffer.includes("image")) {
      imagefile = true;
    } else {
      videofile = true;
    }

    if (imagefile == true) {
      let inviterImage = document.createElement("img");
      inviterImage.setAttribute("class", "inviter-image");
      inviterImage.setAttribute("src", findPresentInvite["inviterImage"]);
      inviterImage.setAttribute("alt", "invite-user-image");
      inviterUserProfileDiv.append(inviterImage);
    } else {
      let video = document.createElement("video");
      video.setAttribute("class", "invite-video-element");
      inviterUserProfileDiv.append(video);

      let videoSource = document.createElement("source");
      videoSource.setAttribute("src", findPresentInvite["inviteImage"]);
      videoSource.setAttribute("class", "invite-video");
    }

    let inviteMessageEmojiReplyDiv = document.createElement("div");
    inviteMessageEmojiReplyDiv.setAttribute(
      "class",
      "invite-message-emoji-reply-div"
    );
    inviteProfileNameInsideDiv.append(inviteMessageEmojiReplyDiv);

    let inputEmojiDivContainer = document.createElement("div");
    inputEmojiDivContainer.setAttribute("class", "input-emoji-div-container");
    inviteMessageEmojiReplyDiv.append(inputEmojiDivContainer);

    let inviteReplyEmojiInsideDiv = document.createElement("div");
    inviteReplyEmojiInsideDiv.setAttribute(
      "class",
      "invite-reply-emoji-inside-div"
    );
    inviteReplyEmojiInsideDiv.setAttribute("style", "display:none;");
    inputEmojiDivContainer.append(inviteReplyEmojiInsideDiv);

    let inviteReplyInput = document.createElement("input");
    inviteReplyInput.setAttribute("id", "invite-reply-input");
    inviteReplyEmojiInsideDiv.append(inviteReplyInput);

    let emojiI = document.createElement("i");
    emojiI.setAttribute("class", "bi bi-emoji-heart-eyes");
    inviteReplyEmojiInsideDiv.append(emojiI);

    let sendArrowI = document.createElement("i");
    sendArrowI.setAttribute("class", "bi bi-arrow-up-right-circle");
    sendArrowI.setAttribute("id", findPresentInvite["inviteId"]);
    sendArrowI.setAttribute("onclick", "inviteChatNotification(this.id)");
    inviteReplyEmojiInsideDiv.append(sendArrowI);

    let keyboardDiv = document.createElement("div");
    keyboardDiv.setAttribute("class", "keyboard-div");
    keyboardDiv.setAttribute("id", findPresentInvite["inviteId"]);
    inviteMessageEmojiReplyDiv.append(keyboardDiv);

    let keyboardI = document.createElement("i");
    keyboardI.setAttribute("class", "bi bi-keyboard");
    keyboardDiv.append(keyboardI);

    let keyboard = document.querySelector(".keyboard-div");
    console.log(keyboard);

    keyboard.addEventListener("click", () => {
      let inputEmojiDiv = document.querySelector(
        ".invite-reply-emoji-inside-div"
      );

      if (inputEmojiDiv.style.display === "none") {
        inputEmojiDiv.style.display = "block";
      } else {
        inputEmojiDiv.style.display = "none";
      }
    });
  } catch (error) {
    console.log("An error occured while show the user invite :", error);
  }
}

// creating a function to show the details of the invite

function showInviteEra() {
  try {
    let ivniteDetailsCard = document.querySelector(".invite-content-container");

    if (ivniteDetailsCard.style.display === "none") {
      ivniteDetailsCard.style.display = "block";
    } else {
      ivniteDetailsCard.style.display = "none";
    }
  } catch (error) {
    console.log("An error occurred while the invite era function :", error);
  }
}

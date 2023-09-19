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

function showInvite(userInvite) {
  try {
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
    inviteImage.setAttribute("src", userInvite["inviteDetail"]["inviteImage"]);
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
    glimpsePara.innerHTML = userInvite["inviteDetail"]["inviteGlimpse"];
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
    eraPara.innerHTML = userInvite["inviteDetail"]["inviteExplanation"];
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
    heartDiv.setAttribute("id", userInvite.inviteDetail.inviteId);
    heartDiv.addEventListener("click", () => {
    let inviteId = heartDiv.id; 
    let value = checkLikeValue();
    inviteLikeFunction(value, inviteId);
});

likeCommentInsideDiv.append(heartDiv);


    if (userInvite["userInviteReactionDetail"]["like"] == true) {
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
    okDiv.setAttribute("id", userInvite["inviteId"]);
    okDiv.addEventListener("click", ()=> {
		let inviteId = okDiv.id;
		let value = getSendRequestValue();
		inviteRequestSendFunction(value, inviteId);
	})
    likeCommentInsideDiv.append(okDiv);

    if (userInvite["userInviteReactionDetail"]["sendRequest"] == true) {
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
    sorryDiv.setAttribute("id", userInvite["inviteDetail"]["inviteId"]);
    sorryDiv.addEventListener("click", ()=> {
		let inviteId = sorryDiv.id;
		let value = getInviteRejectValue();
		inviteRejectFunction(value, inviteId);
	})
    likeCommentInsideDiv.append(sorryDiv);

    if (userInvite["userInviteReactionDetail"]["reject"] == true) {
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
    sendArrowI.setAttribute("id", userInvite["inviteDetail"]["inviteId"]);
    sendArrowI.setAttribute("onclick", "inviteChatNotification(this.id)");
    inviteReplyEmojiInsideDiv.append(sendArrowI);

    let keyboardDiv = document.createElement("div");
    keyboardDiv.setAttribute("class", "keyboard-div");
    keyboardDiv.setAttribute("id", userInvite["inviteDetail"]["inviteId"]);
    inviteMessageEmojiReplyDiv.append(keyboardDiv);

    let keyboardI = document.createElement("i");
    keyboardI.setAttribute("class", "bi bi-keyboard");
    keyboardI.addEventListener("click", () => {
		showKeyboard();
	})
    keyboardDiv.append(keyboardI);

  } catch (error) {
    console.log("An error occured while show the user invite :", error);
  }
}


// Check like value
let currentLike; 
function checkLikeValue(){
	   let likeButton = document.querySelector(".heart-div").firstChild;
    console.log(likeButton);

    let buttonValue = likeButton.classList["value"];
    
    if(buttonValue == "bi bi-heart"){
		currentLike = true;
		return true;
	}else {
		currentLike = false;
	    return false;
	}
}

// Check the invite request value
let inviteRequestValue;
function getSendRequestValue(){
	let thumbsDownFill = document.querySelector(".sorry-div").firstChild;

    let fillValue = thumbsDownFill.classList["value"];
    
    if(fillValue == "bi bi-hand-thumbs-up"){
		inviteRequestValue = true;
		return true;
	}else {
		inviteRequestValue = false;
		return false;
	}
}


// Check the invite reject value
let inviteRejectValue;
function getInviteRejectValue(){
	 let thumbsDownFill = document.querySelector(".sorry-div").firstChild;

    let fillValue = thumbsDownFill.classList["value"];
    
       if (fillValue == "bi bi-hand-thumbs-down") {
		   inviteRejectValue = true;
		   return true;
		}else {
		   inviteRejectValue = false;
		   return false;
		}
	
}


// Keyboard enable function

function showKeyboard(){
      let inputEmojiDiv = document.querySelector(
        ".invite-reply-emoji-inside-div"
      );

      if (inputEmojiDiv.style.display === "none") {
        inputEmojiDiv.style.display = "block";
      } else {
        inputEmojiDiv.style.display = "none";
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


// Invite like function

function inviteLikeFunction(value, inviteId){	
const url = "/appfreshnest/InviteLikeServlet?inviteId=" + encodeURIComponent(inviteId) +
            "&value=" + encodeURIComponent(value);
            
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    let serverLikeResponse = response.data;
			    console.log(serverLikeResponse);
			    if(serverLikeResponse === "success"){
					
					let innerLikeButton = document.querySelector(".heart-div").firstChild;

					if(currentLike == true){
                        innerLikeButton.remove("bi bi-heart");

                        let likeFill = document.createElement("i");
                        likeFill.setAttribute("class", "bi bi-heart-fill");
                        document.querySelector(".heart-div").append(likeFill);						
					}else {
						innerLikeButton.remove("bi bi-heart-fill");

                        let likeFill = document.createElement("i");
                        likeFill.setAttribute("class", "bi bi-heart");
                        document.querySelector(".heart-div").append(likeFill);
						
					}
				}   
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
	       })
	
}


// Invite reject function
function inviteRejectFunction(value ,inviteId){
	
	const url = "/appfreshnest/InviteSendRejectResponseServlet?inviteId=" + encodeURIComponent(inviteId) +
            "&value=" + encodeURIComponent(value);
            
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    let serverLikeResponse = response.data;
			    console.log(serverLikeResponse);
			    if(serverLikeResponse === "success"){
					
				}			    
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
	  })
	
}

// Invite request send function
function inviteRequestSendFunction(value ,inviteId){
	const url = "/appfreshnest/InviteSendRequestServlet?inviteId=" + encodeURIComponent(inviteId) +
            "&value=" + encodeURIComponent(value);
            
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    let serverLikeResponse = response.data;
			    console.log(serverLikeResponse);
			    if(serverLikeResponse === "success"){
					
				}
			    	    
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
	  })
            
            
}


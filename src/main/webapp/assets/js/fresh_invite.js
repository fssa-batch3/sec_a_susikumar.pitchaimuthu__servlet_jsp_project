
// Her user invite showing function creating
let GetInviteDetails;
let thisUserInvite;
	
 function getAllUserInvites() {
			const url = "/appfreshnest/InvitePage";
			axios.get(url)
			  .then(function (response) {
			    console.log(response.data);
			    thisUserInvite = response.data;
			    
			// Here elements creating according to the invites

               if (thisUserInvite == null || thisUserInvite.length == 0) {
                  noUserInvite();
                } else {
                   for (let userInvite of thisUserInvite) {
                   profileUserInvite(userInvite);
                  }
                }
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
		}
		
  
  getAllUserInvites();
// Here creating a function to add a user invite

function noUserInvite() {
  let addInivitationPopupDiv = document.createElement("div");

  addInivitationPopupDiv.setAttribute("class", "add-invitation-popup-div");
  addInivitationPopupDiv.innerHTML = `
  <div class="invitation-showing-inside-area">
  <div class="add-invite-popup-inside-div">
    <div class="buff-div">
      <img
        class="gifs"
        src="../assets/images/Birhday ballons/red buff.png"
        alt="rd-buff"
      />
      <p>You didn't declare any invitation</p>
      <img
        class="gifs"
        src="../assets/images/Birhday ballons/green buff.png"
        alt="rd-buff"
      />
      <p>announce use this</p>
      <img
        class="gifs"
        src="../assets/images/Birhday ballons/silent.gif"
        alt="silent-gif"
      />
    </div>
  </div>
</div>
  `;

  document
    .querySelector(".invitation-showing-area-container")
    .append(addInivitationPopupDiv);
}

// invite is there create this element

function profileUserInvite(userInvite) {
  //   update option

  let anger = document.createElement("a");
  anger.setAttribute("class", "card-anger");
  anger.setAttribute(
    "href",
    "./invite_card.html?inviteId=" +
      userInvite["inviteId"]
  );

  let userInviteBox = document.createElement("div");
  userInviteBox.setAttribute("class", "user-invite-box-container");
  anger.append(userInviteBox);

  let userInviteDiv = document.createElement("div");
  userInviteDiv.setAttribute("class", "user-invite-div");
  userInviteBox.append(userInviteDiv);

  let inviteImageContentDiv = document.createElement("div");
  inviteImageContentDiv.setAttribute("class", "invite-image-content-container");
  userInviteDiv.append(inviteImageContentDiv);

  let inviteImageDiv = document.createElement("div");
  inviteImageDiv.setAttribute("class", "invite-image-div");
  inviteImageContentDiv.append(inviteImageDiv);

  let inviteImage = document.createElement("img");
  inviteImage.setAttribute("class", "invite-image");
  inviteImage.setAttribute("src", userInvite["inviteImage"]);
  inviteImageDiv.append(inviteImage);

  let inviteNameContentDiv = document.createElement("div");
  inviteNameContentDiv.setAttribute("class", "invite-name-content-div");
  inviteImageContentDiv.append(inviteNameContentDiv);

  let inviteH3 = document.createElement("h3");
  inviteH3.setAttribute("class", "invite-h3");
  inviteH3.innerHTML = userInvite["inviteType"];
  inviteNameContentDiv.append(inviteH3);

  let invitePara = document.createElement("p");
  invitePara.setAttribute("class", "invite-para");
  invitePara.innerHTML = userInvite["inviteSlogan"];
  inviteNameContentDiv.append(invitePara);

  // reciever div container

  let receiverEmojiContainer = document.createElement("div");
  receiverEmojiContainer.setAttribute(
    "class",
    "receivers-notification-emoji-container"
  );
  userInviteDiv.append(receiverEmojiContainer);

  let receiverDiv = document.createElement("div");
  receiverDiv.setAttribute("class", "receivers-div");
  receiverEmojiContainer.append(receiverDiv);

  let receiverPara = document.createElement("h3");
  receiverPara.setAttribute("class", "receiver-name");
  receiverPara.innerHTML = "Count";
  receiverDiv.append(receiverPara);

 

  let okPercentageDiv = document.createElement("div");
  okPercentageDiv.setAttribute("class", "ok-percentage-div");
  okPercentageDiv.setAttribute("data-percent", 23);
  receiverEmojiContainer.append(okPercentageDiv);

  let okPercentageInsideDiv = document.createElement("div");
  okPercentageInsideDiv.setAttribute("class", "ok-percentage-inside-div");
  okPercentageDiv.append(okPercentageInsideDiv);

  let okPercentageI = document.createElement("i");
  okPercentageI.setAttribute("class", "bi bi-hand-thumbs-up ok-i");
  okPercentageInsideDiv.append(okPercentageI);

  let okPercentagep = document.createElement("p");
  okPercentagep.setAttribute("class", "ok-percentage-p");
  okPercentagep.innerHTML = 45 + "%";
  okPercentageInsideDiv.append(okPercentagep);

  
  let noPercentageDiv = document.createElement("div");
  noPercentageDiv.setAttribute("class", "no-percentage-div");
  noPercentageDiv.setAttribute("data-percent", 45);
  receiverEmojiContainer.append(noPercentageDiv);

  let noPercentageInsideDiv = document.createElement("div");
  noPercentageInsideDiv.setAttribute("class", "no-percentage-inside-div");
  noPercentageDiv.append(noPercentageInsideDiv);

  let noPercentageI = document.createElement("i");
  noPercentageI.setAttribute("class", "bi bi-hand-thumbs-down no-i");
  noPercentageInsideDiv.append(noPercentageI);

  let noPercentageP = document.createElement("p");
  noPercentageP.innerHTML = 34 + "%";
  noPercentageP.setAttribute("class", "no-percentage-p");
  noPercentageInsideDiv.append(noPercentageP);

  document.querySelector(".invitation-showing-area-container").append(anger);
  
  
  
   addPercentagetGraph();
}

function addPercentagetGraph(){
	// Gettig the percentage elements

		let okDiv = document.querySelector(".ok-percentage-div");
		let noDiv = document.querySelector(".no-percentage-div");

		try {
			new EasyPieChart(okDiv, {
				barColor : "#A2D2FF",
				lineWidth : 11,
				lineCap : "circle",
				size : 85,
			});

			new EasyPieChart(noDiv, {
				barColor : "#FFAE42",
				lineWidth : 11,
				lineCap : "circle",
				size : 85,
			});
		} catch (error) {
			console.log("An error occured while creating chart for the user inivite :",	error);
		}
}

// Gets the add invite page redirection button element

let addInviteButton = document.querySelector(".invite-adding-div-container");

addInviteButton.addEventListener("click", () => {
  window.location.href = "./add_invite_form.html";
});

// Get the invitation like count

function getInvitationLikeCount(){
	
	
}

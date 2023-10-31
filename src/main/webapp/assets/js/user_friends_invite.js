// dynamic card creation

 function getAllUserFriendsInvites() {
	
			const url = "/appfreshnest/GetAllOtherUserInvites";
			axios.get(url)
			  .then(function (response) {
			    console.log(response.data);
			  let  friendsInvites = response.data;
			    
			// Here elements creating according to the invites

               if (friendsInvites == null || friendsInvites.length == 0) {
                  noUserFriendsInvite();
                } else {
                   showUserFrindsInvite(friendsInvites);
                  
                }
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
		}

  getAllUserFriendsInvites();


// If invites are empty create element

function noUserFriendsInvite() {
  let noInivteDivContainer = document.createElement("div");
  noInivteDivContainer.setAttribute("class", "no-invite-div-container");
  noInivteDivContainer.innerHTML = ` <div class="no-invite-inside-div">
  <div class="anime-image-div">
    <img
      class="invite-anime"
      src=""
      alt="gif-images"g
    />
  </div>

  <div class="content-div">
    <p class="anime-content">
      Your friends didn't send invitation. Wait until they send
      the invite
    </p>
  </div>
</div>`;

  document
    .querySelector(".friends-inside-invite-and-details-showing-container")
    .append(noInivteDivContainer);
}


function showUserFrindsInvite(friendsInvites) {
	
  for (let friendInv of friendsInvites) {
    let friendInviteContainer = document.createElement("div");
    friendInviteContainer.setAttribute(
      "class",
      "user-card-container" + " " + friendInv["inviteType"]
    );
    friendInviteContainer.setAttribute("id", friendInv["inviteId"]);
    friendInviteContainer.addEventListener("click", function() {
    let inviteId = this.id; 
    getInviteDetails(inviteId);
   });

    let friendInviteInsideContainer = document.createElement("div");
    friendInviteInsideContainer.setAttribute(
      "class",
      "friends-invite-inside-container"
    );
    friendInviteContainer.append(friendInviteInsideContainer);

    // invite name image showing container

    let pictureNameDivContainer = document.createElement("div");
    pictureNameDivContainer.setAttribute(
      "class",
      "picture-and-name-div-container"
    );
    friendInviteInsideContainer.append(pictureNameDivContainer);

    let friendInviteImageDiv = document.createElement("div");
    friendInviteImageDiv.setAttribute("class", "friends-invites-image-div");
    pictureNameDivContainer.append(friendInviteImageDiv);

    let friendsInviteImage = document.createElement("img");
    friendsInviteImage.setAttribute("class", "friends-invite-image");
    friendsInviteImage.setAttribute("src", friendInv["inviteImage"]);
    friendInviteImageDiv.append(friendsInviteImage);

    // inviting user name slogan

    let friendsPartyNameGlimpseDiv = document.createElement("div");
    friendsPartyNameGlimpseDiv.setAttribute(
      "class",
      "friends-party-name-glimpse-div"
    );
    pictureNameDivContainer.append(friendsPartyNameGlimpseDiv);

    let invitingUserNameH3 = document.createElement("h3");
    invitingUserNameH3.setAttribute("class", "inviting-user-name");
    invitingUserNameH3.innerHTML = friendInv["inviteType"];
    friendsPartyNameGlimpseDiv.append(invitingUserNameH3);

    let invitingGlimpsePara = document.createElement("p");
    invitingGlimpsePara.setAttribute("class", "invite-glimpse");
    invitingGlimpsePara.innerHTML = friendInv["inviteSlogan"];
    friendsPartyNameGlimpseDiv.append(invitingGlimpsePara);

    // invite name and time showing container

    let inviteAndTimgingDiv = document.createElement("div");
    inviteAndTimgingDiv.setAttribute("class", "invite-showing-div-container");
    friendInviteInsideContainer.append(inviteAndTimgingDiv);

    let inviteInsideDiv = document.createElement("div");
    inviteInsideDiv.setAttribute("class", "invite-inside-div");
    inviteAndTimgingDiv.append(inviteInsideDiv);

    // chatTiming

    let chatTimeDiv = document.createElement("div");
    chatTimeDiv.setAttribute("class", "chat-time-div");
    inviteInsideDiv.append(chatTimeDiv);

    let chatTime = document.createElement("p");
    chatTime.setAttribute("class", "invite-chat-time-para");
    chatTime.innerHTML = friendInv["inviteTime"];
    chatTimeDiv.append(chatTime);

    document
      .querySelector(".friends-inside-invite-and-details-showing-container")
      .append(friendInviteContainer);
  }
}

// Get invite details

function getInviteDetails(inviteId){
		const url = "/appfreshnest/GetUserFriendInviteDetailServlet?inviteId="+ inviteId;
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    console.log(response.data);
			    let friendInviteDetails = response.data;
			    showInvite(friendInviteDetails);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
		  })
	}

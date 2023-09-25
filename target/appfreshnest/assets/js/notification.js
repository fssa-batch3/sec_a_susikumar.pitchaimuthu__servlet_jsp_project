function getAllNotifications() {
  const url = "/appfreshnest/GetAllUserNotifications";
  axios
    .get(url)
    .then(function (response) {
      // handle success
      console.log(response.data);
      const notificationList = response.data;

      if (notificationList === "No Notificaitons available") {
        console.log("summa");
      } else {
        filterNotification(notificationList);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

// Filter the notification by follow and others
function filterNotification(notificationList){
	let notificationContent;
	for(let notification of notificationList){
		if(notification["requestType"] === "follow_request"){
			notificationContent = " has started following you. But you didn't follow";
		}else if(notification["requestType"] === "invite_request"){
			notificationContent  = " has sent the invitation joing request";
		}else {
			notificationContent = " has commented for your time tale";
		}
		
    	userNotificaitonsElementCreations(notification, notificationContent);

	}
	
	
}


getAllNotifications();

let followContainer = document.querySelector(".mention-box-inside-container");

// Display notification
function userNotificaitonsElementCreations(notification, notificationContent) {
    let followCardDivContainer = document.createElement("div");
    followCardDivContainer.setAttribute( "class", "follow-card-div-container message-box");
    followCardDivContainer.setAttribute("id", notification["notificationId"]);
    followCardDivContainer.setAttribute("notification-purpose", notification["requestType"]);
    followCardDivContainer.addEventListener("click", function() {
    let notificationId = this.id;
    let purpose = this.getAttribute("notification-purpose");
    getNotificaitonDetails(notificationId, purpose);
   });

    let followCardInsideContainer = document.createElement("div");
    followCardInsideContainer.setAttribute(
      "class",
      "follow-card-inside-container"
    );
    followCardDivContainer.append(followCardInsideContainer);

    let followImageDiv = document.createElement("div");
    followImageDiv.setAttribute("class", "follow-image-div");
    followCardInsideContainer.append(followImageDiv);

    let followImage = document.createElement("img");
    followImage.setAttribute("class", "follower-image");
    followImage.setAttribute("src", notification["profileImage"]);
    followImageDiv.append(followImage);

    let followNameDiv = document.createElement("div");
    followNameDiv.setAttribute("class", "follow-name-div");
    followCardInsideContainer.append(followNameDiv);

    let followName = document.createElement("h3");
    followName.setAttribute("class", "follower-name");
    followName.innerHTML = notification["username"] ;
    followNameDiv.append(followName);

    let ourPara = document.createElement("p");
    ourPara.setAttribute("class", "our-para");
    ourPara.innerHTML =notification["username"] + notificationContent;
    followNameDiv.append(ourPara);

    followContainer.append(followCardDivContainer);
  }


// Gettting the notification details
let notiId;
let purposeValue ;
async function getNotificaitonDetails(notificationId, purpose){
	notiId = notificationId;
    purposeValue = purpose;
const url = "/appfreshnest/NotificationDetailsServlet?notificationId=" + notificationId + "&purpose=" + purpose;
  axios
    .get(url)
    .then(function (response) {
      // handle success
      const notificationDetails = response.data;
      console.log(notificationDetails);
      removeDetailDiv();
      
      if(purpose === "invite_request"){
		  showUserInviteNotificaitonDetails(notificationDetails);
	  }else if(purpose ==="follow_request"){
        showFollowNotificationDetail(notificationDetails);
	  }else {
		  
	  }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });	
}

async function removeDetailDiv(){
	
    let followContainer = document.querySelector(".display-inside-div");

    if (followContainer !== null) {
      followContainer.remove();
    }

 }


  async function showFollowNotificationDetail(findFollowUser){
	try {
		console.log(findFollowUser);
		
    let followDetailsDivContainer = document.createElement("div");
    followDetailsDivContainer.setAttribute(
      "class",
      "follow-details-div-container display-inside-div card"
    );

    let followDetailsInsideDiv = document.createElement("div");
    followDetailsInsideDiv.setAttribute("class", "follow-details-inside-div");
    followDetailsDivContainer.append(followDetailsInsideDiv);

    let detailsFollowerImageDiv = document.createElement("div");
    detailsFollowerImageDiv.setAttribute("class", "details-follower-image-div");
    followDetailsInsideDiv.append(detailsFollowerImageDiv);

    let detailsFollowerImage = document.createElement("img");
    detailsFollowerImage.setAttribute("class", "details-follower-image");
    detailsFollowerImage.setAttribute("src", findFollowUser["profileImage"]);
    detailsFollowerImageDiv.append(detailsFollowerImage);

    let followerButtonDivContainer = document.createElement("div");
    followerButtonDivContainer.setAttribute(
      "class",
      "follower-button-div-container"
    );
    followDetailsInsideDiv.append(followerButtonDivContainer);

    let followH4 = document.createElement("h4");
    followH4.setAttribute("class", "follower-name");
    followH4.innerHTML = findFollowUser["username"];
    followerButtonDivContainer.append(followH4);

    let followPara = document.createElement("p");
    followPara.setAttribute("class", "follow-para");
    followPara.innerHTML = findFollowUser["userTheme"];
    followerButtonDivContainer.append(followPara);

    const isFollowing = await checkUserFollowingOrNot(findFollowUser["userId"]);

    if (isFollowing) {
      let followingButtonBtn = document.createElement("button");
      followingButtonBtn.setAttribute("class", "following-button");
      followingButtonBtn.setAttribute("id", findFollowUser["userId"]);
      followingButtonBtn.innerHTML = "following";
      followerButtonDivContainer.append(followingButtonBtn);
    } else {
      let followBackBUtton = document.createElement("button");
      followBackBUtton.setAttribute("class", "follow-button");
      followBackBUtton.setAttribute("id", findFollowUser["userId"]);
      followBackBUtton.setAttribute("onclick", "followBack(this.id)");
      followBackBUtton.innerHTML = "follow back";
      followerButtonDivContainer.append(followBackBUtton);
    }
    document
      .querySelector(".display-container")
      .append(followDetailsDivContainer);
  } catch (error) {
    console.log(
      "An error occurrd while show the follow notification data :",
      error
    );
  }
}

// Check Whether the user following this user or not
async function checkUserFollowingOrNot(userId) {
  try {
    const url = "/appfreshnest/CheckUserFriendsServlet?userId=" + userId;
    const response = await axios.get(url);
    const serverMessage = response.data;
    return serverMessage === "follow";
  } catch (error) {
    console.error("Error:", error);
    return false; 
  }
}

// User invite request notification details
function showUserInviteNotificaitonDetails(findFollowUser){
	try {
		
    let followDetailsDivContainer = document.createElement("div");
    followDetailsDivContainer.setAttribute(
      "class",
      "follow-details-div-container display-inside-div card"
    );

    let followDetailsInsideDiv = document.createElement("div");
    followDetailsInsideDiv.setAttribute("class", "follow-details-inside-div");
    followDetailsDivContainer.append(followDetailsInsideDiv);

    let detailsFollowerImageDiv = document.createElement("div");
    detailsFollowerImageDiv.setAttribute("class", "details-follower-image-div");
    followDetailsInsideDiv.append(detailsFollowerImageDiv);

    let detailsFollowerImage = document.createElement("img");
    detailsFollowerImage.setAttribute("class", "details-follower-image");
    detailsFollowerImage.setAttribute("src", findFollowUser["user"]["profileImage"]);
    detailsFollowerImageDiv.append(detailsFollowerImage);

    let followerButtonDivContainer = document.createElement("div");
    followerButtonDivContainer.setAttribute(
      "class",
      "follower-button-div-container"
    );
    followDetailsInsideDiv.append(followerButtonDivContainer);

    let followH4 = document.createElement("h4");
    followH4.setAttribute("class", "follower-name");
    followH4.innerHTML = findFollowUser["user"]["username"];
    followerButtonDivContainer.append(followH4);

    let followPara = document.createElement("p");
    followPara.setAttribute("class", "follow-para");
    followPara.innerHTML = findFollowUser["user"]["userTheme"];
    followerButtonDivContainer.append(followPara);
    
    
    // Create a div element with class "user-invite-request-div"
const userInviteRequestDiv = document.createElement('div');
userInviteRequestDiv.classList.add('user-invite-request-div');

// Create the inner div for invite details and buttons with class "invite-details-and-button-div"
const inviteDetailsAndButtonDiv = document.createElement('div');
inviteDetailsAndButtonDiv.classList.add('invite-details-and-button-div');

// Create the div for invite details with class "invite-details-div"
const inviteDetailsDiv = document.createElement('div');
inviteDetailsDiv.classList.add('invite-details-div');

// Create a paragraph element with class "invite-name-para" and text content "Birthday party"
const inviteNamePara = document.createElement('p');
inviteNamePara.classList.add('invite-name-para');
inviteNamePara.textContent = findFollowUser["invite"]["inviteType"];

// Append the paragraph element to the "invite-details-div"
inviteDetailsDiv.appendChild(inviteNamePara);

// Create the div for accept and decline buttons with class "invite-accept-decline-button-div"
const inviteAcceptDeclineButtonDiv = document.createElement('div');
inviteAcceptDeclineButtonDiv.classList.add('invite-accept-decline-button-div');

if(findFollowUser["inviteRequestReaction"] === "accepted"){
    const acceptedButton = document.createElement('button');
    acceptedButton.classList.add('accepted-button');
    acceptedButton.textContent = 'Accepted';
    
    inviteAcceptDeclineButtonDiv.appendChild(acceptedButton);
		
	}else if(findFollowUser["inviteRequestReaction"] === "declined"){	
	const declinedButton = document.createElement('button');
    declinedButton.classList.add('declined-button');
    declinedButton.textContent = 'Declined';	
    
       inviteAcceptDeclineButtonDiv.appendChild(declinedButton);

	}else {
		// Create the accept button with class "accept-button"
    const acceptButton = document.createElement('button');
   acceptButton.classList.add('accept-button');
   acceptButton.setAttribute("id", findFollowUser["inviteReaction"]["reactId"]);
   acceptButton.addEventListener("click", function() {
	   let reactId = this.id;
	   let value = "accepted";
	   
	   inviteRequestReactionOfInviter(reactId, value);
   })
   acceptButton.textContent = 'Accept';

   // Create the decline button with class "decline-button"
   const declineButton = document.createElement('button');
   declineButton.classList.add('decline-button');
   declineButton.setAttribute('id', findFollowUser["inviteReaction"]["reactId"]);
   declineButton.addEventListener("click", function (){
	   let reactId = this.id;
	   let value = "declined";
	   inviteRequestReactionOfInviter(reactId, value);

   })
   declineButton.textContent = 'Decline';
   
   // Append the accept and decline buttons to the "invite-accept-decline-button-div"
   inviteAcceptDeclineButtonDiv.appendChild(acceptButton);
   inviteAcceptDeclineButtonDiv.appendChild(declineButton);
	}

// Append the "invite-details-div" and "invite-accept-decline-button-div" to the "invite-details-and-button-div"
inviteDetailsAndButtonDiv.appendChild(inviteDetailsDiv);
inviteDetailsAndButtonDiv.appendChild(inviteAcceptDeclineButtonDiv);

// Create the div for the invite image with class "invite-image-div"
const inviteImageDiv = document.createElement('div');
inviteImageDiv.classList.add('invite-image-div');

// Create the image element with class "invite-image" and an empty src attribute
const inviteImage = document.createElement('img');
inviteImage.classList.add('invite-image');
inviteImage.setAttribute('src', findFollowUser["invite"]["inviteImage"]);
inviteImage.setAttribute('alt', 'invite-image');

// Append the image element to the "invite-image-div"
inviteImageDiv.appendChild(inviteImage);

// Append the "invite-details-and-button-div" and "invite-image-div" to the "user-invite-request-div"
userInviteRequestDiv.appendChild(inviteDetailsAndButtonDiv);
userInviteRequestDiv.appendChild(inviteImageDiv);

// Now, you can append the "user-invite-request-div" to the desired parent element in your HTML document.

followDetailsInsideDiv.appendChild(userInviteRequestDiv);
     
    document
      .querySelector(".display-container")
      .append(followDetailsDivContainer);
  } catch (error) {
    console.log(
      "An error occurrd while show the follow notification data :",
      error
    );
  }
}



// Check the user Response for this user request

async function followBack(id){	
	const url = "/appfreshnest/FollowAcceptServlet?userId=" + id;
  axios
    .get(url)
    .then(function (response) {
      // handle success
      let serverMessage = response.data;
                if(serverMessage === "success"){		         
                   getNotificaitonDetails(notiId,purposeValue);
			   }
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}


// response send back function for the invite reaquest
function inviteRequestReactionOfInviter(reactId, value){
const url = "/appfreshnest/InviteRequestResponseSendServlet?reactId=" + reactId + "&value=" + value;
  axios
    .get(url)
    .then(function (response) {
      // handle success
      let serverMessage = response.data;
               if(serverMessage == "success"){		         
                   getNotificaitonDetails(notiId,purposeValue);
			   }
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}




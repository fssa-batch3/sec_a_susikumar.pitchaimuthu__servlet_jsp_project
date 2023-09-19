function getAllNotifications() {
  const url = "http://localhost:8080/appfreshnest/GetAllUserNotifications";
  axios
    .get(url)
    .then(function (response) {
      // handle success
      console.log(response.data);
      const notificationList = response.data;

      if (notificationList === "No Notificaitons available") {
        console.log("summa");
      } else {
        displayNotificaitons(notificationList);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

getAllNotifications();

let followContainer = document.querySelector(".mention-box-inside-container");

function displayNotificaitons(notificationList) {
  for (let notification of notificationList) {
    let followCardDivContainer = document.createElement("div");
    followCardDivContainer.setAttribute(
      "class",
      "follow-card-div-container message-box" 
    );
    followCardDivContainer.setAttribute("id", notification["notificationId"]);
    followCardDivContainer.setAttribute(
      "onclick",
      "getNotificaitonDetails(this.id)"
    );

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
    followName.innerHTML = notification["username"];
    followNameDiv.append(followName);

    let ourPara = document.createElement("p");
    ourPara.setAttribute("class", "our-para");
    ourPara.innerHTML =notification["username"] +
      " has started following you. But you didn't follow";
    followNameDiv.append(ourPara);

    followContainer.append(followCardDivContainer);
  }

  
}



// Gettting the notification details

async function getNotificaitonDetails(id){
	console.log(id);

const url = "http://localhost:8080/appfreshnest/NotificationDetailsServlet?notificationId=" + id;
  axios
    .get(url)
    .then(function (response) {
      // handle success
      const notificationDetails = response.data;
      console.log(notificationDetails);
      removeDetailDiv();
      
      showFollowDetails(notificationDetails);
      
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


  async function showFollowDetails(findFollowUser){
	try {
		
    let followDetailsDivContainer = document.createElement("div");
    followDetailsDivContainer.setAttribute(
      "class",
      "follow-details-div-container display-inside-div"
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

    console.log(findFollowUser["userId"]);
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

async function checkUserFollowingOrNot(userId) {
  try {
    const url =
      "http://localhost:8080/appfreshnest/CheckUserFriendsServlet?userId=" + userId;
    const response = await axios.get(url);
    const serverMessage = response.data;
    return serverMessage === "follow";
  } catch (error) {
    console.error("Error:", error);
    return false; 
  }
}



async function followBack(id){
	console.log("following id : " +id);
	
	const url = "http://localhost:8080/appfreshnest/FollowAcceptServlet?userId=" + id;
  axios
    .get(url)
    .then(function (response) {
      // handle success
      console.log(response.data);
      let serverMessage = response.data;
                
                if(serverMessage == "success"){		
					
					let currentButton;
					let allFollowButton = document.querySelectorAll(".follow-button");
					
					    for (let button of allFollowButton) {
                         if (button["id"] == id) {
                         currentButton = button;
                    }
                  }
    
                    console.log(currentButton);			
                    currentButton.remove("follow-button");

                    let followingButtonElement = document.createElement("button");
                    followingButtonElement.setAttribute("class", "following-button");
                    followingButtonElement.innerHTML = "Following";
                    document.querySelector(".content-inside-div").append(followingButtonElement);         
				
			}
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
	
	
}

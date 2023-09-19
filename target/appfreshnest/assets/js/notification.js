// let getting the elements for set the count of the respective message

try {
  if (otherNotificationLength > 0) {
    let otherPara = document.createElement("p");
    otherPara.setAttribute("class", "other-count-para");
    otherPara.innerHTML = otherNotificationLength;

    document.querySelector(".other-button-div").append(otherPara);
  }

  if (userNotificationLength != 0) {
    let followPara = document.createElement("p");
    followPara.setAttribute("class", "follow-count-para");
    followPara.innerHTML = userNotificationLength;
    document.querySelector(".follow-button-div").append(followPara);
  }
} catch (error) {
  console.log("An error occurred while adding the notification count :", error);
}

// writing find method to know who's notification is this

let followData = JSON.parse(localStorage.getItem("followNotificationData"));
console.log(followData);

let buttonFollowElement = document.querySelector(".follow-button");

let userFriends = JSON.parse(localStorage.getItem("userFriends"));
console.log(userFriends);

// creating the add eventlistner for show the follow details

buttonFollowElement.addEventListener("click", (no) => {
  no.preventDefault();
  try {
    // Here creating if else condition to remove message box

    let messageBox = document.querySelectorAll(".message-box");
    console.log(messageBox);

    if (messageBox[0] != null) {
      for (let box of messageBox) {
        box.remove();
      }
    }

    let userFollowData;

    if (followData != null) {
      userFollowData = followData.filter(
        (e) => e["requestReceiverId"] == findUser["userId"]
      );

      console.log(userFollowData);

      // show the notification data of follow
      let followContainer = document.querySelector(
        ".mention-box-inside-container"
      );

      for (let data of userFollowData.reverse()) {
        let followCardDivContainer = document.createElement("div");
        followCardDivContainer.setAttribute(
          "class",
          "follow-card-div-container message-box"
        );
        followCardDivContainer.setAttribute("id", data["friendRequestId"]);
        followCardDivContainer.setAttribute(
          "onclick",
          "showFollowDetails(this.id)"
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
        followImage.setAttribute("src", data["requesterImage"]);
        followImageDiv.append(followImage);

        let followNameDiv = document.createElement("div");
        followNameDiv.setAttribute("class", "follow-name-div");
        followCardInsideContainer.append(followNameDiv);

        let followName = document.createElement("h3");
        followName.setAttribute("class", "follower-name");
        followName.innerHTML = data["requesterName"];
        followNameDiv.append(followName);

        let ourPara = document.createElement("p");
        ourPara.setAttribute("class", "our-para");
        ourPara.innerHTML =
          "This user has started following you. But you didn't follow";
        followNameDiv.append(ourPara);

        followContainer.append(followCardDivContainer);
      }

      // finally setting the as a read properties

      let setData = [];

      for (let checkFollow of followData) {
        for (let userData of userFollowData) {
          if (checkFollow["message_id"] == userData["message_id"]) {
            let readObj = {
              isRead: "true",
            };

            let assaignTrue = Object.assign(checkFollow, readObj);

            setData.push(assaignTrue);
          } else {
            setData.push(checkFollow);
          }
        }
      }

      console.log(setData);

      localStorage.setItem("followNotificationData", JSON.stringify(setData));
    }
  } catch (error) {
    console.log("An error occured while show the follow detials :", error);
  }
});

// follow notification person details showing container

function showFollowDetails(followId) {
  try {
    console.log(followId);

    let followContainer = document.querySelector(".display-inside-div");

    if (followContainer !== null) {
      followContainer.remove();
    }

    let findFollowUser = info.find((site) => site["userId"] == followId);

    console.log(findFollowUser);

    // Creating a for loop to check this user data is already in profile user friend datas

    console.log(userFriends);
    let profileUserFriendData;

    for (let friendGroup of userFriends) {
      for (let friend of friendGroup) {
        if (friend["frienderId"] == findUser["userId"]) {
          profileUserFriendData = friendGroup;
        }
      }
    }

    console.log(profileUserFriendData);

    // checking the friend in this friends profile data

    let match = false;
    if (profileUserFriendData !== undefined) {
      for (let friendData of profileUserFriendData) {
        if (friendData["userId"] == followId) {
          match = true;
          break;
        }
      }
    }

    // according this element creation

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
    detailsFollowerImage.setAttribute("src", findFollowUser["avatarUrl"]);
    detailsFollowerImageDiv.append(detailsFollowerImage);

    let followerButtonDivContainer = document.createElement("div");
    followerButtonDivContainer.setAttribute(
      "class",
      "follower-button-div-container"
    );
    followDetailsInsideDiv.append(followerButtonDivContainer);

    let followH4 = document.createElement("h4");
    followH4.setAttribute("class", "follower-name");
    followH4.innerHTML = findFollowUser["userName"];
    followerButtonDivContainer.append(followH4);

    let followPara = document.createElement("p");
    followPara.setAttribute("class", "follow-para");
    followPara.innerHTML = findFollowUser["userTheme"];
    followerButtonDivContainer.append(followPara);

    if (match == true) {
      let followingButtonBtn = document.createElement("button");
      followingButtonBtn.setAttribute("class", "follow-button");
      followingButtonBtn.setAttribute("id", findFollowUser["userId"]);
      followingButtonBtn.innerHTML = "following";
      followerButtonDivContainer.append(followingButtonBtn);
    } else {
      let followBackBUtton = document.createElement("button");
      followBackBUtton.setAttribute("class", "following-button");
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

// follow back function

function followBack(e) {
  try {
    console.log(e);

    let findFollower = info.find((f) => f["userId"] == e);

    console.log(findFollower);

    // check there user friends array is there or not
    let friendArray = [];

    for (let friendGroup of userFriends) {
      for (let friend of friendGroup) {
        if (friend["friendRequestId"] == findFollower["userId"]) {
          friendArray = friendGroup;
        }
      }
    }

    console.log(friendArray.length);

    // lets create a function to send follow back mesage data

    let followBackObject = {
      purpose: "back",
      friendRequestId: findUser["userId"],
      requestReceiverId: findFollower["userId"],
      requesterImage: findUser["avatarUrl"],
      requesterName: findUser["userName"],
    };

    followData.push(followBackObject);

    localStorage.setItem("followNotificationData", JSON.stringify(followData));

    let time = moment().format("LT");

    // set the user data into the userFriends database

    if (friendArray.length == 0) {
      let createArray = [];

      let createObject = {
        frienderId: findUser["userId"],
        userId: findFollower["userId"],
        userName: findFollower["userName"],
        avatarUrl: findFollower["avatarUrl"],
        userTheme: findFollower["userTheme"],
        email: findFollower["email"],
        time,
      };

      createArray.push(createObject);

      userFriends.push(createArray);

      localStorage.setItem("userFriends", JSON.stringify(userFriends));
    }
  } catch (error) {
    console.log("An eror occurred while follow back :", error);
  }
}

// show the notification data of other activity and other data showing function

let notiData = JSON.parse(localStorage.getItem("otherNotification"));

// Here finding the user other notification

if (notiData == null) {
  noNotification();
}

let userNotiData = notiData.filter(
  (e) => e["message_receiver_id"] == findUser["userId"]
);

if (userNotiData == null) {
  noNotification();
} else {
  otherElementCreation();
}

// other notification element creation

function otherElementCreation() {
  console.log(userNotiData);
  for (let otherPop of userNotiData.reverse()) {
    let whole_div = document.createElement("div");
    whole_div.setAttribute("class", "mention-box-div message-box");
    whole_div.setAttribute("id", otherPop["messageId"]);
    whole_div.setAttribute("onclick", "findInviteUser(this.id)");

    let mention_box_insie = document.createElement("div");
    mention_box_insie.setAttribute("class", "mention-box-inside-div");
    whole_div.append(mention_box_insie);

    let image_name_div = document.createElement("div");
    image_name_div.setAttribute("class", "image-and-name-div");
    mention_box_insie.append(image_name_div);

    let pro_image_div = document.createElement("div");
    pro_image_div.setAttribute("class", "pro-image-div");
    image_name_div.append(pro_image_div);

    let pro_image = document.createElement("img");
    pro_image.setAttribute("class", "mention-profile-image");
    pro_image.setAttribute("src", otherPop["message_person_url"]);
    pro_image_div.append(pro_image);

    let name_content_div = document.createElement("div");
    name_content_div.setAttribute("class", "name-content-div");
    image_name_div.append(name_content_div);

    let h3 = document.createElement("h3");
    h3.innerHTML = otherPop["messager"];
    name_content_div.append(h3);

    let p = document.createElement("p");
    p.innerHTML = otherPop["message"];
    name_content_div.append(p);

    let user_mention_media_div = document.createElement("div");
    user_mention_media_div.setAttribute("class", "user-mention-media-div");
    mention_box_insie.append(user_mention_media_div);

    let image = document.createElement("i");
    image.setAttribute("class", "bi bi-heart-fill");
    user_mention_media_div.append(image);

    document.querySelector(".mention-box-inside-container").append(whole_div);
  }
}

// other notification function

let otherNotiElement = document.querySelector(".other-button");

otherNotiElement.addEventListener("click", () => {
  try {
    // Here remove the except message element

    let messageContainer = document.querySelectorAll(".message-box");
    console.log(messageContainer);

    if (messageContainer[0] != null) {
      for (let contain of messageContainer) {
        contain.remove();
      }
    }
    otherElementCreation();
  } catch (error) {
    console.log("An error occurred while show the othe notificaiton :", error);
  }
});

// writing eventListner function to show invite details

function findInviteUser(e) {
  try {
    let userNotiId = e;
    console.log(userNotiId);

    let findNoti = userNotiData.find((noti) => noti["messageId"] == userNotiId);
    console.log(findNoti);

    let findElseData = userNotiData.filter(
      (noti) => noti["messageId"] !== findNoti["messageId"]
    );
    console.log(findElseData);

    // if say to remove attribute

    let removeNoti = document.querySelector(".display-inside-div");

    if (removeNoti !== null) {
      document.querySelector(".display-inside-div").remove();
    }
    // writing function for create a dynamic element to show the notification details

    let displayInsideDiv = document.createElement("div");
    displayInsideDiv.setAttribute("class", "display-inside-div");
    displayInsideDiv.innerHTML = `  <div class="details-display-inside-container">
  <div class="details-inside-align-container">
    <!-- profile div -->

    <div class="profile-and-name-div-container">
      <!-- profile div -->
      <div class="profile-div">
        <img
          class="profile-image"
          src="${findNoti["message_person_url"]}"
          alt=""
        />
      </div>

      <div>
        <p>${findNoti["messager"]}</p>
      </div>
    </div>

    <!-- content div -->

    <div class="details-content-div-container">
      <div class="details-content-inside-div">
        <div class="content-div">
          <h4>text</h4>
          <p>${findNoti["message"]}</p>
        </div>

        <div class="content-div">
          <h4>date</h4>
          <p>${findNoti["messageTime"]}</p>
        </div>

        <div class="content-div">
          <h4>Time</h4>
          <p>${findNoti["messageDate"]}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- notification div -->
  <div class="notification-file-showing-div-container">
    <!-- inside div for media -->
    <div class="notification-file-div">
      <img
        class="notification-file"
        src="${findNoti["notification_file"]}"
        alt=""
      />
    </div>
  </div>
</div>`;
    document.querySelector(".display-container").append(displayInsideDiv);

    // create if else condition for showing that person realted notification

    if (findElseData == null) {
      return;
    } else {
      // relate notification head div

      let relatedHeadDiv = document.createElement("div");
      relatedHeadDiv.setAttribute("class", "related-head-div");
      displayInsideDiv.append(relatedHeadDiv);

      let relatedHead = document.createElement("h3");
      relatedHead.setAttribute("class", "related-div");
      relatedHead.innerHTML = "This person related notification";
      relatedHeadDiv.append(relatedHead);

      // related notification related div container

      let relatedNotificationDivContainer = document.createElement("div");
      relatedNotificationDivContainer.setAttribute(
        "class",
        "related-notification-div-container"
      );
      displayInsideDiv.append(relatedNotificationDivContainer);

      let relatedNotificationInsideDiv = document.createElement("div");
      relatedNotificationInsideDiv.setAttribute(
        "class",
        "related-notification-inside-div"
      );
      relatedNotificationDivContainer.append(relatedNotificationInsideDiv);

      // create for loop to show all the notification

      for (let findElse of findElseData) {
        let notificationDivContainer = document.createElement("div");
        notificationDivContainer.setAttribute("id", findElse["inviter_id"]);

        notificationDivContainer.setAttribute(
          "class",
          "notification-div-container"
        );
        relatedNotificationInsideDiv.append(notificationDivContainer);

        let notificationInsideDiv = document.createElement("div");
        notificationInsideDiv.setAttribute("class", "notification-inside-div");
        notificationDivContainer.append(notificationInsideDiv);

        // user related name div

        let userProfileAndNameDiv = document.createElement("div");
        userProfileAndNameDiv.setAttribute(
          "class",
          "user-profile-and-name-div"
        );
        notificationInsideDiv.append(userProfileAndNameDiv);

        let userProfileDiv = document.createElement("div");
        userProfileDiv.setAttribute("class", "user-profile-div");
        userProfileAndNameDiv.append(userProfileDiv);

        let userProfileImage = document.createElement("img");
        userProfileImage.setAttribute("class", "user-profile-image");
        userProfileImage.setAttribute("alt", "inviter-image");
        userProfileImage.setAttribute("src", findElse["invite_person_url"]);
        userProfileDiv.append(userProfileImage);

        let userNameAndNotiDiv = document.createElement("div");
        userNameAndNotiDiv.setAttribute("class", "user-name-and-noti-div");
        userProfileAndNameDiv.append(userNameAndNotiDiv);

        let userNameH3 = document.createElement("h3");
        userNameH3.setAttribute("class", "user-name-h3");
        userNameH3.innerHTML = findElse["notification_person"];
        userNameAndNotiDiv.append(userNameH3);

        let userNameP = document.createElement("p");
        userNameP.setAttribute("class", "user-name-p");
        userNameP.innerHTML = findElse["inviteChat"];
        userNameAndNotiDiv.append(userNameP);

        // invite Image div

        let userInviteImageDiv = document.createElement("div");
        userInviteImageDiv.setAttribute("class", "user-invite-image-div");
        notificationInsideDiv.append(userInviteImageDiv);

        let imageOfInvite = document.createElement("img");
        imageOfInvite.setAttribute("class", "image-of-invite");
        imageOfInvite.setAttribute("alt", "user-invite-image");
        imageOfInvite.setAttribute("src", findElse["invite_person_url"]);
        userInviteImageDiv.append(imageOfInvite);
      }
    }
  } catch (error) {
    console.log(
      "An error occurred while show the other notification date :",
      error
    );
  }
}

function noNotification() {
  let noNotificationElementDiv = document.createElement("div");
  noNotificationElementDiv.setAttribute("class", "no-notification-element-div");
  noNotificationElementDiv.innerHTML = `
  <div class="no-notification-inside-element-div">
  <img
    class="no-message-gif"
    src="../assets/images/Birhday ballons/no message.gif"
    alt="no-message"
  />

  <p class="no-message-para">
    You didn't get any message. Wait some special will message to
    you
  </p>
</div>
  `;
  document
    .querySelector(".mention-box-inside-container")
    .append(noNotificationElementDiv);
}

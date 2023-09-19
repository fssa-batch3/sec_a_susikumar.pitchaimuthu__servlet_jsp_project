let clickDetails = document.querySelector(".clicking-card-whole-container");

let findDetails;

let buttonArray = [];
function showDetails(sd) {
  try {
    console.log(sd);

    let detailsDiv = document.querySelector(".clicking-inside-div");

    if (detailsDiv !== null) {
      detailsDiv.remove();
    }

    findDetails = SuggestedUsers.find((e) => e["userId"] == sd);
    console.log(findDetails);

    if ((clickDetails.style.display = "none")) {
      clickDetails.style.display = "block";
    }

    let clickingInsideDiv = document.createElement("div");
    clickingInsideDiv.setAttribute("class", "clicking-inside-div");

    // remove button element creation

    let clickingDetailsRemoveDiv = document.createElement("div");
    clickingDetailsRemoveDiv.setAttribute("class", "click-details-remove-div");
    clickingInsideDiv.append(clickingDetailsRemoveDiv);

    let removeDiv = document.createElement("div");
    removeDiv.setAttribute("class", "remove-div");
    removeDiv.setAttribute("onclick", "removeDetails()");
    clickingDetailsRemoveDiv.append(removeDiv);

    let removeI = document.createElement("i");
    removeI.setAttribute("class", "bi bi-x-circle");

    removeDiv.append(removeI);

    //  image and details div

    let cardImageDetailsDiv = document.createElement("div");
    cardImageDetailsDiv.setAttribute(
      "class",
      "card-image-and-details-div-container"
    );
    clickingInsideDiv.append(cardImageDetailsDiv);

    let imageDetailsInsideDiv = document.createElement("div");
    imageDetailsInsideDiv.setAttribute("class", "image-and-details-inside-div");
    cardImageDetailsDiv.append(imageDetailsInsideDiv);

    let cardImageDiv = document.createElement("div");
    cardImageDiv.setAttribute("class", "card-image-div");
    imageDetailsInsideDiv.append(cardImageDiv);

    let cardImage = document.createElement("img");
    cardImage.setAttribute("src", findDetails["avatarUrl"]);
    cardImage.setAttribute("alt", "user-profile");
    cardImage.setAttribute("class", "card-image");
    cardImageDiv.append(cardImage);

    let cardDetailsDiv = document.createElement("div");
    cardDetailsDiv.setAttribute("class", "card-details-div");
    imageDetailsInsideDiv.append(cardDetailsDiv);

    let suggestionH3 = document.createElement("h3");
    suggestionH3.setAttribute("class", "suggestion-name");
    suggestionH3.innerHTML = findDetails["userName"];
    cardDetailsDiv.append(suggestionH3);

    let suggestionTheme = document.createElement("p");
    suggestionTheme.setAttribute("class", "suggestion-theme");
    suggestionTheme.innerHTML = findDetails["userTheme"];
    cardDetailsDiv.append(suggestionTheme);

    let suggestionCity = document.createElement("p");
    suggestionCity.setAttribute("class", "suggestion-name");
    suggestionCity.innerHTML = findDetails["city"];
    cardDetailsDiv.append(suggestionCity);

    let followButton = document.createElement("button");
    followButton.setAttribute("class", "connect-button");
    followButton.setAttribute("id", findDetails["userId"]);
    followButton.innerHTML = "Follow";
    followButton.setAttribute("onclick", "getFollow(this.id)");
    cardDetailsDiv.append(followButton);

    // create loop function for change the button follow to another button

    let followData = JSON.parse(localStorage.getItem("userFriends"));
    console.log(followData);

    if (followData !== null) {
      for (let ofFollow of followData) {
        for (let inFollow of ofFollow) {
          if (inFollow["userId"] == findDetails["userId"]) {
            buttonArray.push(inFollow);
          }
        }
      }
    }
    console.log(buttonArray);

    // suggestion area element creation

    let suggestionHeadDetailsDiv = document.createElement("div");
    suggestionHeadDetailsDiv.setAttribute(
      "class",
      "suggestion-head-and-details-div"
    );
    clickingInsideDiv.append(suggestionHeadDetailsDiv);

    let suggestionInsideDiv = document.createElement("div");
    suggestionInsideDiv.setAttribute("class", "suggestion-inside-div");
    suggestionHeadDetailsDiv.append(suggestionInsideDiv);

    let suggestionHeadDiv = document.createElement("div");
    suggestionHeadDiv.setAttribute("class", "suggestion-head-div");
    suggestionInsideDiv.append(suggestionHeadDiv);

    let suggestionH4 = document.createElement("h4");
    suggestionH4.setAttribute("class", "suggestion-h4");
    suggestionH4.innerHTML = "Suggested for you";
    suggestionHeadDiv.append(suggestionH4);

    let userSuggestionDivContainer = document.createElement("div");
    userSuggestionDivContainer.setAttribute(
      "class",
      "user-suggestion-div-container"
    );
    suggestionInsideDiv.append(userSuggestionDivContainer);

    let userSuggestionInsideDiv = document.createElement("div");
    userSuggestionInsideDiv.setAttribute("class", "user-suggestion-inside-div");
    userSuggestionDivContainer.append(userSuggestionInsideDiv);

    // filter the this user friends

    let userFriendsData = JSON.parse(localStorage.getItem("userFriends"));
    console.log(userFriendsData);

    let suggedData;

    if (userFriendsData !== null) {
      for (let userFriend of userFriendsData) {
        if (userFriend[0]["frienderId"] == findDetails["userId"]) {
          suggedData = userFriend;
        }
      }
    }

    console.log(suggedData);

    if (suggedData !== undefined) {
      for (let suggest of suggedData) {
        let suggestionDivContainer = document.createElement("div");
        suggestionDivContainer.setAttribute(
          "class",
          "suggestion-div-container"
        );
        userSuggestionInsideDiv.append(suggestionDivContainer);

        let suggestionSideInsideDiv = document.createElement("div");
        suggestionSideInsideDiv.setAttribute(
          "class",
          "suggestion-side-inside-div"
        );
        suggestionDivContainer.append(suggestionSideInsideDiv);

        let suggestionImageDiv = document.createElement("div");
        suggestionImageDiv.setAttribute("class", "suggestion-image-div");
        suggestionSideInsideDiv.append(suggestionImageDiv);

        let suggestedImage = document.createElement("img");
        suggestedImage.setAttribute("class", "suggested-image");
        suggestedImage.setAttribute("src", suggest["avatarUrl"]);
        suggestedImage.setAttribute("alt", "user-profile");
        suggestionImageDiv.append(suggestedImage);

        let userNameDivContainer = document.createElement("div");
        userNameDivContainer.setAttribute("class", "user-name-div-container");
        suggestionSideInsideDiv.append(userNameDivContainer);

        let suggestedName = document.createElement("h4");
        suggestedName.setAttribute("class", "suggestion-name");
        suggestedName.innerHTML = suggest["userName"];
        userNameDivContainer.append(suggestedName);

        let suggestedTheme = document.createElement("p");
        suggestedTheme.setAttribute("class", "suggestion-theme");
        suggestedTheme.innerHTML = suggest["userTheme"];
        userNameDivContainer.append(suggestedTheme);

        let minyFollowDiv = document.createElement("div");
        minyFollowDiv.setAttribute("class", "follow-button-div");
        suggestionSideInsideDiv.append(minyFollowDiv);

        let minyFollowButton = document.createElement("button");
        minyFollowButton.setAttribute("class", "connect-button");
        minyFollowButton.setAttribute("onclick", "getFollow(this.id)");
        minyFollowButton.innerHTML = "Follow";
        minyFollowDiv.append(minyFollowButton);
      }
    }

    document
      .querySelector(".clicking-inside-div-container")
      .append(clickingInsideDiv);
  } catch (error) {
    console.log("An error occurred while show the user friends :", error);
  }
}

console.log(buttonArray);
// Writing function for remove the details div

function removeDetails() {
  try {
    if (clickDetails.style.display === "block") {
      clickDetails.style.display = "none";
    }
  } catch (error) {
    console.log("An error occurred while the remove details :", error);
  }
}

// Writing function for add users to the current profile user

function getFollow(es) {
  try {
    let userFriends = JSON.parse(localStorage.getItem("userFriends"));
    console.log(userFriends);

    let followButtonArea = document.querySelectorAll(".connect-button");
    console.log(followButtonArea);
    let thisButton;

    for (let followArea of followButtonArea) {
      if (followArea["id"] == es) {
        thisButton = followArea;
      }
    }

    console.log(thisButton);

    let gatherUser = info.find((e) => e["userId"] == es);
    console.log(gatherUser);

    let userArray;

    if (userFriends !== null) {
      for (let uFriend of userFriends) {
        if (uFriend[0]["frienderId"] == findUser["userId"]) {
          userArray = uFriend;
        }
      }
    }

    console.log(userArray);

    if (userArray !== undefined) {
      for (let userArr of userArray) {
        if (userArr["userId"] == findDetails["userId"]) {
          return;
        }
      }

      let spliceIndex = userFriends.indexOf(userArray);

      userFriends.splice(spliceIndex);

      console.log(userFriends);

      let time = moment().format("LT");
      let date = moment().format("l");

      let userFriendObjest = {
        frienderId: findUser["userId"],
        time,
        date,
      };

      let userFriendsObjectAssaign = Object.assign(
        gatherUser,
        userFriendObjest
      );
      console.log(userFriendsObjectAssaign);

      userArray.push(userFriendsObjectAssaign);
      console.log(userArray);

      userFriends.push(userArray);

      localStorage.setItem("userFriends", JSON.stringify(userFriends));
      return;
    }

    let userFriendsArr = [];

    if (userFriends !== null) {
      userFriendsArr = userFriends;
    }

    let insideArray = [];

    let time = moment().format("LT");
    let date = moment().format("l");

    let frienderObj = {
      frienderId: findUser["userId"],
      time,
      date,
    };

    let friendsAssaign = Object.assign(gatherUser, frienderObj);

    insideArray.push(friendsAssaign);

    console.log(insideArray);

    userFriendsArr.push(insideArray);

    console.log(userFriendsArr);

    localStorage.setItem("userFriends", JSON.stringify(userFriendsArr));
  } catch (error) {
    console.log("An error occurred while get follow :", error);
  }
}

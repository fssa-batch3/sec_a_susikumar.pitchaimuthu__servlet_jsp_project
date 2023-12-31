// Creating a function to get the user list form the database

function getAllUsers() {
  const url = "/appfreshnest/GetAllUserList";
  axios
    .get(url)
    .then(function (response) {
      // handle success
      console.log(response.data);
      const usersArray = response.data;
      ShowListOfUsers(usersArray);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

getAllUsers();

function ShowListOfUsers(usersArray) {
  for (let elseFillData of usersArray) {
    // Code to create user cards
    let userCardContainer = document.createElement("div");
    userCardContainer.setAttribute("class", "user-card-container");
    userCardContainer.setAttribute("id", elseFillData["username"]);

    let searchCard = document.createElement("div");
    searchCard.setAttribute("class", "user-card");
    userCardContainer.append(searchCard);

    let userCardInsideDiv = document.createElement("div");
    userCardInsideDiv.setAttribute("class", "user-card-inside-div");
    searchCard.append(userCardInsideDiv);

    let tinyImageContentContainer = document.createElement("div");
    tinyImageContentContainer.setAttribute(
      "class",
      "tiny-image-content-container"
    );
    userCardInsideDiv.append(tinyImageContentContainer);

    let tinyProfileDiv = document.createElement("div");
    tinyProfileDiv.setAttribute("class", "tiny-profile-div");
    tinyImageContentContainer.append(tinyProfileDiv);

    let tinyImage = document.createElement("img");
    tinyImage.setAttribute("alt", "user-profile");
    tinyImage.setAttribute("class", "tiny-image");
    tinyImage.setAttribute("id", elseFillData["userId"]);
    tinyImage.setAttribute("src", elseFillData["profileImage"]);
    tinyImage.setAttribute("onclick", "getAnotherUserProfileDetails(this.id)");
    tinyProfileDiv.append(tinyImage);

    let tinyContentContainer = document.createElement("div");
    tinyContentContainer.setAttribute("class", "tiny-content-container");
    tinyImageContentContainer.append(tinyContentContainer);

    let tinyH3 = document.createElement("h3");
    tinyH3.setAttribute("class", "tiny-name");
    tinyH3.innerHTML = elseFillData["username"];
    tinyContentContainer.append(tinyH3);

    let tinyP = document.createElement("p");
    tinyP.setAttribute("class", "tiny-para");
    tinyP.innerHTML = elseFillData["userTheme"];
    tinyContentContainer.append(tinyP);

    let viewBUttonDiv = document.createElement("div");
    viewBUttonDiv.setAttribute("class", "view-button-div");
    userCardInsideDiv.append(viewBUttonDiv);

    let viewButton = document.createElement("button");
    viewButton.setAttribute("class", "view");
    viewButton.innerHTML = "view";
    viewButton.setAttribute("id", elseFillData["userId"]);
    viewButton.setAttribute("onclick", "showUser(this.id)");
    viewBUttonDiv.append(viewButton);

    document
      .querySelector(".all-user-showing-inside-div")
      .append(userCardContainer);
  }
}

// Creating a function get the user details from the database

async function showUser(userId) {
  try {
    // getting element of creating element to remove
    let removingElement = document.querySelector(".details-inside-div-container");

    if (removingElement !== null) {
      document.querySelector(".details-inside-div-container").remove();
    }

    const url = "/appfreshnest/HomePageUserDetail?userId=" + userId;
    
    // Use `await` directly on the axios call
    const response = await axios.get(url);
    let userData = response.data;
    console.log(userData);

    // handle success
    console.log(response.data);
    const userDetails = response.data;

    userCardDetailsShow(userDetails);
  } catch (error) {
    console.error("Error:", error);
  }
}
async function userCardDetailsShow(findClickingUser) {
  try {
    let detailsInsideDivContainer = document.createElement("div");
    detailsInsideDivContainer.setAttribute(
      "class",
      "details-inside-div-container"
    );

    let removeDivContainer = document.createElement("div");
    removeDivContainer.setAttribute("class", "remove-div-container");
    detailsInsideDivContainer.append(removeDivContainer);

    let removeDiv = document.createElement("div");
    removeDiv.setAttribute("class", "remove-div");
    removeDiv.setAttribute("onclick", "removediv()");
    removeDivContainer.append(removeDiv);

    let removeI = document.createElement("i");
    removeI.setAttribute("class", "bi bi-x-circle-fill");
    removeDiv.append(removeI);

    let imageContentDivContainer = document.createElement("div");
    imageContentDivContainer.setAttribute(
      "class",
      "image-content-div-container"
    );
    detailsInsideDivContainer.append(imageContentDivContainer);

    let imageDivContainer = document.createElement("div");
    imageDivContainer.setAttribute("class", "image-div-container");
    imageContentDivContainer.append(imageDivContainer);

    let showingImage = document.createElement("img");
    showingImage.setAttribute("class", "showing-image");
    showingImage.setAttribute("src", findClickingUser["profileImage"]);
    showingImage.setAttribute("alt", "profile-image");
    imageDivContainer.append(showingImage);

    let contentContainer = document.createElement("div");
    contentContainer.setAttribute("class", "content-container");
    imageContentDivContainer.append(contentContainer);

    let contentInsideDiv = document.createElement("div");
    contentInsideDiv.setAttribute("class", "content-inside-div");
    contentContainer.append(contentInsideDiv);

    let h3 = document.createElement("h3");
    h3.setAttribute("class", "showing-name");
    h3.innerHTML = findClickingUser["username"];
    contentInsideDiv.append(h3);

    let showingPara = document.createElement("p");
    showingPara.setAttribute("class", "showing-para");
    showingPara.innerHTML = findClickingUser["userTheme"];
    contentInsideDiv.append(showingPara);

    // Creating for loop to get this friend's data

    const isFollowing = await checkUserFollowingOrNot(findClickingUser.userId);

    if (isFollowing) {
      let followingButton = document.createElement("button");
      followingButton.setAttribute("class", "following-button");
      followingButton.setAttribute("id", findClickingUser.userId);
      followingButton.setAttribute("onclick", "removeFollow(this.id)");
      followingButton.innerHTML = "Following";
      contentInsideDiv.append(followingButton);
    } else {
      let followButton = document.createElement("button");
      followButton.setAttribute("class", "follow-button");
      followButton.setAttribute("id", findClickingUser.userId);
      followButton.setAttribute("onclick", "getFollow(this.id)");
      followButton.innerHTML = "Follow";
      contentInsideDiv.append(followButton);
    }

    document
      .querySelector(".details-showing-container")
      .append(detailsInsideDivContainer);
  } catch (error) {
    console.log("Error:", error);
  }
}

async function checkUserFollowingOrNot(userId) {
  try {
    const url =
      "/appfreshnest/CheckUserFriendsServlet?userId=" +
      userId;
    const response = await axios.get(url);
    const serverMessage = response.data;
    return serverMessage === "follow";
  } catch (error) {
    console.error("Error:", error);
    return false; // Default to not following in case of an error
  }
}

function removediv() {
  try {
    document.querySelector(".details-inside-div-container").remove();
  } catch (error) {
    console.log("error: ", error);
  }
}

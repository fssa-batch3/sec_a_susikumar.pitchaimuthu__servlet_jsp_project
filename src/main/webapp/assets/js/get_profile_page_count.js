let userCountDetails;

function getUserProfilePageCounts(){
	
	const url = "/appfreshnest/GetProfilePageDetailsCountServlet";
	   axios.get(url)
			  .then(function (response) {
			    // handle success
			   userCountDetails  = response.data;   
			   showUserActivityCount();
			    userFriendsIterator(userCountDetails.userFriends);
			    stillIterator(userCountDetails.userStills);
			    
			     })
			  .catch(function (error) {
			    // handle error
			    console.log(error);		
	    })
}
getUserProfilePageCounts();

// Function show the user friends details
function getUserFriendsSuggestion(){
	const url = "/appfreshnest/GetUserFriendsSuggestionServlet";
	   axios.get(url)
			  .then(function (response) {
			    // handle success
			    let userSuggestions = response.data;
			    suggestionIterator(userSuggestions);
			     })
			  .catch(function (error) {
			    // handle error
			    console.log(error);		
	    })
	
}
getUserFriendsSuggestion();

// Uesr friends suggestion iterator
function suggestionIterator(userSuggestion){
	for(let suggestion of userSuggestion){
		suggestionDivContainer(suggestion);
		
	}
}


// sugestion showing div container

function suggestionDivContainer(suggestion){
	
	// Create the main container div
const userCardDivContainer = document.createElement("div");
userCardDivContainer.classList.add("user-card-div-container");

// Create the inside div
const userCardInsideDiv = document.createElement("div");
userCardInsideDiv.classList.add("user-card-inside-div");

// Create the image and name container
const userImageNameDivContainer = document.createElement("div");
userImageNameDivContainer.classList.add("user-image-name-div-container");

// Create the image and name inside div
const userImageNameInsideDiv = document.createElement("div");
userImageNameInsideDiv.classList.add("user-image-name-inside-div");

// Create the user image
const userImage = document.createElement("img");
userImage.classList.add("user-suggestion-image");
userImage.src = suggestion.profileImage;
userImage.alt = "user-image";

// Create the user name paragraph
const userName = document.createElement("p");
userName.textContent = suggestion.username;

// Append the user image and name elements to their containers
userImageNameInsideDiv.appendChild(userImage);
userImageNameInsideDiv.appendChild(userName);

// Create the add icons container
const addIconDivContainer = document.createElement("div");
addIconDivContainer.classList.add("add-icon-div-container");

// Create the add icons inside div
const addIconInsideDiv = document.createElement("div");
addIconInsideDiv.classList.add("add-icon-inside-div");

// Create the add icon element
const addIcon = document.createElement("i");
addIcon.classList.add("bi", "bi-person-plus-fill");
addIcon.setAttribute("id", suggestion.userId);

// Append the add icon element to its container
addIconInsideDiv.appendChild(addIcon);

// Append the user image and name container, and add icons container to the main inside div
userImageNameDivContainer.appendChild(userImageNameInsideDiv);
addIconDivContainer.appendChild(addIconInsideDiv);
userCardInsideDiv.appendChild(userImageNameDivContainer);
userCardInsideDiv.appendChild(addIconDivContainer);

// Append the main inside div to the main container div
userCardDivContainer.appendChild(userCardInsideDiv);

document.querySelector(".user-suggestion-card-inside-div").appendChild(userCardDivContainer);

}

// Gallery page redirection function

function galleryRedirection(){
	window.location.href = "../pages/snap-gallery.html";
}


// Function set the user details count

function showUserActivityCount(){
	let frinedsCount = document.querySelector(".user-friends-count");
	let blockedCount = document.querySelector(".user-blocked-friends-count");
	let inviteCount = document.querySelector(".user-invite-count");
	
	frinedsCount.innerText = "(" +  userCountDetails.userFriends.length + ")";
	inviteCount.innerText ="(" +  userCountDetails.userInvites.length  + ")";
	blockedCount.innerText ="(" +  userCountDetails.userBlockFriends.length + ")";

}

// User friends iterator
function userFriendsIterator(userFriends){
	for(let friend of userFriends){
		showUserFriendsDetails(friend);
   }
}

// Show the user friends

function showUserFriendsDetails(friend){
	// Create the outermost div with class "activity-card-div-container"
const activityCardContainer = document.createElement('div');
activityCardContainer.classList.add('activity-card-div-container', 'user-card-container' , friend["username"]);

// Create the div with class "activity-card-inside-div"
const activityCardInsideDiv = document.createElement('div');
activityCardInsideDiv.classList.add('activity-card-inside-div');

// Create the div with class "activity-image-and-name-div"
const activityImageAndNameDiv = document.createElement('div');
activityImageAndNameDiv.classList.add('activity-image-and-name-div');

// Create the div with class "activity-image-and-name-inside-div"
const activityImageAndNameInsideDiv = document.createElement('div');
activityImageAndNameInsideDiv.classList.add('activity-image-and-name-inside-div');

// Create the image element
const image = document.createElement('img');
image.src = friend["profileImage"];
image.alt = 'activity-image';
image.classList.add('activity-image');

// Create the paragraph element with class "activity-name"
const activityName = document.createElement('p');
activityName.classList.add('activity-name');
activityName.textContent = friend["username"];

// Append the image and paragraph to the "activity-image-and-name-inside-div"
activityImageAndNameInsideDiv.appendChild(image);
activityImageAndNameInsideDiv.appendChild(activityName);

// Create the div with class "view-more-button-div"
const viewMoreButtonDiv = document.createElement('div');
viewMoreButtonDiv.classList.add('view-more-button-div');

// Create the div with class "view-more-button-inside-div"
const viewMoreButtonInsideDiv = document.createElement('div');
viewMoreButtonInsideDiv.classList.add('view-more-button-inside-div');

// Create the button element with class "btn btn-primary view-details-button"
// Create the button element
const viewDetailsButton = document.createElement('button');
viewDetailsButton.type = 'button';
viewDetailsButton.classList.add('btn', 'btn-primary', 'view-details-button');
viewDetailsButton.setAttribute("id",friend["userId"]);
viewDetailsButton.addEventListener("click", function() {
	let userId = this.id;
	showUserFriendsDetail(userId);
})
viewDetailsButton.textContent = 'View Details';

// Append the button to the "view-more-button-inside-div"
viewMoreButtonInsideDiv.appendChild(viewDetailsButton);

// Append all the elements to their respective parent elements
activityImageAndNameDiv.appendChild(activityImageAndNameInsideDiv);
viewMoreButtonDiv.appendChild(viewMoreButtonInsideDiv);
activityCardInsideDiv.appendChild(activityImageAndNameDiv);
activityCardInsideDiv.appendChild(viewMoreButtonDiv);
activityCardContainer.appendChild(activityCardInsideDiv);

// Finally, add the outermost div to the document's body or any other desired location
document.querySelector(".user-activity-showing-inside-div").appendChild(activityCardContainer);

	
}

// Still iterator
function stillIterator(stillList) {
  let count = 0; 

  for (let still of stillList) {
    showUserStills(still);
    count++;

    if (count === 9) {
      return;
    }
  }
}


// Show user stills

function showUserStills(still){	
// Create the img element
const imageElement = document.createElement('img');
imageElement.src = still["stillUrl"];
imageElement.classList.add('rounded', 'mx-auto', 'd-block', 'latest-stills');
imageElement.alt = 'latest-stils';

document.querySelector(".latest-images-inside-div").append(imageElement);

}


// Show the user invite 


// Show the user blocked frineds 


// Show activity details

function showUserFriendsDetail(userId){
	let userObject = userCountDetails.userFriends.find((e) => e.userId == userId);
	removeDetailElement();
	showDetail(userObject);
}


// details showing div

function showDetail(userObject){
	
	// Create the outermost div with class "user-activity-detail-showing-div-container"
const userActivityDetailContainer = document.createElement('div');
userActivityDetailContainer.classList.add('user-activity-detail-showing-div-container');

// Create the div with class "user-activity-details-showing-inside-div"
const userActivityDetailsInsideDiv = document.createElement('div');
userActivityDetailsInsideDiv.classList.add('user-activity-details-showing-inside-div');

// Create the div with class "activity-details-image-and-name-div"
const activityDetailsImageAndNameDiv = document.createElement('div');
activityDetailsImageAndNameDiv.classList.add('activity-details-image-and-name-div');

// Create the div with class "activity-details-image-and-name-inside-div"
const activityDetailsImageAndNameInsideDiv = document.createElement('div');
activityDetailsImageAndNameInsideDiv.classList.add('activity-details-image-and-name-inside-div');

// Create the div with class "text-center"
const textCenterDiv = document.createElement('div');
textCenterDiv.classList.add('text-center');

// Create the image element
const image = document.createElement('img');
image.src = userObject["profileImage"];
image.classList.add('rounded', 'activity-details-image');
image.alt = 'activity-image';

// Create the div with class "activity-name-div"
const activityNameDiv = document.createElement('div');
activityNameDiv.classList.add('activity-name-div');

// Create the paragraph element with class "activity-name"
const activityName = document.createElement('p');
activityName.classList.add('activity-name');
activityName.textContent = userObject["username"];

// Create the div with class "activity-additional-details"
const additionalDetailsDiv = document.createElement('div');
additionalDetailsDiv.classList.add('activity-additional-details');

const followOptionViewMoreDetailsDiv = document.createElement("div");
followOptionViewMoreDetailsDiv.classList.add("follow-option-view-more-details-div");

// Create the "Following" button
const followingButton = document.createElement("button");
followingButton.type = "button";
followingButton.classList.add("btn", "btn-primary", "btn-sm");
followingButton.setAttribute("id", userObject["userId"]);
followingButton.setAttribute("onclick" , "userUnFollowFunction(this.id)")
followingButton.textContent = "Following";

// Create the "View more" button
const viewMoreButton = document.createElement("button");
viewMoreButton.type = "button";
viewMoreButton.classList.add("btn", "btn-outline-info", "btn-sm");
viewMoreButton.setAttribute("id", userObject["userId"]);
viewMoreButton.textContent = "View more";

// Append the buttons to the main container div
followOptionViewMoreDetailsDiv.appendChild(followingButton);
followOptionViewMoreDetailsDiv.appendChild(viewMoreButton);

// Append the elements to their respective parent elements
activityNameDiv.appendChild(activityName);
textCenterDiv.appendChild(image);
activityDetailsImageAndNameInsideDiv.appendChild(textCenterDiv);
activityDetailsImageAndNameInsideDiv.appendChild(activityNameDiv);
activityDetailsImageAndNameInsideDiv.appendChild(followOptionViewMoreDetailsDiv);
activityDetailsImageAndNameDiv.appendChild(activityDetailsImageAndNameInsideDiv);
userActivityDetailsInsideDiv.appendChild(activityDetailsImageAndNameDiv);
userActivityDetailsInsideDiv.appendChild(additionalDetailsDiv);
userActivityDetailContainer.appendChild(userActivityDetailsInsideDiv);

document.querySelector(".user-activity-details-showing-div-container-div").appendChild(userActivityDetailContainer);

}


// detial element remove 

function removeDetailElement() {
    let element = document.querySelector(".user-activity-detail-showing-div-container");
    
    if (element !== null) {
        element.remove();
    }
}



// User unfollow function
function userUnFollowFunction(userId) {
  // Display a confirmation prompt
  const confirmation = window.confirm("Are you sure you want to unfollow this user?");

  // Check if the user confirmed
  if (confirmation) {
    const url = "/appfreshnest/UserUnfollowServlet?userId=" + userId;
    axios
      .get(url)
      .then(function (response) {
        // Handle success
        let unFollowResponse = response.data;
        console.log(unFollowResponse);
        if (unFollowResponse === "success") {
          getUserFriendsSuggestion();
        }
      })
      .catch(function (error) {
        // Handle error
        console.log(error);
      });
  } else {
	  return;
  }
}


// user invite selection function

function userOptionSelection(dataType){
// remove previous selection	
let select = document.querySelector(".selected");
select.classList.remove("selected");

// user option color visible 	
let userOptions = document.querySelectorAll(".friends-div");

 for(let option of userOptions){
	 if(option["id"] === dataType){
		 option.classList.add("selected");
		 optionDivider(dataType);
	 }
 }
	
}

// Option showing details
function optionDivider(option){
	// Remove options
	removePreviousActivity();
	
	// Show the current activity options
	if(option === "friends"){
		userFriendsIterator(userCountDetails.userFriends);
	}else if(option === "Invites"){
		userFriendsIterator(userCountDetails.userInvites);
	}else {
		userFriendsIterator(userCountDetails.userBlockFriends);
	}
}

// Previous option remove function 
function removePreviousActivity(){
    // Remove the activity detail card
    removeDetailElement();	

	// Get the activity elment holder
	let parentElement = document.querySelector(".user-activity-showing-inside-div");
	
    // Remove all child elements
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}




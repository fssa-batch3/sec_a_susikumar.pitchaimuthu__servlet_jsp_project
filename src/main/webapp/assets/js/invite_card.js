// Get user details

function findUserProfileDetails(){
		const url = "/appfreshnest/UserProfileDetails";
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    console.log(response.data);
			     profileUser = response.data;
			    displayProfileImageAndName(profileUser);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
}
findUserProfileDetails();

// Profile user details adding
function displayProfileImageAndName(profileUser){

let profileNameDiv = document.createElement("div");
profileNameDiv.setAttribute("class", "profile-user-nmae-div");
document.querySelector(".invite-inside-profile-div").append(profileNameDiv);

let profileName = document.createElement("p");
profileName.setAttribute("class", "prfile-user-name");
profileName.innerHTML = profileUser["username"];
profileNameDiv.append(profileName);

let profileDiv = document.createElement("div");
profileDiv.setAttribute("class", "user-profile-div");
document.querySelector(".invite-inside-profile-div").append(profileDiv);

let profileImg = document.createElement("img");
profileImg.setAttribute("class", "profile-image");
profileImg.setAttribute("src", profileUser["profileImage"]);
profileDiv.append(profileImg);

}
// using url parameters for get a invite id

let inviteUrl = window.location.search;

let inviteUrlParam = new URLSearchParams(inviteUrl);

let inviteId = inviteUrlParam.get("inviteId");
console.log(inviteId);


	function getInviteDetails() {
		
			const url = "http://localhost:8080/appfreshnest/InviteDetailsServlet?inviteId=" + inviteId;
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    console.log(response.data);
			    const inviteDetails = response.data;
			    diaplayInviteDetails(inviteDetails);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
		}
		
  
    getInviteDetails();




let element = document.querySelector(".chart-div");
let element_two = document.querySelector(".chart-div-three");
let element_three = document.querySelector(".chart-div-two");



// first element chart div

function diaplayInviteDetails(findInvite){

let likeStrength =8;
console.log(likeStrength);
let heartStrength =5;
let noStrength = 3;

element.setAttribute("data-percent", heartStrength);
let chartOnePara = document.querySelector(".first");
console.log(chartOnePara);
console.log(findInvite["inviteHeart"]);
chartOnePara.innerHTML = heartStrength + "%";

element_two.setAttribute("data-percent", likeStrength);
let chartTwoPara = document.querySelector(".second");
chartTwoPara.innerHTML = likeStrength + "%";

element_three.setAttribute("data-percent", noStrength);
let chartThreePara = document.querySelector(".three");
chartThreePara.innerHTML = noStrength + "%";

// create element for showing the invite

let invite_image = document.createElement("img");
invite_image.setAttribute("class", "invite-image");
invite_image.setAttribute("src", findInvite["inviteImage"]);
document.querySelector(".invite-inside-div").append(invite_image);

// this elements for show the invite details

let inviteName = (document.getElementById("inviteName").value =
  findInvite["inviteType"]);

let inviteDate = (document.getElementById("inviteDate").value =
  findInvite["inviteDate"]);

let inviteTime = (document.getElementById("inviteTime").value =
  findInvite["inviteTime"]);

let specialPerson = (document.getElementById("specialPerson").value =
  findInvite["specialPerson"]);

let inviteGlimpse = (document.getElementById("inviteGlimpse").value =
  findInvite["inviteSlogan"]);
let inviteExpand = (document.getElementById("inviteExplanation").value =
  findInvite["inviteExplanation"]);

}

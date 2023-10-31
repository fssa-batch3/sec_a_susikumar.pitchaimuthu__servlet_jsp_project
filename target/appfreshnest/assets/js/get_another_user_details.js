 const urlParams = new URLSearchParams(window.location.search);

// Get the value of the userId parameter
  const userId = urlParams.get('userId');

function getUserDetails(userId) {
  const url = "/appfreshnest/HomePageUserDetail?userId=" + userId; 
  axios.get(url)
    .then(function (response) {
      let userData = response.data;
      console.log(userData); 
      showTheUserDetails(userData);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

// Call the function with a userId
getUserDetails(userId); 

// Show the user profile deatails

function showTheUserDetails(userDetails){
	
	let userName = document.querySelector("#profile-head");
	let userTheme = document.querySelector(".user-head-theme");
	let userName2 = document.querySelector(".userName");
	let userTheme2 = document.querySelector(".user-theme");
	let joined = document.querySelector(".age-para");
	let city = document.querySelector(".city-para");
	let profileImage = document.querySelector("#profile-image");
	
	
	userName.innerHTML = userDetails["username"];
	userTheme.innerHTML = userDetails["userTheme"];
	userName2.innerHTML = userDetails["username"];
	userTheme2.innerHTML = userDetails["userTheme"];
	city.innerHTML = userDetails["nationality"];
	profileImage.src = userDetails["profileImage"];
	joined.innerHTML = convertTime(userDetails["registerAt"]);
	
}		

// Convert the time to date, month and year format

// Convert timestamp to data, month and days

function convertTime(timestamp){
// Create a Date object from the input string
const date = new Date(timestamp);

// Define month names
const monthNames = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

// Extract the year, month, and day from the Date object
const year = date.getFullYear();
const month = monthNames[date.getMonth()];
const day = date.getDate();

// Create the formatted date string
const formattedDate = `${month} ${day}, ${year}`;

return formattedDate;

}

// Store the user details
let userFriends;


// Get user friends details
function getUserFriends(userId){
	 const url = "/appfreshnest/GetAnotherUserFriendsServlet?userId=" + userId; 
  axios.get(url)
    .then(function (response) {
       userFriends = response.data;
      showUserFriends(userFriends);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}


// Get the user activity details
function getUserActivity(userId){
	 const url = "/appfreshnest/GetAnotherUserFriendsServlet?userId=" + userId; 
  axios.get(url)
    .then(function (response) {
       userFriends = response.data;
      showUserFriends(userFriends);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}


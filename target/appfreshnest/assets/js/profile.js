// Profile user element value set creations

// get user from the url

function findUserProfileDetails(){
		const url = "http://localhost:8080/appfreshnest/UserProfileDetailServlet";
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    console.log(response.data);
			    const profileUser = response.data;
			    displayProfileDetails(profileUser);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
}

findUserProfileDetails();

function displayProfileDetails(findUser){

try {
  document.querySelector(".userName").innerHTML = findUser["username"];

  document.getElementById("profile-head").innerText =
    "Hello" + "   " + findUser["userName"];

  document.querySelector(".user-theme").innerHTML = findUser["userTheme"];

  document.querySelector(".age-para").innerHTML = findUser["age"];

  // profile image

  document.querySelector("#profile-image").src = findUser["profileImage"];

  document.querySelector(".city-para").innerHTML = findUser["city"] || "";
} catch (error) {
  console.log("An error occurred while show the profile details :", error);
}
}

// create element for show the use last activity

function getAllUsers(){
	
	const url = "http://localhost:8080/appfreshnest/GetAllUserListServlet";
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    console.log(response.data);
			    const usersArray = response.data;
			    ShowListOfUsers(usersArray);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
}


getAllUsers();

function ShowListOfUsers(SuggestedUsers){

try {

  for (let userSuggestions of SuggestedUsers) {
    let card = document.createElement("div");
    card.setAttribute("class", "card-div-container");
    card.innerHTML = `<div class="card-inside-div">
<div class="user-activity-image-div">
  <img
    class="activity-image"
    src="${userSuggestions["profileImage"]}"
    alt="activity-image"
  />
</div>

<div class="user-activity-name-div">
   <div class="user-name-div">
       <h3 class="user-name">${userSuggestions["username"]}</h3>
   </div>

    <div class="user-theme-div">
       <p class="user-theme">${userSuggestions["userTheme"]}</p>
    </div>
</div>

<div>
  <button class="connect-button" onclick="showDetails(this.id)" id=${userSuggestions["userId"]}>View</button>
</div>
</div>`;

    document.querySelector(".card-inside-control-div").append(card);
  }
} catch (error) {
  console.log("An error occurred while creating a suggest data :", error);
}
}


// profile page redirection eventListener

let profileEdit = document.querySelector(".hero-section-button");

profileEdit.addEventListener("click", () => {
  window.location.href =
    "../pages/profile-edit.html";
});


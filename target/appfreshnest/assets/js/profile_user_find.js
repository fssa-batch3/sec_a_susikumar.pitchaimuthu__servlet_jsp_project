// get user from the url

function findUserProfileDetails(){
		const url = "http://localhost:8080/appfreshnest/UserProfileDetailServlet";
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    console.log(response.data);
			    const profileUser = response.data;
			    displayProfileImageAndName(profileUser);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
}

findUserProfileDetails();
function displayProfileImageAndName(profileUser){
try {
  
  // profile image and details adding elements

  let profile_image = document.querySelector("#profile-image");
  let profile_name = document.querySelector(".name");
  let profile_profession = document.querySelector(".profession");

  profile_image.setAttribute("src", profileUser["profileImage"]);
  profile_name.innerHTML = profileUser["username"];
  
  if(profile_profession != null){
  profile_profession.innerHTML = profileUser["userTheme"];
  }
  
} catch (error) {
  console.log("An error occurred while find the profile user :", error);
}
}



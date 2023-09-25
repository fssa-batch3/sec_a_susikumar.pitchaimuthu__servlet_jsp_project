// first getting all the elements for the forms


function findUserProfileDetails(){
		const url = "http://localhost:8080/appfreshnest/UserProfileDetails";
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    console.log(response.data);
			    const profileUser = response.data;
			    showUserProfileDetails(profileUser);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
}

findUserProfileDetails();

function showUserProfileDetails(findUser){

try {
  let userNameP = document.querySelector(".profile-user-name");
  let userSloganP = document.querySelector(".profile-user-slogan");
  let profileImage = document.querySelector(".profile-image");
  let fName = document.querySelector("#firstName");
  let lName = document.querySelector("#lastName");
  let uName = document.querySelector("#userName");
  let bio = document.querySelector("#bio");
  let email = document.querySelector("#email");
  let city = document.querySelector("#city");
  let gender = document.querySelectorAll("#gender");
  let dateOfBirth = document.querySelector("#dateOfBirth");
  let phoneNumber = document.querySelector("#phone");

  // set the value to the all inputs

  profileImage.src = findUser["profileImage"];
  userNameP.innerHTML = findUser["username"];
  userSloganP.innerHTML = findUser["userTheme"];
  fName.value = findUser["firstName"];
  lName.value = findUser["lastName"];
  uName.value = findUser["username"];
  bio.value = findUser["userTheme"];
  email.value = findUser["email"];
  city.value = findUser["nationality"] || "";
  phoneNumber.value = findUser["mobileNumber"] || "";

  for (let allGender of gender) {
    if (allGender["value"] === findUser["gender"]) {
      allGender.checked = true;
    }
  }

  dateOfBirth.value = findUser["dob"];
} catch (error) {
  console.log("An error occured while adding the value to the input :", error);
}
}

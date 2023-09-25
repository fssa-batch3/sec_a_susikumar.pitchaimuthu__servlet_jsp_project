
// get user from the url

function findUserProfileDetails(){
		const url = "/appfreshnest/UserProfileDetails";
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

let userFirstName; 

function displayProfileDetails(findUser){

try {
  // Store references to HTML elements in variables
const userNameElement = document.querySelector(".userName");
const profileHeadElement = document.getElementById("profile-head");
const userThemeElement = document.querySelector(".user-theme");
const ageParaElement = document.querySelector(".age-para");
const profileImageElement = document.querySelector("#profile-image");
const cityParaElement = document.querySelector(".city-para");

// Assign values to the elements
const userFirstName = findUser["firstName"];
const username = findUser["username"];
const userTheme = findUser["userTheme"];
const age = findUser["age"] || "";
const profileImage = findUser["profileImage"];
const nationality = findUser["nationality"] || ""; 

// Update the elements with the assigned values
userNameElement.innerText = username;
profileHeadElement.innerText = "Hello " + username; 
userThemeElement.innerText = userTheme;
ageParaElement.innerText = age;
profileImageElement.src = profileImage;
cityParaElement.innerText = nationality;

} catch (error) {
  console.log("An error occurred while show the profile details :", error);
}
}

// create element for show the use last activity

function getAllUsers(){
	
	const url = "/appfreshnest/GetAllUserList";
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


// Profile image edit option div

let file = document.getElementById("file");

let image = document.getElementById("profile-image");

let ProfileOption = document.querySelector(".profile-option-div");

// onclick function for option display block

function showProfileOption() {
  try {
    if (ProfileOption.style.display === "none") {
      ProfileOption.style.display = "block";
    } else {
      ProfileOption.style.display = "none";
    }
  } catch (error) {
    console.log("An error occurred while imge element block :", error);
  }
};


// User profile image change function

file.addEventListener("change", function () {
  let choosePhoto = this.files[0];

  if (choosePhoto) {
    let reader = new FileReader();

    reader.addEventListener("load", function () {
      image.setAttribute("src", reader.result);

      
      let userProfileObj = {
        profileImage: reader.result,
      };
      
      profileImageChangeServer(userProfileObj);
       
    });

    reader.readAsDataURL(choosePhoto);
  }
});

// Transform to default profile image

function defaultProfile() {
  try {

    let avatarText = userFirstName.toUpperCase().charAt(0);
    console.log(avatarText);

    // avatar create

    let avatarCanva = document.createElement("canvas");
    let avatarContext = avatarCanva.getContext("2d");

    avatarCanva.width = 200;
    avatarCanva.height = 200;

    // creating a random color creation function
    let letters = "0123456789ABCDEF";
    let color = "#";

    let randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    for (let i = 0; i < 6; i++) {
      color += letters[randomArray[0] % 16];
      window.crypto.getRandomValues(randomArray);
    }

    // draw background
    avatarContext.fillStyle = color;
    avatarContext.fillRect(0, 0, avatarCanva.width, avatarCanva.height);

    // draw text

    avatarContext.font = "bold 100px Assistant";
    avatarContext.textAlign = "center";
    avatarContext.textBaseline = "middle";
    avatarContext.fillStyle = "#fff";
    avatarContext.fillText(
      avatarText,
      avatarCanva.width / 2,
      avatarCanva.height / 2
    );

    // return

    let imageUrl = avatarCanva.toDataURL("image/png");

    let changeImage = {
      profileImage: imageUrl,
    };
    
    profileImageChangeServer(changeImage);

  } catch (error) {
    console.log("An error occurred while chage the default image :", error);
  }
}


// Profile image change server

function profileImageChangeServer(profileObject){

const url = "/appfreshnest/UserProfileImageChangeServlet";

            axios.post(url, profileObject, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                // handle success
                let profileUpdateMessage = response.data;
                console.log(profileUpdateMessage);
                
                if(profileUpdateMessage === "success"){
					findUserProfileDetails();
					showProfileOption();
				}
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
}

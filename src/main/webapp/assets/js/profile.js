
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
 userFirstName = findUser["firstName"];
  // Store references to HTML elements in variables
let userNameElement = document.querySelector(".userName");
let profileImageElement = document.querySelector(".user-profile-image");
let firstName = document.querySelector(".firstname");
let lastName = document.querySelector(".lastname");
let joined  = document.querySelector(".joined");
let live = document.querySelector(".lives");
let userTheme = document.querySelector(".user-theme");

// Assign values to the elements
let username = findUser["username"];
let profileImage = findUser["profileImage"];

// Update the elements with the assigned values
userNameElement.innerText ="Hello " +  username;
profileImageElement.src = profileImage;
firstName.innerText = userFirstName;
lastName.innerText  = findUser["lastName"];
userTheme.innerText = findUser["userTheme"];
live.innerText = findUser["nationality"] || "";
joined.innerText  = convertTime(findUser["registerAt"]);

} catch (error) {
  console.log("An error occurred while show the profile details :", error);
}
}


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

// profile page redirection eventListener

let profileEdit = document.querySelector(".hero-section-button");

profileEdit.addEventListener("click", () => {
  window.location.href =
    "../pages/profile-edit.html";
});

// Profile image edit option div
let ProfileOption = document.querySelector(".option-div");

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

function profileImageChange() {
  let fileInput = document.createElement("input");
  fileInput.type = "file";

  fileInput.click(); 

  fileInput.addEventListener("change", function (e) {
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = function (e) {
      let fileContent = e.target.result;
      
       let userProfileObj = {
        profileImage: fileContent,
      };
      
      profileImageChangeServer(userProfileObj);

    };
    reader.readAsDataURL(file);
  });
}



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




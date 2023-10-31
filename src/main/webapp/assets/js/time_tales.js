let reelInput = document.querySelector(".reel-input");

reelInput.addEventListener("change", function (event) {
  try {
    let file = this.files[0];
    let reader = new FileReader();

    reader.onload = function (event) {
      let src = event.target.result;

      let video = document.createElement("video");

      // Wait for the metadata to load
      video.onloadedmetadata = function () {
        const duration = video.duration;

        let reelVideoObj = {
          media_url: src,
          taleDuration: duration
        };
            
       const url = "/appfreshnest/CreateTimeTalesServlet";

            axios.post(url, reelVideoObj, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                // handle success
                let serverMessage = response.data;
              })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
               
      };

      video.src = src;
    };

    reader.readAsDataURL(file);
  } catch (error) {
    console.log("An error occurred while accessing the reel file:", error);
  }
});

// Create the user time tale div

  function defaultTimeTalseElementCreation(profileUser) {
    try {
      let trendingBirdDivImage = document.createElement("img");
      trendingBirdDivImage.setAttribute("class", "time-tale-user-profile-image");
      trendingBirdDivImage.setAttribute("src", profileUser["profileImage"]);

      document.querySelector(".time-tale-user-profile-div").append(trendingBirdDivImage);
    } catch (error) {
      console.log("An error occurred while adding the user reel profile:", error);
    }
  }

  

// Gets the all time tales of the user

function getAllUserTimeTales(){
	
	const url = "/appfreshnest/GetUserTimeTalesServlet";
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    let timeTales = response.data;
			    
			    if(timeTales[0] != null){
					let reelMember = document.querySelector(".time-tale-user-profile-div");
                    reelMember.setAttribute("id", timeTales[0]["user"]["userId"]);
                    reelMember.setAttribute("data-user", "profileUser"); 
                    reelMember.style.border = "2px rgb(108, 156, 180) solid";
                    reelMember.addEventListener("click", function() {
					let type = reelMember.getAttribute("data-user");
                    redirectToTimeTalePage(type);
                  });
				}
			    
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })

}
getAllUserTimeTales();


// Redirection to the time tale shwing page

function redirectToTimeTalePage(type){
    window.location.href = "../pages/reel_showing.html?type=" +type;
}


// List user friends time tale feature
function listUserFriendsTimeTales(){
	const url = "/appfreshnest/GetUserFriendsTimeTalesServlet";
			axios.get(url)
			  .then(function (response) {
			    // handle success			    
			    let userFrinendsTimeTales = response.data;
			    showUserfriendsReel(userFrinendsTimeTales);
			  })
			  .catch(function (error) {
			    console.log(error);
			  })
}
listUserFriendsTimeTales();

function showUserfriendsReel(UserFriendTales){

for(let taleData of UserFriendTales){
try {
   
  // Create the outermost <div> element with class "tale-div-container"
const taleDivContainer = document.createElement('div');
taleDivContainer.classList.add('tale-div-container');
taleDivContainer.setAttribute("id", taleData[0]["userId"]);
taleDivContainer.setAttribute("onclick", "timeTaleUserIdGet(this.id)");

// Create the inner <div> with class "tale-inside-div-container"
const taleInsideDivContainer = document.createElement('div');
taleInsideDivContainer.classList.add('tale-inside-div-container');

// Create the <div> with class "reel-member-div"
const reelMemberDiv = document.createElement('div');
reelMemberDiv.classList.add('reel-member-div');

// Create the <img> element with class "reel-member-div-image"
const reelMemberImage = document.createElement('img');
reelMemberImage.classList.add('reel-member-div-image');
reelMemberImage.setAttribute('src', taleData[0]["profileImage"]); 

// Create the <div> with class "reel-username-div"
const reelUsernameDiv = document.createElement('div');
reelUsernameDiv.classList.add('reel-username-div');

// Create the <p> element with class "reel-username-para" and text content "I'm Susi"
const reelUsernamePara = document.createElement('p');
reelUsernamePara.classList.add('reel-username-para');
reelUsernamePara.textContent = taleData[0]["username"];

// Append elements to build the structure
reelMemberDiv.appendChild(reelMemberImage);
reelUsernameDiv.appendChild(reelUsernamePara);
taleInsideDivContainer.appendChild(reelMemberDiv);
taleInsideDivContainer.appendChild(reelUsernameDiv);
taleDivContainer.appendChild(taleInsideDivContainer);

  document.querySelector(".reel-container").append(taleDivContainer);
} catch (error) {
  console.log("An error occured while adding the user reel profile :", error);
}
}
}

function timeTaleUserIdGet(userId){
	 let type = "friends";
	window.location.href = "../pages/reel_showing.html?type=" + type + "&user=" + userId;

}
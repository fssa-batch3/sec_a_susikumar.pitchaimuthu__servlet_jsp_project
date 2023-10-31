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
                console.log(serverMessage);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
               

        // Use the reelVideoObj as needed
        console.log(reelVideoObj);
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
			    console.log(response.data);
			    
			    let timeTales = response.data;
			    console.log(timeTales);
			    
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
	console.log("called");
    window.location.href = "../pages/reel_showing.html?type=" +type;
}


// List user friends time tale feature
function listUserFriendsTimeTales(){
	
}
listUserFriendsTimeTales();



let thisButton;
function getFollow(userId){

 let followButtonArea = document.querySelectorAll(".follow-button");
    console.log(followButtonArea);

    for (let followArea of followButtonArea) {
      if (followArea["id"] == userId) {
        thisButton = followArea;
      }
    }
    
    console.log(thisButton);
    
     let followRequestObject = {
      followingId: userId,
      followType: "follow_request",
    };
    
    const url = "http://localhost:8080/appfreshnest/SendFollowRequest";

            axios.post(url, followRequestObject, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                // handle success
                console.log(response.data);
                let serverMessage = response.data;
                
                if(serverMessage == "success"){					
                    thisButton.remove("follow-button");

                    let followingButtonElement = document.createElement("button");
                    followingButtonElement.setAttribute("class", "following-button");
                    followingButtonElement.innerHTML = "Following";
                    document.querySelector(".content-inside-div").append(followingButtonElement);         
					
				}
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    
    }
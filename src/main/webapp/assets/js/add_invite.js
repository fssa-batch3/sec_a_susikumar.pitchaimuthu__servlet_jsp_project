// Get the current date
let currentDate = new Date().toISOString().split("T")[0];

// Set the minimum date for the input element
document.getElementById("party_date").setAttribute("min", currentDate);

// invite image reader function
let imageSrc;

function chooseInviteFile(){
  try {
    let inviteImage = document.createElement("input");
    inviteImage.type = "file";

    inviteImage.click();

    inviteImage.addEventListener("change", function () {
      try {
        let choosePhoto = this.files[0];
        if (choosePhoto) {
          let reader = new FileReader();

          reader.addEventListener("load", function () {
            try {
              imageSrc = reader.result;
            } catch (error) {
              console.log("error:", error);
            }
          });

          reader.readAsDataURL(choosePhoto);
        }
      } catch (error) {
        console.log("error:", error);
      }
    });
  } catch (error) {
    console.log("error:", error);
  }
};

// Writing EventListner for store user invites data
let inviteForm = document.querySelector("#invite-form");

inviteForm.addEventListener("submit", (sub) => {
  try {
    sub.preventDefault();

    let inviteType = document.getElementById("party_name").value.trim();

    let inviteTime = document.getElementById("party_time").value.trim();

    let inviteDate = document.getElementById("party_date").value.trim();
    let specialPerson = document.getElementById("special_person").value.trim();
    let inviteSlogan = document
      .getElementById("party_short_note")
      .value.trim();
    let inviteExplanation = document
      .getElementById("party_expand_passage")
      .value.trim();

    let inviteObj = {
      inviteType,
      inviteDate,
      inviteImage: imageSrc,
      inviteTime: inviteTime,
      specialPerson,
      inviteSlogan,
      inviteExplanation,
    };


    const url = "/appfreshnest/CreateInvite";

            axios.post(url, inviteObj, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                // handle success
              const serverMsg = response.data;
              if(serverMsg == "success"){
				  window.location.href= "./invite.html";
			  }else {
				  
				  const icon = document.createElement('i');
                icon.className = 'bi bi-exclamation-circle-fill error-icon';
                icon.setAttribute('aria-hidden', 'true');

              // Create the <p> element with class and text content
               const paragraph = document.createElement('p');
               paragraph.className = 'error-para';
               paragraph.textContent = serverMsg;

               let parent = document.querySelector(".error-message-div");

              // Remove previous error message elements
              while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
              }

              // Append the new error message elements
              parent.appendChild(icon);
              parent.appendChild(paragraph);

			  }
				  			  			                 
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        
  } catch (error) {
    console.log("error: " + error.message);
  }
});

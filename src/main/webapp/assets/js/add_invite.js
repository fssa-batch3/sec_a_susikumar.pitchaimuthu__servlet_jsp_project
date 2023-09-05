// invite image reader function
console.log("yeah");

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
              console.log(imageSrc);
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

console.log(imageSrc);

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



    // converting the reilway time local time

   // let [hours, minutes] = inviteTime.split(":");
    // let convertedHours = hours % 12;
    //let period = hours >= 12 ? "PM" : "AM";
    //let convertedTime = `${convertedHours}:${minutes} ${period}`;


    // cna't select past time

    let inviteObj = {
      inviteType,
      inviteDate,
      inviteImage: imageSrc,
      inviteTime: inviteTime,
      specialPerson,
      inviteSlogan,
      inviteExplanation,
    };

    console.log(inviteObj);

    const url = "http://localhost:8080/appfreshnest/CreateInviteServlet";

            axios.post(url, inviteObj, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                // handle success
                console.log(response.data);
              const serverMsg = response.data;
				  window.location.href= "./invite.jsp";
			  
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        
  } catch (error) {
    console.log("error: " + error.message);
  }
});

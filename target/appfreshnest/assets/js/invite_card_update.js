// Get the current date
let currentDate = new Date().toISOString().split("T")[0];

// Set the minimum date for the input element
document.getElementById("inviteDate").setAttribute("min", currentDate);

// assigning the chart data-percnetage..

// chat creation function

let chartOne = new EasyPieChart(element, {
  barColor: "#9B1C31",
  lineWidth: 14,
  lineCap: "circle",
  size: 95,
});

// second element of chart second div

console.log(element_two);
let chartTwo = new EasyPieChart(element_two, {
  barColor: "#A2D2FF",
  lineWidth: 14,
  lineCap: "circle",
  size: 95,
});

// Third element of the chart third div

console.log(element_three);
let chartThree = new EasyPieChart(element_three, {
  barColor: "#FFAE42",
  lineWidth: 14,
  lineCap: "circle",
  size: 95,
});



// for loop undisabled all input from disabled

 let inviteDisabled = document.querySelectorAll(".inviteInput");
  let editInvite = document.getElementById("edit-button");
  let editButton = document.getElementById("save-button");

  editInvite.addEventListener("click", (e) => {
    e.preventDefault();
    for (let disable of inviteDisabled) {
      disable.removeAttribute("disabled");
    }

    if (editButton.style.display === "none" || editButton.style.display === "") {
      editButton.style.display = "block";
    } else {
      editButton.style.display = "none";
    }

    if (editInvite.style.display === "block" || editInvite.style.display === "") {
      editInvite.style.display = "none";
    } else {
      editInvite.style.display = "block";
    }
  });



// write a function for to read file path and convert into to google url

let image;
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
              image = reader.result;
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
console.log(image);

// Get previous invite image
async function getPreviousInviteImage() {
  const url = "/appfreshnest/InviteDetailsServlet?inviteId=" + inviteId;
  
  try {
    const response = await axios.get(url);
    const inviteDetails = response.data;
    return inviteDetails.inviteImage;
  } catch (error) {
    console.log(error);
  }
}

// eventListener for showing invite
editButton.addEventListener("click", async (inv) => {
  try {
    inv.preventDefault();
    let inviteType = document.getElementById("inviteName").value.trim();
    let inviteDate = document.getElementById("inviteDate").value.trim();
    let inviteTime = document.getElementById("inviteTime").value.trim();
    let inviteSlogan = document.getElementById("inviteGlimpse").value.trim();
    let inviteExplanation = document
      .getElementById("inviteExplanation")
      .value.trim();
    let specialPerson = document.getElementById("specialPerson").value.trim();
    
    if (image == null) {
      image = await getPreviousInviteImage();
    }

    let inviteEditObj = {
      inviteType,
      inviteDate,
      inviteTime,
      inviteExplanation,
      inviteSlogan,
      specialPerson,
      inviteImage: image
    };
    
    const url = "/appfreshnest/InviteDetailsServlet?inviteId=" + inviteId;

    const response = await axios.post(url, inviteEditObj, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    // handle success
    console.log(response.data);
    let inviteUpdateMessage = response.data;
    if(inviteUpdateMessage === "success"){
    window.location.href = "./invite.html"; 
     }else {
		 const icon = document.createElement('i');
                icon.className = 'bi bi-exclamation-circle-fill error-icon';
                icon.setAttribute('aria-hidden', 'true');

              // Create the <p> element with class and text content
               const paragraph = document.createElement('p');
               paragraph.className = 'error-para';
               paragraph.textContent = inviteUpdateMessage;

               let parent = document.querySelector(".error-message-div");

              // Remove previous error message elements
              while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
              }

              // Append the new error message elements
              parent.appendChild(icon);
              parent.appendChild(paragraph);
		 
	 }
  } catch (error) {
    console.log("An error occurred while getting the update data:", error);
  }
});


// Delete invite option

let deleteInviteButton = document.getElementById("delete-invite-button");

deleteInviteButton.addEventListener("click", (deIn) => {
  try {
    deIn.preventDefault();

    let deleteInvite = confirm("Are sure to Delete your fresh invite");

    if (deleteInvite !== true) {
      return;
    } else {
  
     const url = "/appfreshnest/InviteDeleteServlet?inviteId=" + inviteId;
			axios.get(url)
			  .then(function (response) {
			    // handle success
		        window.location.href="./invite.html";

			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
      
    }
  } catch (error) {
    console.log("An error occured while delete the invite :", error);
  }
});


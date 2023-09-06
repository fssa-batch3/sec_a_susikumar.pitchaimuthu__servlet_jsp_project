
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

let invitefile = document.getElementById("party_image");
console.log(invitefile);
let image;
invitefile.addEventListener("change", function () {
  let choosePhoto = this.files[0];
  console.log("manisha");
  if (choosePhoto) {
    let reader = new FileReader();

    reader.addEventListener("load", function () {
      image = reader.result;
      console.log(image);
    });

    reader.readAsDataURL(choosePhoto);
  }
});

console.log(image);

// eventListener for showing invite
editButton.addEventListener("click", (inv) => {
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

    let inviteEditObj = {
      inviteType,
      inviteDate,
      inviteTime,
      inviteExplanation,
      inviteSlogan,
      specialPerson,
      inviteImage: image
    };
    
     const url = "http://localhost:8080/appfreshnest/InviteDetailsServlet?inviteId=" + inviteId;

            axios.post(url, inviteEditObj, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                // handle success
                console.log(response.data);
                window.location.href="./invite.html";
                
				
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        

    for (let inDisable of inviteDisabled) {
      inDisable.setAttribute("disabled", "");
    }

    if (editButton.style.display === "block") {
      editButton.style.display = "none";
    }

    if (editInvite.style.display === "none") {
      editInvite.style.display = "block";
    }
  } catch (error) {
    console.log("An error occurred while getting the update data :", error);
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
  
     const url = "http://localhost:8080/appfreshnest/InviteDeleteServlet?inviteId=" + inviteId;
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    console.log(response.data);
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


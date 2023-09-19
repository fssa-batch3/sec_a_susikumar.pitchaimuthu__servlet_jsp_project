// Birthday page form element

let birthdayForm = document.querySelector("#birthday-form");

birthdayForm.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    let birthday = document.getElementById("birthday").value.trim();
    let gender = document.getElementsByName("gender");
    console.log(gender);

    // calculating the age

    let currentDay = new Date();
    let birthDate = new Date(birthday);
    let age = currentDay.getFullYear() - birthDate.getFullYear();
    let monthDiff = currentDay.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDay.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    console.log(age);

    let birthdate = new Date(birthday);

    // Get today's date
    let today = new Date();

    // Calculate the user's age in milliseconds
    let ageInMilliseconds = today - birthdate;

    // Convert the age to years
    let ageInYears = ageInMilliseconds / 1000 / 60 / 60 / 24 / 365;

    if (ageInYears <= 18) {
		let serverMessage = "Age should be more than 18";
       errorMessageElementCreation(serverMessage);
      return;
    }

    let userGen;

    for (let genders of gender) {
      if (genders.checked) {
        userGen = genders.value;
      }
    }

    let birthDayObject = {
      dateOfBirth: birthday,
      gender: userGen,
      age: age
    };

    console.log(birthDayObject);
    
    
     const url = "http://localhost:8080/appfreshnest/updateUserBirthdayDetails";

            axios.post(url, birthDayObject, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                // handle success
                let serverMessage = response.data;
                console.log(serverMessage);
              if(serverMessage == "success"){
                 alert("Birthday updated successfully");
                 window.location.href = "./login.html";
              }else {
				  errorMessageElementCreation(serverMessage);
			  }
              
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
               
  } catch (error) {
    console.log("Error: " + error.message);
  }
});

function errorMessageElementCreation(serverMessage){
	  const icon = document.createElement('i');
                icon.className = 'bi bi-exclamation-circle-fill error-icon';
                icon.setAttribute('aria-hidden', 'true');

              // Create the <p> element with class and text content
               const paragraph = document.createElement('p');
               paragraph.className = 'error-para';
               paragraph.textContent = serverMessage;

               let parent = document.querySelector(".error-message-div");

              // Remove previous error message elements
              while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
              }

              // Append the new error message elements
              parent.appendChild(icon);
              parent.appendChild(paragraph);
	  }

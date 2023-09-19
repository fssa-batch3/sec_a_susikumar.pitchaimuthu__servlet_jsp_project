let changes = document.getElementById("change-form");
changes.addEventListener("submit", function (e) {
  e.preventDefault();
  try {
    let fname = document.getElementById("firstName").value.trim();
    let lname = document.getElementById("lastName").value.trim();
    let u1name = document.getElementById("userName").value.trim();
    let mobile = document.getElementById("phone").value;
    let old = document.getElementById("dateOfBirth").value.trim();
    let editBio = document.getElementById("bio").value.trim();
    let editCity = document.getElementById("city").value.trim();

    let currentGender;

    for (let ingender of gender) {
      if (ingender.checked) {
        currentGender = ingender.value;
      }
    }

    let editObj = {
      firstName: fname,
      lastName: lname,
      userName: u1name,
      mobileNumber: mobile,
      city: editCity,
      userTheme: editBio,
      userGender: currentGender,
      dob: old
    };

     const url = "http://localhost:8080/appfreshnest/ProfileEditServlet";

            axios.post(url, editObj, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                // handle success
                console.log(response.data);
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        
    
   
    
  } catch (error) {
    console.log("An error occurred while save profile edit data", error);
  }
});

// cancel button function

let cancelButton = document.querySelector("#cancel-button");

cancelButton.addEventListener("click", () => {
  try {
    window.location.href = "../pages/profile.html?user=" + findUser["userId"];
  } catch (error) {
    console.log("An error occurred while cancel edit :", error);
  }
});

// otp generation function

let updateButton = document.querySelector(".update");

updateButton.addEventListener("click", (e) => {
  e.preventDefault();

  try {
    // generate otp function

    sendUpdateOtp();

    // otp card element creation

    let otpCardDivContainer = document.createElement("div");
    otpCardDivContainer.setAttribute("class", "otp-card-div-container");
    otpCardDivContainer.innerHTML = `
    <div class="otp-card-inside-div">
    <div class="otp-content-div">
      <h3 class="otp-content">Enter your OTP</h3>
      <p class="otp-content">
        You would could receive the OTP in your email
      </p>
    </div>

    <div class="otp-container">
      <input class="otp-input" type="number" maxlength="1" />
      <input class="otp-input" type="number" maxlength="1" />
      <input class="otp-input" type="number" maxlength="1" />
      <input class="otp-input" type="number" maxlength="1" />
    </div>

    <div class="button-div">
      <button class="otp-submit" onclick="otpSubmit">Submit</button>
      <button class="resend-otp">Resend OTP</button>
      <button type="button" class="cancel-otp btn btn-outline-warning">Cancel</button>
    </div>
  </div>
    `;

    document
      .querySelector(".common-section-container")
      .append(otpCardDivContainer);

    otpElementShow();
  } catch (error) {
    console.log("An error occured while creating otp element :", error);
  }
});

// email update function

function otpElementShow() {
  try {
    let otpInputs = document.querySelectorAll(".otp-input");

    otpInputs.forEach((input, index) => {
      input.addEventListener("input", (event) => {
        let currentValue = event.target.value;

        if (currentValue.length === 1) {
          if (index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          } else {
            input.blur(); // Move focus out of the last input
          }
        }
      });
    });
  } catch (error) {
    console.log("An error occurred while otp input function :", error);
  }
}

// otp sending function

function sendUpdateOtp() {
  try {
    let randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    let otp = 1000 + (randomArray[0] % 9000);

    console.log(otp);

    let params = {
      name: findUser["userName"],
      email: findUser["email"],
      subject: "This is your OTP for update your email id",
      message: otp,
    };

    let serviceId = "service_6dvp4gm";
    let templateId = "template_02oezsg";

    emailjs
      .send(serviceId, templateId, params)
      .then((res) => {
        console.log(res);
        alert("The Email has been sent");
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log("An error occured while generating the otp :", error);
  }
}

// Here submiting fucntion to find the result

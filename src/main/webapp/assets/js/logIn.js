// getting value from the logIn javascript

let logIn = document.getElementById("form");

logIn.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    let userEmail = document.getElementById("inputemail").value.trim();
    let password = document.getElementById("password").value.trim();
    
    let logInObject = {
		email : userEmail,
		password
	}

    
    const url = "http://localhost:8080/appfreshnest/login";

            axios.post(url, logInObject, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                // handle success
                let serverMessage = response.data;
                console.log(serverMessage);
                
               if(serverMessage == "success"){
                  alert("You are successfully get into freshnest");
                  window.location.href = "./home.html";
              }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
     
    
  } catch (error) {
    console.log("Error ", error);
  }
});

// password showing funciton

// password showing funciton

let passwordInput = document.querySelector("#password");
let eyeIcon = document.querySelector(".bi-eye-slash");
let confirmEyeDiv = document.querySelector(".confirm-eye-slash-div");
let eyeDiv = document.querySelector(".eye-slash-div");
let confirmPasswordInput = document.querySelector("#confirm-password");

let isPasswordVisible = false;

eyeDiv.addEventListener("click", (e) => {
  console.log(e.target);
  let eyeButton = e.target;
  console.log("yes");
  if (!isPasswordVisible) {
    eyeButton.classList.remove("bi-eye-slash");
    eyeButton.classList.add("bi-eye");
    passwordInput.setAttribute("type", "text");
    isPasswordVisible = true;
  } else {
    eyeButton.classList.remove("bi-eye");
    eyeButton.classList.add("bi-eye-slash");
    passwordInput.setAttribute("type", "password");
    isPasswordVisible = false;
  }
});

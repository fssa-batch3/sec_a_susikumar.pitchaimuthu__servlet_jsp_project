// getting value from the logIn javascript

let logIn = document.getElementById("form");

logIn.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    let userEmail = document.getElementById("inputemail").value.trim();
    let password = document.getElementById("password").value.trim();

    let logInObject = {
      email: userEmail,
      password,
    };


    const url = "/appfreshnest/LoginServlet";

    axios
      .post(url, logInObject, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        // handle success
        let serverMessage = response.data;
        console.log(serverMessage);

        if (serverMessage == "success") {
          showToast("You are successfully get into freshnest", "success");
          window.location.href = "./home.html";
        } else {
          errorMessageElementCreation(serverMessage);
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

// password showing function

let passwordInput = document.querySelector("#password");
let eyeIcon = document.querySelector(".bi-eye-slash");
let confirmEyeDiv = document.querySelector(".confirm-eye-slash-div");
let eyeDiv = document.querySelector(".eye-slash-div");
let confirmPasswordInput = document.querySelector("#confirm-password");

let isPasswordVisible = false;

eyeDiv.addEventListener("click", (e) => {
  let eyeButton = e.target;
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

function errorMessageElementCreation(serverMessage) {
  const icon = document.createElement("i");
  icon.className = "bi bi-exclamation-circle-fill error-icon";
  icon.setAttribute("aria-hidden", "true");

  // Create the <p> element with class and text content
  const paragraph = document.createElement("p");
  paragraph.className = "error-para";
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

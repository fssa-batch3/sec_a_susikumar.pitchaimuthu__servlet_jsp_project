let signUpFrom = document.getElementById("form");

signUpFrom.addEventListener("submit", (event) => {
  event.preventDefault();

  let firstName = document.getElementById("firstname").value.trim();
  let lastName = document.getElementById("lastname").value.trim();
  let userName = document.getElementById("username").value.trim();
  let userEmail = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let spaceRegex = / /g;

  // Replace spaces with an underscore
  let dashedText = userName.replace(spaceRegex, "_");

  // Validate first name
  const firstNameValidation = validateFirstName(firstName);
  if (firstNameValidation !== true) {
    errorMessageShow(firstNameValidation);
    return;
  }

  // Validate last name
  const lastNameValidation = validateLastName(lastName);
  if (lastNameValidation !== true) {
    errorMessageShow(lastNameValidation);
    return;
  }

  // Validate user name
  const userNameValidation = validateUserName(dashedText);
  if (userNameValidation !== true) {
    errorMessageShow(userNameValidation);
    return;
  }

  // Validate email
  const emailValidation = validateEmail(userEmail);
  if (emailValidation !== true) {
    errorMessageShow(emailValidation);
    return;
  }

  // Validate password
  const passwordValidation = validatePassword(password);
  if (passwordValidation !== true) {
    errorMessageShow(passwordValidation);
    return;
  }

  // If no errors, continue with registration
  let avatarText = firstName.toUpperCase().charAt(0);
  let imageUrl = avatarUrlGeneration(avatarText);

  let userObj = {
    firstName: firstName,
    lastName: lastName,
    userName: dashedText,
    email: userEmail,
    password: password,
    profileImage: imageUrl,
  };

  doRegistration(userObj);
});

// Error message show function
function errorMessageShow(errorMessage) {
  const icon = document.createElement("i");
  icon.className = "bi bi-exclamation-circle-fill error-icon";
  icon.setAttribute("aria-hidden", "true");

  // Create the <p> element with class and text content
  const paragraph = document.createElement("p");
  paragraph.className = "error-para";
  paragraph.textContent = errorMessage;

  let parent = document.querySelector(".error-message-div");

  // Remove previous error message elements
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

  // Append the new error message elements to the error-message-div
  parent.appendChild(icon);
  parent.appendChild(paragraph);
}

// Do registration

function doRegistration(userObj) {
  const url = "/appfreshnest/UserRegister";

  axios
    .post(url, userObj, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      // handle success
      let serverMessage = response.data;
      console.log(serverMessage);
      if (serverMessage == "success") {
        window.location.href = "./birthday.html";
      } else {
        errorMessageShow(serverMessage);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

// First name validation
function validateFirstName(name) {
  if (!name) {
    return "First name is required.";
  }

  const regex = /^[A-Za-z]\w{2,29}$/;
  if (!regex.test(name)) {
    return "Invalid first name: must start with a letter, 4-30 characters.";
  }
  return true;
}

// Last name Validation
function validateLastName(name) {
  if (!name) {
    return "Last name is required.";
  }

  const regex = /^[A-Za-z]\w{2,29}$/;
  if (!regex.test(name)) {
    return "Invalid last name: must start with a letter, 4-30 characters.";
  }
  return true;
}

// User name validation
function validateUserName(name) {
  if (!name) {
    return "User name is required.";
  }

  const regex = /^.{2,49}$/;
  if (!regex.test(name)) {
    return "Invalid user name: must start with a letter, 4-50 characters.";
  }
  return true;
}

// Validate email
function validateEmail(email) {
  if (!email) {
    return "Email address is required.";
  }

  const regex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!regex.test(email)) {
    return "Invalid email address.";
  }
  return true;
}

// Password validation
function validatePassword(password) {
  if (!password) {
    return "Password is required.";
  }

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[^\s]).{8,}$/;
  if (!regex.test(password)) {
    return "Invalid password. Must have 8 characters with lowercase, uppercase, digit, and special character.";
  }
  return true;
}

// Avater url generation
function avatarUrlGeneration(avatarText) {
  let avatarCanva = document.createElement("canvas");
  let avatarContext = avatarCanva.getContext("2d");

  avatarCanva.width = 200;
  avatarCanva.height = 200;

  // creating a random color creation function
  let letters = "0123456789ABCDEF";
  let color = "#";

  let randomArray = new Uint32Array(1);
  window.crypto.getRandomValues(randomArray);
  for (let i = 0; i < 6; i++) {
    color += letters[randomArray[0] % 16];
    window.crypto.getRandomValues(randomArray);
  }
  // draw background
  avatarContext.fillStyle = color;
  avatarContext.fillRect(0, 0, avatarCanva.width, avatarCanva.height);

  // draw text

  avatarContext.font = "bold 100px Assistant";
  avatarContext.textAlign = "center";
  avatarContext.textBaseline = "middle";
  avatarContext.fillStyle = "#fff";
  avatarContext.fillText(
    avatarText,
    avatarCanva.width / 2,
    avatarCanva.height / 2
  );

  // return
  return avatarCanva.toDataURL("image/png");
}

// Password count count check

let passwordInput = document.querySelector("#password");

let eyeIcon = document.querySelector(".bi-eye-slash");
console.log(eyeIcon);

let eyeDiv = document.querySelector(".eye-slash-div");

let isPasswordVisible = false;

eyeDiv.addEventListener("click", (e) => {
  console.log(e.target);
  let eyeButton = e.target;
  console.log("yes");
  if (!isPasswordVisible) {
    // eye hide element creation
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

// password strength calculation

let passwordStrength = document.querySelector("#password");

function calculatePasswordStrength(passwordStrength) {
  let strength = 0;
  console.log(strength);
  let hr = document.querySelector(".hr");
  let emojiSpan = document.querySelector(".emoji-span");
  let passwordContent = document.querySelector(".password-content");

  // Evaluate length
  if (passwordStrength.length <= 8) {
    strength += 1;
    hr.style.width = "25%";
    hr.style.backgroundColor = "red";
    emojiSpan.innerHTML = "&#128560;";
    passwordContent.innerText = "Weak. Must contain at least 8 characters.";
  }
  if (passwordStrength.match(/[0-9]+/) && passwordStrength.length >= 8) {
    strength += 1;
    hr.style.width = "50%";
    hr.style.backgroundColor = "#fada50";
    emojiSpan.innerHTML = "&#128542;";
    passwordContent.innerText =
      "So-so. Must contain at least 1 uppercase and 1 lowercase letter.";
  }
  if (
    passwordStrength.match(/[0-9]+/) &&
    passwordStrength.match(/[A-Z]+/) &&
    passwordStrength.match(/[a-z]+/) &&
    passwordStrength.length >= 8
  ) {
    strength += 1;
    hr.style.width = "75%";
    hr.style.backgroundColor = "#005063";
    emojiSpan.innerHTML = "&#128521;";
    passwordContent.innerText =
      "Almost. Must contain at least one special character.";
  }
  if (
    passwordStrength.match(/[$@#&!]+/) &&
    passwordStrength.match(/[0-9]+/) &&
    passwordStrength.match(/[A-Z]+/) &&
    passwordStrength.match(/[a-z]+/) &&
    passwordStrength.length >= 8
  ) {
    strength += 1;
    hr.style.width = "100%";
    hr.style.backgroundColor = "#39ff14";
    emojiSpan.innerHTML = "&#128526;";
    passwordContent.innerText = "Awesome. You have a secure password.";
  }
}

// Example usage:

passwordStrength.addEventListener("keyup", function () {
  calculatePasswordStrength(passwordStrength.value);
});

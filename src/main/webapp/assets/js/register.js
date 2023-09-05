let signUpFrom = document.getElementById("form");

signUpFrom.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    let userData = [];

    if (localStorage.getItem("register") != null) {
      userData = JSON.parse(localStorage.getItem("register"));
    }

    console.log(userData);

    let firstElement = document.getElementById("firstname").value.trim();
    let lastElement = document.getElementById("lastname").value.trim();
    let userName = document.getElementById("username").value.trim();
    let userEmail = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let cryptoValue = Date.now();

    let avatarText = firstElement.toUpperCase().charAt(0);
    console.log(avatarText);

    // avatar create

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

    let imageUrl = avatarCanva.toDataURL("image/png");

    // Writing function to create en dash to space of user name

    let spaceRegex = / /g;

    // Replace spaces with an end dash
    let dashedText = userName.replace(spaceRegex, "_");

    // return dashedText;

    console.log(dashedText);

    // let checkUser = JSON.parse(localStorage.getItem("register"));

    for (let i = 0; i < userData.length; i++) {
      if (userData[i]["email"] === userEmail) {
        throw new Error("User email ID already exists");
      } else if (userData[i]["userName"] == userName) {
        throw new Error(
          "Username already exists. Please choose a different username."
        );
      }
    }

    let userObj = {
      userId: cryptoValue,
      firstName: firstElement,
      lastName: lastElement,
      userName: dashedText,
      email: userEmail.toLowerCase(),
      password: password,
      avatarUrl: imageUrl,
      userTheme: "Hey! I am using fresh nest",
      registrationDate: moment().format("l"),
    };

    console.log(userObj);
    console.log(userData);

    userData.push(userObj);
    let str = JSON.stringify(userData);
    localStorage.setItem("register", str);
    alert("Success");
    window.location.href = "./birthday.html?user=" + cryptoValue;
  } catch (error) {
    console.log("Error: " + error.message);
  }
});

// password showing funciton

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

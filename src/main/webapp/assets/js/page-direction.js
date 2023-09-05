// Page redirection elements

let home = document.querySelector("#home");
let camera = document.querySelector("#camera");
let chat = document.querySelector("#chat");
let invite = document.querySelector("#invite");
let setting = document.querySelector("#setting");
let logOut = document.querySelector(".logOut");

// home page direction location

home.addEventListener("click", () => {
  try {
    window.location.href = "../pages/home.html?user=" + findUser["userId"];
  } catch (error) {
    console.log("An error occurred while home page redirection :", error);
  }
});

// camera page direction location

camera.addEventListener("click", () => {
  try {
    window.location.href = "../pages/webcam.html?user=" + findUser["userId"];
  } catch (error) {
    console.log("An error occurred while camera pge redirection :", error);
  }
});

// invite page direction location

invite.addEventListener("click", () => {
  try {
    window.location.href = "../pages/invite.html?user=" + findUser["userId"];
  } catch (error) {
    console.log("An error occurred while invte page redirection :", error);
  }
});

// settings page direction

setting.addEventListener("click", () => {
  try {
    window.location.href = "../pages/support.html?user=" + findUser["userId"];
  } catch (error) {
    console.log("An error occurred while setting page redirection :", error);
  }
});

// chat page dirction location

chat.addEventListener("click", () => {
  try {
    window.location.href = "../pages/chat.html?user=" + findUser["userId"];
  } catch (error) {
    console.log("An error occurred while chat page redirection :", error);
  }
});

// log out option javascript

logOut.addEventListener("click", () => {
  try {
    let logOutValue = JSON.parse(localStorage.getItem("user_data"));

    if (logOutValue !== null) {
      let message = confirm("Are sure to log out your account in Fresh Nest?");

      if (message !== true) {
        return;
      } else {
        logOutValue.splice(logOutValue[0], 1);
        localStorage.setItem("user_data", JSON.stringify(logOutValue));
        window.location.href = "../index.html";
      }
    }
  } catch (error) {
    console.log("An error occurred while logout the account :", error);
  }
});

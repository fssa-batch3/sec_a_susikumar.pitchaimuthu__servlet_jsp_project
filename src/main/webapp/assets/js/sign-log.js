function signUpButton() {
  try {
    window.location.href = "/pages/Register.html";
  } catch (error) {
    console.log("An error occurred while sign up redirection :", error);
  }
}

function logInButton() {
  try {
    window.location.href = "/pages/logIn.html";
  } catch (error) {
    console.log("An error occured while log in redirection :", error);
  }
}

// Page redirection elements

console.log("page redireciton");

let home = document.querySelector("#home");
let camera = document.querySelector("#camera");
let chat = document.querySelector("#chat");
let invite = document.querySelector("#invite");
let setting = document.querySelector("#setting");
let logOut = document.querySelector(".logOut");
let notification = document.querySelector("#notification");

// home page direction location

home.addEventListener("click", () => {
  try {
    window.location.href = "../pages/home.html";
  } catch (error) {
    console.log("An error occurred while home page redirection :", error);
  }
});

// Notification page redirection

notification.addEventListener("click", () => {
  try {
    window.location.href = "../pages/notification.html";
  } catch (error) {
    console.log("An error occurred while notification page redirection :", error);
  }
});


// camera page direction location

camera.addEventListener("click", () => {
  try {
    window.location.href = "../pages/webcam.html";
  } catch (error) {
    console.log("An error occurred while camera pge redirection :", error);
  }
});

// invite page direction location

invite.addEventListener("click", () => {
  try {
    window.location.href = "../pages/invite.html";
  } catch (error) {
    console.log("An error occurred while invte page redirection :", error);
  }
});

// settings page direction

setting.addEventListener("click", () => {
  try {
    window.location.href = "../pages/support.html";
  } catch (error) {
    console.log("An error occurred while setting page redirection :", error);
  }
});

// chat page dirction location

chat.addEventListener("click", () => {
  try {
    window.location.href = "../pages/chat.html";
  } catch (error) {
    console.log("An error occurred while chat page redirection :", error);
  }
});

// log out option javascript

logOut.addEventListener("click", () => {
  try {

     let message = confirm("Are sure to log out your account in the Fresh Nest?");

      if (message !== true) {
        return;
      } else {
		  const url = "http://localhost:8080/freshnest/LogoutServlet";
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    console.log(response.data);
			    const logOutResponse = response.data;
			    
			    if(logOutResponse == "success"){					
                    window.location.href = "/appfreshnest/index.htmll";
				}
			    
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })      
      }
    
  } catch (error) {
    console.log("An error occurred while logout the account :", error);
  }
});


// Profile page redirection redirection 
let profile = document.querySelector(".image");

profile.addEventListener("click", () => {
  try {
    window.location.href = "../pages/profile.html";
  } catch (error) {
    console.log(("An error occurred while redirect the profile page :", error));
  }
});


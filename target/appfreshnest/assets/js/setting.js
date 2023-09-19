// Email page redirection page element and putting the add eventlistner

let emailsButton = document.querySelector(".email-button");

emailsButton.addEventListener("click", (e) => {
  try {
    e.preventDefault();

    window.location.href = "../pages/email.html";
  } catch (error) {
    console.log("An error occurred while email redirection :", error);
  }
});

// user delete account function creating

let deleteAccount = document.querySelector("#delete-button");

deleteAccount.addEventListener("click", (event) => {
  event.preventDefault();
  try {
    let deleteMessage = confirm(
      "Are you sure want to delete account in freshnest"
    );

    if (deleteMessage !== true) {
      return;
    } else {
		
     const url = "http://localhost:8080/appfreshnest/UserAccountDeleteServlet";
        console.log(url);
        axios
          .get(url)
          .then(function (response) {
            // handle success
            console.log(response.data);
          
	  	 window.location.href = "/appfreshnest/index.html";
			
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });

     
    }
  } catch (error) {
    console.log("An error occurred whle the account delete :", error);
  }
});

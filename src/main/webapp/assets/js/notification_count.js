function checkTheNotificaitonCounts(){
	
	const url = "/appfreshnest/GetUserUnReadNotificationCount";
  axios
    .get(url)
    .then(function (response) {
      // handle success
      console.log(response.data);
      let notificationCounts = response.data;
       if (notificationCounts != "No notification available") {
                    let countElement = document.querySelector(".notification-para");

                   countElement.innerHTML = notificationCounts;
            }
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
	
		  
			   
			  
}

checkTheNotificaitonCounts();
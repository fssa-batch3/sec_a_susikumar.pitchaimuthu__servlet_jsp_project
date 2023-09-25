function getAllAvatars(){
	
	const url = "/appfreshnest/GetAllAvatarServlet";
			axios.get(url)
			  .then(function (response) {
			    // handle success
			     let avatarArr = response.data;
			    console.log(avatarArr);
			    ShowAvatar(avatarArr);
			    
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
	 })
}

getAllAvatars();

// Get and show the avatar

function ShowAvatar(avatarArr){
	
	// Getting the random index
  let randomArray = new Uint32Array(1);
  window.crypto.getRandomValues(randomArray);
  let randomIndex = randomArray[0] % avatarArr.length;
  let randomImageSrc = avatarArr[randomIndex]["avatarUrl"];
  console.log(randomImageSrc);

  let avatarImage = document.querySelector(".emoji");
  avatarImage.setAttribute("src", randomImageSrc);
}
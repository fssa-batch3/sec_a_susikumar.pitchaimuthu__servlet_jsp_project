


// click to change the color

  function setLike(){
  try {
	  
	  // like showing function add eventListener

     let likeOption = document.querySelector(".like-option");
      let likeIcon = document.querySelector(".bi-heart");
        let imageFav = false;
        
        let computedStyles = window.getComputedStyle(likeOption);


      if (computedStyles.backgroundColor === "rgba(0, 0, 0, 0)") {
          likeOption.style.backgroundColor = "red";
          likeIcon.style.color = "white";
          imageFav = true;
      } 
         else {
           likeOption.style.backgroundColor = "rgba(0, 0, 0, 0)";
          likeIcon.style.color = "black";
           imageFav = false;
     }

       
       let favObject = {
		   is_favourite : imageFav,
		   stillId : stillId
	   }
	   
	   const url = "http://localhost:8080/appfreshnest/StillFavouriteServlet";

        axios.post(url, favObject, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(function (response) {
            // handle success
            console.log(response.data);
                           
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
       
  }catch (error) {
    console.log("An error occured while create image element :", error);
  }
};




  let userUrl = window.location.search;
  let userUrlParams = new URLSearchParams(userUrl);

  console.log(userUrlParams);
  let stillId = userUrlParams.get("stillId");
   console.log(stillId);
//  Gets the still from the servlet

function getStillDetails() {
	
	const url = "/appfreshnest/StillDetailsServlet?stillId=" + stillId;
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    console.log(response.data);
			    const imageObject = response.data;
			     try {
                     diplayStill(imageObject);
                  } catch (error) {
                     console.log("An error occurred while changing the image:", error);
                }    
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
		}
		
getStillDetails();
// dynamic element creation
function diplayStill(Still){
let image = document.createElement("img");
image.setAttribute("id", Still["stillId"]);
image.setAttribute("class", "user-still");
image.setAttribute("src", Still["stillUrl"]);
document.querySelector(".image-div").append(image);
}

// onclick function showing and disepearing element opject

let beautyElement = document.querySelector(".beauty-div-container");

function beauty() {
  let x = document.querySelector(".beauty-div-container");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// filter showing and disappearing div

function filter() {
  let x = document.querySelector(".normal-filter-option-div-container");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// clicking option div container

function clickAdjustment() {
  let x = document.querySelector(".clicking-option-div-container");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}



// add filter div

function addFilter() {
  let y = document.querySelector(".clicking-filter-showing-div-container");
  console.log(y);

  if (y.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }
}

// image delete option eventListner function

let deleteImage = document.querySelector(".delete-button");


deleteImage.addEventListener("click", () => {
  let message = confirm("Are sure to delete this image?");
  if (message !== true) {
    return;
  } else {
    
    let deleteObject = {
      stillId: stillId,
    };
    
     const url = "/appfreshnest/StillDeleteServlet";

        axios.post(url, deleteObject, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(function (response) {
            // handle success
            console.log(response.data);
          const serverMsg = response.data;
            if(serverMsg.trim() === 'success') {
		    	window.location.href="./snap-gallery.html";
		    }  
		    
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

   
  }
});

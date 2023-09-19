
// date getting elements

let filterButton = document.querySelector(".filter-button");

// filter button add eventListener

filterButton.addEventListener("click", (event) => {
  event.preventDefault();

  try {
    let from = document.querySelector("#from").value;
    let to = document.querySelector("#to").value;
    
    let filterObject = {
      from: from,
      to: to
    };
    
    const url = "http://localhost:8080/appfreshnest/StillFilterServlet";

    axios.post(url, filterObject, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(function (response) {
      // handle success
      console.log(response.data);

      // Assuming you have a variable named serverMsg in the response data
      const serverMsg = response.data;
      console.log(serverMsg)

        removeCardElement();
        displayStills(response.data); // Assuming filterStills is a property in the response data
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  } catch (error) {
    console.error(error);
  }
});

//all photo showing add eventlIstener function
let imageContainer = document.querySelector(".second-section-container-div");

//Here creating function to remove the card element before creating the other element


function removeCardElement() {
  try {
    if (imageContainer.hasChildNodes()) {
      let image_div = document.querySelectorAll(".card-container");

      for (let cardDiv of image_div) {
        cardDiv.remove();
      }
    }
  } catch (error) {
    console.log("An error occured while removing the image card :", error);
  }
}


// Webcam page redirection function
let goToCamera = document.querySelector("#go-to-camera");

goToCamera.addEventListener("click", () => {
  try {
    window.location.href = "../pages/webcam.html?user=" + findUser["userId"];
  } catch (error) {
    console.log("An error occurred while redirect the webcam page :", error);
  }
});


// Gallery page redirection elements

let favourite_image = document.querySelector(".favourite-photo-option-li");
let latest = document.querySelector(".latest-photo-option-li");
let recent = document.querySelector(".recent-photo-option-li");
let allPhoto = document.querySelector(".all-photo-option-li");


// all photo showing function

allPhoto.addEventListener("click", (event) => {
  event.preventDefault();
  try {
    // removing the element
    removeCardElement();

    for (let imageGP of imageGallery) {
      let imageId = imageGP["imageId"];
      let imageLink = imageGP["imageLink"];
      let imageName = imageGP["imageName"];
      snapImageCreation(imageId, imageLink, imageName);
    }
  } catch (error) {
    console.log("An error occured while all photo function :", error);
  }
});

// favourite images option add eventlistner function

favourite_image.addEventListener("click", (event) => {
  event.preventDefault();
  try {
    // removing the element
    removeCardElement();
  
    const url = "http://localhost:8080/BookWebApp/StillFavouriteServlet";
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    console.log(response.data);
			    const favStills = response.data;
			    
			    if(favStills != null){
					for (let favouriteImages of favStills) {
                    let imageId = favouriteImages["imageId"];
                     let imageLink = favouriteImages["imageLink"];
                     let imageName = favouriteImages["imageName"];

                    snapImageCreation(imageId, imageLink, imageName);
                }
				}
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })


    
  } catch (error) {
    console.log("An error occured while creating favourite image :", error);
  }
});

// latest images showing add eventListener function

latest.addEventListener("click", (event) => {
  event.preventDefault();
  try {
    // removing the element
    removeCardElement();

    let today = moment().format("l");
    console.log(today);

    let IST = new Date();
    let priorDate = new Date(new Date().setDate(IST.getDate() - 7));

    console.log(priorDate);

    let endDate =
      priorDate.getMonth() +
      1 +
      "/" +
      priorDate.getDate() +
      "/" +
      priorDate.getFullYear();

    console.log(endDate);

    let latestPicArray = [];

    let currentDate = new Date(endDate);

    while (currentDate <= new Date(today)) {
      let latesetDate = new Date(currentDate);
      let latestPic =
        latesetDate.getMonth() +
        1 +
        "/" +
        latesetDate.getDate() +
        "/" +
        latesetDate.getFullYear();
      console.log(latestPic);
      latestPicArray.push(latestPic);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(latestPicArray);

    // Creating for loop function find the all latest pics

    let filterLatestImage = [];

    for (let finalPics of latestPicArray) {
      for (let finalmg of images) {
        if (finalmg["imageDate"] == finalPics) {
          filterLatestImage.push(finalmg);
        }
      }
    }
    console.log(filterLatestImage);

    for (let filterLatest of filterLatestImage) {
      let imageId = filterLatest["stillId"];
      let imageLink = filterLatest["stillUrl"];
      let imageName = filterLatest["stillName"];
      snapImageCreation(imageId, imageLink, imageName);
    }
  } catch (error) {
    console.log("An error occured while show the latest image :", error);
  }
});

// recently deleted images add eventListener function

recent.addEventListener("click", (event) => {
  event.preventDefault();

  try {
    // removing the element
    removeCardElement();
     
     
      const url = "http://localhost:8080/BookWebApp/StillDeleteServlet";
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    console.log(response.data);
			    const recentlyDeletedStills = response.data;
			    
			    if(recentlyDeletedStills != null){
					for (let favouriteImages of recentlyDeletedStills) {
                    let imageId = favouriteImages["imageId"];
                     let imageLink = favouriteImages["imageLink"];
                     let imageName = favouriteImages["imageName"];

                    snapImageCreation(imageId, imageLink, imageName);
                }
				}
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
    
  } catch (error) {
    console.log("An error occured while show the recently deleted :", error);
  }
});


function snapImageCreation(imageId, imageLink, imageName) {
  try {
    let imageContainer = document.createElement("div");
    imageContainer.setAttribute("class", "card-container");
    imageContainer.setAttribute("id", imageId);

    //
    let image_name_container = document.createElement("div");
    image_name_container.setAttribute("class", "image-name-container");
    imageContainer.append(image_name_container);

    let a = document.createElement("a");
    a.setAttribute(
      "href",
      "../pages/snap-details.html?user=" +
        findUser["userId"] +
        "&image=" +
        imageId
    );
    image_name_container.append(a);
    let image = document.createElement("img");
    image.setAttribute("id", imageId);
    image.setAttribute("src", imageLink);
    image.setAttribute("alt", "userSnaps");
    image.setAttribute("class", "taking-image");
    a.append(image);

    let image_name = document.createElement("p");
    image_name.setAttribute("class", "snap-name");
    image_name.innerHTML = imageName;
    image_name_container.append(image_name);

    document
      .querySelector(".second-section-container-div")
      .append(imageContainer);
  } catch (error) {
    console.log("An error occurred while creating the image card :", error);
  }
}
	
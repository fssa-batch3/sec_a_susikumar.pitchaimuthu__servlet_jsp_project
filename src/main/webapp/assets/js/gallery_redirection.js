// all photo showing add eventlIstener function
let imageContainer = document.querySelector(".second-section-container-div");

// date getting elements

let filterButton = document.querySelector(".filter-button");

// filter button add eventListener

filterButton.addEventListener("click", (event) => {
  event.preventDefault();

  try {
    let from = new Date(document.querySelector("#from").value);
    let to = new Date(document.querySelector("#to").value);

    let dateArray = [];

    Date.prototype.addDays = function (days) {
      let date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };

    while (from <= to) {
      let dateAndYear = new Date(from);
      let datesf =
        dateAndYear.getMonth() +
        1 +
        "/" +
        dateAndYear.getDate() +
        "/" +
        dateAndYear.getFullYear();
      dateArray.push(datesf);
      from = from.addDays(1);
    }

    console.log(dateArray);

    let filterImage = [];
    console.log(images);
    console.log(images[0]["imageDate"]);

    for (let dateAr of dateArray) {
      for (let imgs of images) {
        if (img["imageDate"] == dateAr) {
          filterImage.push(imgs);
        }
      }
    }

    console.log(filterImage);

    // removing the element

    removeCardElement();

    for (let filterImg of filterImage) {
      let imageId = filterImg["imageId"];
      let imageLink = filterImg["imageLink"];
      let imageName = filterImg["imageName"];
      snapImageCreation(imageId, imageLink, imageName);
    }
  } catch (error) {
    console.log("An error occured while galller image creation :", error);
  }
});

// page redirection elements

let goToCamera = document.querySelector("#go-to-camera");
let favourite_image = document.querySelector(".favourite-photo-option-li");
let latest = document.querySelector(".latest-photo-option-li");
let recent = document.querySelector(".recent-photo-option-li");
let allPhoto = document.querySelector(".all-photo-option-li");
let imageCard = document.querySelectorAll(".card-container");

// Here creating function to remove the card element before creating the other element

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

// creating a common function for create a gallery image

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

    let favImages = images.filter((e) => e["imageFav"] == "favourite");
    console.log(favImages);

    for (let favouriteImages of favImages) {
      let imageId = favouriteImages["imageId"];
      let imageLink = favouriteImages["imageLink"];
      let imageName = favouriteImages["imageName"];

      snapImageCreation(imageId, imageLink, imageName);
    }
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
      let imageId = filterLatest["imageId"];
      let imageLink = filterLatest["imageLink"];
      let imageName = filterLatest["imageName"];
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

    let now = moment().format("l");
    console.log(now);

    let last = new Date();
    let lastDate = new Date(new Date().setDate(last.getDate() - 28));

    console.log(lastDate);

    let destiDate =
      lastDate.getMonth() +
      1 +
      "/" +
      lastDate.getDate() +
      "/" +
      lastDate.getFullYear();

    console.log(destiDate);

    let recentDeleteDateArray = [];

    let startDate = new Date(destiDate);

    while (startDate <= new Date(now)) {
      let forDate = new Date(startDate);
      let latestDeletePic =
        forDate.getMonth() +
        1 +
        "/" +
        forDate.getDate() +
        "/" +
        forDate.getFullYear();
      console.log(latestDeletePic);
      recentDeleteDateArray.push(latestDeletePic);
      startDate.setDate(startDate.getDate() + 1);
    }

    console.log(recentDeleteDateArray);

    // Creating for loop function get the recent delete pics

    let recentImageData = JSON.parse(
      localStorage.getItem("recentDeleteImageData")
    );
    console.log(recentImageData);

    let filterDeleteImage = [];

    for (let recentDel of recentDeleteDateArray) {
      for (let recentImg of recentImageData) {
        if (recentImg["imageDate"] == recentDel) {
          filterDeleteImage.push(recentImg);
        }
      }
    }

    console.log(filterDeleteImage);

    for (let filterDelete of filterDeleteImage) {
      let imageId = filterDelete["imageId"];
      let imageLink = filterDelete["imageLink"];
      let imageName = filterDelete["imageName"];
      snapImageCreation(imageId, imageLink, imageName);
    }
  } catch (error) {
    console.log("An error occured while show the recently deleted :", error);
  }
});

// camera page direction location

goToCamera.addEventListener("click", () => {
  try {
    window.location.href = "../pages/webcam.html?user=" + findUser["userId"];
  } catch (error) {
    console.log("An error occurred while redirect the webcam page :", error);
  }
});

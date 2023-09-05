/**
 * 
 */

 let video = document.querySelector("#start");
let adjusment = document.querySelector(".adjustment-div");
let snap = document.querySelector(".capture-div");
let canvas = document.getElementById("canvas");

let filterButton = document.getElementById("photo-filters");

let conditions = {
  Audio: true,
  video: {
    width: { min: 1100, ideal: 1200, max: 1250 },
    height: { min: 576, ideal: 728, max: 1080 },
  },
};

// adding brightness for the webcamera

const brightnessInput = document.getElementById("brightnessRange");
brightnessRange.addEventListener("input", () => {
  try {
    const brightnessValue = brightnessRange.value;
    video.style.filter = `brightness(${brightnessValue}%)`;
  } catch (error) {
    console.log("An error occurred while brightness range :", error);
  }
});

navigator.mediaDevices
  .getUserMedia(conditions)
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((error) => {
    console.error(error);
  });

// filter selection function

filterButton.addEventListener("change", function (e) {
  e.preventDefault();
  try {
    filter = e.target.value;
    video.style.filter = filter;
  } catch (error) {
    console.log("An error occurred  while adding the filter :", error);
  }
});

// Draw image

snap.addEventListener("click", () => {
  try {
    let imageData = [];

    if (localStorage.getItem("image_url") !== null) {
      imageData = JSON.parse(localStorage.getItem("image_url"));
    }

    let filterValue = video.style.filter;
    console.log(filterValue);

    if (filterValue) {
      canvas.getContext("2d").filter = filterValue; // Apply the filter to the canvas context
    }

    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    let imageUrl = canvas.toDataURL("image/jpeg");
    // console.log(imageUrl);
    let imageName = Date.now();

    let imageDate = moment().format("l");
    let imageTime = moment().format("LT");
    console.log(imageTime);

    let imageObject = {
      imageLink: imageUrl,
      imageName: "image" + imageName,
      imageId: imageName,
      imageDate: imageDate,
      imageTime: imageTime,
      userId: findUser["userId"],
    };
    console.log(imageObject);

    imageData.push(imageObject);

    localStorage.setItem("image_url", JSON.stringify(imageData));
  } catch (error) {
    console.log("An error occurred while snap function :", error);
  }
});



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
   

    let filterValue = video.style.filter;
    console.log(filterValue);

    if (filterValue) {
      canvas.getContext("2d").filter = filterValue; // Apply the filter to the canvas context
    }

    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    let imageUrl = canvas.toDataURL("image/jpeg");
    let imageName = Date.now();


    let imageObject = {
      imageLink: imageUrl,
      imageName: "image" + imageName,
     
    };
    console.log(imageObject);
    const url = "http://localhost:8080/appfreshnest/CreateStillServlet";

            axios.post(url, imageObject, {
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
        
   

  } catch (error) {
    console.log("An error occurred while snap function :", error);
  }
});

// brightness showing and element none function

function bright() {
  try {
    if (adjusment.style.display === "none") {
      adjusment.style.display = "block";
    } else {
      adjusment.style.display = "none";
    }
  } catch (error) {
    console.log("An error occured while adjusting the brightness :", error);
  }
}




// gallery page urlparameter sending definition code

let gallery = document.querySelector(".gallery");

gallery.addEventListener("click", () => {
  try {
    window.location.href =
      "../pages/snap-gallery.html";
  } catch (error) {
    console.log("An error occurred while the gallery redirection :", error);
  }
});

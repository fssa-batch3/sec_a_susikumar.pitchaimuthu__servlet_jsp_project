// creating a url params function to find the reel

let UrlReel = window.location.search;
let ReelParams = new URLSearchParams(UrlReel);
let currentReel = ReelParams.get("timeTales");
console.log(currentReel);

// Here set the reel userId into the all icon to easily get the id of the reel user

let sendIconElement = document.querySelector(".bi-send");

let reelInsideDiv = document.querySelector(".reel-inside-div");
let rangeInputDiv = document.querySelector(".range-input-div");
let currentIndex = 0; 

async function createVideoPlayer(index) {
  let reel = currentReel[index];

  let rangeInput = document.createElement("input");
  rangeInput.setAttribute("type", "range");
  rangeInput.setAttribute("class", "range-input");
  rangeInputDiv.append(rangeInput);

  let video = document.createElement("video");
  video.setAttribute("class", "reel-video");

  let source = document.createElement("source");
  source.setAttribute("src", reel.reel_url);
  source.setAttribute("type", "video/mp4");
  video.append(source);

  reelInsideDiv.innerHTML = ""; // Clear previous video

  reelInsideDiv.append(video);

  try {
    // Wait for the metadata to load
    await new Promise((resolve, reject) => {
      video.onloadedmetadata = resolve;
      video.onerror = reject;
    });

    let duration = video.duration;
    rangeInput.max = duration;

    function updateProgress() {
      let currentTime = video.currentTime;
      rangeInput.value = currentTime;
      requestAnimationFrame(updateProgress);
    }

    video.addEventListener("timeupdate", updateProgress);

    rangeInput.addEventListener("input", function () {
      let seekTime = parseFloat(rangeInput.value);
      video.currentTime = seekTime;
    });

    video.onended = function () {
      // Play the next video if there are more videos in the array
      if (index + 1 < currentReel.length) {
        currentIndex = index + 1;
        createVideoPlayer(currentIndex);
      } else {
        video.style.display = "none"; // Hide the last video
      }
    };

    await video.play();
  } catch (error) {
    console.error("An error occurred while creating the video player:", error);
    // Handle the error as needed
  }
}

createVideoPlayer(currentIndex);

// rest of the code

// reel delete option

let reelDele = document.createElement("i");
reelDele.setAttribute("class", "bi bi-x-octagon-fill");
reelDele.setAttribute("id", currentReel["reelId"]);
document.querySelector(".reel-delete-div").append(reelDele);

let reelOption = document.querySelector(".bi-x-octagon-fill");

reelOption.addEventListener("click", (e) => {
  console.log(reelOption["id"]);

  let findReel = reelData.find((rFind) => rFind["reelId"] == reelOption["id"]);
  console.log(findReel);

  let findIndexReel = reelData.indexOf(findReel);
  console.log(findIndexReel);

  let message = confirm("Are sure to delete this reel");

  if (message !== true) {
    return;
  } else {
    reelData.splice(findIndexReel, 1);
    localStorage.setItem("reelUrlData", JSON.stringify(reelData));
  }
});

// Creating a function for sending the chat reaction to the current user

let sendIcon = document.querySelector(".bi-send");

sendIcon.addEventListener("click", (e) => {
  let reelerId = e.target.id;

  let messageArray = [];

  // Here checking the other data already present area not. If that is present add that data also

  let otherNotis = JSON.parse(localStorage.getItem("otherNotification"));

  if (otherNotis != null) {
    messageArray = otherNotis;
  }

  let reelInput = document.querySelector("#input-for-reel-reaction");

  let messageTime = moment().format("LT");

  let messageDate = moment().format("L");

  let messageId = Date.now();

  let reelObject = {
    message: reelInput.value,
    messageTime,
    messageDate,
    messager_id: findUser["userId"],
    message_receiver_id: reelerId,
    messager: findUser["userName"],
    message_person_url: findUser["avatarUrl"],
    messageId,
    purpose: "reel-chat",
    isRead: "false",
  };

  messageArray.push(reelObject);

  console.log(messageArray);

  localStorage.setItem("otherNotification", JSON.stringify(messageArray));
  reelInput.value = "";
});

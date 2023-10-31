// creating a url params function to find the reel

let UrlReel = window.location.search;
let ReelParams = new URLSearchParams(UrlReel);
let type = ReelParams.get("type");
console.log(type);

if(type === "profileUser"){
	showProfileUserTimeTale();
}

function showProfileUserTimeTale() {
    const url = "/appfreshnest/GetUserTimeTalesServlet";
    axios.get(url)
        .then(function (response) {
            // handle success
            const timeTale = response.data;
            console.log(timeTale);
            showTimeTales(timeTale);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

let sendIconElement = document.querySelector(".bi-send");

let currentTaleId;
let currentUserId;

// Here set the reel userId into the all icon to easily get the id of the reel user
function showTimeTales(timeTale) {

    let reelInsideDiv = document.querySelector(".reel-inside-div");
    let rangeInputDiv = document.querySelector(".range-input-div");
    let currentIndex = 0;

    async function createVideoPlayer(index) {
        if (index >= timeTale.length) {
            // Redirect to chat.html when there are no more videos
            window.location.href = "../pages/chat.html";
            return;
        }

        let tale = timeTale[index];
        currentTaleId = tale["taleId"];
        currentUserId = tale["user"]["userId"];
        
        let profileImage = document.querySelector(".profile-image");
        let username = document.querySelector(".user-name");
        let deleteButton = document.querySelector(".bi-x-octagon-fill");
        profileImage.src = tale["user"]["profileImage"];
        username.innerHTML = tale["user"]["username"]; 
        deleteButton.setAttribute("id", tale["taleId"]);
		
        let rangeInput = document.createElement("input");
        rangeInput.setAttribute("type", "range");
        rangeInput.setAttribute("class", "range-input");
        rangeInputDiv.append(rangeInput);

        let video = document.createElement("video");
        video.setAttribute("class", "reel-video");
        video.setAttribute("autoplay", "autoplay"); // Automatically play the video when data is loaded

        let source = document.createElement("source");
        source.setAttribute("src", tale.media_url);
        source.setAttribute("type", "video/mp4");
        video.append(source);

        reelInsideDiv.innerHTML = ""; // Clear previous video

        reelInsideDiv.append(video);

        let isPlaying = true;

        // Toggle play/pause when the video is clicked
        video.addEventListener("click", function () {
            if (isPlaying) {
                video.pause();
            } else {
                video.play();
            }
            isPlaying = !isPlaying;
        });

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
                currentIndex = index + 1;
                createVideoPlayer(currentIndex);
            };
        } catch (error) {
            console.error("An error occurred while creating the video player:", error);
            // Handle the error as needed
        }
    }

    createVideoPlayer(currentIndex);
}

// Delete Time Tale Function
function deleteTimeTale(currentId){
	const url = "/appfreshnest/DeleteTimeTaleServlet?taleId=" + currentId;
    axios.get(url)
        .then(function (response) {
            // handle success
            const timeTale = response.data;
            console.log(timeTale);
            
            if(timeTale === "success"){
              window.location.href = "../pages/chat.html";
			}
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

// Tale reaction comment and like send notifiction feature

sendIconElement.addEventListener("click", ()=> {
	let message = document.querySelector(".tale-input").value;
	
	let taleMessageObject = {
		message,
		currentTaleId,
		currentUserId,
	}
	  const url = "/appfreshnest/UserRegister";

            axios.post(url, taleMessageObject, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                // handle success
                let serverMessage = response.data;
                console.log(serverMessage);
		  
              
            })
            .catch(function (error) {
                // handle error
                console.log(error);
           });

	
})




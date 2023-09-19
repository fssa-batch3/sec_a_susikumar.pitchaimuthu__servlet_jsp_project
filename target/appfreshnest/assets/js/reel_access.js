// creating function for creating a reel data

let reelInput = document.querySelector(".reel-input");

console.log(reelInput);

reelInput.addEventListener("change", function (event) {
  event.preventDefault();

  try {
    let file = this.files[0];
    let reader = new FileReader();

    reader.onload = function (event) {
      let src = event.target.result;

      let video = document.createElement("video");

      // Wait for the metadata to load
      video.onloadedmetadata = function () {
        const duration = video.duration;

        // Format the duration in minutes and seconds

        const seconds = Math.floor(duration % 60);

        console.log(seconds);

        // rest of your code...

        // reel data store
        let reelArr = [];
        if (localStorage.getItem("reelUrlData") !== null) {
          reelArr = JSON.parse(localStorage.getItem("reelUrlData"));
        }

        let reelTime = moment().format("LT");
        let reelDate = moment().format("L");

        let reelId = Date.now();
        let reelVideoObj = {
          reel_url: src,
          reelId: reelId,
          reelName: reelId + "reel",
          reeluserId: findUser["userId"],
          reelTime: reelTime,
          reelDate: reelDate,
          reelerName: findUser["userName"],
          reelDuration: duration,
          reel_user_url: findUser["avatarUrl"],
        };

        // Here checking the reel user data is ther is not

        let allReelData = JSON.parse(localStorage.getItem("reelUrlData"));

        console.log(allReelData);

        if (allReelData != null) {
          let getUser;

          let reelIndex;

          for (let allReel of allReelData) {
            for (let inside of allReel) {
              if (inside["reelUser"] == findUser["userId"]) {
                getUser = allReel;
                reelIndex = allReelData.indexOf(allReel);
              }
            }
          }

          console.log(getUser);
          console.log(reelIndex);

          if (getUser != null) {
            getUser.push(reelVideoObj);

            console.log(getUser);

            allReelData[reelIndex] = getUser;

            localStorage.setItem("reelUrlData", JSON.stringify(allReelData));

            return;
          } else {
            let anotherArray = [];

            anotherArray.push(reelVideoObj);

            allReelData.push(anotherArray);

            localStorage.setItem("reelUrlData", JSON.stringify(allReelData));
          }

          return;
        }

        let newArray = [];

        newArray.push(reelVideoObj);

        reelArr.push(newArray);

        localStorage.setItem("reelUrlData", JSON.stringify(reelArr));
      };

      video.src = src;
    };

    reader.readAsDataURL(file);
  } catch (error) {
    console.log("An error occurred the access the reel file :", error);
  }
});

// reel showing redirection EventListener

let checkReel = JSON.parse(localStorage.getItem("reelUrlData"));
console.log(checkReel);

// creating reel div for the user

try {
  let trendingBirdDiv = document.createElement("div");
  trendingBirdDiv.setAttribute("class", "reel-member-div");

  let trendingBirdDivImage = document.createElement("img");
  trendingBirdDivImage.setAttribute("class", "reel-member-div-image");
  trendingBirdDivImage.setAttribute("src", findUser["avatarUrl"]);
  trendingBirdDiv.append(trendingBirdDivImage);

  document.querySelector(".reel-container").append(trendingBirdDiv);
} catch (error) {
  console.log("An error occured while adding the user reel profile :", error);
}

// getting the profile user friends data

let profileUserFriends = JSON.parse(localStorage.getItem("userFriends"));

console.log(profileUserFriends);

let friendsArray = [];

if (profileUserFriends != null) {
  for (let friendsDetails of profileUserFriends) {
    for (let inFriend of friendsDetails) {
      if (inFriend["frienderId"] == findUser["userId"]) {
        friendsArray = friendsDetails;
      }
    }
  }
}

console.log(friendsArray);

// Adding the user friends reel in the user reel suggestion

let showingReels = [];

if (friendsArray != null) {
  for (let close of friendsArray) {
    for (let reels of checkReel) {
      for (let insideCheck of reels) {
        if (close["userId"] == insideCheck["reeluserId"]) {
          showingReels.push(reels);
        }
      }
    }
  }
}

console.log(showingReels);

for (let showReels of showingReels) {
  let userReelDiv = document.createElement("div");
  userReelDiv.setAttribute("class", "reel-member-div");
  userReelDiv.setAttribute("id", showReels[0]["reeluserId"]);

  let userimage = document.createElement("img");
  userimage.setAttribute("class", "reel-member-div-image");
  userimage.setAttribute("src", showReels[0]["reel_user_url"]);
  userReelDiv.append(userimage);

  document.querySelector(".reel-container").append(userReelDiv);
}

// creating function to show user has reel

if (checkReel != null) {
  for (let reelDatas of checkReel) {
    for (let insideReel of reelDatas) {
      if (insideReel["reeluserId"] == findUser["userId"]) {
        let reelMember = document.querySelector(".reel-member-div");

        reelMember.style.border = "2px rgb(108, 156, 180) solid";
        reelMember.setAttribute("id", insideReel["reeluserId"]);
      }
    }
  }
}

// creating the add eventlisner to redirect to the reel showing page

let reelPage = document.querySelectorAll(".reel-member-div");
console.log(reelPage);

for (let reelCard of reelPage) {
  reelCard.addEventListener("click", function (event) {
    event.preventDefault();

    let reelId = event.target.parentElement.id;

    console.log(reelId);
    if (checkReel == null) {
      return;
    } else {
      window.location.href =
        "../pages/reel_showing.html?user=" +
        findUser["userId"] +
        "&reel=" +
        reelId;
    }
  });
}

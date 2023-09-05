// Profile user element value set creations

try {
  document.querySelector(".userName").innerHTML = findUser["userName"];

  document.getElementById("profile-head").innerText =
    "Hello" + "   " + findUser["userName"];

  document.querySelector(".user-theme").innerHTML = findUser["userTheme"];

  document.querySelector(".age-para").innerHTML = findUser["age"];

  // profile image

  document.querySelector("#profile-image").src = findUser["avatarUrl"];

  document.querySelector(".city-para").innerHTML = findUser["city"] || "";
} catch (error) {
  console.log("An error occurred while show the profile details :", error);
}

// create element for show the use last activity

let allActivity = JSON.parse(localStorage.getItem("userInvites"));

let users = JSON.parse(localStorage.getItem("register"));

let showingArr = [];

try {
  let SuggestedUsers = users.filter((e) => e["userId"] !== findUser["userId"]);
  console.log(SuggestedUsers);

  for (let userSuggestions of SuggestedUsers) {
    let card = document.createElement("div");
    card.setAttribute("class", "card-div-container");
    card.innerHTML = `<div class="card-inside-div">
<div class="user-activity-image-div">
  <img
    class="activity-image"
    src="${userSuggestions["avatarUrl"]}"
    alt="activity-image"
  />
</div>

<div class="user-activity-name-div">
   <div class="user-name-div">
       <h3 class="user-name">${userSuggestions["userName"]}</h3>
   </div>

    <div class="user-theme-div">
       <p class="user-theme">${userSuggestions["userTheme"]}</p>
    </div>
</div>

<div>
  <button class="connect-button" onclick="showDetails(this.id)" id=${userSuggestions["userId"]}>View</button>
</div>
</div>`;

    document.querySelector(".card-inside-control-div").append(card);
  }
} catch (error) {
  console.log("An error occurred while creating a suggest data :", error);
}
// Writing function for suggestion and activity card

let activityHead = document.querySelector(".activity-head");

let suggestionHead = document.querySelector(".suggestion-head");

activityHead.addEventListener("click", () => {
  try {
    // creating for loop for delete all the cards

    let cardDivContainer = document.querySelectorAll(".card-div-container");
    console.log(cardDivContainer);

    if (cardDivContainer[0] !== undefined) {
      for (let cardDIvs of cardDivContainer) {
        cardDIvs.remove();
      }
    }

    let userActivityData = JSON.parse(localStorage.getItem("userInvites"));
    console.log(userActivityData);

    let findUserActivity;
    if (userActivityData !== null) {
      findUserActivity = userActivityData.filter(
        (e) => e["inviterId"] == findUser["userId"]
      );

      console.log(findUserActivity);

      if (findUserActivity !== null) {
        for (let filterActivity of findUserActivity) {
          let card = document.createElement("div");
          card.setAttribute("class", "card-div-container");
          card.innerHTML = `<div class="card-inside-div">
      <div class="user-activity-image-div">
        <img
          class="activity-image"
          src="${filterActivity["inviteImage"]}"
          alt="activity-image"
        />
      </div>
      
      <div class="user-activity-name-div">
         <div class="user-name-div">
             <h3 class="user-name">${filterActivity["inviteName"]}</h3>
         </div>
      
          <div class="user-theme-div">
             <p class="user-theme">${filterActivity["inviteGlimpse"]}</p>
          </div>
      </div>
      
      <div>
        <button class="connect-button" onclick="showDetails(this.id)" id=${filterActivity["iniviteId"]}>View</button>
      </div>
      </div>`;

          document.querySelector(".card-inside-control-div").append(card);
        }
      }
    }
  } catch (error) {
    console.log("An error occurred while show the acitivity :", error);
  }
});

// suggestion showing div element creations

suggestionHead.addEventListener("click", (e) => {
  try {
    // creating for loop for delete all the cards

    let suggestedCardDiv = document.querySelectorAll(".card-div-container");
    console.log(suggestedCardDiv);

    if (suggestedCardDiv[0] !== undefined) {
      for (let suggestCard of suggestedCardDiv) {
        suggestCard.remove();
      }
    }

    console.log(SuggestedUsers);

    for (let insSuggest of SuggestedUsers) {
      let card = document.createElement("div");
      card.setAttribute("class", "card-div-container");
      card.innerHTML = `<div class="card-inside-div">
  <div class="user-activity-image-div">
    <img
      class="activity-image"
      src="${insSuggest["avatarUrl"]}"
      alt="activity-image"
    />
  </div>
  
  <div class="user-activity-name-div">
     <div class="user-name-div">
         <h3 class="user-name">${insSuggest["userName"]}</h3>
     </div>
  
      <div class="user-theme-div">
         <p class="user-theme">${insSuggest["userTheme"]}</p>
      </div>
  </div>
  
  <div>
    <button class="connect-button" onclick="showDetails(this.id)" id=${insSuggest["userId"]}>View</button>
  </div>
  </div>`;

      document.querySelector(".card-inside-control-div").append(card);
    }
  } catch (error) {
    console.log("An error occurred while suggested data :", error);
  }
});

// }

// profile page redirection eventListener

let profileEdit = document.querySelector(".hero-section-button");

profileEdit.addEventListener("click", () => {
  window.location.href =
    "../pages/profile-edit.html?user=" + findUser["userId"];
});
// profile image update js

// profile option

let file = document.getElementById("file");

let image = document.getElementById("profile-image");
console.log(image);

let ProfileOption = document.querySelector(".profile-option-div");

// onclick function for option display block

image.addEventListener("click", () => {
  try {
    if (ProfileOption.style.display === "none") {
      ProfileOption.style.display = "block";
    } else {
      ProfileOption.style.display = "none";
    }
  } catch (error) {
    console.log("An error occurred while imge element block :", error);
  }
});

// profile photo chanage photo function

file.addEventListener("change", function () {
  let choosePhoto = this.files[0];

  console.log("Manisha");

  if (choosePhoto) {
    let reader = new FileReader();

    reader.addEventListener("load", function () {
      image.setAttribute("src", reader.result);

      let ProfileImagesChange = [];

      if (localStorage.getItem("profileImagesData") !== null) {
        ProfileImagesChange = JSON.parse(
          localStorage.getItem("profileImagesData")
        );
      }
      let userProfileObj = {
        avatarUrl: reader.result,
      };

      ProfileImagesChange.push(findUser["avatarUrl"]);

      localStorage.setItem(
        "profileImagesData",
        JSON.stringify(ProfileImagesChange)
      );

      console.log(userProfileObj);

      let avatarUrlAssaign = Object.assign(findUser, userProfileObj);
      console.log(avatarUrlAssaign);

      info[userIndex] = avatarUrlAssaign;

      localStorage.setItem("register", JSON.stringify(info));
    });

    reader.readAsDataURL(choosePhoto);
  }
});

// Transform to default profile image

function defaultProfile() {
  try {
    console.log(findUser);

    let firstElement = findUser["firstName"];

    let avatarText = firstElement.toUpperCase().charAt(0);
    console.log(avatarText);

    // avatar create

    let avatarCanva = document.createElement("canvas");
    let avatarContext = avatarCanva.getContext("2d");

    avatarCanva.width = 200;
    avatarCanva.height = 200;

    // creating a random color creation function
    let letters = "0123456789ABCDEF";
    let color = "#";

    let randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    for (let i = 0; i < 6; i++) {
      color += letters[randomArray[0] % 16];
      window.crypto.getRandomValues(randomArray);
    }

    // draw background
    avatarContext.fillStyle = color;
    avatarContext.fillRect(0, 0, avatarCanva.width, avatarCanva.height);

    // draw text

    avatarContext.font = "bold 100px Assistant";
    avatarContext.textAlign = "center";
    avatarContext.textBaseline = "middle";
    avatarContext.fillStyle = "#fff";
    avatarContext.fillText(
      avatarText,
      avatarCanva.width / 2,
      avatarCanva.height / 2
    );

    // return

    let imageUrl = avatarCanva.toDataURL("image/png");

    let changeImage = {
      avatarUrl: imageUrl,
    };

    // let asingning the data to the profile user object

    let assingImage = Object.assign(findUser, changeImage);

    console.log(assingImage);

    info[userIndex] = assingImage;

    localStorage.setItem("register", JSON.stringify(info));
  } catch (error) {
    console.log("An error occurred while chage the default image :", error);
  }
}

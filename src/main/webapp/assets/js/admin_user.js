// Getting the all user data from the database

let allUserData = JSON.parse(localStorage.getItem("register"));
console.log(allUserData);

for (let user of allUserData) {
  let userImage = user["avatarUrl"];
  let userName = user["userName"];
  let userTheme = user["userTheme"];
  let userId = user["userId"];

  userCardElementCreation(userImage, userName, userTheme, userId);
}

// Element creation function

function userCardElementCreation(userImage, userName, userTheme, userId) {
  try {
    let userCard = document.createElement("div");
    userCard.setAttribute("class", "user-card-div");
    userCard.innerHTML = `
      <div class="user-card-inside-div" id=${userId}>
        <div class="user-image-div">
          <img
            class="user-image"
            src= ${userImage}
            alt="user-image"
          />
        </div>
      
        <div class="user-name-div">
          <h3>${userName}</h3>
          <p>${userTheme}</p>
        </div>
      </div>
    `;

    document.querySelector(".user-card-showing-inside-div").append(userCard);
  } catch (error) {
    console.log("An error occurred while creating the user card:", error);
  }
}

// creating a function to remove all element

function removeElement() {
  try {
    let beforeElement = document.querySelectorAll(".user-card-div");

    // remove the before element

    if (beforeElement !== null) {
      for (let before of beforeElement) {
        before.remove();
      }
    }
  } catch (error) {
    console.log(
      "An error occured while removing the rprevious element :",
      error
    );
  }
}

// This month users

let thisUserData = [];

for (let userDatas of allUserData) {
  let dateString = userDatas["registrationDate"];

  // Parse the date string using Moment.js
  let date = moment(dateString, "MM/DD/YYYY");

  // Get the current date
  let currentDate = moment();

  if (date.isSame(currentDate, "month") && date.isSame(currentDate, "year")) {
    thisUserData.push(userDatas);
  }
}
console.log(thisUserData);

// This month user function

let thisMonthButton = document.querySelector(".this-month-user-div");

thisMonthButton.addEventListener("click", (event) => {
  event.preventDefault();

  try {
    removeElement();

    // creating for loop to show the this month users

    for (let thisUser of thisUserData) {
      let userImage = thisUser["avatarUrl"];
      let userName = thisUser["userName"];
      let userTheme = thisUser["userTheme"];
      let userId = thisUser["userId"];
      userCardElementCreation(userImage, userName, userTheme, userId);
    }
  } catch (error) {
    console.log("An error occured while the thisbutton function :", error);
  }
});

// Again creating a function to show all user details

let totalUserElement = document.querySelector(".total-user-div");

totalUserElement.addEventListener("click", (event) => {
  event.preventDefault();

  try {
    removeElement();

    //   creating a for of loop to show the all user cards

    for (let allUsres of allUserData) {
      let userName = allUsres["userName"];
      let userTheme = allUsres["userTheme"];
      let userImage = allUsres["avatarUrl"];
      let userId = allUsres["userId"];

      userCardElementCreation(userImage, userName, userTheme, userId);
    }
  } catch (error) {
    console.log("An error occured while the tottalbutton function :", error);
  }
});

// creating a function to remove the details elemet

function removeDetailsElement() {
  try {
    let detailsElement = document.querySelector(".card-inside-div-container");

    if (detailsElement !== null) {
      detailsElement.remove();
    }
  } catch (error) {
    console.log("An error occured while the removeDetailsFunction :", error);
  }
}

// creating a function to show the particular user data

let userCards = document.querySelectorAll(".user-card-div");

for (let userCardElement of userCards) {
  userCardElement.addEventListener("click", (event) => {
    event.preventDefault();
    try {
      removeDetailsElement();

      // getting that element for getting the element

      let currentElement = event.target.id;

      console.log(currentElement);

      // find the user

      let findUser = allUserData.find((e) => e["userId"] == currentElement);
      console.log(findUser);

      let thisImage = findUser["avatarUrl"];
      let thisFirstName = findUser["firstName"];
      let thisLastName = findUser["lastName"];
      let thisTheme = findUser["userTheme"];
      let thisAge = findUser["age"];
      let thisEmail = findUser["email"];
      let thisUserName = findUser["userName"];

      createDetailsElement(
        thisImage,
        thisAge,
        thisFirstName,
        thisLastName,
        thisTheme,
        thisEmail,
        thisUserName
      );
    } catch (error) {
      console.log("An error occured while userCardElement function :", error);
    }
  });
}

// creating a details element function

function createDetailsElement(
  thisImage,
  thisAge,
  thisFirstName,
  thisLastName,
  thisTheme,
  thisEmail,
  thisUserName
) {
  try {
    let cardInsideDivContainer = document.createElement("div");
    cardInsideDivContainer.setAttribute("class", "card-inside-div-container");
    cardInsideDivContainer.innerHTML = `
  <div class="card-inside-inside-div-container">
  <div class="details-image-div">
    <img
      class="details-image"
      src=${thisImage}
      alt="detials-image"
    />
  </div>

  <div class="person-details-div">
    <div class="person-inside-details-div">
      <div class="first-name-div">
        <h3>First name</h3>

        <p>${thisFirstName}</p>
      </div>
      <div class="first-name-div">
        <h3>Last name</h3>

        <p>${thisLastName}</p>
      </div>
      <div class="first-name-div">
        <h3>User name</h3>

        <p>${thisUserName}</p>
      </div>

      <div class="first-name-div">
        <h3>Theme</h3>

        <p>${thisTheme}</p>
      </div>

      <div class="first-name-div">
        <h3>Email</h3>

        <p>${thisEmail}</p>
      </div>
      <div class="first-name-div">
        <h3>Age</h3>

        <p>${thisAge}</p>
      </div>
    </div>
  </div>
</div>
  `;

    document
      .querySelector(".card-details-div-container")
      .append(cardInsideDivContainer);
  } catch (error) {
    console.log("An error occured while the createElementFunction :", error);
  }
}

// selection button css adding

let buttonAll = document.querySelectorAll(".selection-button");

for (let button of buttonAll) {
  button.addEventListener("click", (event) => {
    event.preventDefault();
  });
}

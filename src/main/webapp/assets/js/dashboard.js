let allUserData;

let totalUserLength;
let thisMonthUser;

// This month users
let thisUserData = [];
try {
  // Getting the all user data from the database
  allUserData = JSON.parse(localStorage.getItem("register"));
  console.log(allUserData);

  totalUserLength = allUserData.length;
  console.log(totalUserLength);

  // Getting the all elements to show the details
  let totalUser = document.querySelector(".total-count");
  totalUser.innerHTML = totalUserLength;

  let websiteView = document.querySelector(".website-views");
  websiteView.innerHTML = "";

  // Here creating for loop function get the user first top three user
  let count = 0;

  for (let allUser of allUserData) {
    if (count >= 3) {
      break;
    }

    let userImage = document.createElement("img");
    userImage.setAttribute("class", "added-user-image");
    userImage.setAttribute("alt", "user-image");
    userImage.setAttribute("src", allUser["avatarUrl"]);
    document.querySelector(".total-user-short-image-div").append(userImage);

    count++;
  }

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

  thisMonthUser = document.querySelector(".this-month-user");
  thisMonthUser.innerHTML = thisUserData.length;

  let number = 0;

  for (let thisUser of thisUserData) {
    if (number >= 3) {
      break;
    }

    let thisUserImage = document.createElement("img");
    thisUserImage.setAttribute("class", "added-user-image");
    thisUserImage.setAttribute("alt", "user-image");
    thisUserImage.setAttribute("src", thisUser["avatarUrl"]);
    document.querySelector(".this-month-image-div").append(thisUserImage);

    number++;
  }
} catch (error) {
  console.log("An error occurred:", error);
  // Handle the error accordingly
}

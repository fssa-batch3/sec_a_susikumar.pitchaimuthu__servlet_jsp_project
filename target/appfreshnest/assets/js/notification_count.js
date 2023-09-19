let notificationDatas = JSON.parse(
  localStorage.getItem("followNotificationData")
);
console.log(notificationDatas);

let othersData = JSON.parse(localStorage.getItem("otherNotification"));
console.log(othersData);

let userNotifications = [];

if (notificationDatas !== null) {
  for (let follow of notificationDatas) {
    if (
      follow["requestReceiverId"] == findUser["userId"] &&
      follow["isRead"] == "false"
    ) {
      userNotifications.push(follow);
    }
  }
}

let userNotificationLength = userNotifications.length;

console.log(userNotifications);

let otherDataArray = [];

if (othersData !== null) {
  for (let other of othersData) {
    if (
      other["message_receiver_id"] == findUser["userId"] &&
      other["isRead"] == false
    ) {
      otherDataArray.push(other);
    }
  }
}

console.log(userNotifications);

let otherNotificationLength = otherDataArray.length;

let notificationCounts = otherNotificationLength + userNotificationLength;

if (notificationCounts != 0) {
  let countElement = document.querySelector(".notification-para");

  countElement.innerHTML = notificationCounts;
}

let notification = document.querySelector("#notification");

// notification page direction location

notification.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href =
    "../pages/notification.html?user=" + findUser["userId"];
  // Here convert the data into read

  try {
    let otherArray = [];

    if (otherDataArray.length == 0) {
      return;
    }

    for (let other of othersData) {
      for (let insideOther of otherDataArray) {
        if (other["messageId"] == insideOther["messageId"]) {
          let otherObj = {
            isRead: "true",
          };

          let otherAssaign = Object.assign(other, otherObj);

          otherArray.push(otherAssaign);
        } else {
          otherArray.push(other);
        }
      }
    }

    localStorage.setItem("otherNotification", JSON.stringify(otherArray));
  } catch (error) {
    console.log(
      "An error occurred while redirect to the notification page :",
      error
    );
  }
});

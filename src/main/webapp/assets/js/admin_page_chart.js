// Getting the upcoming days

function getUpcomingDates() {
  try {
    let currentDate = new Date();
    let upcomingDates = ["5/21/2023"];
    let remainingDays = getRemainingDays(currentDate);

    for (let i = 1; i <= remainingDays; i++) {
      let upcomingDate = new Date();
      upcomingDate.setDate(currentDate.getDate() + i);

      let year = upcomingDate.getFullYear();
      let month = upcomingDate.getMonth() + 1;
      let day = upcomingDate.getDate();

      // Formatting the date to MM/DD/YYYY format
      let formattedDate = month + "/" + day + "/" + year;

      upcomingDates.push(formattedDate);
    }

    return upcomingDates;
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

function getRemainingDays(currentDate) {
  let endOfDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    23,
    59,
    59,
    999
  );
  let timeRemaining = endOfDay.getTime() - currentDate.getTime();
  let remainingDays = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

  return remainingDays;
}

let upcomingDates = getUpcomingDates();
console.log(upcomingDates);

// getting the daily registered data of the users

// Group the user registration data by date

let groupedData = allUserData.reduce(function (result, user) {
  let registrationDate = user.registrationDate;

  let matchingGroup = result.find(function (group) {
    return group[0]["registrationDate"] === registrationDate;
  });

  if (matchingGroup) {
    matchingGroup.push(user);
  } else {
    result.push([user]);
  }

  return result;
}, []);

// Handle the groupedData as needed
console.log(groupedData);

// Here getting the length of each day's data
let dataLength = [];

for (let groupDa of groupedData) {
  console.log(groupDa.length);
  dataLength.push(groupDa.length);
}

console.log(dataLength);

// Get the canvas element
try {
  let ctx = document.querySelector(".userGrowth").getContext("2d");

  // Create the chart
  new Chart(ctx, {
    type: "line",
    data: {
      labels: upcomingDates,
      datasets: [
        {
          label: "User growth",
          data: dataLength,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  // Handle the chart as needed
} catch (error) {
  console.log("while creating the chart:", error);
  // Handle the error accordingly
}

// Total grow pie chart details getting

try {
  let total = document.querySelector(".totalGrowth").getContext("2d");

  new Chart(total, {
    type: "bar",
    data: {
      labels: ["Visited", "Total users", "This month users"],
      datasets: [
        {
          label: "freshnest growth",
          data: [totalUserLength, totalUserLength, thisUserData.length],
          backgroundColor: [
            "rgba(153, 102, 255, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgb(153, 102, 255)",

            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
          borderWidth: 0.6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
} catch (error) {
  console.log("while creating a chart error: ", error);
}

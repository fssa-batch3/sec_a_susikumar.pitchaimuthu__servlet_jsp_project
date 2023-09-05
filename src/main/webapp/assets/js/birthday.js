// Birthday page form element

let birthdayForm = document.querySelector("#birthday-form");

birthdayForm.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    let birthday = document.getElementById("birthday").value.trim();
    let gender = document.getElementsByName("gender");
    console.log(gender);

    // calculating the age

    let currentDay = new Date();
    let birthDate = new Date(birthday);
    let age = currentDay.getFullYear() - birthDate.getFullYear();
    let monthDiff = currentDay.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDay.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    console.log(age);

    let birthdate = new Date(birthday);

    // Get today's date
    let today = new Date();

    // Calculate the user's age in milliseconds
    let ageInMilliseconds = today - birthdate;

    // Convert the age to years
    let ageInYears = ageInMilliseconds / 1000 / 60 / 60 / 24 / 365;

    if (ageInYears <= 18) {
      alert("Your should be more than 18");
      return;
    }

    let userGen;

    for (let genders of gender) {
      if (genders.checked) {
        userGen = genders.value;
      }
    }

    let birthDayObject = {
      dateOfBirth: birthday,
      userGender: userGen,
      age: age,
      city: "India",
    };

    console.log(birthDayObject);

    let birthdayObjectAssaign = Object.assign(findUserData, birthDayObject);
    console.log(birthdayObjectAssaign);

    allRegister[findIndexUser] = birthdayObjectAssaign;

    localStorage.setItem("register", JSON.stringify(allRegister));

    window.location.href = "../pages/logIn.html?user=" + findUserData["userId"];
  } catch (error) {
    console.log("Error: " + error.message);
  }
});

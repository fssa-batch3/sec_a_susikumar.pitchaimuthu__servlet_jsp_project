let findIndexUser;

let findUserData;
let allRegister;

try {
  let getUser = window.location.search;

  let userParams = new URLSearchParams(getUser);

  let urlId = userParams.get("user");
  console.log(urlId);

  // Getting all register data to know the user

  allRegister = JSON.parse(localStorage.getItem("register"));

  findUserData = allRegister.find((e) => e["userId"] == urlId);
  console.log(findUserData);

  findIndexUser = allRegister.indexOf(findUserData);
  console.log(findIndexUser);

  // Continue with the rest of your code and handle the data as needed
} catch (error) {
  console.log("An error occurred:", error);
}

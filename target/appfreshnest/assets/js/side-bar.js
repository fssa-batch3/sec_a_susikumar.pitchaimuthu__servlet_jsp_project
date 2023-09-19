const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");

// side bar toggle

toggle.addEventListener("click", () => {
  try {
    sidebar.classList.toggle("close");
  } catch (error) {
    console.log("An error occured while toggle open and close :", error);
  }
});

// side dark mode function

modeSwitch.addEventListener("click", () => {
  try {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
      modeText.innerText = "Light mode";
    } else {
      modeText.innerText = "Dark mode";
    }
  } catch (error) {
    console.log("An error occurred while dark mode :", error);
  }
});

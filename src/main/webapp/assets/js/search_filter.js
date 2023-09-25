function filterItems() {
  try {
    // Get input value and convert to lowercase
    let input = document.querySelector(".search-input").value.toLowerCase();

    let spaceRegex = / /g;

    // Replace spaces with an end dash
    let dashedText = input.replace(spaceRegex, "_");
    // Get list items
    let items = document.querySelectorAll(".user-card-container");

    // Loop through all items
    for (let searchItem of items) {
      let item = searchItem;
      let itemName = item.textContent.toLowerCase();

      // Check if the item name contains the search input
      if (itemName.includes(dashedText)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    }
  } catch (error) {
    console.log("An error occurred while search :", error);
  }
}

// intialize the code into the add eventLisner

let searchInput = document.querySelector(".search-input");
searchInput.addEventListener("input", filterItems);

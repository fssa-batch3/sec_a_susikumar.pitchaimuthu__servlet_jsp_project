
// date getting elements

let filterButton = document.querySelector(".filter-button");

// filter button add eventListener

filterButton.addEventListener("click", (event) => {
  event.preventDefault();

  try {
    let from = document.querySelector("#from").value;
    let to = document.querySelector("#to").value;
    
    let filterObject = {
      from: from,
      to: to
    };
    
    const url = "http://localhost:8080/appfreshnest/StillFilterServlet";

    axios.post(url, filterObject, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(function (response) {
      // handle success
      console.log(response.data);

      // Assuming you have a variable named serverMsg in the response data
      const serverMsg = response.data;
      console.log(serverMsg)

        removeCardElement();
        displayStills(response.data); // Assuming filterStills is a property in the response data
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  } catch (error) {
    console.error(error);
  }
});

//all photo showing add eventlIstener function
let imageContainer = document.querySelector(".second-section-container-div");

//Here creating function to remove the card element before creating the other element


function removeCardElement() {
  try {
    if (imageContainer.hasChildNodes()) {
      let image_div = document.querySelectorAll(".card-container");

      for (let cardDiv of image_div) {
        cardDiv.remove();
      }
    }
  } catch (error) {
    console.log("An error occured while removing the image card :", error);
  }
}
	function getAllStills() {
			const url = "http://localhost:8080/appfreshnest/StillGalleryServlet";
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    console.log(response.data);
			    const imageGallery = response.data;
			    displayStills(imageGallery);
			    console.log(imageGallery);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
		}	
	function displayStills(imageGallery) {
  let content = "";

  try {
    for (let imagesGall of imageGallery) {
      content += "<div class='card-container' id='" + imagesGall["stillId"] + "'>";
      content += "<div class='image-name-container'>";
      content += "<a href='../pages/snap-details.html?user=" + imagesGall["stillId"] + "'>";
      content += "<img id='" + imagesGall["stillId"] + "' src='" + imagesGall["stillUrl"] + "' alt='userSnaps' class='taking-image'>";
      content += "</a>";
      content += "<p class='snap-name'>" + imagesGall["stillName"] + "</p>";
      content += "</div>";
      content += "</div>";
    }

    console.log(content);
    document.querySelector(".second-section-container-div").innerHTML = content;
  } catch (error) {
    console.log("An error occurred while showing the images: ", error);
  }


		}
		
console.log("Yeah");

  let userUrl = window.location.search;
  let userUrlParams = new URLSearchParams(userUrl);

  console.log(userUrlParams);
  let stillId = userUrlParams.get("stillId");
   console.log(stillId);
//  Gets the still from the servlet

function getStillDetails() {
	const url = "http://localhost:8080/appfreshnest/StillDetailsServlet?stillId=" + stillId;
			axios.get(url)
			  .then(function (response) {
			    // handle success
			    console.log(response.data);
			    const imageObject = response.data;
			     try {
                     updateImageDisplay(imageObject); 
                  } catch (error) {
                     console.log("An error occurred while changing the image:", error);
                }    
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })
		}
		
getStillDetails();
		
		
// Image elment creation function		
		
	function updateImageDisplay(still) {
  

   let imageDiv = document.querySelector("#user-taken-still");
    console.log(imageDiv);

    let snapshot = document.createElement("img");
    snapshot.setAttribute("src", still["stillUrl"]);
    snapshot.setAttribute("id", "user-taken-still");
    snapshot.setAttribute("class", "removeElement");
    snapshot.setAttribute("alt", "user-taken-still");
    document.querySelector(".image-div").append(snapshot);

    // image element creating function

    let imageEditDiv = document.createElement("div");
    imageEditDiv.setAttribute("class", "image-edit-option-div removeElement");

    let a = document.createElement("a");
    a.setAttribute(
      "href",
      "../pages/snap-edit.html?stillId=" +
        still["stillId"]
    );
    imageEditDiv.append(a);

    let editButton = document.createElement("button");
    editButton.setAttribute("id", still["stillId"]);
    editButton.setAttribute("class", "option-div");
    a.append(editButton);

    let edit_i = document.createElement("i");
    edit_i.setAttribute("class", "bi bi-pencil");
    editButton.append(edit_i);

    let edit_p = document.createElement("p");
    edit_p.innerHTML = "Edit";
    editButton.append(edit_p);

    // like button
    
    let checkFavourite = still["is_favourite"];
    
    if(checkFavourite){

    let likeButton = document.createElement("button");
    likeButton.setAttribute("id", still["stillId"]);
    likeButton.setAttribute("class", "option-div like-option");
    likeButton.setAttribute("onclick" , "setLike()");
    imageEditDiv.append(likeButton);

    let like_i = document.createElement("i");
    like_i.setAttribute("class", "bi bi-heart");
    likeButton.append(like_i);

    let like_p = document.createElement("p");
    like_p.innerHTML = "Like";
    likeButton.append(like_p);
    }else {
		
    let likeButton = document.createElement("button");
    likeButton.setAttribute("id", still["stillId"]);
    likeButton.setAttribute("class", "option-div like-option");
    likeButton.setAttribute("onclick" , "setLike()");
    imageEditDiv.append(likeButton);

    let like_i = document.createElement("i");
    like_i.setAttribute("class", "bi bi-heart");
    likeButton.append(like_i);

    let like_p = document.createElement("p");
    like_p.innerHTML = "Like";
    likeButton.append(like_p);
	}

    // share button

    let shareButton = document.createElement("button");
    shareButton.setAttribute("id", still["stillId"]);
    shareButton.setAttribute("class", "option-div downloadButton");
    imageEditDiv.append(shareButton);

    let share_i = document.createElement("i");
    share_i.setAttribute("class", "bi bi-download");
    shareButton.append(share_i);

    let share_p = document.createElement("p");
    share_p.innerHTML = "Download";
    shareButton.append(share_p);

    document
      .querySelector(".image-option-next-option-div")
      .append(imageEditDiv);

    // image previous and next control div

    // previous button

    let imageControlDiv = document.createElement("div");
    imageControlDiv.setAttribute(
      "class",
      "image-next-option-div removeElement"
    );

    let previousButton = document.createElement("button");
    previousButton.setAttribute("id", still["stillId"]);
    previousButton.setAttribute("onclick", "previousImage()");
    previousButton.setAttribute("class", "option-div");
    imageControlDiv.append(previousButton);

    let previous_i = document.createElement("i");
    previous_i.setAttribute("class", "bi bi-skip-backward-btn");
    previousButton.append(previous_i);

    let previous_p = document.createElement("p");
    previous_p.innerHTML = "Previous";
    previousButton.append(previous_p);

    // next

    let nextButton = document.createElement("button");
    nextButton.setAttribute("id", still["stillId"]);
    nextButton.setAttribute("class", "option-div");
    nextButton.setAttribute("onclick", "nextImage()");
    imageControlDiv.append(nextButton);

    let next_i = document.createElement("i");
    next_i.setAttribute("class", "bi bi-skip-forward-btn");
    nextButton.append(next_i);

    let next_p = document.createElement("p");
    next_p.innerHTML = "Next";
    nextButton.append(next_p);

    document
      .querySelector(".image-option-next-option-div")
      .append(imageControlDiv);

    // image details showing div

    let imageName = document.getElementById("image-name");
    imageName.innerHTML = still["stillName"];

    let imageDate = document.getElementById("image-taken-date");
    imageDate.innerHTML = still["stillDate"];

    let imageTime = document.getElementById("image-taken-time");
    imageTime.innerHTML = still["stillTime"];
}





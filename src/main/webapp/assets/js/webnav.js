// webcam nav javascript

let sideBar = document.querySelector(".sidebar");

let nav = document.querySelector(".header");
let menuList = document.querySelector(".menu-bar");

function closeSideBar() {
  try {
    document.querySelector(".side-bar-close-button").remove();
    //   open element creation

    let openArrowDiv = document.createElement("div");
    openArrowDiv.setAttribute("class", "side-bar-open-button");
    openArrowDiv.setAttribute("onclick", "openSideBar()");

    let openArrow = document.createElement("i");
    openArrow.setAttribute("class", "bi bi-chevron-double-right");
    openArrowDiv.append(openArrow);

    document.querySelector(".side-bar-close-button-div").append(openArrowDiv);

    //   change the css for the elements

    nav.style.display = "none";
    menuList.style.display = "none";
    sideBar.style.width = "0px";
    sideBar.style.padding = "0px";
  } catch (error) {
    console.log("An error occured while the close side bar :", error);
  }
}

// Side bar open function

function openSideBar() {
  try {
    document.querySelector(".side-bar-open-button").remove();

    //   open element creation

    let openArrowDiv = document.createElement("div");
    openArrowDiv.setAttribute("class", "side-bar-close-button");
    openArrowDiv.setAttribute("onclick", "closeSideBar()");

    let openArrow = document.createElement("i");
    openArrow.setAttribute("class", "bi bi-chevron-double-left");
    openArrowDiv.append(openArrow);

    document.querySelector(".side-bar-close-button-div").append(openArrowDiv);

    //   change the css for the elements

    nav.style.display = "block";
    menuList.style.display = "block";
    sideBar.style.width = "88px";
    sideBar.style.padding = "10px 14px";
  } catch (error) {
    console.log("An error occured while the openSide bar :", error);
  }
}

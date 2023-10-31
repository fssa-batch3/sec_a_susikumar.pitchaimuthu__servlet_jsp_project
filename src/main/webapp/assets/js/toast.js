     function showToast(content, type) {
        createToastElement(content, type);
        const toastContainer = document.querySelector(".toast-container");
        const toast = document.getElementById("toast");
        let svg = document.getElementById("toast-response-color");
        let path = svg.querySelector("path");
        path.setAttribute("fill", getBackgroundColor(type));
        toast.innerText = content;
        toastContainer.style.display = "flex";
        toastContainer.style.height = "auto";
        toastContainer.style.opacity = "1";
        setTimeout(() => {
          toastContainer.style.height = "0";
          toastContainer.style.opacity = "0";
        }, 2000);
      }

      function getBackgroundColor(type) {
        switch (type) {
          case "success":
            return "green";
          case "error":
            return "red";
          case "warning":
            return "yellow";
          case "inprogress":
            return "blue";
          default:
            return "#333";
        }
      }

      function removeAlert() {
        const removeContainer = document.querySelector(".toast-container");
        removeContainer.style.display = "none";
      }

      function createToastElement(content, type) {
        // Create the outer toast container
        const toastContainer = document.createElement("div");
        toastContainer.classList.add("toast-container");

        // Create the SVG element for the red background

        toastContainer.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="4" viewBox="0 0 400 4" fill="none" id="toast-response-color">
        <path d="M0 4C0 1.79086 1.79086 0 4 0H396C398.209 0 400 1.79086 400 4H0Z" fill="#E43538"></path>
    </svg>
`;

        // Create the toast content container div
        const toastContentContainer = document.createElement("div");
        toastContentContainer.classList.add("toast-content-container-div");

        // Create the checkmark icon
        const checkmarkIcon = document.createElement("div");

        if (type == "success") {
          checkmarkIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84286 12.1217 2 10 2ZM9.99999 16.6C6.35491 16.6 3.39999 13.6451 3.39999 10C3.39999 6.35493 6.35491 3.40001 9.99999 3.40001C13.6451 3.40001 16.6 6.35493 16.6 10C16.5945 13.6428 13.6428 16.5945 9.99999 16.6ZM14.0045 7.83C14.0045 7.64099 13.927 7.46025 13.79 7.33C13.5144 7.06199 13.0756 7.06199 12.8 7.33L9 11.18L7.21 9.41C7.03137 9.23136 6.771 9.1616 6.52699 9.22698C6.28297 9.29237 6.09237 9.48297 6.02699 9.72698C5.9616 9.971 6.03137 10.2314 6.21 10.41L8.45 12.67C8.7268 12.9446 9.1732 12.9446 9.45 12.67L13.79 8.33C13.927 8.19974 14.0045 8.01901 14.0045 7.83Z" fill="#00A886"/>
</svg>`;
        } else {
          checkmarkIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2ZM9.99999 16.6C6.35491 16.6 3.39999 13.6451 3.39999 10C3.39999 6.35492 6.35491 3.4 9.99999 3.4C13.6451 3.4 16.6 6.35492 16.6 10C16.5945 13.6428 13.6428 16.5945 9.99999 16.6ZM11 10L12.82 8.17L12.83 8.18C13.1062 7.90386 13.1062 7.45614 12.83 7.18C12.5539 6.90386 12.1062 6.90386 11.83 7.18L10 9L8.18001 7.17C7.90387 6.89386 7.45616 6.89386 7.18001 7.17C6.90387 7.44614 6.90387 7.89386 7.18001 8.17L9.00001 10L7.17001 11.82C6.89387 12.0961 6.89387 12.5439 7.17001 12.82C7.44616 13.0961 7.89387 13.0961 8.17001 12.82L10 11L11.83 12.83C12.1062 13.1061 12.5539 13.1061 12.83 12.83C13.1062 12.5539 13.1062 12.1061 12.83 11.83L11 10Z" fill="#E43538"></svg>
  `;
        }

        // Create the toast message
        const toastMessage = document.createElement("div");
        toastMessage.id = "toast";
        toastMessage.classList.add("toast-message");
        toastMessage.textContent = content;

        // Create the close button
        const closeButton = document.createElement("div");
        closeButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clip-path="url(#clip0_8566_7011)">
            <rect opacity="0.151576" x="-4" width="24" height="24" rx="4" fill="white" />
            <path d="M11.2561 10L13.9065 12.6505C14.2534 12.9974 14.2534 13.5597 13.9065 13.9066C13.5597 14.2534 12.9973 14.2534 12.6505 13.9066L10 11.2561L7.34954 13.9066C7.00268 14.2534 6.44032 14.2534 6.09347 13.9066C5.74661 13.5597 5.74661 12.9974 6.09347 12.6505L8.74393 10L6.09347 7.34958C5.74661 7.00273 5.74661 6.44037 6.09347 6.09351C6.44032 5.74666 7.00268 5.74666 7.34954 6.09351L10 8.74397L12.6505 6.09351C12.9973 5.74666 13.5597 5.74666 13.9065 6.09351C14.2534 6.44037 14.2534 7.00273 13.9065 7.34958L11.2561 10Z" fill="#264966" />
        </g>
    </svg>
  `;
        closeButton.classList.add("toast-close-button");

        // Append elements to the toast content container
        toastContentContainer.appendChild(checkmarkIcon);
        toastContentContainer.appendChild(toastMessage);
        toastContentContainer.appendChild(closeButton);

        // Append the toast content container to the outer container
        toastContainer.appendChild(toastContentContainer);

        // Add an event listener for removing the toast
        closeButton.addEventListener("click", removeAlert);

        // Finally, append the entire toast container to your document or desired location
        document.body.appendChild(toastContainer);
      }
   
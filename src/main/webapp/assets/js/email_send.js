let sendButton = document.querySelector(".send-button");

sendButton.addEventListener("click", (e) => {
  e.preventDefault();

  // getting the email details from the input and put into the params

  let params = {
    name: findUser["userName"],
    email: findUser["email"],
    subject: document.querySelector(".underline-input").value,
    message: document.querySelector("#message").value,
  };

  let serviceId = "service_6dvp4gm";
  let templateId = "template_02oezsg";

  emailjs
    .send(serviceId, templateId, params)
    .then((res) => {
      document.querySelector(".underline-input").value = "";
      document.querySelector("#message").value = "";

      console.log(res);
      alert("The Email has been sent");
    })
    .catch((err) => console.log(err));
});

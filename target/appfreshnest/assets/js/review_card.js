let userReview = [
  {
    review:
      "The Nest browser was very useful to us. It's was very joyful and funny. When we are think to make aconversation between me and my friend's. It's very useful",
    profile: "./assets/images/Hero section/User-review/1.jpg",
    userName: "Bagath Paisal",
    From: "Canada",
  },
  {
    review:
      "The nest is the best. Whenever I want to take photos with filters it was very helpful to me. There is very funny filters also here. It's was very nice to me.",
    profile: "./assets/images/Hero section/User-review/2.jpg",
    userName: "Hema Dzouza",
    From: "Chennai",
  },
  {
    review:
      "I am from US. When I was heard the word of fresh nest, I never think It's very useful. At the first time, I came to the browser for visit. Now I am became one of user.",
    profile: "./assets/images/Hero section/User-review/3.jpg",
    userName: "John",
    From: "United States",
  },
  {
    review:
      "Hi.. This is Alexa. I never seen browser like that before. This browser was very helpful to me. If wanna a picture My mind say to fresh nest. It was very helpful to me.",
    profile: "./assets/images/Hero section/User-review/4.jpg",
    userName: "Alexa susee",
    From: "Australia",
  },
  {
    review:
      "Fresh nest... What a word. It was very very friendly to me. I was used this browser for chatting and stills. It was very Friendly to me.",
    profile: "./assets/images/Hero section/User-review/5.png",
    userName: "Abdul Riyaz",
    From: "England",
  },
  {
    review:
      "What I say for fresh nest I don't have words. Nest was very help to me to make convo to my friends. Stills Helps to take picture. So I have two benefit.",
    profile: "./assets/images/Hero section/User-review/6.jpg",
    userName: "Jacklyn Rose",
    From: "Russia",
  },
];

for (let userCard of userReview) {
  let userReviewCard1 = document.createElement("div");
  userReviewCard1.setAttribute("class", "user-1-review-section-div");

  let userReviewDiv = document.createElement("div");
  userReviewDiv.setAttribute("class", "user-1-review-div");
  userReviewCard1.append(userReviewDiv);

  let userReviewPara = document.createElement("p");
  userReviewPara.setAttribute("class", "user-1-review-div-para");
  userReviewPara.innerText = userCard["review"];
  userReviewDiv.append(userReviewPara);

  let userImageContainer = document.createElement("div");
  userImageContainer.setAttribute("class", "user-review-1-image-about-div");
  userReviewCard1.append(userImageContainer);

  let userImageDiv = document.createElement("div");
  userImageDiv.setAttribute("class", "user-review-1-image-div");
  userImageContainer.append(userImageDiv);

  let userImage = document.createElement("img");
  userImage.setAttribute("src", userCard["profile"]);
  userImage.setAttribute("class", "user-review-1-image-div-image");
  userImageDiv.append(userImage);

  let div = document.createElement("div");
  userImageContainer.append(div);

  let h3 = document.createElement("h3");
  h3.innerText = userCard["userName"];
  div.append(h3);

  let from = document.createElement("p");
  from.innerText = userCard["From"];
  div.append(from);

  document
    .querySelector(".user-review-section-container")
    .append(userReviewCard1);
}

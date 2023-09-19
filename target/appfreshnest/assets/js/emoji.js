function getAllTwemojiUrls() {
  let emojiRanges = [
    [0x1f601, 0x1f64f],
    [0x1f300, 0x1f5ff],
    [0x1f680, 0x1f6ff],
  ];

  let emojiUrls = [];

  emojiRanges.forEach(([start, end]) => {
    for (let unicode = start; unicode <= end; unicode++) {
      let emojiChar = String.fromCodePoint(unicode);
      let emojiUrl;

      try {
        emojiUrl = twemoji.parse(emojiChar);
      } catch (error) {
        console.log(`Error parsing emoji ${emojiChar}:`, error);
        // Handle the error accordingly, e.g., skip the emoji or use a fallback URL
        continue;
      }

      emojiUrls.push(emojiUrl);
    }
  });

  return emojiUrls;
}

let twemojiUrls = getAllTwemojiUrls();
console.log(twemojiUrls);

// Setting the emoji to the emoji file

console.log(twemojiUrls.length);

let emojiContainer = document.querySelector(".emoji-div-container");
for (let twemojiUrl of twemojiUrls) {
  try {
    let img = document.createElement("img");
    img.setAttribute("src", twemojiUrl);
    img.setAttribute("alt", "Emoticon");
    emojiContainer.appendChild(img);
  } catch (error) {
    console.log("Error creating image element:", error);
  }
}

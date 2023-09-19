// emoji data

let emojiAvatar = [
  { avatar: "../assets/images/avatar_emaojis/1.gif" },
  { avatar: "../assets/images/avatar_emaojis/10.gif" },
  { avatar: "../assets/images/avatar_emaojis/11.gif" },
  { avatar: "../assets/images/avatar_emaojis/12.gif" },
  { avatar: "../assets/images/avatar_emaojis/13.gif" },
  { avatar: "../assets/images/avatar_emaojis/14.png" },
  { avatar: "../assets/images/avatar_emaojis/15.png" },
  { avatar: "../assets/images/avatar_emaojis/16.png" },
  { avatar: "../assets/images/avatar_emaojis/17.png" },
  { avatar: "../assets/images/avatar_emaojis/18.png" },
  { avatar: "../assets/images/avatar_emaojis/2.gif" },
  { avatar: "../assets/images/avatar_emaojis/3.png" },
  { avatar: "../assets/images/avatar_emaojis/4.gif" },
  { avatar: "../assets/images/avatar_emaojis/5.gif" },
  { avatar: "../assets/images/avatar_emaojis/6.gif" },
  { avatar: "../assets/images/avatar_emaojis/7.gif" },
  { avatar: "../assets/images/avatar_emaojis/8.gif" },
  { avatar: "../assets/images/avatar_emaojis/9.gif" },
  { avatar: "../assets/images/avatar_emaojis/19.gif" },
  { avatar: "../assets/images/avatar_emaojis/20.gif" },
  { avatar: "../assets/images/avatar_emaojis/21.gif" },
  { avatar: "../assets/images/avatar_emaojis/22.gif" },
  { avatar: "../assets/images/avatar_emaojis/23.gif" },
  { avatar: "../assets/images/avatar_emaojis/24.gif" },
];

try {
  localStorage.setItem("emojiAvatar", JSON.stringify(emojiAvatar));
} catch (error) {
  console.log("An error occured while setting avatar :", error);
}

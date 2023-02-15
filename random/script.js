if (localStorage.getItem("lastViewedItem") == null) {
  localStorage.setItem("lastViewedItem", 0);
  var troll = 1
} else {
  if (!localStorage.getItem("lastViewedItem") == 0) {
    var troll = 0
  }
};

let userInput = "";

document.onkeypress = function(event) {
  userInput += String.fromCharCode(event.which);

  if (userInput.endsWith("rick")) {
    window.open("https://shattereddisk.github.io/rickroll/rickroll.mp4");
  } else if (userInput.endsWith("jasper")) {
    window.open("/media/jasper.jpg");
  } else if (userInput.endsWith("dog")) {
    window.open("/media/dog.mp4")
  } else if (userInput.endsWith("will")) {
    window.open("/media/will.jpg")
  } else if (userInput.endsWith("troll")) {
    localStorage.setItem("troll", 1);
    window.location = "/ramdom";
  } else if (!/rick/.test(userInput.substr(-6))) {
    userInput = userInput.substr(-5);
  }
};

if (localStorage.getItem("totalViews") == null) {
  localStorage.setItem("totalViews", 0);
};
let totalViews = localStorage.getItem("totalViews")
localStorage.setItem("totalViews", Number(totalViews) + 1);
if (localStorage.getItem("totalViews") >= database.length - 1) {
  setTimeout(function() {
    localStorage.setItem("lastViewedItem", 0);
    localStorage.setItem("totalViews", 0);
  }, 40);
};

function generateRandomNumber() {
  var randomNum = Math.floor(Math.random() * (database.length - 1)) + 1;
  let numberlists = localStorage.getItem("lastViewedItem");
  let textArray = numberlists.split(",");
  let numberArray = textArray.map(Number);
  while (numberArray.includes(randomNum)) {
    randomNum = Math.floor(Math.random() * (database.length - 1)) + 1;
  }
  return randomNum;
};

function scrollToMiddle() {
  let currentY = window.pageYOffset;
  if (document.body.scrollHeight - window.innerHeight > 600) {
    var targetY = 600;
  } else {
    var targetY = document.body.scrollHeight - window.innerHeight;
  };
  let animating = true;
  function stepMiddle() {
    let y = currentY + (targetY - currentY) * 0.05;
    if (window.pageYOffset < targetY - 2) { 
      window.scrollTo(0, y);
      currentY = y;
      window.requestAnimationFrame(stepMiddle);
    } else {
      window.scrollTo(0, targetY);
      animating = false;
    }
  }
  window.requestAnimationFrame(stepMiddle);
}
setTimeout(scrollToMiddle, 800);

var randomNumber = generateRandomNumber();
if (localStorage.getItem("troll") == 1) {
  localStorage.setItem("troll", 0);
  randomNumber = 0
}
if (randomNumber == 0) {
  document.getElementById("logo").src = "/random/troll_logo.png";
  document.getElementById("fillout").innerHTML = "Fill in the ㎡ăⓓŀĩƃʂ";
  const madNumber = document.getElementById("madNumber");
  let characters = "-0123456789%$#@&<>~";
  let result = "";
  setInterval(() => {
    for (let i = 0; i < 2; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    };
    madNumber.innerHTML = "Mad Lib number: " + result.toString();
    result = "";
  }, 50);
} else {
  const madNumber = document.getElementById("madNumber");
  madNumber.innerHTML = "Mad Lib number: " + randomNumber.toString();
};

// Get the current value of the item from local storage
var currentValue = localStorage.getItem("lastViewedItem");
localStorage.setItem("lastViewedItem", currentValue + "," + randomNumber.toString());
const input = database[randomNumber];
let updatedText = input;
const parenthesisTextboxes = document.getElementsByClassName(
  "parenthesis-textbox"
);
const matches = input.match(/\(([^)]+)\)/g);
if (matches) {
  for (let i = 0; i < matches.length; i++) {
    const strippedMatch = matches[i].slice(1, -1);
    const textbox = document.createElement("textarea");
    textbox.type = "text";
    textbox.classList.add("parenthesis-textbox");
    textbox.placeholder = strippedMatch;
    document.querySelector("#output").appendChild(textbox);
  }
};
function getResults() {
  if (randomNumber == 0) {
    let soundnew = new Audio("/random/generate.mp3");
    soundnew.currentTime = 0;
    soundnew.play();
  };
  let generateButton = document.querySelector("#generateButton");
  for (let i = 0; i < parenthesisTextboxes.length; i++) {
    const textboxValue = parenthesisTextboxes[i].value;
    updatedText = updatedText.replace(
      `(${matches[i].slice(1, -1)})`, textboxValue
    );
  };
  if (randomNumber == 0) {
    const authortextbox = document.createElement("h1")
    let characters = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let result = "";
    setInterval(() => {
      for (let i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      };
      authortextbox.innerHTML = "Made by: " + result;
      result = "";
    }, 50);
    document.querySelector("#generated").appendChild(authortextbox);
  } else {
    const authortextbox = document.createElement("h1")
    authortextbox.innerHTML = "Made by: " + name_database[randomNumber];
    document.querySelector("#generated").appendChild(authortextbox);
  };
  const endtextbox = document.createElement("textarea");
  endtextbox.type = "text";
  endtextbox.classList.add("end-textbox");
  endtextbox.value = updatedText;
  document.querySelector("#generated").appendChild(endtextbox);
  generateButton.style.display = "none";
  if (randomNumber == 0) {
    const leavebutton = document.createElement("input");
    leavebutton.type = "submit";
    leavebutton.value = "LEAVE";
    document.querySelector("#generated").appendChild(document.createElement("br"));
    document.querySelector("#generated").appendChild(leavebutton);
    let sound = new Audio("/random/leave.mp3");
    leavebutton.addEventListener("click", function() {
      sound.currentTime = 0;
      sound.play();
      setTimeout(function() { window.location.href = "/"; }, 2000);
    });
  } else {
    const leavebutton = document.createElement("input");
    leavebutton.type = "submit";
    leavebutton.value = "New Madlib";
    document.querySelector("#generated").appendChild(document.createElement("br"));
    document.querySelector("#generated").appendChild(leavebutton);
    leavebutton.addEventListener("click", function() {
      window.location.href = "/random/";
    });
  };
  function scrollToBottom() {
    let currentY = window.pageYOffset;
    let targetY = document.body.scrollHeight - window.innerHeight;
    let animating = true;
    function step() {
      let y = currentY + (targetY - currentY) * 0.05;
      if (window.pageYOffset < targetY - 2) {
        window.scrollTo(0, y);
        currentY = y;
        window.requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetY);
        animating = false;
      }
    }
    window.requestAnimationFrame(step);
  }
  setTimeout(scrollToBottom, 250);
};

if (localStorage.getItem("lastViewedItem") == null) {
  localStorage.setItem("lastViewedItem", 0);
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
    if (window.pageYOffset < targetY) { 
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
var madNumber = document.getElementById("madNumber");
madNumber.innerHTML = "Mad Lib number: " + randomNumber.toString();
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
  let generateButton = document.querySelector("#generateButton");
  for (let i = 0; i < parenthesisTextboxes.length; i++) {
    const textboxValue = parenthesisTextboxes[i].value;
    updatedText = updatedText.replace(
      `(${matches[i].slice(1, -1)})`, textboxValue
    );
  };
  const authortextbox = document.createElement("h1")
  authortextbox.innerHTML = "Made by: " + name_database[randomNumber];
  document.querySelector("#generated").appendChild(authortextbox);
  const endtextbox = document.createElement("textarea");
  endtextbox.type = "text";
  endtextbox.classList.add("end-textbox");
  endtextbox.value = updatedText;
  document.querySelector("#generated").appendChild(endtextbox);
  generateButton.style.display = "none";
  function scrollToBottom() {
    let currentY = window.pageYOffset;
    let targetY = document.body.scrollHeight - window.innerHeight;
    let animating = true;
    function step() {
      let y = currentY + (targetY - currentY) * 0.05;
      if (window.pageYOffset < targetY) {
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

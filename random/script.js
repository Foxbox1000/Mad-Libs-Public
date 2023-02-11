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
  var randomNum = Math.floor(Math.random() * 4) + 1;
  let numberlists = localStorage.getItem("lastViewedItem");
  let textArray = numberlists.split(",");
  let numberArray = textArray.map(Number);
  while (numberArray.includes(randomNum)) {
    randomNum = Math.floor(Math.random() * 4) + 1;
  }
  return randomNum;
};

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
  document.querySelector("#generated").appendChild(document.createElement("br"));
  document.querySelector("#generated").appendChild(document.createElement("br"));
  document.querySelector("#generated").appendChild(document.createElement("br"));
  document.querySelector("#generated").appendChild(document.createElement("br"));
  document.querySelector("#generated").appendChild(document.createElement("br"));
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
      if (y <= targetY) {
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
  setTimeout(scrollToBottom, 500);
};

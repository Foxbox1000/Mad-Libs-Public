if (localStorage.getItem("lastViewedItem") == null) {
  localStorage.setItem("lastViewedItem", 0);
};

if (localStorage.getItem("totalViews") == null) {
  localStorage.setItem("totalViews", 0);
};

if (localStorage.getItem("totalViews") == database.length) {
  setTimeout(function() {
    localStorage.setItem("lastViewedItem", 0);
    localStorage.setItem("totalViews", 0);
  }, 400);
};
localStorage.setItem("totalViews", parseInt(localStorage.getItem("totalViews")) + 1) 

function generateRandomNumber() {
  var randomNum = Math.floor(Math.random() * 4) + 1;
  let numberlists = localStorage.getItem("lastViewedItem");
  let textArray = numberlists.split(",");
  let numberArray = textArray.map(Number);
  while (numberArray.includes(randomNum)) {
    randomNum = Math.floor(Math.random() * 4) + 1;
  }
  return randomNum;
}
var randomNumber = generateRandomNumber();

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
for (let i = 0; i < parenthesisTextboxes.length; i++) {
  const textboxValue = parenthesisTextboxes[i].value;
  updatedText = updatedText.replace(
    `(${matches[i].slice(1, -1)})`, textboxValue
  );
};
function getResults() {
  const endtextbox = document.createElement("textarea");
  endtextbox.type = "submit";
  endtextbox.classList.add("end-textbox");
  endtextbox.value = updatedText;
  document.querySelector("#generated").appendChild(endtextbox);
}

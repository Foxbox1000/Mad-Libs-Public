let randomNumber = Math.floor(Math.random() * 4) + 1;
if (localStorage.getItem("lastViewedItem") == "null") {
  localStorage.setItem("lastViewedItem", "spacer");
};
let numbers = localStorage.getItem("lastViewedItem");
let numberArray = numbers.split(",");
while (numberArray.includes(randomNumber)) {
  let randomNumber = Math.floor(Math.random() * 4) + 1;
};
// Get the current value of the item from local storage
var currentValue = localStorage.getItem("lastViewedItem");
localStorage.setItem("lastViewedItem", currentValue + "," + randomNumber.toString());
const input = database[randomNumber];
function getResults() {
  let updatedText = input;
  const parenthesisTextboxes = document.getElementsByClassName(
    "parenthesis-textbox"
  );
  for (let i = 0; i < parenthesisTextboxes.length; i++) {
    const textboxValue = parenthesisTextboxes[i].value;
    updatedText = updatedText.replace(
      `(${matches[i].slice(1, -1)})`, textboxValue
    );
  };
	const endtextbox = document.createElement("textarea");
    endtextbox.type = "submit";
    endtextbox.classList.add("end-textbox");
    endtextbox.value = updatedText;
    document.querySelector("#generated").appendChild(endtextbox);
  };
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
  }

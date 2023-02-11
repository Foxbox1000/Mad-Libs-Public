let Number = localStorage.getItem("selectedLib")
if (Number <= database.length - 1 && Number >= 1) {
  randomNum = Math.floor(Math.random() * 4) + 1;
}

var madNumber = document.getElementById("madNumber");
madNumber.innerHTML = "Mad Lib number: " + Number.toString();
// Get the current value of the item from local storage
const input = database[Number];
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
  for (let i = 0; i < parenthesisTextboxes.length; i++) {
    const textboxValue = parenthesisTextboxes[i].value;
    updatedText = updatedText.replace(
      `(${matches[i].slice(1, -1)})`, textboxValue
    );
  };
  const endtextbox = document.createElement("textarea");
  endtextbox.type = "text";
  endtextbox.classList.add("end-textbox");
  endtextbox.value = updatedText;
  document.querySelector("#generated").appendChild(endtextbox);
};

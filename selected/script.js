var Number = localStorage.getItem("selectedLib")
if (Number <= database.length - 1 && Number >= 1) {
} else {
  window.location = "/random/";
}

var userInput = "";

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
  } else if (!/rick/.test(userInput.substr(-6))) {
    userInput = userInput.substr(-5);
  }
};

var madNumber = document.getElementById("madNumber");
madNumber.innerHTML = "Mad Lib number: " + Number.toString();
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
function scrollToMiddle() {
  let currentY = window.pageYOffset;
  if (document.body.scrollHeight - window.innerHeight > 847) {
    var targetY = 847;
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
function getResults() {
  let generateButton = document.querySelector("#generateButton");
  for (let i = 0; i < parenthesisTextboxes.length; i++) {
    const textboxValue = parenthesisTextboxes[i].value;
    updatedText = updatedText.replace(
      `(${matches[i].slice(1, -1)})`, textboxValue
    );
  };
  const authortextbox = document.createElement("h1")
  authortextbox.innerHTML = "Made by: " + name_database[Number];
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

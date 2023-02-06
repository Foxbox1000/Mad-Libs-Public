const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", function() {
  const input = document.querySelector("#input").value;
  let insideParenthesis = false;
  let parenthesisText = "";
  let startIndex = 0;
  let endIndex = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      insideParenthesis = true;
      startIndex = i + 1;
    } else if (input[i] === ')') {
      insideParenthesis = false;
      endIndex = i;
      parenthesisText += " " + input.substring(startIndex, endIndex).trim();
      const box = document.createElement("textarea");
      box.classList.add("output-box");
      box.placeholder = parenthesisText.trim();
      document.querySelector("#output").appendChild(box);
      parenthesisText = "";
    }
  }
});

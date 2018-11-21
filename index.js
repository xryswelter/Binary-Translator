// Array for objects that need to be append to element
let translation = [];

//Upon Submit Button being pressed function occurs
document.getElementById("submit").onclick = function() {
  // Parse out sentence
  let original = document.getElementById("original").value.split("");
  console.log(original);
  compare(original);
};

function compare(original) {
  console.log(original);
  //   Clear Translation boxes
  translation = [];
  // Running through Array of characters and letters to find correct value
  for (let j = 0; j < original.length; j++) {
    //Native Code to translate letters to binary
    let letterTrans = original[j].charCodeAt().toString(2);
    //Funciton to add letter object to the translation array
    appendToTranslation(original[j],letterTrans);
  }
  // Adding translation array to translation object
  let trans = document.getElementById("translation");
  trans.innerHTML = translation.join("");
}

// Function to create letter object for front end display
function appendToTranslation(letterTrans, value) {
  //   Create elements for array append
  console.log(letterTrans, value);
  let container = document.createElement("div");
  let originalLetter = document.createElement("div");
  let span = document.createElement("span");
  //   Add classes to elements for CSS
  container.classList.add("card");
  originalLetter.classList.add("originalLetter");
  if (value !== "100000") {
    span.classList.add("span", "visLetter");
    span.innerHTML = value;
  } else {
    span.classList.add("span");
    span.innerHTML = "";
  }
  //   Added in HTML for elements with text
  originalLetter.innerHTML = letterTrans;
  //   appending everything together
  container.appendChild(originalLetter);
  container.appendChild(span);
  // Append to translation array
  translation.push(container.outerHTML);
}

// Array for the translation
let letters = [
  {
    letter: "A",
    value: "01000001"
  },
  {
    letter: "B",
    value: "01000010"
  },
  {
    letter: "C",
    value: "01000011"
  },
  {
    letter: "D",
    value: "01000100"
  },
  {
    letter: "E",
    value: "01000101"
  },
  {
    letter: "F",
    value: "01000110"
  },
  {
    letter: "G",
    value: "01000111"
  },
  {
    letter: "H",
    value: "01001000"
  },
  {
    letter: "I",
    value: "01001001"
  },
  {
    letter: "J",
    value: "01001010"
  },
  {
    letter: "K",
    value: "01001011"
  },
  {
    letter: "L",
    value: "01001100"
  },
  {
    letter: "M",
    value: "01001101"
  },
  {
    letter: "N",
    value: "01001110"
  },
  {
    letter: "O",
    value: "01001111"
  },
  {
    letter: "P",
    value: "01010000"
  },
  {
    letter: "Q",
    value: "01010001"
  },
  {
    letter: "R",
    value: "01010010"
  },
  {
    letter: "S",
    value: "01010011"
  },
  {
    letter: "T",
    value: "01010100"
  },
  {
    letter: "U",
    value: "01010101"
  },
  {
    letter: "V",
    value: "01010110"
  },
  {
    letter: "W",
    value: "01010111"
  },
  {
    letter: "X",
    value: "01011000"
  },
  {
    letter: "Y",
    value: "01011001"
  },
  {
    letter: "Z",
    value: "01011010"
  },
  {
    letter: "a",
    value: "01000001"
  },
  {
    letter: "b",
    value: "01000010"
  },
  {
    letter: "c",
    value: "01000011"
  },
  {
    letter: "d",
    value: "01000100"
  },
  {
    letter: "e",
    value: "01000101"
  },
  {
    letter: "f",
    value: "01000110"
  },
  {
    letter: "g",
    value: "01000111"
  },
  {
    letter: "h",
    value: "01001000"
  },
  {
    letter: "i",
    value: "01001001"
  },
  {
    letter: "j",
    value: "01001010"
  },
  {
    letter: "k",
    value: "01001011"
  },
  {
    letter: "l",
    value: "01001100"
  },
  {
    letter: "m",
    value: "01001101"
  },
  {
    letter: "n",
    value: "01001110"
  },
  {
    letter: "o",
    value: "01001111"
  },
  {
    letter: "p",
    value: "01010000"
  },
  {
    letter: "q",
    value: "01010001"
  },
  {
    letter: "r",
    value: "01010010"
  },
  {
    letter: "s",
    value: "01010011"
  },
  {
    letter: "t",
    value: "01010100"
  },
  {
    letter: "u",
    value: "01010101"
  },
  {
    letter: "v",
    value: "01010110"
  },
  {
    letter: "w",
    value: "01010111"
  },
  {
    letter: "x",
    value: "01011000"
  },
  {
    letter: "y",
    value: "01011001"
  },
  {
    letter: "z",
    value: "01011010"
  },
  {
    letter: "!",
    value: "00100001"
  },
  {
    letter: `'`,
    value: "00100010"
  },
  {
    letter: "#",
    value: "00100011"
  },
  {
    letter: "$",
    value: "00100100"
  },
  {
    letter: "%",
    value: "00100101"
  },
  {
    letter: "&",
    value: "00100110"
  },
  {
    letter: `'`,
    value: "00100111"
  },
  {
    letter: "(",
    value: "00101000"
  },
  {
    letter: ")",
    value: "00101001"
  },
  {
    letter: "*",
    value: "00101010"
  },
  {
    letter: "+",
    value: "00101011"
  },
  {
    letter: ",",
    value: "00101100"
  },
  {
    letter: "-",
    value: "00101101"
  },
  {
    letter: ".",
    value: "00101110"
  },
  {
    letter: "/",
    value: "00101111"
  },
  {
    letter: "0",
    value: "00110000"
  },
  {
    letter: "1",
    value: "00110001"
  },
  {
    letter: "2",
    value: "00110010"
  },
  {
    letter: "3",
    value: "00110011"
  },
  {
    letter: "4",
    value: "00110100"
  },
  {
    letter: "5",
    value: "00110101"
  },
  {
    letter: "6",
    value: "00110110"
  },
  {
    letter: "7",
    value: "00110111"
  },
  {
    letter: "8",
    value: "00111000"
  },
  {
    letter: "9",
    value: "00111001"
  },
  {
    letter: "?",
    value: "00111111"
  },
  {
    letter: "@",
    value: "01000000"
  },
  {
    letter: "_",
    value: "01011111"
  },
  {
    letter: " ",
    value: " "
  }
];
// Array for objects that need to be append to element
let translation = [];

document.getElementById("submit").onclick = function() {
  // Parse out sentence
  let original = splitString();
  console.log(original);
  compare(original);
};

function splitString() {
  let origin = document.getElementById("original").value;
  console.log(origin);
  let echo = origin.split("");
  console.log(`echo ${echo}`);
  return echo;
}

function compare(original) {
  console.log(original);
  //   Clear Translation boxes
  translation = [];
  //   For loops to check letters against each of the different letters of the original string
  // Running through Array of characters and letters to find correct value
  for (let j = 0; j < original.length; j++) {
    // console.log(original[j]);
    for (let i = 0; i < letters.length; i++) {
      //BROKEN HERE???
      if (original[j] === letters[i].letter) {
        console.log(`J is = ${original[j]} and i = ${letters[i].letter}`);
        console.log(letters[i].letter);
        let translateL = letters[i].value;
        appendToTranslation(letters[i].letter, translateL);
      } else {
        console.log("echo");
      }
    }
  }
  console.log(translation);
  let trans = document.getElementById("translation");
  console.log(trans)
  trans.appendChild(translation);
}

function appendToTranslation(oLetter, value) {
  //   Create elements for array append
  console.log(oLetter, value);
  let container = document.createElement("div");
  let originalLetter = document.createElement("p");
  let span = document.createElement("span");
  //   Add classes to elements for CSS
  container.classList.add("card");
  originalLetter.classList.add("originalLetter");
  span.classList.add("span");
  //   Added in HTML for elements with text
  span.innerHTML = value;
  console.log(span);
  originalLetter.innerHTML = oLetter;
  console.log(originalLetter);
  //   appending everything together
  originalLetter.appendChild(span);
  container.appendChild(originalLetter);
  console.log(container);
  // Append to translation array
  translation.push(container);
}

// Array for objects that need to be append to element
let origin = [];
let translation = [];
let state = 'etb'
let copy = [];

//Setting State for Translator function
window.onload = () => {
    status();
    function status() {
        let buttons = document.getElementById('buttons');
        btn = buttons.getElementsByClassName('btn');
        for (var i = 0; i < btn.length; i++) {
            btn[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
                state = this.value;
                console.log(state)
                spanText = (state == 'etb') ? 'English to Binary' : 'Binary to English';
                document.getElementById('state').innerHTML = spanText;
            });
        }
    }
}



//Upon Submit Button being pressed function occurs
document.getElementById('submit').onclick = function () {
    origin = [];
    translation = [];
    copy = [];
    // Allow for obtains to display for translation field
    let tLocation = document.getElementById('transCol').style.display = 'flex';

    // Parse out sentence
    let original = document.getElementById('original').value.split('');
    console.log(original);
    (state == 'etb') ? compare(original) : revert(original);
};

//*Functions for English to Binary Code
function compare(original) {
    let originL = document.getElementById('originL');
    let trans = document.getElementById('trans');
    let input = document.getElementById('copy');
    originL.innerHTML = '';
    trans.innerHTML = '';
    console.log(original);
    //   Clear Translation boxes
    translation = [];
    // Running through Array of characters and letters to find correct value
    for (let j = 0; j < original.length; j++) {
        //Native Code to translate letters to binary
        let letterTrans = original[j].charCodeAt().toString(2);
        //Funciton to add letter object to the translation array

        appendToTranslation(original[j], letterTrans);
    }
    // Adding translation array to translation object
    console.log(origin, translation)
    originL.innerHTML = origin.join('');
    trans.innerHTML = translation.join('');
    input.value = copy.join('');
    console.log(originL, trans)
}

// Function to create letter object for front end display
function appendToTranslation(original, binary) {
    //Display Original Letter Element 
    let originalLetter = document.createElement('div');
    originalLetter.classList.add('originalLetter');
    //Display Translated Letter Element
    let translate = document.createElement('div');
    translate.classList.add('translate');

    //Appending Each element to appropriate object
    origin.push(`${original}<br>`);
    console.log("hello" + binary.length);
    let editBinary=binary;
    switch (binary.length) {
        case binary.length =7:
                editBinary =`0${binary}`
            console.log("7")
            break;
        case binary.length= 6:
                editBinary =`00${binary}`
             console.log("6")
            break;
        case binary.length > 7:
                editBinary= binary
            console.log("7+")
            break;

        default:
            "Not working"
            break;
    }
    copy.push(`${editBinary} `)
    console.log(copy);
    translation.push(`${editBinary}<br>`);
}

//* Functions for the Binary to English Translator
function revert(original) {
    original = original.join('')
    console.log(original)
    translateArray = original.split(' ')
    console.log(translateArray)

    tString = '';
    translateArray.map(t => { tString += String.fromCharCode(parseInt(t, 2)) })
    console.log('tString = ' + tString)
    console.log('original letters: ' + original)
    originalArray = original.split(' ');
    let oText = ''
    originalArray.forEach(function (element) { oText += (`${element}<br>`) })
    console.log(oText)

    let originL = document.getElementById('originL');
    let trans = document.getElementById('trans');
    originL.innerHTML = oText;
    trans.innerHTML = tString
    copy.push(tString);
    console.log(copy);
    let copyText = document.getElementById('copy');
    copyText.value = copy[0];
    copyText.select();
    document.execCommand("copy");
    console.log(copyText)

}

// function for copy button (obtained reference from w3school.com)

document.getElementById('copyButton').onclick = function () {
    console.log('poo')
    let copyText = document.getElementById('copy');

    copyText.select();
    document.execCommand("copy");
    console.log(copyText)
}

    // }
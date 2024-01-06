/* -------------------------------------------------------------------------- */
/*           Array of special characters to be included in password           */
/* -------------------------------------------------------------------------- */
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

/* -------------------------------------------------------------------------- */
/*           Array of numeric characters to be included in password           */
/* -------------------------------------------------------------------------- */
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/* -------------------------------------------------------------------------- */
/*          Array of lowercase characters to be included in password          */
/* -------------------------------------------------------------------------- */
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

/* -------------------------------------------------------------------------- */
/*          Array of uppercase characters to be included in password          */
/* -------------------------------------------------------------------------- */
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

/* -------------------------------------------------------------------------- */
/*                Function to prompt user for password options                */
/* -------------------------------------------------------------------------- */
function getPasswordOptions() {

  /* ----------------------- Prompt for password length ----------------------- */
  var validResponse = false;
  while (!validResponse) {
    var passwordLengthLocal = Number(prompt("How long do you want the password need to be?"));
    if (passwordLengthLocal >= 8 && passwordLengthLocal <= 128) validResponse = true;
    else alert("Please choose a value between 8 and 128, inclusive");
  }

  validResponse = false;
  while (!validResponse) {

    /* -------------------------- Prompt for lowercase -------------------------- */
    var lowercaseLocal = confirm("Do you want to include lowercase characters?");

    /* -------------------------- Prompt for uppercase -------------------------- */
    var uppercaseLocal = confirm("Do you want to include uppercase characters?");

    /* --------------------------- Prompt for numeric --------------------------- */
    var numericLocal = confirm("Do you want to include numbers?");

    /* ---------------------- Prompt for special characters --------------------- */
    var specialLocal = confirm("Do you want to include special characters?");

    /* ------------ Ensure at least one of the above types is chosen ------------ */
    if (lowercaseLocal === true || uppercaseLocal === true || numericLocal === true || specialLocal === true) validResponse = true;
    else alert("You must choose at least one character type from: lowercase, uppercase, numeric, and special characters");

  }

  /* -------------- Return collected responses back to main code -------------- */
  return [passwordLengthLocal, lowercaseLocal, uppercaseLocal, numericLocal, specialLocal];

}

/* -------------------------------------------------------------------------- */
/*             Function to get a random element from an array                 */
/* -------------------------------------------------------------------------- */
function getRandom(arr) {
  var char = arr[Math.floor(Math.random() * arr.length)];
  return char;
}

/* -------------------------------------------------------------------------- */
/*   Function to generate password based on password options chosen by user   */
/*   Note: it's possible password may not contain all required characters     */
/*         and therefore there is a subsequent validation which may result    */
/*         in another call to this function                                   */
/* -------------------------------------------------------------------------- */
function generatePassword(pwdLength, charArray) {

  var passwordCandidate = "";
  var randomChar;

  /* ------ Construct the password by choosing characters from the array ------ */
  for (var i = 0; i < pwdLength; i++) {
    randomChar = getRandom(charArray);
    passwordCandidate += randomChar;
  }
  console.log(`Password candidate: ${passwordCandidate}`);
  return passwordCandidate;
}

/* -------------------------------------------------------------------------- */
/*         Function to check generated password meets the requirements        */
/* -------------------------------------------------------------------------- */
function meetsRequirements(proposedPassword, LC, UC, N, SC) {

  /* -------------------------- Initialise variables -------------------------- */
  var containsLC = false; // Lowercase
  var containsUC = false; // Uppercase
  var containsN = false; // Number
  var containsSC = false; // Special character

  /* --- Check if proposed password contains LC, UC, number, or special char -- */
  for (var i = 0; i < proposedPassword.length; i++) {
    switch (true) {
      case (lowerCasedCharacters.includes(proposedPassword.charAt(i))):
        containsLC = true;
        break;
      case (upperCasedCharacters.includes(proposedPassword.charAt(i))):
        containsUC = true;
        break;
      case (numericCharacters.includes(proposedPassword.charAt(i))):
        containsN = true;
        break;
      case (specialCharacters.includes(proposedPassword.charAt(i))):
        containsSC = true;
        break;
      default:
        break;
    }
  }

  /* ------- Check if password contains all the required character types ------ */
  if ((LC && !containsLC) || (UC && !containsUC) || (N && !containsN) || (SC && !containsSC)) {
    console.log("Password does not meet requirements, re-trying");
    return false;
  }
  else {
    console.log("Password meets requirements!");
    return true;
  }

}

/* ----------------- Get references to the #generate element ---------------- */
var generateBtn = document.querySelector('#generate');

/* -------------------------------------------------------------------------- */
/*                    Write password to the #password input                   */
/* -------------------------------------------------------------------------- */
function writePassword() {

  /* --------------------- Get password options from user --------------------- */
  const [passwordLength, lowercase, uppercase, numeric, special] = getPasswordOptions();

  /*
  console.log(`Length: ${passwordLength}\nLowercase: ${lowercase}\nUppercase: ${uppercase}\nNumeric: ${numeric}\nSpecial: ${special}`);
  */

  /* ------------- Construct one full array of required characters ------------ */
  var possibleCharacters = [];
  if (lowercase) possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
  if (uppercase) possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
  if (numeric) possibleCharacters = possibleCharacters.concat(numericCharacters);
  if (special) possibleCharacters = possibleCharacters.concat(specialCharacters);
  /* console.log(possibleCharacters); */

  /* - Generate password until it meets the requirements for password quality - */
  validPassword = false;
  while (!validPassword) {
    var generatedPassword = generatePassword(passwordLength, possibleCharacters);
    if (meetsRequirements(generatedPassword, lowercase, uppercase, numeric, special)) validPassword = true;
  }
  var passwordText = document.querySelector('#password');

  // passwordText.value = password;
  passwordText.value = generatedPassword;
}

/* ------------------ Add event listener to generate button ----------------- */
generateBtn.addEventListener('click', writePassword);
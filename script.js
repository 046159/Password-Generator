// Array of special characters to be included in password
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

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
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

// Array of uppercase characters to be included in password
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

// Function to prompt user for password options
function getPasswordOptions() {

  // Prompt for Password Length
  var validResponse = false;
  while (!validResponse) {
    var passwordLengthLocal = Number(prompt("How long does the password need to be?"));
    if (passwordLengthLocal >= 8 && passwordLengthLocal <= 128) validResponse = true;
    else alert("Please choose a value between 8 and 128, inclusive");
  }

  validResponse = false;
  while (!validResponse) {

    // Prompt for Lowercase
    var lowercaseLocal = confirm("Do you want to include lowercase characters?");

    // Prompt for Uppercase
    var uppercaseLocal = confirm("Do you want to include uppercase characters?");

    // Prompt for Numeric
    var numericLocal = confirm("Do you want to include numbers?");

    // Prompt for Special Characters
    var specialLocal = confirm("Do you want to include special characters?");

    if (lowercaseLocal === true || uppercaseLocal === true || numericLocal === true || specialLocal === true) validResponse = true;
    else alert("You must at least choose one character type from: lowercase, uppercase, numeric, and special characters");

  }

  // Return collected responses back to main code
  return [passwordLengthLocal, lowercaseLocal, uppercaseLocal, numericLocal, specialLocal];

}

// Get password options from user
const [passwordLength, lowercase, uppercase, numeric, special] = getPasswordOptions();

// Below outputs what the user responded with in getPasswordOptions function
console.log(`Length: ${passwordLength}\nLowercase: ${lowercase}\nUppercase: ${uppercase}\nNumeric: ${numeric}\nSpecial: ${special}`);

//Construct the possible list of required characters
var possibleCharacters = [];
if (lowercase) possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
if (uppercase) possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
if (numeric) possibleCharacters = possibleCharacters.concat(numericCharacters);
if (special) possibleCharacters = possibleCharacters.concat(specialCharacters);
console.log(possibleCharacters);

// Function for getting a random element from an array
function getRandom(arr) {

  var char = arr[Math.floor(Math.random() * arr.length)];
  return char;

}

// Function to generate password with user input
function generatePassword() {

  var password = "";
  var randomChar;
  for (var i = 0; i < passwordLength; i++) {
    //console.log(getRandom(possibleCharacters));
    randomChar = getRandom(possibleCharacters);
    // 8console.log(randomChar);
    password += randomChar;
  }
  //var randomChar = getRandom(possibleCharacters);
  console.log(`Password: ${password}`);
  return password;
}

function meetsRequirements() {
  var containsLC = false;
  var containsUC = false;
  var containsN = false;
  var containsSC = false;
  for (var i = 0; i < generatedPassword.length; i++) {
    // console.log(generatedPassword.charAt(i));
    if (lowerCasedCharacters.includes(generatedPassword.charAt(i))) containsLC = true;
    if (upperCasedCharacters.includes(generatedPassword.charAt(i))) containsUC = true;
    if (numericCharacters.includes(generatedPassword.charAt(i))) containsN = true;
    if (specialCharacters.includes(generatedPassword.charAt(i))) containsSC = true;
  }

  if ((lowercase && !containsLC) || (uppercase && !containsUC) || (numeric && !containsN) || (special && !containsSC)) {
    console.log("Password did not meet requirements, re-trying");
    return false;
  }
  else {
    console.log("Password meets requirements!");
    return true;
  }

}

validPassword = false;
while (!validPassword) {
  var generatedPassword = generatePassword();
  if (meetsRequirements()) validPassword = true;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
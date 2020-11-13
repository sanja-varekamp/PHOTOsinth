const form = document.getElementById('form');
const name = document.getElementById('name');
const last_name = document.getElementById('last-name');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm-password');
const success_tick = document.getElementById('success-tick');
const error_x = document.getElementById('error-x');

//Show the success tick icon
function showSuccess(input) {
    const input_holder = input.parentElement;
    input_holder.className ='input-holder success';    
}

//Show the error x icon and the error message
function showError(input, message) {
    const input_holder = input.parentElement;
    input_holder.className ='input-holder error'; 
    const span = input_holder.querySelector('span');
    span.innerHTML = message;
}


//Checking the length of the input 
function lengthOfInput(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${input.placeholder} must be at least ${min} characters.`) 
    } else if(input.value.length > max){
        showError(input, `${input.placeholder} must be less than ${max} characters.`)
    } else {
        showSuccess(input);   
    }
}


//Checking email validity with RegEx (RFC 5322 compliant)
function emailValidityCheck(input) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(input.value.trim() === ''){
        showError(input, `Please enter a valid ${input.name} address.`);
    } else {
        showSuccess(input);
    }
};

// Check if passwords match
function passwordMatchCheck(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Password and confirmed password does not match.');
    }
}

//Password strength meter (dropbox zxcvbn library)
var strength = {
    0: "Worst",
    1: "Bad",
    2: "Weak",
    3: "Good",
    4: "Strong"
  }

var meter = document.getElementById('password-strength-meter');
var text = document.getElementById('password-strength-text');

password.addEventListener('input', function() {
  var val = password.value;
  var result = zxcvbn(val);

  // Update the password strength meter
  meter.value = result.score;
  console.log(meter.value);

  // Update the text indicator
  if (val !== "") {
    text.innerHTML = "Strength: " + strength[result.score]; 
  } else {
    text.innerHTML = "";
  }
});

//event listener for the form fields
form.addEventListener('submit', function(e) {
    e.preventDefault();
    

    lengthOfInput(name, 4, 13);
    lengthOfInput(last_name, 4, 15);
    lengthOfInput(username, 4, 15);
    lengthOfInput(password, 8, 14);
    lengthOfInput(confirm_password, 8, 14);
    emailValidityCheck(email);
    passwordMatchCheck(password, confirm_password);
    
})

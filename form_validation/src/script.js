// Explore the HTML structure that has been provided. You can make changes to the HTML (and CSS), as long as they do not subtract from the original functional intent of the page.
// An HTML element with id errorDisplay has been provided as a convenient method of showing error text to the user. In order to show or hide errorDisplay, you must modify its display style attribute.
// You can place any text or HTML into errorDisplay.

// using any combination of HTML validation attributes and JavaScript event listeners
// General Requirements: Whenever any of these validation requirements fail, an appropriate error should be communicated to the user (in most cases, the actual requirement listed below serves as a good error message), and focus should return to the input element that the error originates from. If any requirements fail, the form should not submit.

const registration = document.getElementById('registration');
const rUsername = registration.elements['username'];
const rEmail = registration.elements['email'];
const rPassword = registration.elements['password'];
const rPasswordCheck = registration.elements['passwordCheck'];
const terms = registration.elements['terms'];


// Registration Form - Form Submission:
    // Usually, we would send this information to an external API for processing. In our case, we are going to process and store the data locally for practice purposes.

registration.addEventListener('submit', registrationVal);

function registrationVal(event) {
    event.preventDefault();
    hideError();

    if (!registerUsernameVal()) return false;
    if (!registerEmailVal()) return false;
    if (!registerPasswordVal()) return false;
    if (!termsVal()) return false;

    // If all validation is successful, store the username, email, and password using localStorage.
    // If you are unfamiliar with localStorage, that is okay! Reference the documentation's "Description" and "Examples" sections to learn how to implement it. If you run into issues speak with a peer or one of your instructors.
    // Consider how you want to store the user data, keeping in mind that there will be quite a few users registering for the site. Perhaps you want to store it with an array of user objects; or maybe an object whose keys are the usernames themselves.
        // Valid usernames should be converted to all lowercase before being stored.
        // Valid emails should be converted to all lowercase before being stored.

    const username = rUsername.value.trim().toLowerCase();
    const email = rEmail.value.trim().toLowerCase();
    const password = rPassword.value;

    saveUser(username, { email, password });

    // Clear all form fields after successful submission and show a success message.
    registration.reset();
    errorDisplay.style.display = 'block';
    errorDisplay.innerText = 'Registered successful!';

    return true;
}


// Part 3: Registration Form Validation Requirements
// Registration Form - Username Validation:
function registerUsernameVal(){
    const value = rUsername.value.trim();
    const users = getUsers();
    // The username cannot be blank.
    if (!value) {
        showError("Username cannot be blank.", rUsername);
        return false;
    }
    // The username must be at least four characters long.
    if (value.length < 4) {
        showError("username must be at least four characters long.", rUsername);
        return false;
    }
    // The username must contain at least two unique characters.
    if (new Set(value).size < 2) {
        showError("username must contain at least two unique characters.", rUsername);
        return false;
    }
    // The username cannot contain any special characters or whitespace.
    if (/[^a-zA-Z0-9]/.test(value)) {
        showError("username cannot contain any special characters or whitespace.", rUsername);
        return false;
    }
    // The username already taken
    if (users[value.toLowerCase()]) {
        showError("username already taken.", rUsername);
        return false;
    }

    return true;
}

// Registration Form - Email Validation:
function registerEmailVal(){
    const value = rEmail.value.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // The email must be a valid email address.
    if (!emailRegex.test(value)) {
        showError("email must be a valid email address.", rEmail);
        return false;
    }
    // The email must not be from the domain "example.com."
    if (value.endsWith('@example.com')) {
        showError("email must not be from the domain example.com.", rEmail);
        return false;
    }
    return true;
}

// Registration Form - Password Validation:
function registerPasswordVal(){
    const value = rPassword.value
    const check = rPasswordCheck.value;
    const username = rUsername.value.trim().toLowerCase();

    // Passwords must be at least 12 characters long.
    if (value.length <12) {
        showError("Passwords must be at least 12 characters long.", rPassword);
        return false;
    }
    // Passwords must have at least one uppercase and one lowercase letter.
    if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
        showError("Passwords must have at least one uppercase and one lowercase letter.", rPassword);
        return false;
    }
    // Passwords must contain at least one number.
    if (!/\d/.test(value)) {
        showError("Passwords must contain at least one number.", rPassword);
        return false;
    }
    // Passwords must contain at least one special character.
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        showError("Passwords must contain at least one special character.", rPassword);
        return false;
    }
    // Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
    if (/password/i.test(value)) {
        showError("Password cannot contain the word password.", rPassword);
        return false;
    }
    // Passwords cannot contain the username.
    if (value.toLowerCase().includes(username)) {
        showError("Passwords cannot contain the username.", rPassword);
        return false;
    }
    // Both passwords must match.
    if (value !== check) {
        showError("Both passwords must match.", rPassword);
        return false;
    }

    return true;
}


// Registration Form - Terms and Conditions:
function termsVal(){
    // The terms and conditions must be accepted.
    if (!terms.checked) {
        showError("You must accept the terms and conditions.", terms);
        return false;
    }
    return true;
}



// Registration Form - Username Validation (Part Two):
    // Now that we are storing usernames, create an additional validation rule for them...
    // Usernames must be unique ("that username is already taken" error). Remember that usernames are being stored all lowercase, so "learner" and "Learner" are not unique.



const login = document.getElementById('login');
const lUsername = login.elements['username'];
const lPassword = login.elements['password'];
const keepLoggedIn = login.elements['persist']

const errorDisplay = document.getElementById('errorDisplay');


// Login Form - Form Submission:

login.addEventListener('submit', loginValidate)

function loginValidate(event){
    event.preventDefault();
    hideError();

    if (!loginUsernameVal()) return false;
    if (!loginPasswordVal()) return false;

    login.reset();
    
    // If all validation is successful, clear all form fields and show a success message.
    // If "Keep me logged in" is checked, modify the success message to indicate this (normally, this would be handled by a variety of persistent login tools and technologies).

    const message = keepLoggedIn.checked ? 'Login successful! Keep me logged in is checked.' : 'Login successful!';
    errorDisplay.style.display = "block";
    errorDisplay.innerText = message;

    return true;
}


// Part 4: Login Form Validation Requirements
// Login Form - Username Validation:
function loginUsernameVal(){
    const value = lUsername.value.trim();
    const users = getUsers();
    
    // The username cannot be blank.
    if (!value) {
        showError("// The username cannot be blank.", lUsername);
        return false;
    }

    // The username must exist (within localStorage). Remember that usernames are stored in all lowercase, but the username field accepts (and should not invalidate) mixed-case input.
    if (!users[value.toLowerCase()]){
        showError("The username does not exist.", lUsername);
        return false;
    }

    return true;
}

// Login Form - Password Validation:
function loginPasswordVal(){
    const username = lUsername.value.trim().toLowerCase();
    const pass = lPassword.value;
    const users = getUsers();

    // The password cannot be blank.
    if (!pass) {
        showError("The password cannot be blank.", lPassword);
        return false;
    }
    // The password must be correct (validate against localStorage).
    if (users[username].password !== pass) {
        showError("Password is incorrect.", lPassword);
        return false;
    }
    return true;
}

// Part 5: Completion
// Test validation thoroughly! Try to break things!
// Remember that each successful registration should be stored; therefore you should be able to login with a variety of account credentials.


// Helper functions
function showError(message, field){
    errorDisplay.style.display = 'block';
    errorDisplay.innerText = message;
    if (field) field.focus();
}

function hideError(){
    errorDisplay.style.display = 'none';
    errorDisplay.innerText = '';
}

function getUsers(){
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
}

function saveUser(username, data) {
    const users = getUsers();
    users[username.toLowerCase()] = data;
    localStorage.setItem('users', JSON.stringify(users));
}

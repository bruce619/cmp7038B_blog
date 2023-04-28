
// user input
const first_name = document.querySelector('#first_name');
const last_name = document.querySelector('#last_name');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirm_password = document.querySelector('#confirm_password');
const error = document.querySelector('#error')
const reg_form = document.querySelector('#reg_form')


function submitRegistrationForm(e){

    e.preventDefault();

    // regexPatterns
    const usernamePattern = /^[^!%^()\-\*&~`]{3,30}$/;
    const isValidUsername = usernamePattern.test(username.value);

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[$@#])[A-Za-z\d$@#]{8,20}$/;
    const isValidPassword = passwordPattern.test(password.value);

    let messages = [];

    if (first_name.value.length === 0) {
        messages.push("Invalid. Kindly input your First Name")
    }

    if (last_name.value.length === 0) {
        messages.push("Invalid. Kindly input your Last Name")
    }

    if (!isValidUsername){
        messages.push('Username must be between 3 and 30 characters, and cannot contain any of the following characters: ! % ^ - ( ) * & ~ `');
    }

    if (email.value.length === 0){
        messages.push("Invalid entry. Must have an email")
      }

    if (!isValidPassword){
        messages.push('Password must be between 8 and 20 characters, and contain at least one capital letter and one of the special characters $, @, or #');
    }

    if (confirm_password.value !== password.value) {
        messages.push("Passwords do not match")
    }

    if (messages.length > 0){
        e.preventDefault()
        error.innerHTML = messages.join('<br />')
    }

}

// event listener to submit form
reg_form.addEventListener("submit", submitRegistrationForm);
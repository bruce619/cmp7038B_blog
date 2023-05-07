
// user input
const first_name = document.querySelector('#first_name');
const last_name = document.querySelector('#last_name');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirm_password = document.querySelector('#confirm_password');
const error = document.querySelector('#error')
const reg_form = document.querySelector('#reg_form')


// event listener to submit form
reg_form.addEventListener("submit", e => {

    e.preventDefault();

    // regexPatterns only accept letters and numbers
    const usernamePattern = /^[a-zA-Z0-9]{3,55}$/;
    const isValidUsername = usernamePattern.test(username.value);

    // regexPatterns: accept minimum of 8 characters, at least one capital letter, number, and one of @, #, and $
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[$@#])[A-Za-z\d$@#]{8,}$/;
    const isValidPassword = passwordPattern.test(password.value);

    // name pattern
    const namePattern = /^[a-zA-Z]+$/
    const isValidFirstName = namePattern.test(first_name.value)
    const isValidLastName = namePattern.test(last_name.value)

    let messages = [];

    if (first_name.value.length === 0) {
        messages.push("Invalid. Kindly input your First Name")
    }

    if (!isValidFirstName){
        messages.push("Invalid name entry")
    }

    if (last_name.value.length === 0) {
        messages.push("Invalid. Kindly input your Last Name")
    }

    if (!isValidLastName){
        messages.push("Invalid name entry")
    }

    if (!isValidUsername){
        messages.push('Username must be between 3 and 55 characters, and can only contain alphanumeric characters');
    }

    if (email.value.length === 0){
        messages.push("Invalid entry. Must have an email")
      }

    if (!isValidPassword){
        messages.push('Password must contain a minimum of 8 characters, and contain at least one capital letter and one of $, @, or #');
    }

    if (confirm_password.value !== password.value) {
        messages.push("Passwords do not match")
    }

    if (messages.length > 0){
        e.preventDefault();
        error.innerHTML = messages.join('<br />')
    }else{
        reg_form.submit();
    }

});
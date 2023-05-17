
// user input
const first_name = document.querySelector('#first_name');
const last_name = document.querySelector('#last_name');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirm_password = document.querySelector('#confirm_password');
const error = document.querySelector('#error-msg')
const reg_form = document.querySelector('#reg_form')


// event listener to submit form
reg_form.addEventListener("submit", e => {

    e.preventDefault();

    // // email regex pattern
    // const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // const isValidEmail = emailPattern.test(email)

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
        messages.push("<i class='fa fa-times-circle'></i>Invalid. Kindly input your First Name")
    }

    if (!isValidFirstName){
        messages.push("<i class='fa fa-times-circle'></i>Invalid first name entry")
    }

    if (last_name.value.length === 0) {
        messages.push("<i class='fa fa-times-circle'></i>Invalid. Kindly input your Last Name")
    }

    if (!isValidLastName){
        messages.push("<i class='fa fa-times-circle'></i>Invalid last name entry")
    }

    if (username.value.length === 0) {
        messages.push("<i class='fa fa-times-circle'></i>Invalid. Kindly input your Username")
    }

    if (!isValidUsername){
        messages.push("<i class='fa fa-times-circle'></i>Username must be between 3 and 55 characters, and can only contain alphanumeric characters");
    }

    // if (!isValidEmail){
    //     messages.push("<i class='fa fa-times-circle'></i> Invalid email entry")
    // }

    if (email.value.length === 0){
        messages.push("<i class='fa fa-times-circle'></i>Invalid entry. Must have an email")
      }

    if (!isValidPassword){
        messages.push('<i class="fa fa-times-circle"></i>Invalid entry. Password must cointain a minimum of 8 characters, and contain at least one capital letter, one number, and one of the special characters $, @, or #');
    }

    if (confirm_password.value !== password.value) {
        messages.push("<i class='fa fa-times-circle'></i>Passwords do not match")
    }

    if (messages.length > 0){
        e.preventDefault();
        error.innerHTML = messages.join('<br />')
    }else{
        reg_form.submit();
    }

});
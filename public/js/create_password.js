const password = document.querySelector('#password');
const confirm_password = document.querySelector('#confirm_password');
const error = document.querySelector('#error-msg');
const create_password_form = document.querySelector('#create-password-form');


// event listener to submit form
create_password_form.addEventListener("submit", e => {

    e.preventDefault();

    const messages = []

    // regexPatterns: accept minimum of 8 characters, at least one capital letter, number, and one of @, #, and $
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[$@#])[A-Za-z\d$@#]{8,}$/;
    const isValidPassword = passwordPattern.test(password.value);

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
        create_password_form.submit();
    }



})
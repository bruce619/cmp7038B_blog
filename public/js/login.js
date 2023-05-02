
// user input
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const error = document.querySelector('#error')
const login_form = document.querySelector('#login_form')


function submitLoginForm(e){

    e.preventDefault();

    // regexPatterns only accept letters, numbers, @, #, and $
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[$@#])[A-Za-z\d$@#]{8,20}$/;
    const isValidPassword = passwordPattern.test(password.value);

    let messages = [];

    if (email.value.length === 0){
        messages.push("Invalid entry. Must have an email")
      }

    if (!isValidPassword){
        // don't send any message just fail the attempt
        messages.push('');
    }


    if (messages.length > 0){
        e.preventDefault();
        error.innerHTML = messages.join('<br />')
    }

}

// event listener to submit form
login_form.addEventListener("submit", submitLoginForm);
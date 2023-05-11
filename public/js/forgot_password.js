const forgot_password_form = document.querySelector('#forgot-password-form');
const email = document.querySelector('#email')
const error = document.querySelector('#error-msg');

// event listener to submit form
forgot_password_form.addEventListener("submit", e => {
    e.preventDefault();

    let messages = [];


    if (email.value.length === 0){
        messages.push("<i class='fa fa-times-circle'></i>Invalid entry. Must have an email");
      }


    if (messages.length > 0){
        e.preventDefault();
        error.innerHTML = messages.join('<br />');
    } else {
        forgot_password_form.submit();
    }

    
});
const otp = document.querySelector('#otp')
const otp_form = document.querySelector('#otp-form')
const error = document.querySelector('#error-msg')


// event listener to submit form
otp_form.addEventListener("submit", e => {
    e.preventDefault();

    // regexPatterns: accept only a string of 6 digits
    const otpPattern = /^\d{6}$/

    const isValidOTP = otpPattern.test(otp.value);

    let messages = [];

    if (otp.value.length === 0){
        messages.push("<i class='fa fa-times-circle'></i>Invalid entry. Must have an otp");
      }

    if (!isValidOTP){
        // don't send any message just fail the attempt
        messages.push("<i class='fa fa-times-circle'></i> Invalid Entry");
    }


    if (messages.length > 0){
        e.preventDefault();
        error.innerHTML = messages.join('<br />');
    } else {
        otp_form.submit();
    }
});
const profile_picture = document.querySelector('#profile-image');
const profile_name = document.querySelector('#profile-name');
const first_name = document.querySelector('#first_name');
const last_name = document.querySelector('#last_name');
const email = document.querySelector('#email');
const username = document.querySelector('#username');
const user_location = document.querySelector('#location');
const bio = document.querySelector('#bio');
const two_fa = document.querySelector('#Auth');
const error = document.querySelector('#error-msg');
const profile_form = document.querySelector('#profile-form');


two_fa.addEventListener("change", (e)=>{
    if (e.target.checked){
        console.log("This has been checked")
        two_fa.value = "on";
    }else{
        console.log("This has been unchecked")
        two_fa.value = "off";
    }
})


profile_picture.addEventListener("change", function(e){

    e.preventDefault();

    let messages = [];

    const filename = e.target.files[0].name
    profile_name.textContent = filename;

    const picturePattern = /\.(jpe?g|png|)$/i
    const isValidPicture = picturePattern.test(profile_picture.value)

    if (!isValidPicture){
        messages.push("<i class='fa fa-times-circle'></i>Invalid File Format. Must be .jpg, jpeg, or png")
    }   

})

profile_form.addEventListener("submit", e => {

    e.preventDefault();

    // message array to hold error messages
    let messages = [];

    if (two_fa.value === "on"){
        two_fa.value = true
    }else if (two_fa.value === "off"){
        two_fa.value = false
    }

    // email regex pattern
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const isValidEmail = emailPattern.test(email.value)

    // name pattern
    const namePattern = /^[a-zA-Z]+$/
    const isValidFirstName = namePattern.test(first_name.value)
    const isValidLastName = namePattern.test(last_name.value)

    // regexPatterns only accept letters and numbers
    const usernamePattern = /^[a-zA-Z0-9]{3,55}$/;
    const isValidUsername = usernamePattern.test(username.value);

    // location pattern allow only alphanumeric strings at comma and space
    const locationPattern = /^[a-zA-Z0-9][a-zA-Z0-9,\s]*$/;
    const isValidLocationPattern = locationPattern.test(user_location.value)

    bio.value = bio.value.replace(/(<([^>]+)>)/ig, '')
    const generalTextPattern = /^[a-zA-Z0-9][a-zA-Z0-9,.!;:"?+=#@*-_\s]+$/;
    const isValidGenerateText = generalTextPattern.test(bio.value)

    if (!isValidGenerateText){
        messages.push("<i class='fa fa-times-circle'></i>Invalid text.")
    }

    if (first_name.value.length === 0) {
        messages.push("<i class='fa fa-times-circle'></i>Invalid. Kindly input your First Name")
    }    

    if (!isValidFirstName){
        messages.push("<i class='fa fa-times-circle'></i>Invalid name entry")
    }

    if (last_name.value.length === 0) {
        messages.push("<i class='fa fa-times-circle'></i>Invalid. Kindly input your Last Name")
    }

    if (!isValidLastName){
        messages.push("<i class='fa fa-times-circle'></i>Invalid name entry")
    }


    if (username.value.length === 0) {
        messages.push("<i class='fa fa-times-circle'></i>Invalid. Kindly input your Username")
    }

    if (!isValidUsername){
        messages.push("<i class='fa fa-times-circle'></i>Username must be between 3 and 55 characters, and can only contain alphanumeric characters");
    }

    if (!isValidEmail){
        messages.push("<i class='fa fa-times-circle'></i> Invalid email entry")
    }

    if (email.value.length === 0){
        messages.push("<i class='fa fa-times-circle'></i>Invalid entry. Must have an email")
      }

    if (user_location.value.length === 0){
    messages.push("<i class='fa fa-times-circle'></i>Invalid entry. Must have an email")
    }

    if (!isValidLocationPattern){
        messages.push("<i class='fa fa-times-circle'></i> Invalid location entry")
    }
    

    if (messages.length > 0){
        e.preventDefault();
        error.innerHTML = messages.join('<br />')
    }else{

        profile_form.submit();
    }

});
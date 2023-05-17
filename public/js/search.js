const search = document.querySelector('#search');
const error = document.querySelector('#error-msg');
const search_form = document.querySelector('#search_form');

search_form.addEventListener("submit", e => {
    e.preventDefault();
    // initialize empty array to hold error messages
    let messages = [];

    // regexPatterns only accept aplhanumeric characters with comma, period, colon, and space
    const searchPattern = /^[a-zA-Z0-9][a-zA-Z0-9,:.\s]*$/;
    // check if it is valid string
    const isValidSearch = searchPattern.test(search.value);
    // check to see if search string is not valid
    if (!isValidSearch){
        messages.push("<i class='fa fa-times-circle'></i>Invalid search entry");
    }

    if (search.value.length === 0) {
        messages.push("<i class='fa fa-times-circle'></i>Empty search");
    }



    if (messages.length > 0){
        e.preventDefault();
        error.innerHTML = messages.join('<br />')
    } else {
        search_form.submit();
    }

});
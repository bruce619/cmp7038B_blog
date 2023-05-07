const search = document.querySelector('#search');
const error = document.querySelector('#error-msg');
const search_form = document.querySelector('#search_form');

search_form.addEventListener("submit", e => {

    e.preventDefault();

    let messages = [];

    // regexPatterns only accept aplhanumeric characters
    const searchPattern = /^[a-zA-Z0-9,:\.]+$/;
    // check if it is valid string
    const isValidSearch = searchPattern.test(search.value);

    if (search.value.length === 0) {
        messages.push("<i class='fa fa-times-circle'></i>Empty search");
    }

    if (!isValidSearch){
        messages.push("<i class='fa fa-times-circle'></i>Invalid search entry");
    }

    if (messages.length > 0){
        e.preventDefault();
        error.innerHTML = messages.join('<br />')
    } else {
        search_form.submit();
    }

});
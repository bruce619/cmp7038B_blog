const searchbar = document.querySelector('#searchbar');
const error = document.querySelector('#error')
const search_form = document.querySelector('#search_bar');

function submitSearchForm(e){

    e.preventDefault();

    let messages = [];

    // regexPatterns only accept letters and numbers
    const searchPattern = /^[^!%^()\-\*&~`]$/;
    // check if it is valid string
    const isValidSearch = searchPattern.test(searchbar.value);

    if (searchbar.value.length === 0) {
        messages.push("Empty search");
    }

    if (!isValidSearch){
        messages.push('Invalid search entry');
    }

    if (messages.length > 0){
        e.preventDefault();
        error.innerHTML = messages.join('<br />')
    }

}

search_form.addEventListener("submit", submitSearchForm);
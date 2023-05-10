const title = document.querySelector("#title");
const body = document.querySelector("#body");
const create_post_form = document.querySelector('#create-post-form');


create_post_form.addEventListener("submit", e => {
    e.preventDefault();

    let messages = [];

    // regexPatterns only accept aplhanumeric characters with comma, period, colon, and space
    const titlePattern = /^[a-zA-Z0-9][a-zA-Z0-9,:.\s]*$/;
    // check if it is valid string
    const isValidTitle = titlePattern.test(title.value);

    body.value = body.value.replace(/(<([^>]+)>)/ig, '')
    const generalTextPattern = /^[a-zA-Z0-9][a-zA-Z0-9,.!;:"?+=#@*-_\s]+$/;
    const isValidGenerateText = generalTextPattern.test(body.value)

    if (title.value.length === 0){
        messages.push("<i class='fa fa-times-circle'></i>Invalid entry. Must have a Title");
    }

    if (body.value.length === 0){
        messages.push("<i class='fa fa-times-circle'></i>Invalid entry. Must have a Body");
    }

    if (!isValidTitle){
        messages.push("<i class='fa fa-times-circle'></i>Invalid Title entry");
    }

    if (!isValidGenerateText){
        messages.push("<i class='fa fa-times-circle'></i>Invalid entry");
    }

    if (messages.length > 0){
        e.preventDefault();
        error.innerHTML = messages.join('<br />');
    } else {
        create_post_form.submit();
    }


})// end of event
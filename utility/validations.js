function isValidEmail(email) {
  const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email_regex.test(email);
}

function checkEmail(email){
    if (isValidEmail(email)){
        return email
    }else{
        return false
    }
}


function isValidImageExtension(file_name) {
  const image_extensions_regex = /\.(jpg|jpeg|png)$/i;
  return image_extensions_regex.test(file_name);
}

function checkImageExtension (file_name){
    if (isValidImageExtension(file_name)){
        return file_name
    }else{
        return false
    }
}


module.exports = {
    checkEmail,
    checkImageExtension
}

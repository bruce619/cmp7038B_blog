function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function checkEmail(email){
    if (isValidEmail(email)){
        return email
    }else{
        return false
    }
}


function isValidImageExtension(fileName) {
  const imageExtensionsRegex = /\.(jpg|jpeg|png)$/i;
  return imageExtensionsRegex.test(fileName);
}

function checkImageExtension (fileName){
    if (isValidImageExtension(fileName)){
        return fileName
    }else{
        return false
    }
}


module.exports = {
    checkEmail,
    checkImageExtension
}

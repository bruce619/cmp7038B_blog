const Joi = require('joi');

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

const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[$@#])[A-Za-z\d$@#]{8,}$/;
const namePattern = /^[a-zA-Z]+$/
const tokenPattern = /^[a-zA-Z0-9]+$/i

const registrationSchema = Joi.object({
    first_name: Joi.string().min(2).max(255)
    .pattern(RegExp(namePattern))
    .messages({
      'string.pattern.base': 'Invalid name entry'
    })
    .required(),
    last_name: Joi.string().min(2).max(255)
    .pattern(RegExp(namePattern))
    .messages({
      'string.pattern.base': 'Invalid name entry'
    })
    .required(),
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(3).max(55).required(),
    password: Joi.string()
    .pattern(RegExp(passwordPattern))
    .messages({
        'string.pattern.base': 'Invalid entry. Password must cointain a minimum of 8 characters, and contain at least one capital letter, one number, and one of the special characters $, @, or #'
    })
    .required(),
    confirm_password: Joi.any().equal(Joi.ref('password'))
    .label('Confirm Password')
    .options({ messages: { 'any.only': '{{#label}} does not match'} })
})


const tokenSchema = Joi.object({
    token: Joi.string().min(30).max(30)
    .pattern(RegExp(tokenPattern))
    .messages({
      'string.pattern.base': 'Invalid token'
    })
})


module.exports = {
    checkEmail,
    checkImageExtension,
    registrationSchema,
    tokenSchema
}

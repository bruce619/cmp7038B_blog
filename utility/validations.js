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
const uuidPattern = /^[a-zA-Z0-9-]+$/i
const searchPattern = /^[a-zA-Z0-9][a-zA-Z0-9,:.\s]*$/;
const locationPattern = /^[a-zA-Z0-9,\s]*$/;
const picturePattern = /\.(jpe?g|png|)$/i
const otpPattern = /^\d{6}$/
const generalTextPattern = /^[a-zA-Z0-9][a-zA-Z0-9,.!;:"?+=#@*-_\s]+$/;
const bioTextPattern = /^[a-zA-Z0-9,.!;:"?+=#@*-_\s]*$/;

const postSchema = Joi.object({
  title: Joi.string().min(2).max(50).required()
  .pattern(RegExp(searchPattern))
    .min(1)
    .required()
    .messages({
        'string.pattern.base': 'Invalid Title.'
    }),
  body: Joi.string().min(2)
  .pattern(RegExp(generalTextPattern))
    .min(1)
    .required()
    .messages({
        'string.pattern.base': 'Invalid. Certain characters are not allowed'
    })

})//

const updatePostSchema = Joi.object({
  _csrf: Joi.string(),
  title: Joi.string().min(2).max(50).required()
  .pattern(RegExp(searchPattern))
    .min(1)
    .required()
    .messages({
        'string.pattern.base': 'Invalid Title.'
    }),
  body: Joi.string().min(2)
  .pattern(RegExp(generalTextPattern))
    .min(1)
    .required()
    .messages({
        'string.pattern.base': 'Invalid. Certain characters are not allowed'
    }),
    id: Joi.string()
    .pattern(RegExp(uuidPattern))
    .required()
    .messages({
        'string.pattern.base': 'Invalid ID.'
    })

})//


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


const passwordResetSchema = Joi.object({
  password: Joi.string()
    .pattern(RegExp(passwordPattern))
    .messages({
        'string.pattern.base': 'Invalid entry. Password must cointain a minimum of 8 characters, and contain at least one capital letter, one number, and one of the special characters $, @, or #'
    })
    .required(),
    confirm_password: Joi.any().equal(Joi.ref('password'))
    .label('Confirm Password')
    .options({ messages: { 'any.only': '{{#label}} does not match'} }),
    token: Joi.string().min(30).max(30)
    .pattern(RegExp(tokenPattern))
    .messages({
      'string.pattern.base': 'Invalid token'
    })

})

const tokenSchema = Joi.object({
    token: Joi.string().min(30).max(30)
    .pattern(RegExp(tokenPattern))
    .messages({
      'string.pattern.base': 'Invalid token'
    })
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(RegExp(passwordPattern))
    .required()
    .messages({
        'string.pattern.base': 'Email or Password is incorrect.'
    })

})

const uuidSchema = Joi.object({
  id: Joi.string()
    .pattern(RegExp(uuidPattern))
    .required()
    .messages({
        'string.pattern.base': 'Invalid ID.'
    })

});

const searchSchema = Joi.object({
  search: Joi.string()
    .pattern(RegExp(searchPattern))
    .min(1)
    .required()
    .messages({
        'string.pattern.base': 'Invalid Search.'
    })

});


const profileSchema = Joi.object({
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
  bio: Joi.string()
  .allow('')
  .optional()
  .pattern(RegExp(bioTextPattern))
  .messages({
    'string.pattern.base': 'Invalid bio format.'
  }),
  location: Joi.string()
  .allow('')
  .optional()
  .pattern(RegExp(locationPattern))
  .messages({
    'string.pattern.base': 'Invalid location entry.'
  }),
  two_fa_enabled: Joi.boolean().optional(),
  profile_picture: Joi.string()
  .optional()
  .pattern(RegExp(picturePattern))
  .messages({
    'string.pattern.base': 'Invalid picture format. Should be either jpg, jpeg, or png'
  }),
  id: Joi.string()
  .pattern(RegExp(uuidPattern))
  .required()
  .messages({
      'string.pattern.base': 'Invalid ID.'
  })

})



const otpSchema = Joi.object({
  otp: Joi.string()
  .min(6)
  .max(6)
  .required()
  .pattern(RegExp(otpPattern))
  .messages({
    'string.pattern.base': 'Invalid OTP.'
}),

id: Joi.string()
.pattern(RegExp(uuidPattern))
.required()
.messages({
    'string.pattern.base': 'Invalid ID.'
})

})

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
})


module.exports = {
    checkEmail,
    checkImageExtension,
    registrationSchema,
    tokenSchema,
    loginSchema,
    uuidSchema,
    searchSchema,
    profileSchema,
    otpSchema, 
    postSchema,
    updatePostSchema,
    forgotPasswordSchema,
    passwordResetSchema
}

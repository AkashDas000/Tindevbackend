const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoURL",
    "gender",
    "about",
    "age",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};


const validatePassword = (req) => {
  const {oldPassword, newPassword} = req.body

  if(!oldPassword || !newPassword){
    throw new Error("Both old and new passwords are required")
  }

  if(!validator.isStrongPassword(newPassword)){
    throw new Error("New password is not strong enough")
  }
}



module.exports = {
  validateSignupData,
  validateEditProfileData,
  validatePassword,
};

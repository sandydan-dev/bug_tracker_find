const signupValidator = (data) => {
  // data name valid
  if (!data.name || data.name.trim().length === 0) {
    return "Name is required field, Please enter your name, and try again";
  }

  // data email valid
  if (!data.email || data.email.trim().length === 0) {
    return "Email is required field, Please enter your email, and try again";
  }

  // email valid include @ and .
  if (!data.email.includes("@") || !data.email.includes(".")) {
    return "Email is invalid, Please enter a valid email, and try again";
  }

  // data password valid
  if (!data.password || data.password.trim().length === 0) {
    return "Password is required field, Please enter your password, and try again";
  }
  // password valid length less and greater
  if (data.password.length < 6 || data.password.length > 20) {
    return "Password must be between 6 and 20 characters, Please enter a valid password, and try again";
  }

  return null;
};

const loginValidator = (data) => {
  // data email valid
  if (!data.email || data.email.trim().length === 0) {
    return "Email is required field, Please enter your email, and try again";
  }

  // email valid include @ and .
  if (!data.email.includes("@") || !data.email.includes(".")) {
    return "Email is invalid, Please enter a valid email, and try again";
  }

  // data password valid
  if (!data.password || data.password.trim().length === 0) {
    return "Password is required field, Please enter your password, and try again";
  }
  // password valid length less and greater
  if (data.password.length < 6 || data.password.length > 20) {
    return "Password must be between 6 and 20 characters, Please enter a valid password, and try again";
  }

  return null;
};

module.exports = { signupValidator, loginValidator };

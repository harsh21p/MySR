import * as EmailValidator from 'email-validator';
const checkEmailAddress = (email: string): boolean => {
  //Check minimum valid length of an Email.
  if (email.length <= 2) {
    return false;
  }
  //If whether email has @ character.
  if (email.indexOf('@') === -1) {
    return false;
  }

  const parts = email.split('@');
  const dot = parts[1].indexOf('.');
  const dotSplits = parts[1].split('.');
  const dotCount = dotSplits.length - 1;

  //Check whether Dot is present, and that too minimum 1 character after @.
  if (dot === -1 || dot < 2 || dotCount > 2) {
    return false;
  }

  //Check whether Dot is not the last character and dots are not repeated.
  for (let i = 0; i < dotSplits.length; i++) {
    if (dotSplits[i].length === 0) {
      return false;
    }
  }

  return true;
};
export const validateIsEmpty = (text: string): boolean => {
  let result = false;
  if (text === '' || text === undefined) {
    result = true;
  }
  return result;
};
export const validateNumber = (text: string): boolean => {
  const re = /^[6789]\d{9}$/;
  return re.test(text);
};

export const validatePhoneNumber = (text: string): boolean => {
  const re = /(@"^[0-9]{10}$")/;
  return re.test(text);
};
export const validatePassword = (password: string): boolean => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

  return re.test(password);
};
export const validateEmail = (email: string): boolean => {
  return EmailValidator.validate(email) && checkEmailAddress(email);
};

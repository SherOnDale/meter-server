const ValidationError = require('.././helpers/classes/ValidationError');

function createValidation(body) {
  if (!body.email || !body.firstName || !body.lastName || !body.password) {
    return new ValidationError(
      'Payload must contain at least the email, firstName, lastName and password fields'
    );
  }

  if (
    typeof body.email !== 'string' ||
    typeof body.firstName !== 'string' ||
    typeof body.lastName !== 'string' ||
    typeof body.password !== 'string'
  ) {
    return new ValidationError(
      'The email, firstName, lastName and password must be of type string'
    );
  }

  if (!/^[\w.+]+@\w+\.\w+$/.test(body.email)) {
    return new ValidationError('The email field must be a valid email');
  }

  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(body.password)) {
    return new ValidationError('The password field must be a valid password');
  }
}

function createUserValidation(body) {
  if (!body.email)
    return new ValidationError('Payload must contain at least the email field');

  if (typeof body.email !== 'string')
    return new ValidationError('The email must be of type string');

  if (!/^[\w.+]+@\w+\.\w+$/.test(body.email)) {
    return new ValidationError('The email field must be a valid email');
  }
}

function setPofileValidation(body) {
  if (!body.email || !body.firstName || !body.lastName || !body.password) {
    return new ValidationError(
      'Payload must contain at least the email, firstName, lastName and password fields'
    );
  }

  if (
    typeof body.email !== 'string' ||
    typeof body.firstName !== 'string' ||
    typeof body.lastName !== 'string' ||
    typeof body.password !== 'string'
  ) {
    return new ValidationError(
      'The email, firstName, lastName and password must be of type string'
    );
  }

  if (!/^[\w.+]+@\w+\.\w+$/.test(body.email)) {
    return new ValidationError('The email field must be a valid email');
  }

  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(body.password)) {
    return new ValidationError('The password field must be a valid password');
  }
}

function readyByEmailValidation(body) {
  if (!body.email) {
    return new ValidationError('Payload must contain at least the email field');
  }

  if (typeof body.email !== 'string') {
    return new ValidationError('The email must be of type string');
  }

  if (!/^[\w.+]+@\w+\.\w+$/.test(body.email)) {
    return new ValidationError('The email field must be a valid email');
  }
}

function verifyAccountValidation(body) {
  if (!/^[0-9a-f]{40}$/.test(body.hash)) {
    return new ValidationError('Please enter a valid hash');
  }
}

module.exports = {
  createUserValidation,
  setPofileValidation,
  readyByEmailValidation,
  verifyAccountValidation,
  createValidation
};

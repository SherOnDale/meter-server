const ValidationError = require(".././helpers/classes/ValidationError");

function createValidation(body) {
  if (!body.email) {
    return new ValidationError("Payload must contain at least the email field");
  }

  if (typeof body.email !== "string") {
    return new ValidationError("The email must be of type string");
  }

  if (!/^[\w.+]+@\w+\.\w+$/.test(body.email)) {
    return new ValidationError("The email field must be a valid email");
  }
}

module.exports = { createValidation };

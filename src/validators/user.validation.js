const ValidationError = require(".././helpers/classes/ValidationError");

function createValidation(body) {
  if (!body.email || !body.firstName || !body.lastName || !body.password) {
    return new ValidationError(
      "Payload must contain at least the email, firstName, lastName, avatar and password fields"
    );
  }

  if (
    typeof body.email !== "string" ||
    typeof body.firstName !== "string" ||
    typeof body.lastName !== "string" ||
    typeof body.password !== "string"
  ) {
    return new ValidationError(
      "The email, firstName, lastName and password must be of type string"
    );
  }

  if (!/^[\w.+]+@\w+\.\w+$/.test(body.email)) {
    return new ValidationError("The email field must be a valid email");
  }

  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(body.password)) {
    return new ValidationError("The password field must be a valid password");
  }
}

function readyByEmailValidation(body) {
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

module.exports = { createValidation, readyByEmailValidation };

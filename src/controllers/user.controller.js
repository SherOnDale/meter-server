const ValidationError = require("../helpers/classes/ValidationError");
const ResponseBody = require("../helpers/classes/ResponseBody");
const validate = require("../validators/user.validation");

const create = (req, res) => {
  const resBody = new ResponseBody();
  const validationResults = validate.createValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    return res.status(400).json(resBody);
  }
};

const update = (req, res) => {};

const activate = (req, res) => {};

module.exports = {
  create,
  update,
  activate
};

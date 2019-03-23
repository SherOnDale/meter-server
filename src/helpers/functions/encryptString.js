const crypto = require("crypto");
module.exports = (string, salt) =>
  crypto
    .createHmac("sha1", salt)
    .update(string)
    .digest("hex");

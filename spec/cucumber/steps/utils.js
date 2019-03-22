function getValidPayload(type) {
  switch (type.toLowerCase()) {
    case "create user":
      return {
        email: "e@ma.il",
        password: "pa2ssWord",
        firstName: "John",
        lastName: "Doe"
      };

    default:
      return undefined;
  }
}

function convertStringToArray(string) {
  return string
    .split(",")
    .map(s => s.trim())
    .filter(s => s !== "");
}

module.exports = { getValidPayload, convertStringToArray };

/*eslint-disable*/
const NotFoundError = require("./NotFoundError");
const InValidRequestError = require("./InValidRequestError");
const NotAuthorizedError = require("./NotAuthorizedError");

function mongodbError(res, error, resourceName = "resource") {
  const { code, message, name } = error;
  const { status } = res;

  const errorCode = (id) => {
    switch (id) {
      case 11000:
        res.status(500).send({ message: "value already exist" });
        break;
      default:
        res
          .status(500)
          .send({ message: "An error has occurred on the server" });
        break;
    }
  };
  switch (name) {
    case "CastError":
      res.status(400).send({ message: error.message });
      break;
    case "userNotFound":
      res.status(401).send({ message: `one of the details are not match` });
      break;
    case "passwordNotMatch":
      res.status(401).send({ message: `one of the details are not match` });
      break;
    case "ValidationError":
      res.status(400).send({ message: error.message });
      break;

    default:
      errorCode(code);
      break;
  }
}

module.exports = mongodbError;

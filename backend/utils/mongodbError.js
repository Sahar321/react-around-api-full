/*eslint-disable*/
function mongodbError(res, error, resourceName = "resource") {
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
  switch (error.name) {
    case "CastError":
      res.status(400).send({ message: error.message });
      break;
    case "DocumentNotFoundError":
      res.status(404).send({ message: `${resourceName} not found` });
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
      errorCode(error.code);
      break;
  }
}

module.exports = {
  mongodbError,
};

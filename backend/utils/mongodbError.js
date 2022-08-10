function mongodbError(res, error, resourceName = 'resource') {
  switch (error.name || error) {
    case 'CastError':
      res.status(400).send({ message: 'invalid data' });
      break;
    case 'DocumentNotFoundError':
      res.status(404).send({ message: `${resourceName} not found` });
      break;
    case 'ValidationError':
      res.status(400).send({ message: error.message });
      break;

    default:
      res.status(500).send({ message: 'An error has occurred on the server' });
  }
}

module.exports = {
  mongodbError,
};

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (!err.statusCode) {
    err.statusCode = 500;
    err.message = "An error occurred. Please try again later";
  }
  const statusCode = err.statusCode;

  const message = err.message;

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;

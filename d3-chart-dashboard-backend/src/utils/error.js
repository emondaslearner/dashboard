const badRequest = (msg) => {
  const error = new Error(msg);
  error.status = 400;
  return error;
};


module.exports = {
    badRequest
}
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("../router");

const middleware = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(router);

  // send error response
  app.use((err, _req, res, _next) => {
    console.log(err);
    if (err.status === 400) {
      res.status(400).json({
        code: 400,
        status: "error",
        message: err.message,
      });
      return;
    }

    res.status(err.status || 500).json({
      code: err.status || 500,
      status: "error",
      message:
        err.message || "Server unable to response. Please try again later.",
    });
  });
};

module.exports = middleware;

const express = require("express");
const middleware = require("./middleware");

const app = express();

// middlewares
middleware(app);

module.exports = app;

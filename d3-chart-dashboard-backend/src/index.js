require("dotenv").config();
const http = require("http");
const dbConnection = require("./db");
const app = require("./app");

const port = process.env.PORT;
const server = http.createServer(app);

const main = async () => {
  // connect db
  await dbConnection();

  server.listen(port, () => {
    console.log(`Server listening at port ${port}`);
  });
};

main();

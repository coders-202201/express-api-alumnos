require("dotenv").config();
const debug = require("debug")("alumnos:root");
const chalk = require("chalk");
const connectDB = require("./database");
const startServer = require("./server");

const port = process.env.SERVER_PORT || 3000;
const mongoConnection = process.env.MONGODB_STRING;

(async () => {
  try {
    await connectDB(mongoConnection);
    await startServer(port);
    // el programa sigue
    console.log("cosas");
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
  }
})();

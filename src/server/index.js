require("dotenv").config();
const debug = require("debug")("alumnos:server");
const chalk = require("chalk");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const { notFoundError, generalError } = require("./middlewares/errors");
const alumnosRouter = require("./routers/alumnosRouter");

const app = express();

const startServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Server listening on http://localhost:${port}`));
      resolve();
    });

    server.on("error", (error) => {
      reject(error);
    });
  });

app.use(morgan("dev"));
app.use(helmet());
app.use("/alumnos", alumnosRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = startServer;

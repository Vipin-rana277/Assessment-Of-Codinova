const express = require("express");
const http = require("http");

const InitiateMongoServer = require("./config/db.config");
const exchangesRouter = require("./routes/exchangesRouter");

const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

const server = http.createServer(app);

const PORT = process.env.PORT || 3104;

app.use("/", exchangesRouter);


const start = async () => {
  try {
    InitiateMongoServer();
    server.listen(PORT, (req, res) => {
      console.log(`Server Started at PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();

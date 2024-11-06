const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rate_limit = require("express-rate-limit");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization,X-Request-With,Origin,Accept",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  rate_limit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

app.listen(4000, () => {
  console.log("Server running on port 4000 ✅");
});

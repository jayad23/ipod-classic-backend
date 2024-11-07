const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rate_limit = require("express-rate-limit");

const { cors_options } = require("./config/cors-options");
const { rate_limit_options } = require("./config/rate-limit-options");

const { usersRoutes } = require("./routes/users.route");
const { settingsRoutes } = require("./routes/settings.route");
const { musicRoutes } = require("./routes/music.route");

const app = express();
app.use(cors(cors_options));
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(rate_limit(rate_limit_options));
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

app.use("/api/v1", settingsRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/music", musicRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const msn = message.includes("duplicate")
    ? "An element with that id already exists"
    : message;

  res.status(statusCode).json({
    status: `${statusCode}`.startsWith("4") ? "error" : "fail",
    statusCode,
    message: msn,
  });
});

app.listen(4000, () => {
  console.log("Server running on port 4000 ✅");
});

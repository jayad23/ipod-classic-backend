const express = require("express");

const usersRoutes = express.Router();

const { GoogleLogin } = require("../controllers/auth/google-login");
const { onLogin } = require("../controllers/auth/login");
const { createUser } = require("../controllers/auth/create-user");

usersRoutes.post("/login", GoogleLogin, onLogin);
usersRoutes.post("/register", createUser);

module.exports = { usersRoutes };

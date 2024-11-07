const { login } = require("../../db/firebase-config");

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const onLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const cond_one = !email || !password;
    const cond_two = email === "" || password === "";

    if (cond_one || cond_two) {
      res.status(400).json({
        message: "Credentials are required",
      });
      return;
    }

    const user = await login(req.body);

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  onLogin,
};

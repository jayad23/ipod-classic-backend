const cors_options = {
  origin: [
    "http://localhost:5173",
    "http://192.168.1.108:5173",
    "https://kz-ipod.vercel.app",
    "https://kz-ipod.vercel.app/*",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

module.exports = { cors_options };

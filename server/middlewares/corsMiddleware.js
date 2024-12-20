const cors = require("cors");

const corsOptions = {
  origin: "*", 
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

module.exports = cors(corsOptions);

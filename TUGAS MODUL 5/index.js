require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Router
const authRoutes = require("./routers/auth.routes");
app.use("/api/user", authRoutes);

// Load database
const db = require("./models");

app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("Hello from Express server!");
});

// Start server only if DB connects successfully
db.sequelize.authenticate()
  .then(() => {
    console.log("✅ MySQL Connected");

    const port = process.env.API_PORT || 3003;
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MySQL:", err.message);
  });

const express = require("express");
const app = express();

const msgRoutes = require("./routes/msg.routes");
const authRoutes = require("./routes/auth.routes");

app.use(express.json());

app.use("/api", msgRoutes);
app.use("/api/auth", authRoutes);

const PORT = 3004;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

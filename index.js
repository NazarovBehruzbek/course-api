require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const courseRoutes = require("./routes/course");
const authRoutes = require("./routes/auth");

const { swaggerUi, swaggerDocs } = require("./swagger"); // 📌 Swagger sozlamalarini import qilish

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // 📌 Swagger UI

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
  console.log("Swagger docs available at http://localhost:5000/api-docs");
});

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log("Do not connected", err));

app.use("/api/course", courseRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});

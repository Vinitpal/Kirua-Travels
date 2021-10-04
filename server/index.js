// Libraries
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Routers Import
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

// express and port
const app = express();
const PORT = process.env.PORT || 8800;

dotenv.config();
app.use(express.json());

// Routes
app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log("Backend server running at: ", PORT);
});

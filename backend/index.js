const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { json } = require("express");
const itemRoutes = require("./routes/itemRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(json());
app.use(cors());

app.use("/items", itemRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

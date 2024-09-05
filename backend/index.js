const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const PORT = 8000;
require("dotenv").config();

const itemRoutes = require("./routes/itemRoutes");

app.use("/items", itemRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

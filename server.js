
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connection");
const productRoutes = require("./routes/productRoutes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use("/api/products", productRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);    
})

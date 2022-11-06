const express = require("express");
const dotenv = require("dotenv").config();
const colors = require('colors')
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db")
const port = process.env.PORT || 5000;

connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"))



// app.get('/api/goals', (req, res) => {
//     res.status(200).json({message: 'Get gaols'})
// })

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

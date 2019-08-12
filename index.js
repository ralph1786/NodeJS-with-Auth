const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dbPassword = require("./constant.js");

//Express Body Parser
app.use(express.json());

//Connect to DB
mongoose.connect(
  `mongodb+srv://user101:${dbPassword}@cluster1-c1p4d.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true
  },
  () => console.log("Connected To DB")
);

//Import routes
const authRoute = require("./routes/auth.js");

//Route Middleware
app.use("/api/user", authRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

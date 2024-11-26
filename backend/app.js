require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require("./DBConnection");
const RoleRoute = require("./Routes/role");
const UserRoute = require("./Routes/user");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// roles
app.use("/api/roles", RoleRoute);

// users
app.use("/api/users", UserRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Access Matrix!",
    description:
      "This is backend API for access matrix application. Please use the api's with starting end ponit: /api",
  });
});

app.get("/*", (req, res) => {
  res.status(404).json({
    message: "Not Found! The page you are looking for doesn't exist.",
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`server is listening on port ${PORT}...`);
});

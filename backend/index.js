const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const { registerUser, verifyUser, getAllApplications, createApplication, updateApplication } = require("./controllers/applications");
const port = 5000;

const { applicationsTable, users } = require("./data");

app.use(express.json());

//POST method to create a new user
app.post("/api/v1/registerUser", registerUser);

//to check if the username: password are correct
app.get("/api/v1/login", verifyUser);

//GET method to fetch all current applications
app.get("/api/v1/:id", getAllApplications);

//POST method to create a new application
app.post("/api/v1/:id/newApplication", createApplication);

//PATCH method to update some field of an existing application
app.patch("/api/v1/:id/updateApplication", updateApplication);

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

startApp();

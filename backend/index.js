const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
  })
);

const connectDB = require("./db/connect");

require("dotenv").config();

const {
  registerUser,
  verifyUser,
  getAllApplications,
  getOneApplication,
  createApplication,
  updateApplication,
} = require("./controllers/applications");

const port = 5000;

app.use(express.json());

app.use(cors());

//POST method to create a new user
app.post("/api/v1/registerUser", registerUser);

//GET method to check if the username: password are correct
app.post("/api/v1/login", verifyUser);

//GET method to fetch all current applications
app.get("/api/v1/:id/getAllApplication", getAllApplications);

//GET method to fetch one application
app.get("/api/v1/:id/getOneApplication/:applicationId", getOneApplication);

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

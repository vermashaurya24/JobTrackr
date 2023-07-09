const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const { registerUser, verifyUser } = require("./controllers/applications");
const port = 5000;

const { applicationsTable, users } = require("./data");

app.use(express.json());

//POST method to create a new user
app.post("/api/v1/registerUser", registerUser);

//to check if the username: password are correct
app.get("/api/v1/login", verifyUser);

//GET method to fetch all current applications
app.get("/api/v1/:id", (req, res) => {
  const { id } = req.params;
  const user_applications = applicationsTable.filter(
    (application) => application.id === parseInt(id)
  );
  res.status(200).send(user_applications);
});

//POST method to create a new application
app.post("/api/v1/:id/newApplication", (req, res) => {
  const { id } = req.params;
  const { company, position, application_status } = req.body;
  const user_applications = applicationsTable.filter((application) => {
    if (application.id === parseInt(id)) return application.applications;
  });
  user_applications.push({
    company,
    position,
    application_status,
  });

  res.status(200).json(user_applications);
});

//PATCH method to update some field of an existing application
app.patch("/api/v1/:id/updateApplication", (req, res) => {
  res.status(200).send("Updated the existing application");
});

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

startApp();

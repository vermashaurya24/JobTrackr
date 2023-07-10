const { applicationsTable, users } = require("../data");
const Application = require("../models/Application");

const registerUser = async (req, res) => {
  const { userName } = req.body;
  try {
    // console.log(userName);
    const exists = await Application.findOne({ userName });
    // console.log(exists);
    if (exists) {
      return res.status(202).json({ msg: "User already exists, please login" });
    }
    const application = await Application.create(req.body);
    res.status(201).json({ msg: "User created successfully", application });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const application = await Application.findOne({ userName });
    if (!application) {
      return res.status(203).json({ msg: "Username does not exist" });
    } else if (application.password !== password) {
      return res.status(202).json({ msg: "Wrong password" });
    }
    res.status(201).json({ msg: "Login successful", application });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getAllApplications = async (req, res) => {
  const { id } = req.params;
  const application = await Application.findOne({ userName: id });
  res.status(201).json(application.applications);
};

module.exports = { registerUser, verifyUser, getAllApplications };

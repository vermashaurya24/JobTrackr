const { applicationsTable, users } = require("../data");
const Application = require("../models/Application");

const registerUser = async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json({ application });
  } catch (error) {
    res.status(500).json({ msg: err });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const application = await Task.findOne({ userName }).exec();
    if (!application) {
      return res.status(400).json({ message: "Username does not exist" });
    } else if (application.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }
    res.status(201).json({ application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, verifyUser };

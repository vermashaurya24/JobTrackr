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

const getOneApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { applicationId } = req.params;

    // Assuming you have a model named Application representing your application schema
    const application = await Application.findOne(
      { userName: id, "applications._id": applicationId },
      { "applications.$": 1 }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const selectedApplication = application.applications[0];
    res.status(200).json(selectedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, position, status } = req.body;
    const application = await Application.findOne({ userName: id });

    // Add the new application item to the applications array
    application.applications.push({
      company,
      position,
      status,
    });

    // Save the updated application to the database
    const updatedApplication = await application.save();

    res.status(200).json({ application: updatedApplication });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, company, position, status } = req.body;

    // Find the user/application by id
    const application = await Application.findOne({ userName: id });

    // Find the index of the application to be updated
    const applicationIndex = application.applications.findIndex(
      (application) => application._id.toString() === _id
    );

    if (applicationIndex === -1) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the specific fields of the application
    if (company) {
      application.applications[applicationIndex].company = company;
    }
    if (position) {
      application.applications[applicationIndex].position = position;
    }
    if (status) {
      application.applications[applicationIndex].status = status;
    }

    // Save the updated application
    await application.save();

    res.status(200).json({ message: "Application updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  registerUser,
  verifyUser,
  getAllApplications,
  getOneApplication,
  createApplication,
  updateApplication,
};

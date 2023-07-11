const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Must provide a name"],
    trim: true,
    maxlength: [20, "Name must be less than 20 characters"],
  },
  password: {
    type: String,
    required: [true, "Must provide a password"],
    trim: true,
    maxlength: [300, "Password must be less than 300 characters"],
  },
  applications: [
    {
      company: {
        type: String,
        trim: true,
        maxlength: [20, "Name must be less than 20 characters"],
      },
      position: {
        type: String,
        trim: true,
        maxlength: [20, "Position must be less than 10 characters"],
      },
      status: {
        type: String,
        trim: true,
        maxlength: [20, "Position must be less than 10 characters"],
      },
    },
  ],
});

module.exports = mongoose.model("Application", ApplicationSchema);

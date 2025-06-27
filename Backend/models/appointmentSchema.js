import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: [3, "Firstname must be at least 3 characters long"],
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  Phone: {
    type: String,
    required: true,
    maxlength: [10, "Phone number must contain exact 10 digits"],
  },
  nic: {
    type: String,
    required: true,
    minlength: [5, "nic number must contain exact 5 digits"],
    maxlength: [5, "nic number must contain exact 5 digits"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required"],
  },
  gender: {
    type: String,
    required: true,
    enum: {
      values: ["Male", "Female"],
      message: "Please select a valid gender",
    },
  },
  appointment_date: {
    type: Date,
    required: [true, "Appointment date is required"],
  },
  department: {
    type: String,
    required: [true, "Department is required"],
  },

  doctor: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  hasvisited: {
    type: Boolean,
    default: false,
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,

    enum: ["Pending", "Accepted", "Rejected"],
    dafault: "Pending",
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);

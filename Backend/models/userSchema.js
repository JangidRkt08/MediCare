import validator from "validator";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
  Password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
    select: false,
  },
  role: {
    type: String,
    required: true,
    default: "Patient",
    enum: {
      values: ["Patient", "Doctor", "Admin"],
      // message: "Please select a valid role",
    },
  },
  doctorDepartment: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});
// Encrypt user password
userSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    next();
  }

  this.Password = await bcrypt.hash(this.Password, 10);
});

//  Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

// Generate JWT
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("user", userSchema);

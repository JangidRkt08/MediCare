import validator from "validator";
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
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
    message: {
      type: String,
      required: true,
      minlength: [10, "Message must be at least 10 characters "],
    }
});


export const Message = mongoose.model("message", messageSchema)
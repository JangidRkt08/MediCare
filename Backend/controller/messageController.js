import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { firstname, lastname, email, Phone, message } = req.body;
  if (!firstname || !lastname || !email || !Phone || !message) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const data = await Message.create({
    firstname,
    lastname,
    email,
    Phone,
    message,
  });
  res
    .status(200)
    .json({ success: true, data, message: "message sent successfully" });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({ success: true, messages });
});

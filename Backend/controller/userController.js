import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    Phone,
    dob,
    gender,
    Password,
    nic,
    role,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !Phone ||
    !dob ||
    !gender ||
    !Password ||
    !nic ||
    !role
  ) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  // check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }
  // create new user
  user = await User.create({
    firstname,
    lastname,
    email,
    Phone,
    dob,
    gender,
    Password,
    nic,
    role,
  });
  generateToken(user, "user registered successfully", 200, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, Password, confirmPassword, role } = req.body;
  if (!email || !Password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  if (Password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  const user = await User.findOne({ email }).select("+Password");
  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }
  const isPasswordMatched = await user.comparePassword(Password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }
  generateToken(user, "user logIn successfully", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstname, lastname, email, Phone, dob, gender, Password, nic } =
    req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !Phone ||
    !dob ||
    !gender ||
    !Password ||
    !nic
  ) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} with this email is already exists`,
        400
      )
    );
  }
  const admin = await User.create({
    firstname,
    lastname,
    email,
    Phone,
    dob,
    gender,
    Password,
    nic,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered ",
  });
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar is required", 400));
  }
  const docAvatar = req.files.docAvatar;

  // console.log(req.files);

  const allowedFormats = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("Please upload valid image format", 400));
  }
  const {
    firstname,
    lastname,
    email,
    Phone,
    dob,
    gender,
    Password,
    nic,
    doctorDepartment,
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !Phone ||
    !dob ||
    !gender ||
    !Password ||
    !nic ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please provide full Details ", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} with this email is already exists`,
        400
      )
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "cloudinary error:",
      cloudinaryResponse.error || "unknown Cloudinary Error"
    );
  }
  const doctor = await User.create({
    firstname,
    lastname,
    email,
    Phone,
    dob,
    gender,
    Password,
    nic,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      //########## we will get these properties using console.log(cloudinaryResponse) ##############
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered ",
    doctor,
  });
});

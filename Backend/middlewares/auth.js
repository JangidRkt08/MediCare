import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./errorMiddleware.js";
import  jwt from "jsonwebtoken";

// for admin
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    
    // Authentication

  if (!token) {
    return next(new ErrorHandler("Admin not authenticated", 401));
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Authorization

  req.user = await User.findById(decoded.id);  
  if (req.user.role !== "Admin") {
    return next(
      new ErrorHandler(`${req.user.role} not authorized for this resource!`, 401)
    );
  }
  next(); 
});


// for patient
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    
    // Authentication

  if (!token) {
    return next(new ErrorHandler("Patient not authenticated", 401));
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Authorization

  req.user = await User.findById(decoded.id);  
  if (req.user.role !== "Patient") {
    return next(
      new ErrorHandler(`${req.user.role} not authorized for this resource!`, 401)
    );
  }
  next(); 
});

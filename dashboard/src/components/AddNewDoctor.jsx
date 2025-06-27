import React, { useContext, useEffect, useState } from "react";
import { context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const AddNewDoctor = () => {
  const { isAuthenticated } = useContext(context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [doctorAvatar, setDoctorAvatar] = useState("");
  const [doctorAvatarPreview, setDoctorAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setDoctorAvatarPreview(reader.result);
        setDoctorAvatar(file);
      }
    };
  };
  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("firstname", firstName);
      formdata.append("lastname", lastName);
      formdata.append("email", email);
      formdata.append("Phone", phone);
      formdata.append("nic", nic);
      formdata.append("gender", gender);
      formdata.append("Password", password);
      formdata.append("doctorDepartment", doctorDepartment);
      formdata.append("docAvatar", doctorAvatar);
      formdata.append("dob", dob);

      const response = await axios.post(
        "http://localhost:4000/api/v1/user/doctor/addnew",

        formdata,

        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
          credentials: "include",
          // mode: "cors",
        }
      );
      toast.success(response.data.message);
      // setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
    if (!isAuthenticated) {
      return <Navigate to={"/login"} />;
    }
  };

  return (
    <>
      <section className="page">
        <section className="container  add-doctor-form">
          <img src="/logo.png" alt="logo" className="logo" />
          <h1 className="form-title">Register New Doctor</h1>
          <form onSubmit={handleAddNewDoctor}>
            <div className="first-wrapper">
              <div>
                <img
                  src={
                    doctorAvatarPreview
                      ? `${doctorAvatarPreview}`
                      : "/doctor.jpg"
                  }
                  alt=""
                />
                <input
                  type="file"
                  name="doctorAvatar"
                  // id="doctorAvatar"
                  onChange={handleAvatar}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="NIC"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                />
                <input
                  type={"date"}
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />

                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <select
                  value={doctorDepartment}
                  onChange={(e) => {
                    setDoctorDepartment(e.target.value);
                  }}
                >
                  <option value="">Select Department</option>
                  {departmentsArray.map((depart, index) => {
                    return (
                      <option value={depart} key={index}>
                        {depart}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <button type="submit">ADD DOCTOR</button>
            </div>
          </form>
        </section>
      </section> 
    </>
  );
};

export default AddNewDoctor;

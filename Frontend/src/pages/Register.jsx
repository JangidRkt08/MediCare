import React, { useState, useContext } from "react";
// import { useContext } from "react";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  // const [isAuthenticated, setIsAuthenticated] = useContext(Context);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/patient/register",
        {
          firstname: firstName,
          lastname: lastName,
          Phone: phone,
          nic: nic,
          email: email,
          Password: password,
          gender: gender,
          dob: dob,
          role: "Patient",
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          // mode: "cors",
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
    if (isAuthenticated) {
      return <Navigate to={"/"} />;
    }
  };
  return (
    <div className="container form-component register-form">
      <h2>SignUp</h2>
      <p>Please SignUP to Continue</p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
        mollitia possimus magnam dolores enim perspiciatis tempora? Tempore,
        accusamus quasi odio adipisci exercitationem dignissimos laboriosam
        repellendus eaque beatae, dicta aut neque pariatur repellat, ut tenetur
        id ullam reprehenderit! Tenetur, harum dicta voluptas cum laboriosam id
        eligendi.
      </p>
      <form onSubmit={handleRegister}>
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
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="NIC"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
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
        </div>
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Already Registered</p>
          <Link
            to={"/login"}
            style={{ textDecoration: "none", alignItems: "center" }}
          >
            Login Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;

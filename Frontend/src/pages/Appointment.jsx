import React from "react";
import AppointmentForm from "../components/AppointmentForm";
import Hero from "../components/Hero";

const Appointment = () => {
  return (
    <div>
      <Hero title={"Make an Appointment"} imageUrl={"./hero.gif"} />
      <AppointmentForm/>
    </div>
  );
};
 
export default Appointment;

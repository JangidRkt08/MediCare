import React from "react";

import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Department from "../components/Department";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <div>
      <Hero
        title={
          "Welcome to VCare Medical Institute | Your Trusted Healthcare Partner"
        }
        imageUrl={"/hero.gif"}
      />
      <Biography imageUrl={"/Biography.png" } />
      <Department />
      <MessageForm />
    </div>
  );
};

export default Home;

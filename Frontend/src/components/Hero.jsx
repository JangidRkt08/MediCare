import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
          voluptatibus delectus blanditiis minus repellat, amet fuga
          necessitatibus odio placeat quod corrupti ipsam eveniet quia. Dolores
          repudiandae iusto iure esse officia. Excepturi facilis non nam, esse
          dolor corporis. Quaerat repudiandae sequi cupiditate officiis amet
          ratione aut?
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
      </div>
    </div>
  );
};

export default Hero;

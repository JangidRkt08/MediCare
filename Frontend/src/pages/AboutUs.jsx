import React from 'react'
// import hero from '../components/Hero'  
import Biography from '../components/Biography'
import Hero from '../components/Hero';
const AboutUs = () => {
  return (
    <>
      <Hero title={"Learn More About Us"} imageUrl={"./Biography.png"} />
      <Biography imageUrl={"/whoweare.jpg"}/>
    </>
  );
}

export default AboutUs
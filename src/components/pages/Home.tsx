import React from "react";
import Hero from "../partials/Hero";
import Why from "../partials/Why";
import Features from "../partials/Features";
import CTA from "../partials/CTA";

const Home: React.FC = () => {
  return <section>
    <Hero/>
    <Why/>
    <Features/>
    <CTA/>
  </section>;
};

export default Home;

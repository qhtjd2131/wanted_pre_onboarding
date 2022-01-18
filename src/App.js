import React from "react";
import "./App.css";
import Carousel from "./components/Carousel/Carousel.js";
import GlobalNavBar from "./components/GlobalNavBar";

const App = () => {
  return (
    <div className="global-wrapper">
      <section className="app">
        <GlobalNavBar />
        <Carousel/>
      </section>
    </div>
  );
};

export default App;

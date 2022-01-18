import React from "react";
import "./App.css";
import Carousel from "./components/Carousel";
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

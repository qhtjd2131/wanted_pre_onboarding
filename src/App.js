import React from "react";
import "./App.css";
import GlobalNavBar from "./components/GlobalNavBar";

const App = () => {
  return (
    <div className="global-wrapper">
      <section className="app">
        <GlobalNavBar />
      </section>
    </div>
  );
};

export default App;

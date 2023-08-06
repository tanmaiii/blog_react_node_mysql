import "./App.scss";
import React from "react";
import Router from "./config/Router";
import TopBar from "./components/topbar/TopBar";
import Leftbar from "./components/leftbar/Leftbar";
import Footer from './components/footer/Footer'

import { useMode } from "./context/ModeContext";

function App() {
  const { darkMode, toggle, openSidebar } = useMode();

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <TopBar />
      <div className="content" style={{ display: "flex" }}>
        <Leftbar />
        <div className={`main ${openSidebar ? 'hide' : ''}`}>
          <Router />
          <Footer/>
        </div>
      </div>
    </div>
  );
}

export default App;

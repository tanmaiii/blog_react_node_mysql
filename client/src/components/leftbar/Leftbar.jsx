import React, { useEffect, useState } from "react";
import "./leftbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMode } from "../../context/ModeContext";
import { useAuth } from "../../context/authContext";
import axios from "axios";

export default function Leftbar() {
  const { pathname } = useLocation();
  const { darkMode, toggle, openSidebar, toggleSidebar} = useMode();
  const { currentUser, logout } = useAuth();
  const [openLeftBar, setOpenLeftBar] = useState(false);

  useEffect(() => {
    const linkTagNameA = document.querySelectorAll(".leftbar a");
    linkTagNameA.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === pathname) {
        item.classList.add("active");
      }
    });
  }, [pathname]);

  const handleLogout = () => {
    logout();
  };

  const handleClose = () => {
    const leftBar = document.querySelector(".leftbar");
    leftBar.classList.remove("openSidebar");
  }

  return (
    <div className={`leftbar ${openSidebar ? "hide" : ""}`}>
      <div className="leftbar_container">
        <div className="leftbar_container-top">
          <div className="leftbar__item ">
            <h4>Discover</h4>
            <ul>
              <Link to="/" className="active">
                <i className="fa-solid fa-house"></i>
                <span>Home</span>
              </Link>
              <Link to="/category">
                <i className="fa-solid fa-filter"></i>
                <span>Category</span>
              </Link>
              <Link to="/author">
                <i className="fa-solid fa-people-group"></i>
                <span>Author</span>
              </Link>
              {currentUser && (
                <Link to={`/profile/` + currentUser?.id}>
                  <i className="fa-solid fa-user"></i>
                  <span>Your post</span>
                </Link>
              )}
            </ul>
          </div>
          <hr />
          <div className="leftbar__item">
            <h4>Individual</h4>
            <ul>
              <Link to="/write">
                <i className="fa-solid fa-pen"></i>
                <span>Write</span>
              </Link>
              {currentUser && (
                <Link to={`/settings`}>
                  <i className="fa-solid fa-gear"></i>
                  <span>Settings</span>
                </Link>
              )}
              <a href="" onClick={() => toggle()}>
                {darkMode ? (
                  <>
                    <i className="fa-solid fa-sun"></i>
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-moon"></i>
                    <span>Dark Mode</span>
                  </>
                )}
              </a>
              {currentUser && (
                <a href="" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <span>Log Out</span>
                </a>
              )}
            </ul>
          </div>
        </div>
        <div className="leftbar_container-bottom">
          <button
            className={`leftbar_open ${openSidebar ? "open" : ""}`}
            onClick={() => toggleSidebar()}
          >
            {openSidebar ? (
              <i className="fa-solid fa-chevron-right"></i>
            ) : (
              <i className="fa-solid fa-chart-bar"></i>
            )}
          </button>
        </div>
        <button className="btn_close" onClick={handleClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
}

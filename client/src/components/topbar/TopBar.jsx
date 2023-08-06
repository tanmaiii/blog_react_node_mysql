import React, { useState ,useRef} from "react";
import "./topbar.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useMode } from "../../context/ModeContext";
import avt from "../../assets/avatar.jpg";
import logo from '../../assets/logo_blog.png'
import { apiImage } from "../../axios";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const { currentUser } = useAuth();
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const { darkMode, toggle, openSidebar, toggleSidebar } = useMode();
  const inputRef = useRef()

  const handleKeyDown = (e) => {
    if (e.code === "Enter") return handleClick();
  };

  const handleClick = () => {
    navigate("/search/" + key);
    inputRef.current.classList.remove('active')
  };

  const handleClickOpenSidebar = () => {
    const leftBar = document.querySelector(".leftbar");
    leftBar.classList.add("openSidebar");
  };

  const handleClickSearch = () => {
    inputRef.current.classList.toggle('active')
  }

  return (
    <div className="topbar">
      <div className="container topbar_container">
        <div className="topbar_left">
          <button className="open-leftbar" onClick={handleClickOpenSidebar}>
            <i className="fa-solid fa-bars"></i>
          </button>
          <Link to={"/"}>
            <img src={logo} alt="" />
            <h4>Blog</h4>
          </Link>
        </div>

        <div className="topbar_center">
          <div className="topbar_center-search" ref={inputRef}>
            <button onClick={handleClick}>
              <i className=" fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              type="text"
              name=""
              id=""
              placeholder="Search..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="topbar_right">
          <button className="btn-search" onClick={handleClickSearch}>
            <i className=" fa-solid fa-magnifying-glass"></i>
          </button>
          {currentUser ? (
            <Link to={`/profile/${currentUser.id}`} className="topbar_avt">
              {currentUser.profilePic ? (
                <img src={apiImage + currentUser.profilePic} alt="" />
              ) : (
                <img src={avt} />
              )}
            </Link>
          ) : (
            <Link to="/login" className="link">
              <button className="btn btn-primary topbar_right-login">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

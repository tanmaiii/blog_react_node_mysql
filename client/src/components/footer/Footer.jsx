import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <p>
        A constructive and inclusive social network for software developers.
        With you every step of your journey.
      </p>
      <ul>
        <li>
          <span className="dot"></span>
          <Link>Home</Link>
        </li>
        <li>
          <span className="dot"></span>
          <Link to={"/category"}>Category</Link>
        </li>
        <li>
          <span className="dot"></span>
          <Link to={"/write"}>Write</Link>
        </li>
        <li>
          <span className="dot"></span>
          <Link to={"/settings"}>Settings</Link>
        </li>
        <li>
          <span className="dot"></span>
          <Link to={"/login"}>Login</Link>
        </li>
        <li>
          <span className="dot"></span>
          <Link to={"/register"}>Register</Link>
        </li>
        <li>
          <span className="dot"></span>
          <Link to={"/author"}>Author</Link>
        </li>
      </ul>
      <span>
       Made with love by <a href="https://github.com/tanmaiii">tanmaiii</a>. DEV Community © 2023.
      </span>
    </div>
  );
}

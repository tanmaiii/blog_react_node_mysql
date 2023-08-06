import React, { useState, useEffect } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

export default function Login() {
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { currentUser, login } = useAuth();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    const postRe = async () => {
      try {
        await login(inputs);
      } catch (err) {
        setErr("Username or password is not matches!");
      }
    };
    postRe();
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrapper-close">
          <Link to="/" className="link">
            <i className="fa-solid fa-xmark"></i>
          </Link>
        </div>
        <div className="login_wrapper-left">
          <div className="login_wrapper-logo">
            <img src="" alt="" />
            <h4>Untiled</h4>
          </div>
          <form action="" className="login_wrapper-form">
            <h4 className="login_wrapper-form-welcome">Welcome back</h4>
            <p className="login_wrapper-form-desc">
              The faster fill up, the faster you a ticket
            </p>
            {err && <p className="err">{err}</p>}
            <div className="login_wrapper-form-input">
              <label htmlFor="">User name</label>
              <input
                type="text"
                id=""
                placeholder="Enter user name..."
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="login_wrapper-form-input">
              <label htmlFor="">Password</label>
              <input
                type="text"
                id=""
                placeholder="Enter password..."
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="login_wrapper-form-ques">
              <div>
                <input type="checkbox" name="" id="" />
                <label htmlFor="">Remember me</label>
              </div>
              <div>Forgot Password ?</div>
            </div>
            <div className="login_wrapper-form-btn" onClick={handleSubmit}>
              <button>Sign in</button>
            </div>
          </form>
          <div className="login_wrapper-signUp">
            <div>
              <p>Don't have a account?</p>
              <Link to="/register" className="link">
                {" "}
                <span href="">Sign Up</span>{" "}
              </Link>
            </div>
          </div>
        </div>
        <div className="login_wrapper-right">
          <img
            src="https://dr.savee-cdn.com/things/6/4/7f70782a8cf3564b135d1e.webp"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

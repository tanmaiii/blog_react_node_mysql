import React, { useRef, useState ,useEffect} from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from '../../context/authContext'


export default function Login() {
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const {currentUser} = useAuth()

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (passwordRef.current.value !== rePasswordRef.current.value) return setErr("password not match !");
    try{
        await axios.post('/auth/register', inputs);
        navigate('/login')
        inputs('')
    }catch(err){
      setErr('username not match !')
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className="register">
      <div className="register_wrapper">
        <div className="register_wrapper-close">
          <Link to="/" className="link">
            <i className="fa-solid fa-xmark"></i>
          </Link>
        </div>
        <div className="register_wrapper-left">
          <div className="register_wrapper-logo">
            <img src="" alt="" />
            <h4>Untiled</h4>
          </div>
          <form action="" className="register_wrapper-form">
            <h4 className="register_wrapper-form-welcome">Welcome</h4>
            <p className="register_wrapper-form-desc">
              The faster fill up, the faster you a ticket
            </p>
            {err && <p className="err">{err}</p>}
            <div className="register_wrapper-form-input">
              <label htmlFor="">User name</label>
              <input
                type="text"
                id="username"
                placeholder="Enter user name..."
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="register_wrapper-form-input">
              <label htmlFor="">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email..."
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="register_wrapper-form-input">
              <label htmlFor="">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password..."
                name="password"
                onChange={handleChange}
                ref={passwordRef}
              />
            </div>
            <div className="register_wrapper-form-input">
              <label htmlFor="">Re password</label>
              <input
                type="password"
                id=""
                placeholder="Enter password..."
                name="rePassword"
                onChange={handleChange}
                ref={rePasswordRef}
              />
            </div>
            <div className="register_wrapper-form-ques">
              <div>
                <input type="checkbox" name="" id="" />
                <label htmlFor="">Remember me</label>
              </div>
            </div>
            <div className="register_wrapper-form-btn">
              <button onClick={handleSubmit}>Register</button>
            </div>
          </form>
          <div className="register_wrapper-signIn">
            <div>
              <p>You have a account?</p>
              <Link to="/login" className="link">
                <span href="">Sign in</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="register_wrapper-right">
          <img
            src="https://dr.savee-cdn.com/things/6/4/7f70782a8cf3564b135d1e.webp"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

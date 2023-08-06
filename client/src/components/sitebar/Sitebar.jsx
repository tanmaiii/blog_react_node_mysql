import React, { useEffect, useState } from "react";
import "./sitebar.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sitebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sitebar">
      <h3>About me</h3>
      <div className="avatar">
        <img
          src="https://images.pexels.com/photos/16110027/pexels-photo-16110027/free-photo-of-thu-v-t-cho-v-t-nuoi-d-th-ng.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
      </div>
      <p className="content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam
        exercitationem autem praesentium voluptas modi provident architecto
        totam quasi ducimus illum error, eveniet cupiditate, alias ut temporibus
        repellendus ea! Architecto, ducimus!
      </p>
      <div className="categories">
        <h3>Categories</h3>
        <ul className="categories-list">
          {cats &&
            cats.map((cat) => (
              <Link to={`?cat=`+cat.name} key={cat._id}>
                <li className="categories-item" >
                  {cat.name}
                </li>
              </Link>
            ))}
        </ul>
      </div>
      <div className="social">
        <h3>Follow me</h3>
        <ul className="social-list">
          <li className="social-item">
            <a href="">
              <i className="fa-brands fa-facebook"></i>
            </a>
          </li>
          <li className="social-item">
            <a href="">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
          <li className="social-item">
            <a href="">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li className="social-item">
            <a href="">
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

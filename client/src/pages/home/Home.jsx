import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sitebar from "../../components/sitebar/Sitebar";
import Modal from "../../components/modal/Modal";
import "./home.scss";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const { search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="home_list">
        <Posts posts={posts} />
      </div>
    </div>
  );
}

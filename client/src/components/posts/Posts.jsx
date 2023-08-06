import React, { useEffect, useState } from "react";
import "./posts.scss";
import Post from "../post/Post";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { makeRequest } from "../../axios";

export default function Posts({ cat, userId, userLikeId }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      try {
        if (cat) {
          const res = await makeRequest.get("posts?category=" + cat);
          setPosts(res.data);
        } else if (userId) {
          const res = await makeRequest.get("posts/user?userId=" + userId);
          setPosts(res.data);
        } else if (userLikeId) {
          const res = await makeRequest.get("posts/likes?userId=" + userLikeId);
          setPosts(res.data);
        } else {
          const res = await makeRequest.get("posts");
          setPosts(res.data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
    setLoading(false);
  }, [cat, userId, userLikeId]);

  return (
    <div className="posts">
      {loading && <Loader />}
      {posts && posts.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "./listCol.scss";
import { makeRequest, apiImage } from "../../axios";
import avatar from "../../assets/avatar.jpg";
import nofile from "../../assets/nofile.jpg";
import { Link } from "react-router-dom";
import moment from "moment";

export default function ListCol({ post }) {
  const [posts, setPosts] = useState([]);
  const cat = post.categoryName;
  const postIdOld = post.id;

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await makeRequest.get("posts?category=" + cat);
        setPosts(res.data.slice(0, 5));
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="listCol">
      <div className="listCol_wrapper">
        <h4>Recommend</h4>
        {posts.map((post, id) => {
          return postIdOld === post.id ? "" : <Post key={id} post={post} />;
        })}
      </div>
    </div>
  );
}

export const Post = (props) => {
  const post = props.post;
  return (
    <div className="postCol">
      <div className="postCol_container">
        <div className="postCol_img">
          {post.img ? (
            <img src={apiImage + post.img} alt="" />
          ) : (
            <img src={nofile} alt="" />
          )}
        </div>
        <div className="postCol_info">
          <div className="postCol_info-top">
            <h6 className="postCol_info-category">{post?.categoryName}</h6>
            <Link to={"/post/" + post.id}>
              <h4 className="postCol_info-title">{post?.title}</h4>
            </Link>
          </div>
          <div className="postCol_info-author">
            <div className="user">
              <span>By {post?.username}</span>
            </div>
            <span className="time">
              {moment(post?.createdAt).subtract(10, "days").calendar()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

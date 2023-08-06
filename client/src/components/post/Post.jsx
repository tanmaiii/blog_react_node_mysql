import React from "react";
import "./post.scss";
import nofile from "../../assets/nofile.jpg";
import avatar from "../../assets/avatar.jpg";
import { Link } from "react-router-dom";
import { apiImage } from "../../axios";
import moment from "moment";

export default function Post({ post }) {
  return (
    post && (
      <div className="post">
        <Link to={`/post/${post.id}`} className="post_container">
          <div className="post_img">
            {post.img ? (
              <img src={apiImage + post.img} alt="" />
            ) : (
              <img src={nofile} alt="" />
            )}
            <button className="btn">Read More</button>
          </div>
          <div className="post_info">
            <h6 className="post_info-category">{post?.categoryName}</h6>
            <h4 className="post_info-title">{post?.title}</h4>
            <div className="post_info-author">
              <div className="user">
                {post.profilePic ? (
                  <img src={apiImage + post.profilePic} alt="" />
                ) : (
                  <img src={avatar} alt="" />
                )}
                <span>{post?.username}</span>
              </div>
              <span className="time">
                {moment(post?.createdAt).subtract(10, "days").calendar()}
              </span>
            </div>
          </div>
        </Link>
      </div>
    )
  );
}

import React, { useState, useEffect, forwardRef } from "react";
import "./cardAuthor.scss";
import avatar from "../../assets/avatar.jpg";
import { Link } from "react-router-dom";
import { apiImage } from "../../axios";
import { makeRequest } from "../../axios";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

import { useQuery, useMutation, useQueryClient } from "react-query";

export default function CardAuthor(props) {
  const [follow, setFollow] = useState(false);
  const [following, setFollowing] = useState([]);
  const [post, setPost] = useState(0)
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const author = props.author;

  const queryClient = useQueryClient();

  useEffect(() => {
    const res = async () => {
      try {
        const data = await makeRequest('posts/user?userId='+author.userId)
        setPost(data.data)
      } catch (error) {
        console.log(error);
      }
    }
    res()
  },[])

  const {
    isLoading,
    error,
    data: follower,
  } = useQuery(["follower", author.userId], () =>
    makeRequest
      .get("relationships/follower?userId=" + author.userId)
      .then((res) => {
        return res.data;
      })
  );

  const mutation = useMutation(
    (follow) => {
      if (follow)
        return makeRequest.delete("relationships?userId=" + author.userId);
      return makeRequest.post("relationships?userId=" + author.userId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["follower"]);
      },
    }
  );

  const handleFollow = () => {
    currentUser
      ? mutation.mutate(follower.includes(currentUser?.id))
      : navigate("/login");
  };

  return (
    <div className="CardAuthor pc-3 t-6 m-12">
      <div className="CardAuthor_container">
        <div className="CardAuthor_img">
          {author.profilePic ? (
            <img src={apiImage + author.profilePic} alt="" />
          ) : (
            <img src={avatar} alt="" />
          )}
        </div>
        <div className="CardAuthor_info">
          <h4>{author?.username}</h4>
          <div className="number">
            <span>Followers {follower?.length}</span>
            <span>|</span>
            <span>Posts {post?.length}</span>
          </div>
          <Link to={`/profile/${author?.userId}`} className="btn btn-white">
            Read More
          </Link>
        </div>
        <div className="follow">
          {follower?.includes(currentUser?.id) ? (
            <button onClick={handleFollow}>
              <i className="fa-solid fa-heart"></i>
            </button>
          ) : (
            <button onClick={handleFollow}>
              <i className="fa-regular fa-heart"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./singlePost.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apiImage, makeRequest } from "../../axios";
import { useAuth } from "../../context/authContext";
import DOMPurify from "dompurify";
import avatar from "../../assets/avatar.jpg";
import moment from "moment";
import Comments from "../comments/Comments";
import Modal from "../modal/Modal";

import { useQuery, useMutation, useQueryClient } from "react-query";

export default function SinglePost({ post }) {
  const [like, setLike] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();
  const path = params.postId;
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const mutationLike = useMutation(
    (like) => {
      if (like) return makeRequest.delete("likes?postId=" + post.id);
      return makeRequest.post("likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleClickLike = () => {
    currentUser
      ? mutationLike.mutate(data?.includes(currentUser?.id))
      : navigate("/login");
  };

  const mutationDelete = useMutation(
    () => {
      return makeRequest.delete("posts/" + post.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClickDelete = () => {
    setOpenModal(true);
  };

  const handleClickYesDelete = () => {
    mutationDelete.mutate();
    navigate(`/profile/${currentUser.id}`);
    setOpenModal(false);
  };

  const handleClickUpdate = () => {};

  return (
    <>
      <>
        {post && (
          <div className="singlePost">
            <div className="singlePost_wrapper">
              <h6 className="singlePost_category">{post.categoryName}</h6>
              <div className="singlePost_title">
                <h1>{post.title}</h1>
              </div>
              <div className="singlePost_author">
                <div className="singlePost_author-user">
                  {post.profilePic ? (
                    <img src={apiImage + post.profilePic} alt="" />
                  ) : (
                    <img src={avatar} alt="" />
                  )}
                  <div className="info">
                    <Link to={`/profile/${post.userId}`} className="username">
                      {post.username}
                    </Link>
                    <div className="date">
                      <i className="fa-regular fa-clock"></i>
                      <span>
                        {new moment(post?.createdAt)
                          .subtract(10, "days")
                          .calendar()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="singlePost_author-control">
                  <div className="btn-like" onClick={handleClickLike}>
                    <span>{data?.length}</span>
                    {data?.includes(currentUser?.id) ? (
                      <button>
                        <i className="fa-solid fa-bookmark"></i>
                      </button>
                    ) : (
                      <button>
                        <i className="fa-regular fa-bookmark"></i>
                      </button>
                    )}
                  </div>
                  {post.userId === currentUser?.id && (
                    <>
                      <button className="btn-more">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                        <div className="edit">
                          <ul>
                            <li onClick={handleClickDelete}>
                              <i className="fa-solid fa-trash"></i>
                              <span>Delete</span>
                            </li>
                            <li onClick={() => navigate(`/update/${post.id}`)}>
                              <i className="fa-solid fa-pen-to-square"></i>
                              <span>Update</span>
                            </li>
                          </ul>
                        </div>
                      </button>
                      <Modal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        onYes={handleClickYesDelete}
                      >
                        Are you sure to delete the post?
                      </Modal>
                    </>
                  )}
                </div>
              </div>
              {post.img && (
                <div className="singlePost_img">
                  <img src={apiImage + post.img} alt="" />
                </div>
              )}
              <div className="singlePost_content">
                <p dangerouslySetInnerHTML={{ __html: post.desc }}></p>
              </div>
            </div>
            <Comments post={post} />
          </div>
        )}
      </>
    </>
  );
}

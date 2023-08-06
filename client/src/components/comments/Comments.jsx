import React, { useEffect, useState } from "react";
import "./comments.scss";
import { useAuth } from "../../context/authContext";
import { apiImage, makeRequest } from "../../axios";
import avatar from "../../assets/avatar.jpg";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../modal/Modal";

export default function Comments({ post }) {
  const [openModal, setOpenModal] = useState(false);
  const [text, setText] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: comments,
  } = useQuery(["comments", post.id], () =>
    makeRequest.get("comments?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const mutation = useMutation(
    (inputs) => {
      return makeRequest.post("comments", inputs);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const mutationDelete = useMutation(
    (id) => {
      return makeRequest.delete("comments/" + id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = () => {
    if (currentUser) {
      mutation.mutate({ desc: text, postId: post.id });
      setText("");
    } else {
      navigate("/login");
    }
  };

  const handleClickYesDelete = (id) => {
    mutationDelete.mutate(id);
    setOpenModal(false);
  };

  return (
    <div className="comments">
      <h4>
        Comments:
        <span>{comments?.length}</span>
      </h4>
      <div className="comments_wrapper">
        <div className="comments_write">
          <img
            src={
              currentUser?.profilePic
                ? apiImage + currentUser.profilePic
                : avatar
            }
            alt=""
          />
          <div className="write_input">
            <input
              type="text"
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleClick}>Public</button>
          </div>
        </div>
        {comments &&
          comments.map((item, id) => (
            <div key={id} className="comments_comment">
              <Link to={`/profile/${item.userId}`}>
                <img
                  src={item?.profilePic ? apiImage + item.profilePic : avatar}
                  alt=""
                />
              </Link>

              <div className="info">
                <div className="info_wrapper">
                  <div className="info_wrapper_content">
                    <Link to={`/profile/${item.userId}`}>
                      <span className="">{item?.username}</span>
                    </Link>
                    <p>{item?.desc}</p>
                  </div>
                  {currentUser?.id === item.userId && (
                    <>
                      <div className="more">
                        <button className="btn-more">
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                        <div className="more-body">
                          <button
                            className="delete"
                            onClick={() => setOpenModal(true)}
                          >
                            <i className="fa-solid fa-trash"></i>{" "}
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                      <Modal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        onYes={() => handleClickYesDelete(item.id)}
                      >
                        Are you sure delete this comment ?
                      </Modal>
                    </>
                  )}
                </div>
                <span className="date">
                  <i className="fa-regular fa-clock"></i>
                  {item?.createdAt &&
                    new moment(item?.createdAt).startOf("hour").fromNow()}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

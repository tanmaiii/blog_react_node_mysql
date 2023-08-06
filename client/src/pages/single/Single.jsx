import React, { useEffect, useState } from "react";
import "./single.scss";
import SinglePost from "../../components/singlePost/SinglePost";
import { useNavigate, useParams } from "react-router-dom";
import { makeRequest } from "../../axios";
import axios from "axios";
import ListCol from "../../components/listCol/ListCol";
import Loader from "../../components/Loader/Loader";

import { useQuery, useMutation, useQueryClient } from "react-query";


export default function Single() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    window.scrollTo({top: 0, left: 0});
    setLoading(true);
    const getPosts = async () => {
      try {
        const res = await makeRequest.get("posts/" + postId);
        setPost(res.data[0]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [postId]);

  return (
    <>
      {loading && <Loader />}
      <div className="single container">
        {post && (
          <>
            <SinglePost post={post} />
            <ListCol post={post} />
          </>
        )}
      </div>
    </>
  );
}

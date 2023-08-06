import React, { useEffect, useState } from "react";
import "./search.scss";
import { useParams } from "react-router-dom";
import { apiImage, makeRequest } from "../../axios";
import Post from '../../components/post/Post'

export default function Search() {
  const params = useParams();
  const [posts, setPosts] = useState([]);

  const value = params.key;

  useEffect(() => {
    const res = async () => {
      try {
        const data = await makeRequest.get("posts/find?key=" + value);
        setPosts(data.data);
      } catch (error) {}
    };
    res();
  }, [value]);

  return (
    posts && (
      <div className="search">
        <h4 className="search-title">Search: {value}</h4>
        <div className="search-body">
          { posts && posts?.map((post,id) => (
            <Post post={post} key={id}/>
          ))}
        </div>
      </div>
    )
  );
}

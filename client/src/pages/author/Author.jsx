import React, { useEffect, useState } from "react";
import "./author.scss";
import CardAuthor from "../../components/cardAuthor/CardAuthor";
import { makeRequest } from "../../axios";
import { useAuth } from "../../context/authContext";
import Loader from "../../components/Loader/Loader";

export default function Author() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    window.scrollTo({top: 0, left: 0});
    setLoading(true);
    try {
      const res = async () => {
        try {
          const res = await makeRequest.get("users");
          setAuthors(res.data);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      res();
    } catch (error) {}
  }, []);

  return (
    <div className="author">
      {loading && <Loader />}
      {authors &&
        authors.map((author, id) => {
          return currentUser?.id === author.userId ? (
            ""
          ) : (
            <CardAuthor key={id} author={author} />
          );
        })}
    </div>
  );
}

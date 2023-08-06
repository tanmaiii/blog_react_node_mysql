import React, { useEffect, useState } from "react";
import "./category.scss";
import Posts from "../../components/posts/Posts";
import { makeRequest } from "../../axios";
import Loader from "../../components/Loader/Loader";

export default function Category() {
  const [Categories, setCategories] = useState({});
  const [cat, setCat] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    setLoading(true);
    const Res = async () => {
      try {
        const res = await makeRequest.get("categories");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    Res();
    setLoading(false);
  }, []);

  return (
    <div className="caterory">
      <div className="caterory_filter">
        {loading && <Loader />}
        {Categories.length > 0 &&
          Categories.map((category) => (
            <button
              key={category.id}
              className={`btn btn-tran ${
                cat === category.name ? "active" : ""
              }`}
              onClick={() => setCat(category.name)}
            >
              <span>{category.name}</span>
            </button>
          ))}
      </div>
      <div className="category_container">
        <Posts cat={cat} />
      </div>
    </div>
  );
}

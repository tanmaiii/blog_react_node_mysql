import React, { useState, useEffect } from "react";
import "./update.scss";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiImage, makeRequest } from "../../axios";
import img from "../../assets/nofile.jpg";
import ReactQuill from "react-quill";

export default function Update() {
  const { currentUser } = useAuth();
  const [err, setErr] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  const params = useParams();
  const path = params.postId;

  const [inputs, setInputs] = useState({
    category: null,
    desc: "",
    title: "",
    img: "",
    userId: currentUser?.id,
    id: null,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const Res = async () => {
      try {
        const res = await makeRequest.get("posts/" + path);
        inputs.desc = res.data[0].desc;
        inputs.title = res.data[0].title;
        inputs.img = res.data[0].img;
        inputs.category = res.data[0].category;
        inputs.id = res.data[0].id;
        setPost(res.data[0]);
      } catch (err) {
        setErr("Upload img failed !");
      }
    };
    Res();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    const Res = async () => {
      try {
        const res = await makeRequest.get("categories");
        setCategories(res.data);
      } catch (err) {
        setErr("categories failed !");
      }
    };
    Res();
  }, []);

  const handleSubmit = async () => {
    setErr("");
    if (file) {
      const data = new FormData();
      const name = Date.now() + file.name;
      data.append("name", name);
      data.append("file", file);
      inputs.img = name;
      try {
        await makeRequest.post("upload", data);
      } catch (error) {
        setErr("Upload img failed !");
      }
    }

    try {
      inputs.category = category;
      inputs.desc = value;
      if (inputs.category === undefined) {
        setErr("Category not empty!");
      } else if (inputs.title === "") {
        setErr("title not empty!");
      } else if (inputs.desc === "") {
        setErr("desc not empty!");
      } else {
        const res = async () => {
          await makeRequest.put("posts/" + path, inputs);
          navigate("/post/" + path);
        };
        res();
      }
    } catch (error) {
      setErr("Update img failed! Not empty");
    }
  };

  return (
    post && (
      <div className="update">
        <h4 className="update_title">Update</h4>
        {err && (
          <div className="err">
            <p>Error: {err}</p>
          </div>
        )}
        <div className="update_form">
          <div className="updateFormGroup file">
            {post?.img ? (
              <img src={apiImage + post?.img} alt="" />
            ) : file ? (
              <img src={URL.createObjectURL(file)} alt="" />
            ) : (
              <img src={img} alt="" />
            )}
            <label htmlFor="fileInput">
              <i className="fa-solid fa-upload"></i>
              Upload
            </label>
            <input
              className=""
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="updateFormGroup category">
            <h4>Category:</h4>
            <div className="category_body">
              {categories?.map((item, id) => (
                <div key={id} className="category_item">
                  <input
                    id={item.name}
                    type="radio"
                    name={category}
                    onClick={(e) => setCategory(item.id)}
                  />
                  <label htmlFor={item.name}>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="updateFormGroup title">
            <h4>Title:</h4>
            <input
              type="text"
              name="title"
              defaultValue={post?.title}
              onChange={handleChange}
            />
          </div>
          <div className="updateFormGroup desc">
            <h4>Desc:</h4>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
          </div>
          <button onClick={handleSubmit} className="update_submit">
            Update
          </button>
        </div>
      </div>
    )
  );
}

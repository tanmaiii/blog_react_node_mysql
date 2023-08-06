import React, { useState, useEffect } from "react";
import "./write.scss";
import { makeRequest } from "../../axios";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import img from "../../assets/nofile.jpg";

export default function Write() {
  const { currentUser } = useAuth();
  const [err, setErr] = useState("");
  const [cate, setCate] = useState({});
  const [file, setFile] = useState(null);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    category: null,
    desc: "",
    title: "",
    img: "",
    userId: currentUser?.id,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    const Res = async () => {
      try {
        const res = await makeRequest.get("categories");
        setCate(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    Res();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hanleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const name = Date.now() + file.name;
      data.append("name", name);
      data.append("file", file);
      inputs.img = name;
      try {
        await makeRequest.post("upload", data);
      } catch (error) {}
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
        await makeRequest.post("posts", inputs);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="write">
      <h4 className="write_title">Write</h4>
      {err && (
        <div className="err">
          <p>Error: {err}</p>
        </div>
      )}
      <form action="" className="write_form">
        <div className="writeFormGroup file">
          {file ? (
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
        <div className="writeFormGroup">
          <h4>Category :</h4>
          {cate.length > 0 &&
            cate.map((item) => (
              <div className="category" key={item.id}>
                <input
                  type="radio"
                  name="category"
                  id={item.name}
                  value={item.id}
                  onChange={() => setCategory(item.id)}
                />
                <label htmlFor={item.name}>{item?.name}</label>
              </div>
            ))}
        </div>
        <div className="writeFormGroup title">
          <input
            type="text"
            placeholder="Title..."
            className="write_input"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="writeFormGroup quill">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
        <button className="write_submit" onClick={hanleSubmit}>
          Save
        </button>
      </form>
    </div>
  );
}

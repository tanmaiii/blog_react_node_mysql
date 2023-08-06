import React, { useEffect, useState } from "react";
import "./setting.scss";
import { useAuth } from "../../context/authContext";
import { makeRequest, apiImage } from "../../axios";
import axios from "axios";
import avatar from "../../assets/avatar.jpg";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

export default function Setting() {
  const { currentUser, setCurrentUser } = useAuth();
  const [user, setUser] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: currentUser?.username,
    id: currentUser?.id,
    profilePic: currentUser?.profilePic,
    name: currentUser?.name,
    email: currentUser?.email,
    place: currentUser?.place,
    birthDay: currentUser?.birthDay,
    website: currentUser?.website,
    other: currentUser?.other,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    window.scrollTo({top: 0, left: 0});
    setLoading(true);
    const res = async () => {
      try {
        const data = await makeRequest.get("/users/find/" + currentUser?.id);
        setUser(data.data);
        setLoading(false);
      } catch (e) {}
    };
    res();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const name = Date.now() + file.name;
      data.append("name", name);
      data.append("file", file);
      inputs.profilePic = name;
      try {
        await makeRequest.post("upload", data);
      } catch (error) {}
    }
    const update = async () => {
      try {
        await makeRequest.put("/users", inputs);
        setCurrentUser(inputs);
        navigate("/profile/" + currentUser.id);
      } catch (e) {
        console.log(e);
      }
    };
    update();
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="settings">
          {user && (
            <div className="settings_wrapper">
              <h4 className="settings_title">My Profile</h4>
              <form className="settings_form">
                <div className="settings_info">
                  <div className="settings_info-left">
                    <div className="settings_info-left-img">
                      {file ? (
                        <img src={URL.createObjectURL(file)} alt="" />
                      ) : user.profilePic ? (
                        <img src={apiImage + user.profilePic} alt="" />
                      ) : (
                        <img src={avatar} alt="" />
                      )}
                      <label
                        htmlFor="fileImg"
                        className="settings_info-left-edit-img"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </label>
                      <input
                        id="fileImg"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </div>
                    <div className="settings_info-left-content">
                      <h4>{user?.username}</h4>
                      <h6>{user?.name}</h6>
                      <span>{user?.place}</span>
                    </div>
                  </div>
                </div>
                <div className="settings_box">
                  <div className="settings_box-col">
                    <div className="settings_box-row-item">
                      <label htmlFor="">Name</label>
                      <input
                        placeholder="Enter here..."
                        type="text"
                        name="name"
                        id=""
                        defaultValue={user?.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="settings_box-row-item">
                      <label htmlFor="">Email</label>
                      <input
                        onChange={handleChange}
                        placeholder="Enter here..."
                        type="text"
                        name="email"
                        id=""
                        defaultValue={user?.email}
                      />
                    </div>
                    <div className="settings_box-row-item">
                      <label htmlFor="">Address</label>
                      <input
                        onChange={handleChange}
                        placeholder="Enter here..."
                        type="text"
                        name="place"
                        id=""
                        defaultValue={user?.place}
                      />
                    </div>
                  </div>
                  <div className="settings_box-col">
                    <div className="settings_box-row-item">
                      <label htmlFor="">Birth Day</label>
                      <input
                        onChange={handleChange}
                        placeholder="Enter here..."
                        type="date"
                        name="birthDay"
                        defaultValue={user?.birthDay}
                        id=""
                      />
                    </div>
                    <div className="settings_box-row-item">
                      <label htmlFor="">website</label>
                      <input
                        placeholder="Enter here..."
                        type="text"
                        name="website"
                        id=""
                        defaultValue={user?.website}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="settings_box">
                  <div className="settings_box-full-width">
                    <label htmlFor="">Other</label>
                    <textarea
                      name="other"
                      id=""
                      placeholder="Enter here..."
                      defaultValue={user?.other}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="settings_form-btn">
                  <button onClick={handleUpdate}>Update</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}

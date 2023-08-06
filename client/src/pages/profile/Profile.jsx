import React, { useState, useEffect } from "react";
import "./profile.scss";
import Posts from "../../components/posts/Posts";
import { Link, useParams } from "react-router-dom";
import { makeRequest, apiImage } from "../../axios";
import avatar from "../../assets/avatar.jpg";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Loader from "../../components/Loader/Loader";

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const { currentUser } = useAuth();
  const [follow, setFollow] = useState(false);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const [loading, setLoading] = useState([]);
  const [active, setActive] = useState('posts')
  const navigate = useNavigate(false);

  useEffect(() => {
    setLoading(true);
    try {
      const res = async () => {
        try {
          const resFollowing = await makeRequest.get(
            "relationships/following?userId=" + id
          );
          const resFollower = await makeRequest.get(
            "relationships/follower?userId=" + id
          );
          setFollowing(resFollowing.data);
          setFollower(resFollower.data);
        } catch (err) {
          console.log(err);
        }
      };
      res();
    } catch (error) {}
    setLoading(false);
  }, [follow, id]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    const getPosts = async () => {
      try {
        const res = await makeRequest.get("users/find/" + id);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [id]);

  const handleFollow = () => {
    setFollow(!follow);
    if (currentUser) {
      if (follower.includes(currentUser?.id)) {
        const res = async () => {
          try {
            await makeRequest.delete("relationships?userId=" + id);
          } catch (err) {
            console.log(err);
          }
        };
        return res();
      } else {
        const res = async () => {
          try {
            await makeRequest.post("relationships?userId=" + id);
          } catch (err) {
            console.log(err);
          }
        };
        return res();
      }
    } else {
      navigate("/login");
    }
  };

  const handleControl = (e) => {
    setActive(e.target.name);
  }

  return (
    <>
      {loading && <Loader />}
      {user && (
        <div className="profile">
          <div className="profile_wrapper">
            <div className="profile_wrapper-left">
              <h4 className="profile_title">Profile</h4>
              <div className="profile_info">
                <div className="profile_info-left">
                  <div className="profile_info-left-img">
                    {user.profilePic ? (
                      <img src={apiImage + user.profilePic} alt="" />
                    ) : (
                      <img src={avatar} alt="" />
                    )}
                  </div>
                  <div className="profile_info-left-content">
                    <h4>{user?.username}</h4>
                    <span>{user?.name || "full name"}</span>
                    <div className="follow">
                      <p>
                        <span>{following.length}</span> following
                      </p>
                      <p>
                        <span>{follower.length}</span> followers
                      </p>
                    </div>
                  </div>
                </div>
                <div className="profile_info-right">
                  {currentUser?.id === user.id ? (
                    <Link to={"/settings"}>
                      <button className="edit">
                        <span>Edit</span>
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </Link>
                  ) : follower?.includes(currentUser?.id) ? (
                    <button className="unfollow" onClick={handleFollow}>
                      <span> Unfollow </span>
                    </button>
                  ) : (
                    <button className="follow" onClick={handleFollow}>
                      <span> Follow </span>
                    </button>
                  )}
                </div>
              </div>
              <div className="profile_info-body">
                <div className="info_item">
                  <h4>Date of birth</h4>
                  <span>{user?.birthDay?.slice(0, 10)}</span>
                </div>
                <div className="info_item">
                  <h4>Place</h4>
                  <span>{user?.place}</span>
                </div>
                <div className="info_item">
                  <h4>Website</h4>
                  <a href={`http://${user?.website}`} target="_blank">
                    {user?.website}
                  </a>
                </div>
                <div className="info_item">
                  <h4>Other</h4>
                  <span>{user?.other}</span>
                </div>
              </div>
              <div className="profile_wrapper-left-body">
                <div className="control">
                  <button className={`btn ${active === 'posts' ? `active` : ''}`} name="posts" onClick={e => handleControl(e)}>Posts</button>
                  <button className={`btn ${active === 'likes' ? `active` : ''}`} name="likes" onClick={e => handleControl(e)}>Likes</button>
                </div>
                {active === 'posts' ? <Posts userId={user.id} /> : <Posts userLikeId={user.id} />}
              </div>
            </div>
            <div className="profile_wrapper-right">
              <h4 className="title">Detail</h4>
              <div className="info">
                <div className="info_item">
                  <h4>Date of birth</h4>
                  <span>{user?.birthDay?.slice(0, 10)}</span>
                </div>
                <div className="info_item">
                  <h4>Place</h4>
                  <span>{user?.place}</span>
                </div>
                <div className="info_item">
                  <h4>Website</h4>
                  <a href={`http://${user?.website}`} target="_blank">
                    {user?.website}
                  </a>
                </div>
                <div className="info_item">
                  <h4>Other</h4>
                  <span>{user?.other}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

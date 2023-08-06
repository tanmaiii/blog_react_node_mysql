import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getFollower = (req, res) => {
  const q = `SELECT DISTINCT * FROM relationships WHERE followerUserId = ?`;
  db.query(q, [req.query.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followingUserId));
  });
};

export const getFollowing = (req, res) => {
  const q = `SELECT DISTINCT * FROM relationships WHERE followingUserId = ?`;
  db.query(q, [req.query.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followerUserId));
  });
};

export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not invalid");

    const q =
      "INSERT INTO relationships ( `followingUserId`, `followerUserId`) VALUES (?)";

    const values = [userInfo.id, req.query.userId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following has been created!");
    });
  });
};

export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not invalid");

    const q =
      "DELETE FROM relationships WHERE `followingUserId` = ? AND `followerUserId` = ?";

    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("delete Following has been created!");
    });
  });
};

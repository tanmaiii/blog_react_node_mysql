import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getUsers = (req, res) => {
  const q = `SELECT u.id as userId , profilePic, username
            FROM users AS u `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data;
    return res.status(200).json(data);
  });
};

export const getUser = (req, res) => {
  const q = `SELECT * FROM users 
             WHERE id = ?`;

  db.query(q, req.params.userId, (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.status(200).json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not invalid");

    const q =
      "UPDATE users SET `name`=?,`email`=?,`place`=?,`profilePic`=?,`birthDay`=? ,`website`=?,`other`=? WHERE id=?";

    const values = [
      req.body.name,
      req.body.email,
      req.body.place,
      req.body.profilePic,
      req.body.birthDay,
      req.body.website,
      req.body.other,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your!");
    });
  });
};

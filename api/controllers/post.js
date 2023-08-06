import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const category = req.query.category;
  const q =
    category !== undefined
      ? `SELECT distinct p.id, p.createdAt, p.title, p.img , u.id AS userId, username, profilePic, c.name as categoryName
        FROM posts AS p 
        JOIN users AS u ON (u.id = p.userId)
        JOIN categories AS c ON (c.id = p.categoryId)
        WHERE c.name = ?
        ORDER BY p.createdAt DESC`
      : `SELECT distinct p.id, p.createdAt, p.title, p.img , u.id AS userId, username, profilePic, c.name as categoryName
               FROM posts AS p 
               JOIN users AS u ON (u.id = p.userId)
               JOIN categories AS c ON (c.id = p.categoryId)
               ORDER BY p.createdAt DESC`;
  const value = category !== undefined ? [category] : null;
  db.query(q, value, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getPostsByUser = (req, res) => {
  const q = `SELECT p.id, p.createdAt, p.title, p.img , u.id AS userId, username, profilePic, c.name as categoryName
        FROM posts AS p 
        JOIN users AS u ON (u.id = p.userId)
        JOIN categories AS c ON (c.id = p.categoryId)
        WHERE p.userId = ?
        ORDER BY p.createdAt DESC`;

  db.query(q, req.query.userId, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getPostsLikes = (req, res) => {
  const q = `SELECT distinct l.userId as userLikeId,l.createdAt as createdAtLike, p.id, p.createdAt, p.title, p.img , u.id AS userId, username, profilePic, c.name as categoryName
          FROM posts AS p 
          JOIN users AS u ON (u.id = p.userId)
          JOIN categories AS c ON (c.id = p.categoryId)
          JOIN likes as l ON (l.postId = p.id)
          WHERE l.userId = ?
          ORDER BY createdAtLike DESC`;

  db.query(q, req.query.userId, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const findPosts = (req, res) => {
  const key = req.query.key;
  const q = "SELECT * FROM posts WHERE posts.title LIKE '%" + key + "%'";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q = `SELECT distinct p.*, u.id AS userId, u.username, u.name, u.profilePic , c.name as categoryName
    FROM posts AS p 
    JOIN users AS u ON (u.id = p.userId)
    JOIN categories AS c ON (c.id = p.categoryId)
    WHERE p.id = ?`;

  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not invalid");
    const q =
      "INSERT INTO posts (`categoryId`, `desc`, `title`, `img`, `createdAt`, `userId`) VALUES (?)";
    const values = [
      req.body.category,
      req.body.desc,
      req.body.title,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created!");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not invalid");

    const q =
      "UPDATE posts SET `title`=?, `desc`=?,`categoryId`=?,`img`=? WHERE id=?";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.category,
      req.body.img,
      req.body.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your!");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not invalid");

    const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted");
      return res.status(403).json("You can delete your post");
    });
  });
};

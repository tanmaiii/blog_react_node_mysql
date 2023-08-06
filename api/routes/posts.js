import  express  from "express";
import {getPosts,getPostsByUser,getPostsLikes,getPost,addPost,updatePost,deletePost,findPosts} from '../controllers/post.js'

const router = express.Router();

router.get("/",getPosts)
router.get("/user",getPostsByUser)
router.get("/likes",getPostsLikes)
router.get("/find",findPosts)
router.get("/:id",getPost)
router.post("/",addPost)
router.put("/:id",updatePost)
router.delete("/:id",deletePost)

export default router
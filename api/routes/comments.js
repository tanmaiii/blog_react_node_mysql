import  express  from "express";
import {getComments,addComments,deleteComments} from '../controllers/comment.js'

const router = express.Router();

router.get("/",getComments)
router.post("/",addComments)
router.delete("/:id",deleteComments)

export default router
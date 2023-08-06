import  express  from "express";
import {getCategories,addCategory} from '../controllers/category.js'

const router = express.Router();

router.get("/",getCategories)
router.post("/",addCategory)

export default router
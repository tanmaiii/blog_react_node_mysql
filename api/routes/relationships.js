import  express  from "express";
import {getFollower,getFollowing,addRelationship,deleteRelationship} from '../controllers/relationship.js'

const router = express.Router();

router.get("/follower", getFollower)
router.get("/following", getFollowing)
router.post("/", addRelationship)
router.delete("/", deleteRelationship)

export default router
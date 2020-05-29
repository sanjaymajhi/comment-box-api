var express = require("express");
var router = express.Router();

const commentController = require("../controllers/commentController");

/* GET home page. */
router.get("/comments", commentController.comments);
router.post("/postComment", commentController.postComment);

router.put("/:id/upvote", commentController.upVote);
router.put("/:id/downvote", commentController.downVote);

module.exports = router;

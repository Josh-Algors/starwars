const express = require('express');
const router = express.Router();

const CommentController = require("../controllers/CommentController");


router.get('/:film_id/comments', CommentController.getAllComments);
router.post('/:film_id/comments', CommentController.postComment);

module.exports = router;   
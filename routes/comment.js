const express = require('express');
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const cacheMiddleware = require("../middleware/cacheMiddleware");


router.get('/:film_id/comments', cacheMiddleware, CommentController.getAllComments);
router.post('/:film_id/comments', CommentController.postComment);

module.exports = router;   
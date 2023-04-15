const express = require('express');
const router = express.Router();

const CommentController = require("../controllers/CommentController");

//middleware


// var jwtMiddleWare = passport.authenticate('jwt', {session: false});
// const signatureSigner = require('../middleware/checkSignature').personalSignature;
// var dataGuard;
// const imageGuard = require('../middleware/upload').uploadImg;

// if(process.env.APP != 'local')
// {
//     dataGuard = require('../middleware/decodeJWT').decodeMiddleware;
// }
// else
// {
//     dataGuard = (req, res, next) => {
//         next()
//     }
// }

// Routes

//update profile info
router.get('/:film_id/comments', CommentController.getAllComments);
router.post('/:film_id/comments', CommentController.postComment);


// router.post('/admin/logout',[jwtMiddleWare, signatureSigner], AccountCtrl.adminLogout);
module.exports = router;   
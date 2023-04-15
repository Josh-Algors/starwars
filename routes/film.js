const express = require('express');
const router = express.Router();

const FilmController = require("../controllers/FilmController");

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

router.get('/films', FilmController.getAllFilms);
router.get('/films/:id', FilmController.getFilmsById);

module.exports = router;   
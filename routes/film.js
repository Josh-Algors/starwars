const express = require('express');
const router = express.Router();

const FilmController = require("../controllers/FilmController");

router.get('/films', FilmController.getAllFilms);
router.get('/films/:id', FilmController.getFilmsById);

module.exports = router;   
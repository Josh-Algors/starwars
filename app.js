const express = require('express');
const app = express();
const filmRouter = require("./routes/film");
const commentRouter = require("./routes/comment");
//Load Environment Variables
require("dotenv").config();

app.use(express.json());
app.use('/api/v1', filmRouter);
app.use('/api/v1/films', commentRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port ' + process.env.PORT);
})
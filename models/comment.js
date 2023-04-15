var Sequelize = require('sequelize');

var Comment = (sequelize, type) => {
  return sequelize.define('comments', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    film_id: Sequelize.INTEGER,
    comment: Sequelize.STRING(500)
  })
}

module.exports = Comment;

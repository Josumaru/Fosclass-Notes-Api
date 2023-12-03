const db = require('../database/sequelize')

const Note = db.define('notes', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  createdAt: db.Sequelize.DATE,
  updatedAt: db.Sequelize.DATE
})

module.exports = Note

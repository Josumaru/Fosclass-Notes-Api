const Note = require('../models/note')
const responses = require('../constants/responses')
const apiResponse = require('../helpers/response-helper')

const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll()
    const data = JSON.parse(JSON.stringify(notes))
    return apiResponse(res, responses.success.code, 'Notes retrieved successfully', data)
  } catch (error) {
    return apiResponse(res, responses.error.code, 'Error retrieving notes')
  }
}

const getNote = async (req, res) => {
  try {
    const id = req.params.id
    const notes = await Note.findAll({
      where: {
        id
      }
    })
    const data = JSON.parse(JSON.stringify(notes))
    return data.length ? apiResponse(res, responses.success.code, 'Notes retrieved successfully', data[0]) : apiResponse(res, responses.notFound.code, 'ID not found')
  } catch (error) {
    return apiResponse(res, responses.error.code, 'Error retrieving notes')
  }
}

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body
    const notes = {
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const createdNote = await Note.create(notes)
    const data = {
      id: createdNote.id,
      title: createdNote.title,
      content: createdNote.content,
      createdAt: createdNote.createdAt,
      updatedAt: createdNote.updatedAt

    }
    return apiResponse(res, responses.created.code, 'Note created successfully', data)
  } catch (error) {
    return apiResponse(res, responses.error.code, 'Error creating note')
  }
}

const updateNote = async (req, res) => {
  try {
    const id = req.params.id
    const { title, content } = req.body

    const notes = await Note.findByPk(id)
    if (notes) {
      notes.title = title
      notes.content = content
      notes.updatedAt = new Date()
      notes.save()
      return apiResponse(res, responses.success.code, 'Note updated successfully', notes)
    } else {
      return apiResponse(res, responses.notFound.code, 'Notes not found')
    }
  } catch (error) {
    return apiResponse(res, responses.error.code, 'Error updating note')
  }
}

const deleteNote = async (req, res) => {
  try {
    const id = req.params.id
    const notes = await Note.findByPk(id)
    const data = {
      id: notes.id
    }
    if (notes) {
      await notes.destroy()
      return apiResponse(res, responses.success.code, 'Note deleted successfully', data)
    } else {
      return apiResponse(res, responses.success.code, 'Error deleting note', `ID ${id} not found`)
    }
  } catch (error) {
    return apiResponse(res, responses.error.code, 'Error deleting note')
  }
}

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
}

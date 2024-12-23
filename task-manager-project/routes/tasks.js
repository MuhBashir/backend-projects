const express = require('express')

const tasksRouter = express.Router()
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks')

tasksRouter.get('/', getAllTasks)
tasksRouter.post('/', createTask)
tasksRouter.get('/:id', getTask)
tasksRouter.patch('/:id', updateTask)
tasksRouter.delete('/:id', deleteTask)

module.exports = tasksRouter

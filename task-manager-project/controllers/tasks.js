const Task = require('../models/tasks')

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({})
  return res.status(200).json({ tasks })
}

const createTask = async (req, res) => {
  const task = await Task.create(req.body)

  res.status(201).json({ task })
}

const getTask = async (req, res) => {
  const { id } = req.params
  const task = await Task.findById(id)

  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${id}` })
  }
  res.status(200).json({ task })
}

const updateTask = async (req, res) => {
  const { id } = req.params
  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${id}` })
  }
  res.status(200).json({ task })
}

const deleteTask = async (req, res) => {
  const { id } = req.params
  const task = await Task.findById(id)

  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${id}` })
  }
  await Task.findByIdAndDelete(id)
  res.status(204).json({ msg: 'Task deleted' })
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}

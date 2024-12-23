const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.CREATED).json({ jobs, count: jobs.length })
}

const createJob = async (req, res) => {
  // Add createdBy to req.body to associate the job with the user who created it
  const { userId } = req.user
  const job = await Job.create({ ...req.body, createdBy: userId })
  res.status(StatusCodes.CREATED).json({ job })
}

const getJob = async (req, res) => {
  const { id: jobId } = req.params
  const { userId } = req.user
  const job = await Job.findById({ createdBy: userId, _id: jobId })

  if (!job) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No job with id ${jobId}` })
  }
  res.status(StatusCodes.OK).json({ job })
}

const updateJob = async (req, res) => {
  const { id: jobId } = req.params
  const { userId } = req.user
  const job = await Job.findOneAndUpdate(
    { createdBy: userId, _id: jobId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!job) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No job with id ${jobId}` })
  }
  res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params
  const { userId } = req.user
  const job = await Job.findOneAndDelete({ createdBy: userId, _id: jobId })

  if (!job) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No job with id ${jobId}` })
  }
  res.status(StatusCodes.OK).json({ msg: 'Job deleted successfully' })
}
module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
}

const router = require('express').Router()
const { login, dashboard } = require('../controllers/main')
const { tokenExractor } = require('../utils/middlewares')

router.post('/login', login)
router.get('/dashboard', tokenExractor, dashboard)

module.exports = router

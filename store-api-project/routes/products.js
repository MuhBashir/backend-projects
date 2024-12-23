const router = require('express').Router()
const {
  getAllProducts,
  getAllProductsStatic,
} = require('../controllers/products')

// routes
router.get('/', getAllProducts)
router.get('/static', getAllProductsStatic)

module.exports = router

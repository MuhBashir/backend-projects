const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select('name price')
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { featured, company, search, sort, fields, numericFilters } = req.query
  const queryObject = {}

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }

  if (company) {
    queryObject.company = company
  }

  if (search) {
    queryObject.name = { $regex: search, $options: 'i' }
  }
  let results = Product.find(queryObject)

  // sort the list
  if (sort) {
    const sortList = sort.split(',').join(' ')
    results = results.sort(sortList)
  } else {
    results = results.sort('createdAt')
  }

  // return base on fields selected
  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    results = results.select(fieldsList)
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    )
    const options = ['price', 'rating']
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        results = results.where(field).operator(operator, Number(value))
      }
    })
  }

  const page = Number(req.query.page) || 1
  const limitValue = Number(req.query.limit) || 10
  const skip = (page - 1) * limitValue

  results = results.skip(skip).limit(limitValue)
  const products = await results
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}

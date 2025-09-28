const express = require('express')
const router = express.Router()
router.use(express.json())

// Import data.json
const records = require('./records')

// Clean up try...catch blocks with asyncHandler
const asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

// Send a GET request to /quotes to READ a list of quotes
router.get(
  '/quotes',
  asyncHandler(async (req, res) => {
    const quotes = await records.getQuotes()
    res.json(quotes)
  })
)

// Send a GET request to /quotes/:id to READ (view) a quote
router.get(
  '/quotes/:id',
  asyncHandler(async (req, res, next) => {
    const quote = await records.getQuote(req.params.id)
    if (quote) {
      res.json(quote)
    } else {
      res.status(404).json({ message: 'Sorry! Quote not found.' })
    }
  })
)

// Send a POST request to /quotes CREATE a new quote -> leaving commented code to demonstrate asyncHandler
// router.post('/quotes', async (req, res) => {
//   try {
//     if (req.body.author && req.body.quote) {
//       const newQuote = await records.createQuote({
//         quote: req.body.quote,
//         author: req.body.author
//       })
//       res.status(201).json(newQuote)
//     } else {
//       res.status(400).json({ message: 'Quote and author required.' })
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

router.post(
  '/quotes',
  asyncHandler(async (req, res) => {
    if (req.body.author && req.body.quote) {
      const newQuote = await records.createQuote({
        quote: req.body.quote,
        author: req.body.author
      })
      res.status(201).json(newQuote)
    } else {
      res.status(400).json({ message: 'Quote and author required.' })
    }
  })
)

// Send a PUT request to /quotes/:id UPDATE (edit) a quote
router.put(
  '/quotes/:id',
  asyncHandler(async (req, res) => {
    const quote = await records.getQuote(req.params.id)
    if (quote) {
      quote.quote = req.body.quote
      quote.author = req.body.author

      await records.updateQuote(quote)
      res.status(204).end()
    } else {
      res.status(404).json({ message: 'Quote Not Found' })
    }
  })
)

// Send a DELETE request /quotes/:id to DELETE a quote
router.delete(
  '/quotes/:id',
  asyncHandler(async (req, res) => {
    const quote = await records.getQuote(req.params.id)
    if (quote) {
      await records.deleteQuote(quote)
      res.status(204).end()
    } else {
      res.status(404).json({ message: 'Quote Not Found' })
    }
  })
)

// Send a GET request to /quotes/quote/random to READ a random quote
router.get(
  '/quotes/quote/random',
  asyncHandler(async (req, res) => {
    const quote = await records.getRandomQuote()
    if (quote) {
      res.json(quote)
    } else {
      res.status(404).json({ message: 'Sorry! Random Quote not found.' })
    }
  })
)

module.exports = router

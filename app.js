const express = require('express')
const app = express()

// Import data.json
const records = require('./records')

// Express Middleware
app.use(express.json())

// Send a GET request to /quotes to READ a list of quotes
app.get('/quotes', async (req, res) => {
  try {
    const quotes = await records.getQuotes()
    res.json(quotes)
  } catch (error) {
    res.json({ message: error.message })
  }
})

// Send a GET request to /quotes/:id to READ (view) a quote
app.get('/quotes/:id', async (req, res) => {
  try {
    const reqId = parseInt(req.params.id)
    const quote = await records.getQuote(reqId)
    res.json(quote)
  } catch (error) {
    res.json({ message: error.message })
  }
})

// Send a POST request to /quotes CREATE a new quote
app.post('/quotes', async (req, res) => {
  try {
    const newQuote = await records.createQuote({
      quote: req.body.quote,
      author: req.body.author
    })
    res.json(newQuote)
  } catch (error) {
    res.json({ message: error.message })
  }
})

// Send a PUT request to /quotes/:id UPDATE (edit) a quote
// Send a DELETE request /quotes/:id to DELETE a quote
// Send a GET request to /quotes/quote/random to READ a random quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'))

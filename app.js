const express = require('express')
const app = express()
const routes = require('./routes')

// Express Middleware
app.use(express.json())
app.use('/api', routes)

// Middleware to deal with route that doesn't exist
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message
    }
  })
})

app.listen(3000, () => console.log('Quote API listening on port 3000!'))

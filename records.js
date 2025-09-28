const fs = require('fs')

const generateRandomId = () => {
  return Math.floor(Math.random() * 10000)
}

const save = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/**
 * Gets all quotes
 * @param None
 */
const getQuotes = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        const json = JSON.parse(data)
        resolve(json)
      }
    })
  })
}

/**
 * Gets a specific quote by ID
 * @param {number} id - Accepts the ID of the specified quote.
 */
const getQuote = async (id) => {
  const quotes = await getQuotes()
  return quotes.records.find((record) => record.id == id)
}
/**
 * Gets a random quote
 * @param None
 */
const getRandomQuote = async () => {
  const quotes = await getQuotes()
  const randNum = Math.floor(Math.random() * quotes.records.length)
  return quotes.records[randNum]
}

/**
 * Creates a new quote record
 * @param {Object} newRecord - Object containing info for new quote: the quote text, author and year
 */
const createQuote = async (newRecord) => {
  const quotes = await getQuotes()

  newRecord.id = generateRandomId()
  quotes.records.push(newRecord)
  await save(quotes)
  return newRecord
}

/**
 * Updates a single record
 * @param {Object} newQuote - An object containing the changes to quote: quote, author, year (all optional)
 */
const updateQuote = async (newQuote) => {
  const quotes = await getQuotes()
  let quote = quotes.records.find((item) => item.id == newQuote.id)

  quote.quote = newQuote.quote
  quote.author = newQuote.author
  quote.year = newQuote.year

  await save(quotes)
}

/**
 * Deletes a single record
 * @param {Object} record - Accepts record to be deleted.
 */
const deleteQuote = async (record) => {
  const quotes = await getQuotes()
  quotes.records = quotes.records.filter((item) => item.id != record.id)
  await save(quotes)
}

module.exports = {
  getQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
  getRandomQuote
}

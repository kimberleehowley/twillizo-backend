const fs = require('fs');

function generateRandomId(){
  return Math.floor(Math.random() * 10000);
}

function save(data){
  return new Promise((resolve, reject) => {
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Returns all quotes 
function getQuotes() {
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const json = JSON.parse(data);
        resolve(json);
      }
    });
  });
}

// Returns a quote with a specific id
const getQuoteById = async (req, res) => {
  try {
    const { id } = req.params; 
    const lyric = await getQuotes(id); 
    if (lyric) {
      res.status(200).json(lyric)
    } else {
      res.status(404).json({Error: "Not found"});
    }
  }
  catch (error) {
    res.status(500).json({Error: "Error"});
  }
}

// Original code from tutorial that returns by ID 
async function getQuote(id){
   const quotes = await getQuotes();
   return quotes.lyrics.find(record => record.id == id);
}

/**
 * Gets a random quote 
 * @param None
 */
async function getRandomQuote(){
  const quotes = await getQuotes();
  const randNum = Math.floor(Math.random() * quotes.records.length);
  return quotes.records[randNum];
}

/**
 * Creates a new quote record 
 * @param {Object} newRecord - Object containing info for new quote: the quote text, author and year 
 */
async function createQuote(newRecord) {
  const quotes = await getQuotes(); 
  
  newRecord.id = generateRandomId(); 
  quotes.records.push(newRecord);
  await save(quotes); 
  return newRecord; 
}

/**
 * Updates a single record 
 * @param {Object} newQuote - An object containing the changes to quote: quote, author, year (all optional)
 */
async function updateQuote(newQuote){
  const quotes = await getQuotes();
  let quote = quotes.records.find(item => item.id == newQuote.id);
  
  quote.quote = newQuote.quote;
  quote.author = newQuote.author;
  quote.year = newQuote.year;
 
  await save(quotes);
}

/**
 * Deletes a single record
 * @param {Object} record - Accepts record to be deleted. 
 */
async function deleteQuote(record){
  const quotes = await getQuotes();
  quotes.records = quotes.records.filter(item => item.id != record.id);
  await save(quotes);
}

module.exports = {
  getQuotes,
  getQuote,
  getQuoteById,
  createQuote, 
  updateQuote, 
  deleteQuote,
  getRandomQuote
}
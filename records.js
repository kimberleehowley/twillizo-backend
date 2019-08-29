// We use this to read our data.json file, which we're using because it's not much data
const fs = require('fs');

function generateRandomId(){
  return Math.floor(Math.random() * 10000);
}

// Saves and reads our data
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

// Get unique lyric by id 
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
  const randNum = Math.floor(Math.random() * quotes.lyrics.length);
  return quotes.lyrics[randNum];
}

/**
 * Creates a new quote record 
 * @param {Object} newRecord - Object containing info for new quote: the quote text, author and year 
 */
async function createQuote(newRecord) {
  const quotes = await getQuotes(); 
  
  newRecord.id = generateRandomId(); 
  quotes.lyrics.push(newRecord);
  await save(quotes); 
  return newRecord; 
}

/**
 * Updates a single record 
 * @param {Object} newQuote - An object containing the changes to quote: quote, author, year (all optional)
 */
async function updateQuote(newLyric){
  const quotes = await getQuotes();
  let quote = quotes.lyrics.find(item => item.id == newLyric.id);
  
  quote.lyric = newLyric.lyric;
  quote.song = newLyric.song;
  
 
  await save(quotes);
}

/**
 * Deletes a single record
 * @param {Object} record - Accepts record to be deleted. 
 */
async function deleteQuote(lyric){
  const quotes = await getQuotes();
  quotes.lyrics = quotes.lyrics.filter(item => item.id != lyric.id);
  await save(quotes);
}

module.exports = {
  getQuotes,
  getQuote,
  createQuote, 
  updateQuote, 
  deleteQuote,
  getRandomQuote
}
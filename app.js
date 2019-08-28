const express = require('express');
const app = express();

// Importing lyrics model for working with data 
const records = require('./records'); 

// Send a GET request to /lyrics to read all lyrics
app.get('/lyrics', (req, res) => {
    const lyrics = records.getQuotes(); 
    res.json(lyrics); 
})

// Send a GET request to /lyrics/:id to read (view) a lyric
app.get('/lyrics/:id', (req, res) => {
    
})

// Send a POST request to /lyrics to add a new lyric
app.post('/lyrics', (req, res) => {
    
})

// Send a PUT request to /lyrics/:id to update a lyric
app.get('/lyrics/:id', (req, res) => {
    
})

// Send a DELETE request to /lyrics/:id to delete a lyric
app.get('/lyrics/:id', (req, res) => {
    
})

// Send a GET request to lyrics/lyric/random to read a random lyric 

app.listen(3000, () => console.log('Lizzo API listening on port 3000!'));

const express = require('express');
const app = express();

// Route to respond with a greeting 
app.get('/greetings', (req, res) => {
    res.json({greeting: "Hello World!"})
})

// Send a GET request to /lyrics to read all lyrics
// Send a GET request to /lyrics/:id to read (view) a lyric
// Send a POST request to /lyrics to add a new lyric
// Send a PUT request to /lyrics/:id to update a lyric
// Send a DELETE request to /lyrics/:id to delete a lyric
// Send a GET request to lyrics/lyric/random to read a random lyric 

app.listen(3000, () => console.log('Lizzo API listening on port 3000!'));

// Storing data very locally 

const data = 
{
    lyrics: [
      {
        "id": 0,
        "lyric": "Bling bling then I solve 'em that's the goddess in me 💎",
        "song": "Truth Hurts",
      },
      {
        "id": 1,
        "lyric": "I know I'm a queen but I don't need no crown 🚫👑",
        "song": "Soulmate",
      },
      {
        "id": 2,
        "quote": "The juice ain't worth the squeeze if the juice don't look like this 🍑",
        "song": "Juice"
      }
    ]
  }
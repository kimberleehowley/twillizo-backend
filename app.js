const express = require("express");
const app = express();

// Importing lyrics model for working with data
const records = require("./records");

app.use(express.json());

// Send a GET request to /lyrics to read all lyrics
app.get("/lyrics", async (req, res) => {
  try {
    const lyrics = await records.getQuotes();
    res.status(200).json(lyrics);
  } catch (err) {
    res.status(500).json({message: "Oops! Something is wrong."});
  }
    
});

// Send a GET request to /lyrics/:id to read (view) a lyric
app.get("/lyrics/:id", async (req, res) => {
  try {
    const lyric = await records.getQuote(req.params.id);
    res.json(lyric);
  } catch (err) {
    res.status(500).json({ message: "Oops! Something is wrong." });
  }
});

// Send a POST request to /lyrics to add a new lyric
app.post("/lyrics", async (req, res) => {
  try {
    const newLyric = await records.createQuote({
      lyric: req.body.lyric,
      song: req.body.song
    });
    res.status(200).json(newLyric);
  } catch (err) {
    res.status(500).json({ message: "Oops! Something is wrong." });
  }
});

// Send a PUT request to /lyrics/:id to update a lyric
app.get("/lyrics/:id", (req, res) => {});

// Send a DELETE request to /lyrics/:id to delete a lyric
app.get("/lyrics/:id", (req, res) => {});

// Send a GET request to lyrics/lyric/random to read a random lyric

// Telling the app where to listen
app.listen(3000, () => console.log("Lizzo API listening on port 3000!"));

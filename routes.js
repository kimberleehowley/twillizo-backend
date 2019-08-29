const express = require('express'); 
const router = express.Router(); 
const records = require('./records'); 

// Helper function that wraps another function in try/catch and passes errors to middleware
function asyncHandler(cb) {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (err) {
        next(err);
      }
    };
}

// Send a GET request to /lyrics to read all lyrics
router.get("/lyrics", asyncHandler(async (req, res) => {
    const lyrics = await records.getQuotes();
    res.json(lyrics);
}));

// Send a GET request to /lyrics/:id to read (view) a lyric
router.get("/lyrics/:id", asyncHandler(async (req, res) => {
    const lyric = await records.getQuote(req.params.id);
    if (lyric) {
      res.json(lyric);
    } else {
      res.status(404).json({ message: "Lyric not found!" });
    }
}));

// Send a GET request to lyrics/lyric/random to read a random lyric
router.get("/lyrics/lyric/random", asyncHandler(async (req, res) => {
    const lyric = await records.getRandomQuote();
    res.json(lyric);
}));

// Send a POST request to /lyrics to add a new lyric
router.post(
  "/quotes",
  asyncHandler(async (req, res) => {
    if (req.body.lyric && req.body.song) {
      const newLyric = await records.createQuote({
        lyric: req.body.lyric,
        song: req.body.song
      });
      res.status(201).json(newLyric);
    } else {
      res.status(400).json({ message: "Lyric and song required!" });
    }
  })
);

// Send a PUT request to /lyrics/:id to update a lyric
router.put(
  "/lyrics/:id",
  asyncHandler(async (req, res) => {
    const lyric = await records.getQuote(req.params.id);
    if (lyric) {
      lyric.lyric = req.body.lyric;
      lyric.song = req.body.song;

      await records.updateQuote(lyric);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Lyric not found!" });
    }
  })
);

// Send a DELETE request to /lyrics/:id to delete a lyric
router.delete(
  "/lyrics/:id",
  asyncHandler(async (req, res, next) => {
    const lyric = await records.getQuote(req.params.id);
    await records.deleteQuote(lyric);
    res.status(204).end();
  })
);

module.exports = router; 



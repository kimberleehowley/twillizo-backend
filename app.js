const express = require("express");
const app = express();

// Importing lyrics model for working with data
const records = require("./records");

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

app.use(express.json());

// Send a GET request to /lyrics to read all lyrics
app.get("/lyrics", asyncHandler(async (req, res) => {
    const lyrics = await records.getQuotes();
    res.json(lyrics);
}));

// Send a GET request to /lyrics/:id to read (view) a lyric
app.get("/lyrics/:id", asyncHandler(async (req, res) => {
    const lyric = await records.getQuote(req.params.id);
    if (lyric) {
      res.json(lyric);
    } else {
      res.status(404).json({ message: "Lyric not found!" });
    }
}));

// Send a POST request to /lyrics to add a new lyric
app.post(
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
app.put(
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
app.delete(
  "/lyrics/:id",
  asyncHandler(async (req, res, next) => {
    const lyric = await records.getQuote(req.params.id);
    await records.deleteQuote(lyric);
    res.status(204).end();
  })
);

// Send a GET request to lyrics/lyric/random to read a random lyric

// Custom middleware
app.use((req, res, next) => {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

// Custom error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

// Telling the app where to listen
app.listen(3000, () => console.log("Lizzo API listening on port 3000!"));

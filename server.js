require('dotenv').config(); 

const express = require("express");

const server = express(); 

server.use(express.json()); 

const routes = require('./routes'); 

server.use('/api', routes); 

// Custom middleware
server.use((req, res, next) => {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

// Custom error handler
server.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

const port = process.env.PORT || 5000;

// Telling the app where to listen
app.listen(port, () => console.log(`Lizzo API listening on http://localhost:${port}!`));

module.exports = server; 
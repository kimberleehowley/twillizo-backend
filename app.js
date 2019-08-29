require('dotenv').config(); 

const express = require("express");
const app = express();

const routes = require('./routes'); 

app.use(express.json());
app.use('/api', routes); 

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

const port = process.env.PORT || 5000;

// Telling the app where to listen
app.listen(port, () => console.log(`Lizzo API listening on http://localhost:${port}!`));


const express = require('express');
const bodyParser = require('body-parser');
var articlesController = require('./Controllers/articlers');
const { db } = require('./db.js');
const app = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/articles',articlesController);

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
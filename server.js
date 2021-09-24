const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const { createCanvas} = require('canvas');
const users = require('./users');

const uri = `mongodb+srv://task3:task3@cluster0.9p4t4.mongodb.net/task3?retryWrites=true&w=majority`;
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
  .then( () => {
    console.log('Connected to database')
  })
  .catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

app.get('/',(req, res) => {
  const size = +req.query.size ?? 9;
  let height = size;
  let width = size / 2;
  let start = 0;
  if(Boolean(req.query.border)) {
    height--;
    width--;
    start ++;
  }
  const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
  const el = createCanvas(size, size)
  const canvas = el.getContext('2d')
  canvas.fillStyle = color;
  canvas.fillRect(1, 1, 0, 0);
  for(let y = start; y < height; y++) {
    for(let x = start; x < width; x++) {
      if(Math.random() > 0.4) {
        canvas.fillRect(x, y, 1, 1);
        canvas.fillRect(size - x - 1, y, 1, 1);
      };
    };
  };
  res.status(200).json({
    color: color,
    img: el.toDataURL("image/png").replace("image/png", "image/octet-stream")
  })
});

app.get('/users',(req, res) => {
  res.status(200).json(users);
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${4000}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const userSchema = require("./shemas/user");
const orderSchema = require("./shemas/order");

const uri = `mongodb+srv://task3:task3@cluster0.9p4t4.mongodb.net/task3?retryWrites=true&w=majority`;
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
  .then( () => {
    console.log('Connected to database')
  })
  .catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

const users = require('./users');
const buyList = require('./buyList');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/login', async (req, res) => {
  const { email, password } = req.query;
  const currentSchema = mongoose.model('users', userSchema);
  const userBD = await currentSchema.findOne({email: email, password: password});
  res.status(200).json({
    user: userBD,
  });
});

app.put('/registry', jsonParser, async (req, res) => {
  const currentSchema = mongoose.model('users', userSchema);
  const userBD = await currentSchema.findOne({
    email: req.body.user.email,
  });
  if (userBD) {
    res.status(409).json({
      user: null,
      isError: {
        status: true,
        message: 'User with this email already exists!',
      },
    });
  } else {
    const newUser = new currentSchema(req.body.user);
    const savedUser = await newUser.save();
    res.status(201).json({
      user: savedUser,
      isError: {
        status: false,
        message: '',
      },
    });
  }
});

app.post('/user', jsonParser, async (req, res) => {
  const currentSchema = mongoose.model('users', userSchema);
  const userBD = await currentSchema.findOneAndUpdate({
    id: req.body.id,
  },{
    $set: req.body
  });
  res.status(200).json({
    user: userBD,
  });
});

app.get('/users', async (req, res) => {
  const currentSchema = mongoose.model('users', userSchema);
  const userBD = await currentSchema.find({});
  const newUsers = userBD.map((user) => ({
    ...user['_doc'],
    buyCount: 0,
  }));
  res.status(200).json({
    users: newUsers,
  });
});

app.get('/buylist', async (req, res) => {
  console.log('тут')
  const currentSchema = mongoose.model('orders', orderSchema);
  const ordersBD = await currentSchema.find({
    userId: +req.query.id,
  });
  console.log(ordersBD)
  res.status(200).json({
    buyList: ordersBD,
  });
});

app.put('/order', jsonParser, async (req, res) => {
  const currentSchema = mongoose.model('orders', orderSchema);
  const { id } = req.body;
  const {
    city,
    address,
    lat,
    lng,
  } = req.body.order;
  const newOrder = new currentSchema({
    ...req.body.order,
    id: new Date().getTime(),
    created: new Date().getTime(),
    userId: id,
    deleveredTo: {
      city: city,
      address: address,
      location: {
        lat: +lat ?? 0,
        lng: +lng ?? 0,
      },
    },
  });
  const savedOrder = await newOrder.save();
  res.status(201).json({
    order: savedOrder,
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${4000}`);
});

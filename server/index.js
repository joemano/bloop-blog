const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();
dotenv.config();

// general setup
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello Happy World');
});

// address and port for the database
// const CONNECTION_URL = 'mongodb://localhost:27017/memories';
const PORT = process.env.PORT || 5000;

// use mongoose to connect to database
// { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
// and useFindAndModify are to stop deprecation warnings in console
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
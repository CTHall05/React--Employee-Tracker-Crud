const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

const express = require('express');
const helmet = require('helmet');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const pg = require('./db/pg');

const app = express();

app.use(helmet());
app.use(express.json());
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.listen(5000, () => {
  console.log('Listening on port 5000');
});

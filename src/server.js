const express = require('express');
const fs = require('fs');
const helmet = require('helmet');
const logger = require('morgan');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const middlewares = require('./middlewares/index');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(logger('dev'));

app.use(middlewares.handleEmptyPayload);
app.use(middlewares.contentTypeSet);
app.use(middlewares.contentTypeJson);
app.use(middlewares.handleErrors);
app.use(middlewares.setResponseHeaders);

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.get('/meter.yaml', (req, res, next) => {
  fs.readFile(`${__dirname}/docs/meter.yaml`, (err, file) => {
    if (err) {
      res.status(500);
      res.end();
      return next();
    }
    res.write(file);
    res.end();
    return next();
  });
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});

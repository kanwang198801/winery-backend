const express = require('express');
const app = express();
const cors = require('cors');
const wineryRoutes = require('./routes/winery');

app.use(cors());
app.use(express.json());
app.use('/', wineryRoutes);

app.use((req, res, next) => {
   const error = new Error('Not found');
   error.status = 404;
   next(error);
});

app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
      error: {
         message: error.message,
      },
   });
});

module.exports = app;

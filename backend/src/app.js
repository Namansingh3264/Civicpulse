const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const { CORS_ORIGIN, NODE_ENV } = require('./config/env');

const app = express();

app.use(helmet());
app.use(cors({ origin: CORS_ORIGIN || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
if (NODE_ENV !== 'test') app.use(morgan('dev'));
app.use('/api', rateLimiter, routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
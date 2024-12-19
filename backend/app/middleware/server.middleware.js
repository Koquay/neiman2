const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const express = require('express');

process.env.DIST = path.join(__dirname, "../../../frontend/dist/frontend/browser");
process.env.INDEX = path.join(process.env.DIST, "/index.html");

module.exports = (app) => {
    console.log('** MIDDLEWARE CONFIGURED ***')
    app.use(express.json());
    app.use(morgan('common'));
    app.use(cors({
      credentials: true,
      origin: ['http://localhost:4200']
    }));
    app.use(helmet({
        contentSecurityPolicy: false,
      }));
    app.use(express.static(process.env.DIST))
}

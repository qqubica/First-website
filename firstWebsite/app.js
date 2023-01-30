var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var artistRouter = require('./routes/artistRouter');
var concertRouter = require('./routes/concertRouter');
var artistOnConcertRouter = require('./routes/artistOnConcertRouter');

const artistApiRouter = require('./routes/api/ArtistApiRoute');
const concertApiRouter = require('./routes/api/ConcertApiRoute');
const artistOnConcertApiRouter = require('./routes/api/ArtistOnConcertApiRoute');

const cors = require('cors')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: 'http://localhost:8000',
}))

const morgan = require('morgan');
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res), 'ms',
        tokens.res(req, res, 'content-length'), '-',
        JSON.stringify(req.body)
    ].join(' ')
}));

const fmt = require('./utils/dateFormatting');
app.use((req, res, next) => {
    res.locals.fmt = fmt;
    next();
});

app.use('/', indexRouter);
app.use('/artist', artistRouter);
app.use('/concert', concertRouter);
app.use('/artistOnConcert', artistOnConcertRouter);

app.use('/api/artist', artistApiRouter);
app.use('/api/concert', concertApiRouter);
app.use('/api/artistOnConcert', artistOnConcertApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
      console.log(err);
    });

module.exports = app;
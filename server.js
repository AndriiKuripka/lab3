const path = require('path');
const express = require('express');

var monk = require('monk');
var db = monk('localhost:27017/lab3');

var indexRouter = require('./routes/index');
var planetsRouter = require('./routes/planets');
var spaceStationRouter = require('./routes/space_stations');
var goodsRouter = require('./routes/Goods');
var goodstoStationRouter = require('./routes/GoodstoStations');
var goodstoPlanetRouter = require('./routes/GoodstoPlanets');


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(__dirname))

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/service/planets', planetsRouter);
app.use('/service/space_stations', spaceStationRouter);
app.use('/service/goods', goodsRouter);

app.use('/service/goodstoStations', goodstoStationRouter);
app.use('/service/goodstoPlanets', goodstoPlanetRouter);


const host = "localhost";
const port = "8080";
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`)
});

module.exports = app;

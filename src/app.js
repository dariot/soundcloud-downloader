var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var downloader = require('./downloader');

app.use(bodyParser.urlencoded());
app.use('/', express.static(__dirname + '/public'));
app.use('/about', express.static(__dirname + '/public/about'));

app.post('/', function(req, res) {
	var urlSong = req.body.url;
	downloader.startDownload(urlSong);
});

app.get('/', function(req, res) {
    console.log(req);
});

var server = app.listen(3000, function() {
	console.log(downloader);
    console.log('server started');
});
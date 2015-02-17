var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/public'));
app.use('/about', express.static(__dirname + '/public/about'));

app.post('/', function(req, res) {
    console.log(req.body.url);
});

app.get('/', function(req, res) {
    console.log(req);
});

var server = app.listen(3000, function() {
    console.log('server started');
});
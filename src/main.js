var http = require('http');
var fs = require('fs');

var config = require('./config');

var client_id = config.client_id;
var savePath = config.save_path;
var url_song = 'martingarrix/martin-garrix-animals-original';

function getMp3(location, title) {
    location = location.replace('https', 'http');
    http.get(location, function(res) {
        var file = fs.createWriteStream(savePath + title + '.mp3');
        http.get(location, function(res) {
            res.pipe(file);
        });
    });
}

function stream(url, title) {
    url = url.replace('https', 'http');
    url += '?client_id=' + client_id;
    http.get(url, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            body = JSON.parse(body);
            getMp3(body.location, title);
        });
    });
}

function getById(location) {
    location = location.replace('https', 'http');
    http.get(location, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            body = JSON.parse(body);
            stream(body.stream_url, body.title);
        });
    });
}

function onResolved(response) {
    var body = '';
    response.on('data', function(chunk) {
        body += chunk;
    });
    response.on('end', function() {
        body = JSON.parse(body);
        getById(body.location);
    });
}

var toResolve = 'http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/' + url_song + '&client_id=' + client_id;
http.get(toResolve, onResolved);
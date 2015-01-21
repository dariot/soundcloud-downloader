var http = require('http');
var fs = require('fs');

var client_id = '';
var url_song = 'martingarrix/martin-garrix-animals-original';

function getMp3(location) {
    location = location.replace('https', 'http');
    http.get(location, function(res) {
        var file = fs.createWriteStream('prova.mp3');
        http.get(location, function(res) {
            res.pipe(file);
        });
    });
}

function stream(url) {
    url = url.replace('https', 'http');
    url += '?client_id=' + client_id;
    http.get(url, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            body = JSON.parse(body);
            getMp3(body.location);
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
            stream(body.stream_url);
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
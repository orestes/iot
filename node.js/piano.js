var notes  = require('./piano/notes.json');
var config = require('./config.json');
var five   = require("johnny-five");

var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
    fs.readFile(__dirname + '/piano.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function (socket) {
    socket.on('play', function (data) {
        playNote(data['note'], data['duration']);
    });
});

board = new five.Board({port: config['port']});
var piezo;
var piezo_pin = 8;

function playNote(note, duration) {
    var frequency = notes[note];
    if (typeof frequency == 'undefined') {
        return console.log('Not not found: ' + frequency);
    }
    piezo.frequency(frequency, duration, function (data) {
        console.log('Note played');
    });
}

board.on("ready", function () {
    piezo = new five.Piezo(piezo_pin);

    // Injects the piezo into the repl
    board.repl.inject({
        piezo: piezo
    });

    console.log('Board ready');
});

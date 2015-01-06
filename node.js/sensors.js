var config = require('./config.json');
var five   = require("johnny-five");
var plotly = require('plotly')(config['plotly']['username'], config['plotly']['key']);

var data   = [{x: [], y: [], mode: "line", stream: {token: config['plotly']['token'], maxpoints: 20}}];
var layout = {"fileopt": "overwrite", "filename": "Potentiometer #1"};

board = new five.Board({port: config['port']});

// circuit-specific config
var resistor = 1024;

// lets do this
board.on("ready", function ()
{
    var sensor = new five.Sensor({
        pin: "A0",
        freq: 500 // send reading every 500ms
    });

    plotly.plot(data, layout, function (err, res)
    {
        if (err) console.log(err);
        console.log("Live plot at " + res.url);

        var stream = plotly.stream(config['plotly']['token'], function (err, res) {
            if (err) console.log(err);
            console.log(res);
        });

        sensor.scale([0, resistor]).on("data", function ()
        {
            var date = getDateString();
            data = {
                "x": date,
                "y": this.value
            };

            var encoded = JSON.stringify(data) + '\n';
            // console.log(date + ' ' + this.value);

            stream.write(encoded);
        });
    });
});

// Transform date to GMT in the 2015-01-06 02:17:27.000 format
function getDateString() {
    // Timezone vs GMT difference in hours * 3600000
    var time = new Date();
    var str  = new Date(time + config['timezone_diff']).toISOString();
        str  = str.replace(/T/, ' ');
        str  = str.replace(/Z/, '');

    return str;
}

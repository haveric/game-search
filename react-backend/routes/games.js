var express = require('express');
var request = require('request');
var router = express.Router();

/* GET games listing. */
router.get('/', function (req, res, next) {
    searchGame(req.query.q, function (json) {
        res.json(json);
    });
});

function searchGame(query, callback) {
    const apiKey = "030c8a8e3ccd157748b38de741012d2cbd2330c4";
    const options = {
        url: `https://www.giantbomb.com/api/games/?api_key=${apiKey}&format=json&sort=name:asc&filter=name:${query}`,
        headers: {
            'User-Agent': 'Test Game Search',
        }
    }

    request(options, function (error, response, body) {
        callback(JSON.parse(body));
    });
}


module.exports = router;

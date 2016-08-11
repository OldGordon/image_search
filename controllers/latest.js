var express = require('express'),
    latest_search = require( '../models/model_api.js'),
    router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  latest_search.search_find(function(results){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results, null, 3));
  });
  //res.render('index', { title: 'FCC Image Search Latest Searches' });
});

module.exports = router;

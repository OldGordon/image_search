var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'FCC Image Search Abstraction Layer Project' });
});

module.exports = router;

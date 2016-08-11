var express = require('express'),
    path = require('path'),
    assert = require('assert'),
    imageapi = require( '../models/model_api.js'),
    bodyParser  = require("body-parser"),
    Bing = require('node-bing-api')({ accKey: "tW+I5YFomhn2jMvDTroyAoHB/K3oQnj92nhFLj7HiVc" });
    router = express.Router();

/* GET search page. */
//recojo la query mas parametros y los envio al modelo, este me devuelve el resultado
router.get('/', function(req, res) {

   res.render('index',{title: 'IMAGE SEARCH'});
});

router.get('/:imagen', function(req, res) {
  var search = req.params.imagen,
      offset = req.query.offset;
      imageapi.img_insert(search);
  Bing.images( search, {top: offset,
                        format: JSON },
             function(error, response, body){
                var fields_in = [],
                    results = body.d.results;
                results.forEach(function(item){
                      var prov = {};
                      prov.url = item.MediaUrl + "></a>" ;
                      prov.snippet = item.Title;
                      prov.thumbnail = item.Thumbnail.MediaUrl;
                      prov.context = item.SourceUrl;
                      fields_in.push(prov);

                });
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(fields_in, null, 3));
              //  console.log(fields_in);
                //res.render('apisearch', { title: 'FCC Image Search Abstraction Layer Project',
  //                                        fields: fields_in});
  });
  //res.render('index', { title: 'FCC Image Search Controller' });
});

module.exports = router;

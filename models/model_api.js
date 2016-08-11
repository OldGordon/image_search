var mongo = require ('../db/db.js'),
    assert = require('assert');


module.exports.img_insert = function(topic){
                mongo.connect(function (err) {
                  mongo.db.collection('latest_images').insert({
                              term: topic,
                              when: new Date()},
                              function (err, result){
                                    assert.equal(null, err);
                                  }
                              );
                      });
                };
module.exports.search_find = function(callback){
       mongo.connect(function (err) {
            mongo.db.collection('latest_images')
                    .find({},{_id: 0})
                    .limit(10)
                    .toArray(function(err, results){
                                  if (err) assert.equal(null, err);
                                  callback(results);
                            });
      });

};

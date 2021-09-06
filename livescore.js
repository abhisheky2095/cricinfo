 var http = require('http');
 var fs = require('fs');
 var xml2js = require('xml2js');
 var parser = new xml2js.Parser();

 parser.on('error', function(err) { console.log('Parser error', err); });

 var check_live_score_for_country="India"
 var data = '';
 http.get('http://static.cricinfo.com/rss/livescores.xml', function(res) {
     if (res.statusCode >= 200 && res.statusCode < 400) {
       res.on('data', function(data_) { data += data_.toString(); });
       res.on('end', function() {
        // console.log('data', data);
         parser.parseString(data, function(err, result) {
          //console.log(JSON.stringify(result.rss.channel[0].item))
          Object.entries(result.rss.channel[0].item).forEach(element => {
           // if (element[1].title.contains("India")){
                 if(element[1].title[0].includes(check_live_score_for_country)){
                     console.log(element[1].title[0])
                 }
           // }
           });
           //console.log('FINISHED', err, result);
         });
       });
     }
   });
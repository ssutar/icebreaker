exports.search = function (req, res) {
    
    var rest = require('restler'),
        ArrayHelper = require('../util/ArrayHelper'),
        async = require('async'),
        config = require('config/config'),
        age = req.query.age,
        gender = req.query.gender,
        relation = req.query.relation,
        event = req.query.event;
    
    var url = config.api.url + "/icebreaker?age="+age+"&gender="+gender+"&relation="+relation+"&event="+event,
        trendsUrl = config.api.url + "/trends";
        
    console.log(url);
    
    async.parallel({
        search: function (callback) {
            rest.get(url).on('complete', function(result) {
                if (result instanceof Error) {
                        console.log('Error:', result.message);
                        //this.retry(5000); // try again after 5 sec
                    }
                    else {
                        //console.dir(result);
                        callback(null, result);
                    }
                });
        }//,
        
//        trending: function (callback) {
////            setTimeout(function(){
////                callback(null, 2);
////            }, 100);
//            
//            rest.get(trendsUrl).on('complete', function(result) {
//                if (result instanceof Error) {
//                        console.log('Error:', result.message);
//                        //this.retry(5000); // try again after 5 sec
//                    } 
//                    else {
//                        //console.dir(result);
//                        callback(null, result);
//                    }
//                });
//        }
    },
    function (err, results) {
        //console.dir(results);
        var searchResults = ArrayHelper.chunks(results.search.data, 4);
            //trendingResults = ArrayHelper.chunks(results.trending.data, 4);
        
        //console.dir(searchResults);
        //console.dir(trendingResults);
        
        res.render('search/results', {
            title: 'Break the ice!',
            searchResults: searchResults,
            //trendingResults: trendingResults,
            partials: {
                nav: 'layout/nav-small',
                //trending: 'search/trending'
                search: 'search/search'
            }
        });
        
    });
    
    rest.get('http://google.com?q=hack').on('complete', function(result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            //this.retry(5000); // try again after 5 sec
        } 
        else {
            res.render('search/search', { 
                    title: 'Break the ice!',
                    partials: {
                        nav: 'layout/nav-small'
                    }
                });
        }
    });
};
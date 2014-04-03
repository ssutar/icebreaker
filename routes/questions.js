exports.show = function (req, res) {
    
    var rest = require('restler'),
        ArrayHelper = require('../util/ArrayHelper'),
        async = require('async'),
        config = require('config/config'),
        success = req.query.success;
    
    var questionsUrl = config.api.url + "/question";
    //console.log(questionsUrl);
    
    async.parallel({
        questions: function (callback) {
            rest.get(questionsUrl).on('complete', function(result) {
                if (result instanceof Error) {
                        console.log('Error:', result.message);
                        //this.retry(5000); // try again after 5 sec
                    } 
                    else {
                        //console.dir(result);
                        callback(null, result);
                    }
                });
            }
        },
        function (err, results) {
            //console.dir(results.questions);
            var questions = ArrayHelper.chunks(results.questions.data, 2);//results.trending;

            //console.dir(questions);
            //console.dir(trendingResults);

            res.render('questions/questions', { 
                title: 'Break the ice!',
                success: success,
                questions: questions,
                partials: {
                    nav: 'layout/nav-small',
                    show: 'questions/show'
                }
            });

        });
    
//    rest.get('http://google.com?q=hack').on('complete', function(result) {
//        if (result instanceof Error) {
//            console.log('Error:', result.message);
//            //this.retry(5000); // try again after 5 sec
//        } 
//        else {
//            console.dir(ArrayHelper.chunks([1, 2, 3, 4], 2));
//            res.render('search/search', { 
//                    title: 'Break the ice!',
//                    partials: {
//                        nav: 'layout/nav-small'
//                    }
//                });
//        }
//    });
};


exports.add = function (req, res) {
    var rest = require('restler'),
        ArrayHelper = require('../util/ArrayHelper'),
        async = require('async'),
        config = require('config/config'),
        questionId = req.query.questionId,
        answer = req.query.answer,
        tags = req.query.tags;
    
    var questionsUrl = config.api.url + "/answer?questionId=" + questionId + "&answer=" + encodeURIComponent(answer) + "&tags=" + encodeURIComponent(tags);
    
    rest.get(questionsUrl).on('complete', function(result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            //this.retry(5000); // try again after 5 sec
        } 
        else {
            //console.dir(result);
            //callback(null, result);
            res.redirect('/questions?success=1');
        }
    });
        
};
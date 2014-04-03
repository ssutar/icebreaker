
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('home/home', { 
        title: 'Break the ice!',
        partials: {
            nav: 'layout/nav'
        }
    });
};
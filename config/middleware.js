module.exports = {
    // route middleware to ensure user is logged in
    isLoggedin: function(req, res, next) {
                    if (req.isAuthenticated())
                        return next();

                    res.redirect('/');
                }
};
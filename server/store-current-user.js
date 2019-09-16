module.exports = function (options) {
  return function storeCurrentUser(req, res, next) {
    if (!req.accessToken) {
      return next();
    }

    app.models.User.findById(req.accessToken.userId, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new Error('No user with this access token was found.'));
      }
      if (user) {
        app.currentUser = JSON.stringify(user);
        next()
      }
    });
  };
};
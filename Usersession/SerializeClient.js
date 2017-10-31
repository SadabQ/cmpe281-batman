//use refresh tokens in node.js for permanent user sessions
function serializeClient(req, res, next) {  
  if (req.query.permanent === 'true') {
    db.client.updateOrCreate({
      user: req.user
    }, function(err, client) {
      if (err) {
        return next(err);
      }
      // we store information needed in req.user
      req.user.clientId = client.id;
      next();
    });
  } else {
    next();
  }
}

function serializeClient(req, res, next) {  
  if (req.query.permanent === 'true') {
    db.client.updateOrCreate({
      user: req.user
    }, function(err, client) {
      if (err) {
        return next(err);
      }

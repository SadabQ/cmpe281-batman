'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cartroutes = require('./lib/routes/cartroutes');

var _cartroutes2 = _interopRequireDefault(_cartroutes);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); /*
                                    Node / Express: EADDRINUSE, Address already in use - Kill server
                                    
                                    First, you would want to know which process is using port 3000
                                    
                                    sudo lsof -i :3000
                                    
                                    this will list all PID listening on this port, once you have the PID you can terminate it with the following:
                                    
                                    kill -9 {PID}
                                    
                                    
                                    
                                    */

var PORT = 3000;

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

(0, _cartroutes2.default)(app);

app.get('/', function (req, res) {
    return res.send('Node and express running on ' + PORT);
});

app.listen(PORT, function () {
    return console.log('Server is running on ' + PORT);
});

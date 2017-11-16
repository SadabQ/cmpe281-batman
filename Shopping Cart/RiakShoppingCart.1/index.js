import express from 'express';
import bodyParser from 'body-parser';
import riakClient from 'basho-riak-client';
import routes from './src/routes/riakRoutes';
var riak = require('simpleriak').createClient({ host: 'localhost', port: 8098, bucket: 'test' });

var config = require('./config');

const app = express();
const port = 3001;

routes(app);
app.get('/', (req, res) => {
    res.send(`This is the riak CRUD application`);

});

app.listen(port , () => {
    console.log(`Riak CRUD server ${port} pe chalu hai. Jai Bhavani!!`);
});
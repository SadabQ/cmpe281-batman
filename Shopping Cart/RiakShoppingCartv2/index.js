/*
Node / Express: EADDRINUSE, Address already in use - Kill server

First, you would want to know which process is using port 3000

sudo lsof -i :3000

this will list all PID listening on this port, once you have the PID you can terminate it with the following:

kill -9 {PID}



*/



import express from 'express';
import routes from './src/routes/cartroutes';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

routes(app);

app.get('/', (req, res) =>
    res.send(`Node and express running on ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Server is running on ${PORT}`)
);


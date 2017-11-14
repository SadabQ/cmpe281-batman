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


const server = require('express')();
const cors = require('cors');
const requireFrom = require('requirefrom');
require('dotenv').config();
const routes = requireFrom('routes');
const helper = requireFrom('helper');
const response = helper('response');

global._helper = helper;
global._model = requireFrom('models');
global._controller = requireFrom('controllers');

server.use(cors());
server.use(response);

const initDB = () => {
  console.log('... Init mongodb');
  const mongoose = require('mongoose');
  const dbURL = process.env.DB_URL || 'mongodb://localhost/sindata';
  mongoose.connect(dbURL, {
    useNewUrlParser: true, 
    autoIndex: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
  }, err => {
    if (err) console.log('connect to db failed ', err);
    else console.log('db connected')
  });
}
const initBodyParser = () => {
  console.log('... Init body parser');
  const bodyParser = require('body-parser');
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({extended: false}));
}

const basePath = '/';

const path = [
  {route: 'supplier', path: 'supplier'}
]

const initServer = () => {
  console.log('Init server');
  initBodyParser();

  path.forEach( _ => {
    const path = basePath +_.path;
    const route = _.route;
    console.log('... Init router '+route+' => '+path);
    server.use(path, routes(route));
  })
}

initDB();
initServer();

const port = process.env.PORT || 7777;
server.listen(port, () => {
  console.log('server liston on ', port);
})
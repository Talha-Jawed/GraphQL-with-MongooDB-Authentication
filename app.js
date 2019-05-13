const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose.connect('mongodb://firstdb:talha123@ds211096.mlab.com:11096/firstdb', { useNewUrlParser: true })
  .then(() => {
    app.listen(3000);
    console.log("server start ==> 3000");
    
  })
  .catch(err => {
    console.log(err);
  });

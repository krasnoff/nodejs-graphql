// lib/app.ts
import express = require('express');
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';

const movies = [
  {
    name: 'dune 2020',
    id: 1,
    description: 'sdfas asdf asdfawdf asdf asdfasdf '
  },
  {
    name: 'superman',
    id: 2,
    description: 'sdfas asdf asdfawdf asdf asdfasdf '
  },
  {
    name: 'batman',
    id: 2,
    description: 'sdfas asdf asdfawdf asdf asdfasdf '
  }
];

// Create a new express application instance
const app: express.Application = express();

// Construct a schema, using GraphQL schema language
const schema: GraphQLSchema = buildSchema(`
  type Query {
    hello: String,
    getAllMovies: [movie],
    getSingleMovie(id: Int!): movie,
    updateMovie(id: Int!, name: String!): movie
  }

  type movie {
    name: String,
    id: Int,
    description: String
  }
`);

const updateMovie = (args: any) => {
  let movie = movies.find(el => el.id === args.id)
  if (movie) {
    movie.name = args.name;
  }
  return movie;
}

const getSingleMovie = (id: any) => {
  const movie = movies.find(el => el.id === id.id)
  return movie;
}

const getAllMovies = () => {
  return movies;
}

// The root provides a resolver function for each API endpoint
var root: any = {
    hello: () => {
        return 'Hello world!';
    },
    getAllMovies: getAllMovies,
    getSingleMovie: getSingleMovie,
    updateMovie: updateMovie
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
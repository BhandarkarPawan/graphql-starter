import express from 'express';
import cors from 'cors';
import gql from 'graphql-tag';
import { graphqlHTTP } from 'express-graphql';
import { buildASTSchema, GraphQLSchema } from 'graphql';

interface IPost {
  author: string;
  body: string;
}

interface IPostExtended {
  id: number;
  author: string;
  body: string;
}

const POSTS: IPost[] = [
  { author: 'John Doe', body: 'Hello world' },
  { author: 'Jane Doe', body: 'Hi, planet!' },
];

const schema: GraphQLSchema = buildASTSchema(gql`
  type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  type Post {
    id: ID
    author: String
    body: String
  }
`);

const mapPost = (post: IPost, id: number): IPostExtended =>
  post && { id, ...post };

const root = {
  posts: () => POSTS.map(mapPost),
  post: (id: number) => mapPost(POSTS[id], id),
};

const app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);

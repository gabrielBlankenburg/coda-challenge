import express  from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql';
const app = express();

app.use('/', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(3000, () => {
    console.log(`Running`);
})
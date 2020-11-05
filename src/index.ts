import express  from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './server/graphql';
import MongooseClient from './server/MongooseClient';
import mongoose from 'mongoose';
const app = express();

app.use('/', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(3000, () => {
    console.log(`Running`);
    const db = mongoose.connection;
    MongooseClient.connect();
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('running database')
    });
});
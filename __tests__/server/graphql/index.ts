import {graphql} from 'graphql';
import schema from '../../../../src/server/graphql';

test("Get all users", () => {
    let query = `
        {
            users {
                _id name email
            }
        }
    `;

    graphql(schema, query).then(result => console.log(result))
});
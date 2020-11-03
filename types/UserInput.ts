import {GraphQLInt, GraphQLInputObjectType, GraphQLString, GraphQLNonNull} from 'graphql';

const UserInput = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
});

export default UserInput;
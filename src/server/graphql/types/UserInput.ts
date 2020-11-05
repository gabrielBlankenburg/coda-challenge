import {GraphQLInt, GraphQLInputObjectType, GraphQLString, GraphQLNonNull} from 'graphql';

const UserInput = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
});

const UserUpdateInput = new GraphQLInputObjectType({
    name: 'UserUpdateInput',
    fields: () => ({
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        }
    })
});

export { UserInput, UserUpdateInput };
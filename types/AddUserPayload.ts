import { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
 } from 'graphql'

const AddUserPayload = new GraphQLObjectType({
    name: 'AddUserPayload',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
});

export default AddUserPayload;
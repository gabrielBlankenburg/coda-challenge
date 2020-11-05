import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const User = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

export default User;

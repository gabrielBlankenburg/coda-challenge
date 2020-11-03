import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} from "graphql";

import UserType from "./types/User";
import users from "./mock/users";
import mutation from './mutations/index';

const query = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        return "world";
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return users;
      },
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve(_, { id }) {
        return users.find((u) => u.id == id);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query,
  mutation
});

export default schema;

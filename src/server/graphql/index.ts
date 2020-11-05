import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import userModel from "../../models/User";

import UserType from "./types/User";
import mutation from "./mutations/index";

const query = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      async resolve() {
        return await userModel.getAll();
      },
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(_, { id }) {
        return await userModel.get(id);
      },
    },
    userByEmail: {
      type: UserType,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(_, { email }) {
        return await userModel.getByEmail(email);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

export default schema;

import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
} from 'graphql'
import UserType from '../types/User';
import { UserInput, UserUpdateInput } from '../types/UserInput';
import UserModel from '../../../models/User';

const addUser = {
    type: new GraphQLNonNull(UserType),
    args: {
        user: {
            type: new GraphQLNonNull(UserInput)
        }
    },
    resolve: async (_, {user}) => {
        return await UserModel.insert(user);
    }
};

const updateUser = {
    type: new GraphQLNonNull(UserType),
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        user: {
            type: new GraphQLNonNull(UserUpdateInput)
        }
    },
    resolve: async (_, {id, user}) => {
        return await UserModel.update(id, user);
    }
};

const deleteUser = {
    type: GraphQLBoolean,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async (_, {id, user}) => {
        return await UserModel.deleteUser(id);
    }
};

const mutations = new GraphQLObjectType({
    name: 'Mutation',
    ///@ts-ignore
    fields: () => ({
        addUser,
        updateUser,
        deleteUser
    })
});

export default mutations;
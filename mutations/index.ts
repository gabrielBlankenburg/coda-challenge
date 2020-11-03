import {
    GraphQLObjectType,
    GraphQLNonNull 
} from 'graphql'
import AddUserPayload from '../types/AddUserPayload';
import UserInput from '../types/UserInput';
import users from '../mock/users';

const addUser = {
    type: new GraphQLNonNull(AddUserPayload),
    args: {
        user: {
            type: new GraphQLNonNull(UserInput)
        }
    },
    resolve: (_, {user}) => {
        users.push(user);
        return user;
    }
};

const mutations = new GraphQLObjectType({
    name: 'Mutation',
    ///@ts-ignore
    fields: () => ({
        addUser
    })
});

export default mutations;
import UserSchema from '../schemas/User';
import validateEmail from '../utils/validators/email';

type UserT = {
    name: string,
    email: string,
    password: string
};

async function insert(data: UserT) {
    if (!validateEmail(data.email)) {
        throw new Error('User must have a valid email format.');
    }

    const user = new UserSchema(data);
    return await user.save();
}

async function get(id: string) {
    try {
        return await UserSchema.findById(id);
    } catch(_e) {
        throw new Error('User not found.')
    }
}

async function getByEmail(email: string) {
    try {
        return await UserSchema.findOne({email: email});
    } catch(_e) {
        throw new Error('User not found.')
    }
}

async function getAll() {
    return await UserSchema.find();
}

async function update(id: string, data) {
    let keys = Object.keys(data);

    if (keys.includes('email') || keys.includes('password')) {
        throw new Error('Cannot update user email nor password');
    }


    let user = await get(id);
    keys.forEach(e => user![e] = data[e]);
    return await user!.save();
}

async function deleteUser(id: string) {
    await get(id);
    await UserSchema.deleteOne({_id: id});
    return true
}

export { UserT };
export default { insert, get, getByEmail, getAll, update, deleteUser };
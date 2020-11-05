import User, { UserT } from '../../src/models/User';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;
beforeAll(async () => {
    const opts = {useNewUrlParser: true, useUnifiedTopology: true};

    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opts);
    
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
})

test('test inserting a new valid user', () => {
    const user = {name: 'gabriel', email: 'test@test.com', password: '123456'};

    return User.insert(user).then(data => {
        expect(data.name).toBe('gabriel');
        expect(data.email).toBe('test@test.com');
        expect(data.password).toBe('123456');
    });
});

test('test inserting an user with invalid password', () => {
    const user = {name: 'gabriel', email: 'test@test.com', password: '12345'};

    return User.insert(user).catch(error => {
        expect(error._message).toBe('User validation failed');
        expect(Object.keys(error.errors)).toContain('password');
    });
});

test('test inserting an user with invalid name', () => {
    const user = {name: 'ga', email: 'test@test.com', password: '123456'};

    return User.insert(user).catch(error => {
        expect(error._message).toBe('User validation failed');
        expect(Object.keys(error.errors)).toContain('name');
    });
});

test('test inserting an user with an invalid email', () => {
    const user = {name: 'gabriel', email: 'test@test', password: '123456'};

    return User.insert(user).catch((error: Error) => {
        expect(error.message).toBe('User must have a valid email format.');
    });
});

test('test inserting an user with duplicated email', () => {
    const user = {name: 'gabriel', email: 'user@test.com', password: '123456'};

    return User.insert(user)
        .then(data => {
            expect(data.name).toBe('gabriel');
            expect(data.email).toBe('user@test.com');
            expect(data.password).toBe('123456');
        })
        .then(() => {
            return User.insert(user).catch(error => {
                expect(error.code).toBe(11000);
            })
        });
});

test('test get a valid user by id', async () => {
    const user = {name: 'gabriel', email: 'getuser@test.com', password: '123456'};
    let result = await User.insert(user);

    return User.get(result.id).then(data => {
        expect(data!.name).toBe(user.name);
        expect(data!.email).toBe(user.email);
        expect(data!.password).toBe(user.password);
    })
});


test('test get a valid user by email', async () => {
    const user = {name: 'gabriel', email: 'getuserbyemail@test.com', password: '123456'};
    let result = await User.insert(user);
    
    return User.getByEmail(user.email).then(data => {
        expect(data!.name).toBe(user.name);
        expect(data!.email).toBe(user.email);
        expect(data!.password).toBe(user.password);
    })
});

test('test get a noexistent user by id', async () => {
    return User.get("invalid_id").catch(error => expect(error.message).toBe('User not found.'));
});


test('test get all users', async () => {
    const user = {name: 'gabriel', email: 'testall@test.com', password: '123456'};
    await User.insert(user);

    return User.getAll().then(data => {
        const found = data!.find(e => e.email == user.email);
        expect(found!.email).toBe(user.email);
        expect(found!.name).toBe(user.name);
        expect(found!.password).toBe(user.password);
    })
});

test('test update an user', async () => {
    const user = {name: 'gabriel', email: 'testupdate@test.com', password: '123456'};
    let result = await User.insert(user);

    const updatedUser = await User.update(result.id, {name: 'jose'});
    expect(updatedUser.name).toBe('jose'); 
});

test('test update an user password', async () => {
    const user = {name: 'gabriel', email: 'testupdatepass@test.com', password: '123456'};
    let result = await User.insert(user);

    return User.update(result.id, {password: '3333333'}).catch(error => 
        expect(error.message).toBe('Cannot update user email nor password'));
});

test('test update an user email', async () => {
    const user = {name: 'gabriel', email: 'testupdateemail@test.com', password: '123456'};
    let result = await User.insert(user);

    return User.update(result.id, {email: 'test@test.com'}).catch(error => 
        expect(error.message).toBe('Cannot update user email nor password'));
});

test('test update a nonexistent user', async () => {
    return User.update('123', {name: 'jose'}).catch(error => expect(error.message).toBe('User not found.'));
});

test('test delete an user', async () => {
    const user = {name: 'gabriel', email: 'testdeleteuser@test.com', password: '123456'};
    let result = await User.insert(user);

    const deletedUser = await User.deleteUser(result.id);
    expect(deletedUser).toBe(true); 
});

test('test delete a nonexistent user', async () => {
    return User.deleteUser('123').catch(error => expect(error.message).toBe('User not found.'));
});
import validator from '../../../src/utils/validators/email';

test('test a valid email', () => {
    let email = 'test@test.com';
    expect(validator(email)).toBe(true);
});

test('test an invalid email', () => {
    let email = 'test@test';
    expect(validator(email)).toBe(false);
});
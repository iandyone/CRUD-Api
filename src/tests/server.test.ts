import request from 'supertest';
import { server } from '../index';
import { User } from '../types';

const BASE_URL = '/api/users';
const user: User = {
  age: 1,
  username: 'John',
  hobbies: ['chess'],
};

describe('Simple crud API test', () => {
  test('Should return an empty array if no users were created', async () => {
    const response = await request(server).get(BASE_URL);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
  test('Should return an user object user was created', async () => {
    const response = await request(server).post(BASE_URL).send(user);

    expect(response.statusCode).toBe(201);
    expect(response.body.age).toEqual(user.age);
    expect(response.body.username).toEqual(user.username);
    expect(response.body.hobbies.join('')).toEqual(user.hobbies.join(''));
  });

  test('Should return the user by userId', async () => {
    const response = await request(server).get(BASE_URL);
    const savedUser: User = response.body[0];
    const userData = (await request(server).get(`${BASE_URL}/${savedUser.id}`)).body;

    expect(savedUser.id).toBe(userData.id);
  });

  test('Should return the updated user object after updating user data', async () => {
    const response = await request(server).get(BASE_URL);
    const savedUser: User = response.body[0];

    const updatedUserDto: User = { ...user, username: 'Elvis' };
    const userData: User = (await request(server).put(`${BASE_URL}/${savedUser.id}`).send(updatedUserDto)).body;

    expect(userData.username).toBe(updatedUserDto.username);
    expect(userData.id).toBe(savedUser.id);
  });

  test('Should remove user from database', async () => {
    const savedUser: User = (await request(server).get(BASE_URL)).body[0];
    expect(savedUser.id).not.toBeUndefined();

    const response = await request(server).delete(`${BASE_URL}/${savedUser.id}`);
    expect(response.statusCode).toBe(204);

    const removedUserData: User = (await request(server).get(`${BASE_URL}/${savedUser.id}`)).body;
    expect(typeof removedUserData.id).toBe('undefined');
  });
});

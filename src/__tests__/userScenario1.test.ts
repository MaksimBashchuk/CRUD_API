import supertest from 'supertest';
import { IUser } from '../models';
import { App } from '../app';
import { db } from '../inMemoryDb';

const app = new App();

describe('User scenario 1', () => {
  const wrongBodySyntaxUser = `{ "username": testUser", "age": 50, "hobbies": ["test", "someTest"] }`;
  let tempUser = {} as IUser;

  test('should get all users', async () => {
    const response = await supertest(app.server).get('/api/users');
    const { body, statusCode, type } = response;
    expect(statusCode).toBe(200);
    expect(body).toHaveLength(4);
    expect(body).toEqual(db);
    expect(type).toBe('application/json');
  });

  test('should not create new user with wrong body syntax', async () => {
    const response = await supertest(app.server)
      .post('/api/users')
      .send(JSON.stringify(wrongBodySyntaxUser));
    const { statusCode, badRequest, text } = response;
    expect(statusCode).toBe(400);
    expect(badRequest).toBeTruthy();
    expect(text).toMatch('Bad Request: Request body should contain required fields');
  });

  test('should create user', async () => {
    const newUser = { username: 'testUser', age: 50, hobbies: ['test', 'someTest'] };
    const response = await supertest(app.server).post('/api/users').send(newUser);
    const { statusCode, body, type } = response;
    expect(statusCode).toBe(201);
    tempUser = { ...body };
    expect(body).toMatchObject(newUser);
    expect(db).toHaveLength(5);
    expect(type).toBe('application/json');
  });

  test('should get user by id', async () => {
    const response = await supertest(app.server).get(`/api/users/${tempUser.id}`);
    const { body, statusCode } = response;
    expect(statusCode).toBe(200);
    expect(body).toStrictEqual(tempUser);
  });

  test('should update user', async () => {
    tempUser.age = 76;
    tempUser.username = 'updatedUser';
    const response = await supertest(app.server)
      .put(`/api/users/${tempUser.id}`)
      .send({ age: 76, username: 'updatedUser' });
    const { body, statusCode, type } = response;
    expect(statusCode).toBe(200);
    expect(body).toStrictEqual(tempUser);
    expect(db).toHaveLength(5);
    expect(type).toBe('application/json');
  });

  test('should create user', async () => {
    const newUser = { username: 'newTestUser', age: 16, hobbies: [] };
    const response = await supertest(app.server).post('/api/users').send(newUser);
    const { statusCode, body, type } = response;
    expect(statusCode).toBe(201);
    tempUser = { ...body };
    expect(body).toMatchObject(newUser);
    expect(db).toHaveLength(6);
    expect(type).toBe('application/json');
  });

  test('should get all user', async () => {
    const response = await supertest(app.server).get('/api/users');
    const { body, statusCode, type } = response;
    expect(statusCode).toBe(200);
    expect(body).toHaveLength(6);
    expect(body).toEqual(db);
    expect(type).toBe('application/json');
  });
});

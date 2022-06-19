import supertest from 'supertest';
import { IUser, OptionalReqBodyUser } from '../models';
import { App } from '../app';
import { db } from '../inMemoryDb';
import { v4 } from 'uuid';

const app = new App();

describe('User scenario 3', () => {
  let tempUser = {} as IUser | OptionalReqBodyUser;

  test('should not create new user without required field', async () => {
    tempUser = { age: 50, hobbies: ['test', 'someTest'] };
    const response = await supertest(app.server).post('/api/users').send(tempUser);
    const { statusCode, text } = response;
    expect(statusCode).toBe(400);
    expect(text).toMatch(`Bad Request: Request body should contain required fields`);
  });

  test('should create new user', async () => {
    tempUser = { ...tempUser, username: 'testUser' };
    const response = await supertest(app.server).post('/api/users').send(tempUser);
    const { statusCode, body, type } = response;
    expect(statusCode).toBe(201);
    expect(body).toMatchObject(tempUser);
    expect(db).toHaveLength(5);
    expect(type).toBe('application/json');
    tempUser = { ...body };
  });

  test('should not get newly created user by wrong id', async () => {
    const wrongId = v4();
    const response = await supertest(app.server).get(`/api/users/${wrongId}`);
    const { statusCode, text } = response;
    expect(statusCode).toBe(404);
    expect(text).toMatch(`Not Found: User with id='${wrongId}' does not exist`);
  });

  test('should get newly created user by right id', async () => {
    const response = await supertest(app.server).get(`/api/users/${(<IUser>tempUser).id}`);
    const { body, statusCode } = response;
    expect(statusCode).toBe(200);
    expect(body).toStrictEqual(tempUser);
  });

  test('should not update newly created user with empty object', async () => {
    const response = await supertest(app.server)
      .put(`/api/users/${(<IUser>tempUser).id}`)
      .send({});
    const { statusCode, text } = response;
    expect(statusCode).toBe(400);
    expect(text).toMatch(
      `Bad Request: Request body should contain at least one of the required fields`,
    );
  });

  test('should update newly created user with one field object', async () => {
    const userId = (<IUser>tempUser).id;
    const response = await supertest(app.server)
      .put(`/api/users/${userId}`)
      .send({ hobbies: ['addedByUpdate'] });
    const { body, statusCode } = response;
    expect(statusCode).toBe(200);
    expect(body.hobbies).toHaveLength(3);
    expect(body.hobbies).toContain('addedByUpdate');
  });

  test('should not get all users by wrong url', async () => {
    const response = await supertest(app.server).get(`/api/usersccc/`);
    const { statusCode, text } = response;
    expect(statusCode).toBe(404);
    expect(text).toMatch(`Not Found: Please check if URL is correct`);
  });

  test('should get all users', async () => {
    const response = await supertest(app.server).get('/api/users');
    const { body, statusCode } = response;
    expect(statusCode).toBe(200);
    expect(body).toHaveLength(5);
  });

  test('should delete all users', async () => {
    const deletingArr = db.map(
      (user) =>
        new Promise((res) => {
          const response = supertest(app.server).delete(`/api/users/${user.id}`);
          res(response);
        }),
    );

    await Promise.all(deletingArr);
    expect(db.length).toBe(0);
  });
});

import supertest from 'supertest';
import { IUser } from '../models';
import { App } from '../app';
import { db } from '../inMemoryDb';

const app = new App();

describe('User scenario 2', () => {
  let tempUser = {} as IUser;

  test('should not get user by non-uuid id', async () => {
    const response = await supertest(app.server).get('/api/users/non_uuid');
    const { statusCode, text } = response;
    expect(statusCode).toBe(400);
    expect(text).toMatch('Bad Request: Invalid UserId. Not uuid');
  });

  test('should get all users', async () => {
    const response = await supertest(app.server).get('/api/users');
    const { body, statusCode } = response;
    expect(statusCode).toBe(200);
    expect(body).toHaveLength(4);
  });

  test('should update first user', async () => {
    const userId = db[0].id;
    const response = await supertest(app.server)
      .put(`/api/users/${userId}`)
      .send({ age: 25, hobbies: [...db[0].hobbies, 'someNewHobby', 'oneMoreHobby'] });
    const { body, statusCode } = response;
    expect(statusCode).toBe(200);
    expect(body.age).toBe(25);
    expect(body.hobbies).toHaveLength(2);
    expect(body.hobbies).toContain('someNewHobby');
    expect(body.hobbies).toContain('oneMoreHobby');
  });

  test('should delete last user', async () => {
    const userId = db[db.length - 1].id;
    tempUser = { ...db[db.length - 1] };
    const response = await supertest(app.server).delete(`/api/users/${userId}`);
    const { statusCode, noContent } = response;
    expect(statusCode).toBe(204);
    expect(noContent).toBeTruthy();
  });

  test('should not get deleted user', async () => {
    const userId = tempUser.id;
    const response = await supertest(app.server).get(`/api/users/${userId}`);
    const { statusCode, text } = response;
    expect(statusCode).toBe(404);
    expect(text).toMatch(`Not Found: User with id='${userId}' does not exist`);
  });

  test('should delete user', async () => {
    const userId = db[db.length - 1].id;
    const response = await supertest(app.server).delete(`/api/users/${userId}`);
    const { statusCode, noContent } = response;
    expect(statusCode).toBe(204);
    expect(noContent).toBeTruthy();
  });

  test('should get all users', async () => {
    const response = await supertest(app.server).get('/api/users');
    const { body, statusCode } = response;
    expect(statusCode).toBe(200);
    expect(body).toHaveLength(2);
  });
});

import { v4 } from 'uuid';
import { IUser, OptionalReqBodyUser, ReqBodyUser } from '../models';
import { db } from '../inMemoryDb';

export const getAllUsers = () => db;

export const getUserById = (id: string) => db.find((user) => user.id === id);

export const addNewUser = (reqBody: ReqBodyUser) => {
  const newUser: IUser = {
    id: v4(),
    ...reqBody,
  };
  db.push(newUser);
  return newUser;
};

export const updateUser = (user: IUser, reqBody: OptionalReqBodyUser) => {
  return Object.assign(user, reqBody);
};

export const deleteUser = (id: string) => {
  const personIdx = db.findIndex((user) => user.id === id);
  db.splice(personIdx, 1);
};

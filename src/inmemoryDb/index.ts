import { v4 } from 'uuid';
import { IUser } from './models';

export const db: IUser[] = [
  { id: v4(), username: 'Maksim', age: 30, hobbies: [] },
  { id: v4(), username: 'Olga', age: 26, hobbies: ['Movies'] },
  { id: v4(), username: 'Vlad', age: 18, hobbies: ['Boxing', 'Gym'] },
  { id: v4(), username: 'Ivan', age: 35, hobbies: ['Gaming'] },
];

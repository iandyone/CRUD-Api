import { User } from './types';
import * as uuid from 'uuid';

const temp: User[] = [
  { id: uuid.v4(), age: 1, hobbies: ['a', 'b'], username: '' },
  { id: uuid.v4(), age: 1, hobbies: ['a', 'b'], username: '' },
];

export class DataBase {
  constructor(private users: User[] = temp) {}

  getUsers() {
    return this.users;
  }

  getUser(userId: string) {
    return this.users.find(({ id }) => id === userId);
  }

  createUser(user: User) {
    this.users = [...this.users, user];
    return user;
  }
}

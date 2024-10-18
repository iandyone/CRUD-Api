import { User } from './types';
// import * as uuid from 'uuid';

const temp: User[] = [
  // { id: '4ce6bcc7-0f67-4abf-a43b-cc87d72c01cb', age: 1, hobbies: ['a', 'b'], username: '' },
  // { id: uuid.v4(), age: 1, hobbies: ['a', 'b'], username: '' },
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

  updateUser(userId: string, userData: Partial<User>) {
    this.users = this.users.map((user) => (userId === user.id ? { ...user, ...userData } : user));
    return this.getUser(userId);
  }
}

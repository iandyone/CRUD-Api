import { User } from './types';

export class DataBase {
  constructor(private users: User[] = []) {}

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
    console.log(this.users);

    return this.getUser(userId);
  }

  removeUser(useId: string) {
    this.users = this.users.filter(({ id }) => id !== useId);
  }
}

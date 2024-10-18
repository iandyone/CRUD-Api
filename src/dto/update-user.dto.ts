import { User } from '../types';

export class UserUpdateDto implements User {
  age: number;
  username: string;
  hobbies: string[];

  constructor({ age, hobbies, username }: User) {
    this.age = age;
    this.hobbies = hobbies;
    this.username = username;
  }
}

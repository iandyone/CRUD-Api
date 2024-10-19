import { User } from '../types';

export class UserDto implements User {
  id: string;
  age: number;
  username: string;
  hobbies: string[];

  constructor({ id, age, hobbies, username }: User) {
    this.id = id;
    this.age = age;
    this.hobbies = hobbies;
    this.username = username;
  }
}

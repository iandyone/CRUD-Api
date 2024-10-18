import { User } from '../types';

export class UserUpdateDto implements User {
  age: number;
  username: string;
  hobbies: string[];

  constructor(userData: User, { age, hobbies, username }: User) {
    this.age = age || userData.age;
    this.hobbies = hobbies || userData.hobbies;
    this.username = username || userData.username;
  }
}

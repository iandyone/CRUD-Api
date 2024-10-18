import { User } from './types';

export const parseUsersUrl = (url: string) => {
  const [route, subRoute, userId] = url.slice(1).split('/');

  return { path: `/${route}/${subRoute}`, userId };
};

export const validateUser = (user: Partial<User>) => {
  const requiredFields: (keyof User)[] = ['age', 'username', 'hobbies'];

  const errorMessage = requiredFields.reduce((errors, field) => {
    return user[field] === undefined ? [...errors, `field ${field} is required`] : errors;
  }, []);

  return errorMessage.join(', ') || null;
};

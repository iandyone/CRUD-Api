import { config } from 'dotenv';
import { createServer } from 'http';
import * as uuid from 'uuid';

import { User } from './types';
import { UserDto } from './dto/user.dto';
import { DataBase } from './database';
import { UserUpdateDto } from './dto/update-user.dto';
import { parseUsersUrl, validateUser } from './utils';
import { ENDPOINTS, METHODS } from './constants';

config();

const PORT = Number(process.env.PORT);
const HOST = process.env.HOST;

const { GET, POST, PUT, DELETE } = METHODS;
const { USERS, USER } = ENDPOINTS;

const db = new DataBase();

export const server = createServer((req, res) => {
  try {
    const baseURL = 'http://' + req.headers.host + '/';
    const reqUrl = new URL(req.url, baseURL);
    const url = reqUrl.pathname;

    console.log(`${req.method}: ${req.url}`);

    if (url.startsWith(USERS)) {
      const { path, userId } = parseUsersUrl(url);

      const isValidUrl = url === USER || url === USERS;
      const isValidUrlWithUserId = path === USERS && userId;

      switch (req.method) {
        case GET:
          if (isValidUrl) {
            const users = db.getUsers();

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(users));
          } else if (isValidUrlWithUserId) {
            const isValidUserId = uuid.validate(userId);

            if (!isValidUserId) {
              res.setHeader('Content-Type', 'text/plain');
              res.statusCode = 400;
              res.end('user.id is not a valid uuid');
              return;
            }

            const user = db.getUser(userId);

            if (!user) {
              res.setHeader('Content-Type', 'text/plain');
              res.statusCode = 404;
              res.end('User not found');
              return;
            }

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(user));
          } else {
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 404;
            res.end('Unknown request url');
          }
          break;

        case POST:
          if (isValidUrl) {
            let body = '';

            req.on('data', (chunk) => (body += chunk));

            req.on('end', () => {
              const user: User = JSON.parse(body);
              const validationErrorMessage = validateUser(user);

              if (validationErrorMessage) {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 400;
                res.end(validationErrorMessage);

                return;
              }
              const userDto = new UserDto({
                ...user,
                id: uuid.v4(),
              });

              const userData = db.createUser(userDto);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 201;
              res.end(JSON.stringify(userData));
            });
          } else {
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 404;
            res.end('Unknown request url');
          }
          break;
        case PUT:
          if (isValidUrlWithUserId) {
            let body = '';

            req.on('data', (chunk) => (body += chunk));

            req.on('end', () => {
              const userData: User = JSON.parse(body);
              const user = db.getUser(userId);

              if (!user) {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 404;
                res.end('User not found');
                return;
              }

              const userDto = new UserUpdateDto(userData);
              const updatedUser = db.updateUser(userId, userDto);

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(updatedUser));
            });
          } else {
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 404;
            res.end('Unknown request url');
          }
          break;
        case DELETE:
          if (isValidUrlWithUserId) {
            const isValidUserId = uuid.validate(userId);

            if (!isValidUserId) {
              res.setHeader('Content-Type', 'text/plain');
              res.statusCode = 400;
              res.end('User id is not a valid uuid');
              return;
            }

            const user = db.getUser(userId);

            if (!user) {
              res.setHeader('Content-Type', 'text/plain');
              res.statusCode = 404;
              res.end('User not found');
              return;
            }

            db.removeUser(userId);

            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 204;
            res.end();
          } else {
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 404;
            res.end('Unknown request url');
          }
          break;
        default:
          break;
      }
    } else {
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 404;
      res.end('Unknown request url');
    }
  } catch (error) {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 500;
    console.log(error);
    res.end('Internal server error');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server was started on http://${HOST}:${PORT}`);
});

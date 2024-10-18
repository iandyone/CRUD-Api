import { config } from 'dotenv';
import { createServer } from 'http';
import { ENDPOINTS, METHODS } from './constants';
import { DataBase } from './db';
import { parseUsersUrl } from './utils';
import * as uuid from 'uuid';

config();

const PORT = Number(process.env.PORT);
const HOST = process.env.HOST;
const { GET } = METHODS;
const { USERS } = ENDPOINTS;

const db = new DataBase();

const server = createServer((req, res) => {
  const baseURL = 'http://' + req.headers.host + '/';
  const reqUrl = new URL(req.url, baseURL);
  const url = reqUrl.pathname;

  console.log(`${req.method}: ${req.url}`);

  if (url.startsWith(USERS)) {
    const { path, userId } = parseUsersUrl(url);

    switch (req.method) {
      case GET:
        if (url === USERS) {
          const users = db.getUsers();

          res.statusCode = 200;
          res.end(JSON.stringify(users));
        } else if (path === USERS && userId) {
          const isValidUserId = uuid.validate(userId);

          if (!isValidUserId) {
            res.statusCode = 400;
            res.end('user id is not valid uuid');
            return;
          }

          const user = db.getUser(userId);

          if (!user) {
            res.statusCode = 404;
            res.end('User not found');
            return;
          }

          res.statusCode = 200;
          res.end(JSON.stringify(user));
        }
        break;

      default:
        break;
    }
  } else {
    res.statusCode = 404;
    res.end('Unknown request url');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server was started on http://${HOST}:${PORT}`);
});

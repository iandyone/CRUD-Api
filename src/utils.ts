export const parseUsersUrl = (url: string) => {
  const [route, subRoute, userId] = url.slice(1).split('/');

  return { path: `/${route}/${subRoute}`, userId };
};

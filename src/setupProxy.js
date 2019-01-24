const proxy = require('http-proxy-middleware');
module.exports = (app) => {
  app.use(proxy('/socket.io', {
    target: 'http://localhost:3333/',
    ws: true,
  }));

  app.use(proxy('/api', {
    target: 'http://localhost:3333/',
  }));

  app.use(proxy('/public', {
    target: 'http://localhost:3333/',
  }));

  app.use(proxy('/files', {
    target: 'http://localhost:3333/',
  }));
}

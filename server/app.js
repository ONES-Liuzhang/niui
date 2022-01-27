/**
 * 是以下写法的语法糖
 *
 * const http = require('http');
 * const Koa = require('koa');
 * const app = new Koa();
 * http.createServer(app.callback()).listen(3000);
 */
const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');

const PORT = 3000;

app.use(cors());

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  switch (ctx.url) {
    case '/dict':
      ctx.body = {
        code: 200,
        data: 'Hello Niui',
        ok: true
      };
      break;
  }
  await next();
  console.log(ctx.response);
});

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(PORT);

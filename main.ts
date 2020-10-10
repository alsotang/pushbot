import Koa from 'koa'
import koaBody from "koa-body";
import {config} from './config'
import {ServerResponse} from 'http'

import { bot } from "./bot";

const app = new Koa()
app.use(koaBody())

// try delegate to telegram bot handler
app.use(async (ctx, next) => {
  if (ctx.method !== 'POST' || ctx.url !== config.SECRET_PATH) {
    return next()
  }
  await bot.handleUpdate(ctx.request.body, ctx.response as unknown as ServerResponse)
  ctx.status = 200
})


app.use(async (ctx) => {
  ctx.redirect('https://github.com/alsotang/pushbot');
})

app.listen(config.webPort)
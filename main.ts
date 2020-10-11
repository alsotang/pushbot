import Koa from 'koa'
import bodyParse from 'koa-bodyparser'
import {config} from './config'
import {ServerResponse} from 'http'
import Router from '@koa/router'
import { PushMessage } from "@/types";
import { pool } from "./lib/pg";

import { bot } from "./bot";

const app = new Koa()
app.use(bodyParse({}))

// try delegate to telegram bot handler
app.use(async (ctx, next) => {
  if (ctx.method !== 'POST' || ctx.url !== config.SECRET_PATH) {
    return next()
  }
  await bot.handleUpdate(ctx.request.body, ctx.response as unknown as ServerResponse)
  ctx.status = 200
})

const router = new Router();
router.post('/push', async (ctx, next) => {
  const body = ctx.request.body as PushMessage;

  const pushid = body.pushid;
  const content = body.content;
  const parse_mode = body.parse_mode;

  const chatIdRes = await pool.query(`select * from pushid where pushid=$1`, [pushid]);
  const rows =  chatIdRes.rows;
  if (rows.length === 0) {
    ctx.body = {
      success: false,
      error_msg: `no such pushid: ${pushid}`
    }
    return;
  }
  const chatId = rows[0].telegram_chat_id as number;

  try {
    bot.telegram.sendMessage(chatId, content, {parse_mode});
  } catch (e) {
    ctx.body = {
      success: false,
      error_msg: `${e}`
    }
    return;
  }
  ctx.body = {
    success: true,
  }
})
router.get('/', (ctx, next) => {
  ctx.redirect(config.githubRepo);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.webPort)
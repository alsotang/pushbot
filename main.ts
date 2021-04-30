import Koa from 'koa'
import bodyParse from 'koa-bodyparser'
import { config } from './config'
import { ServerResponse } from 'http'
import Router from '@koa/router'
import { PushMessage } from "@/types";
import { getChatId } from './lib/dao'

import { bot } from "./bot";

const app = new Koa()
app.use(bodyParse({}))

const router = new Router();
router.post('/push', async (ctx, next) => {
  const body = ctx.request.body as PushMessage;

  const pushid = body.pushid || body.push_id; // .pushid for compat
  const content = body.content;
  const parse_mode = body.parse_mode;

  let chatId: number
  try {
    chatId = await getChatId(pushid);
  } catch (e) {
    ctx.body = {
      success: false,
      error_msg: String(e)
    }
    return
  }

  try {
    await bot.telegram.sendMessage(chatId, content, { parse_mode });
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
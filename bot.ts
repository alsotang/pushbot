import { Telegraf } from "telegraf";
import {config} from './config'
import {setCommands} from './lib/commands'
import { pool } from "./lib/pg";

const token = config.isDev ? config.PUSHTESTBOT_TOKEN : config.PUSHBOT_TOKEN!;
const bot = new Telegraf(token);

const ERROR_MSG = 'Something wrong. Please contact alsotang@gmail.com.'


import { v4 as uuidv4 } from 'uuid';

const helpMsg = config.description;


bot.start(ctx => ctx.reply(helpMsg));
bot.help(ctx => ctx.reply(helpMsg));

bot.command('regenerate', async (ctx) => {
  const telegram_user_id =  ctx.message?.from?.id;
  const newPushId = uuidv4();

  try {
    await pool.query(`delete from pushid where telegram_user_id=$1;`, [telegram_user_id]);
    await pool.query(`insert into pushid(telegram_user_id, pushid) values($1, $2);`, [telegram_user_id, newPushId]);
  } catch (e) {
    ctx.reply(`${ERROR_MSG}\n${e}`)
    return;
  }

  ctx.reply(`Your push id is now:

${newPushId}`)
});

bot.catch((err: any) => {
  console.error('Ooops', err);
});

setCommands(bot);

if (config.isDev) {
  bot.startPolling();
} else {
  bot.telegram.setWebhook(`${config.baseUrl}${config.SECRET_PATH}`);
}



export {bot};

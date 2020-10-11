import { Telegraf, Context } from "telegraf";
import { config } from './config'
import { setCommands } from './lib/commands'
import { pool } from "./lib/pg";
import { v4 as uuidv4 } from 'uuid';

const token = config.isDev ? config.PUSHTESTBOT_TOKEN : config.PUSHBOT_TOKEN!;
const bot = new Telegraf(token);

const ERROR_MSG = 'Something wrong. Please contact alsotang@gmail.com.'
const HELP_MSG = `For more info, see: ${config.githubRepo}`

// renegenate push id
const regenerateController = async (ctx: Context) => {
  const telegram_chat_id = ctx.chat?.id;
  const newPushId = uuidv4();

  try {
    await pool.query(`delete from pushid where telegram_chat_id=$1;`, [telegram_chat_id]);
    await pool.query(`insert into pushid(telegram_chat_id, pushid) values($1, $2);`, [telegram_chat_id, newPushId]);
  } catch (e) {
    ctx.reply(`${ERROR_MSG}\n${e}`)
    return;
  }

  ctx.reply(`Your push id is now:

${newPushId}`)
}

bot.start(regenerateController);
bot.help(ctx => ctx.reply(HELP_MSG))
bot.command('regenerate', regenerateController);

const mypushidController = async (ctx: Context) => {
  const telegram_chat_id = ctx.chat?.id;

  const queryRes = await pool.query(`select pushid from pushid where telegram_chat_id=$1`, [telegram_chat_id])
  const rows = queryRes.rows;

  const pushid = rows[0].pushid;
  ctx.reply(`Your current push id is: ${pushid}`)
}
bot.command('mypushid', mypushidController);

bot.catch((err: any) => {
  console.error('Ooops', err);
});

setCommands(bot);

if (config.isDev) {
  bot.startPolling();
} else {
  bot.telegram.setWebhook(`${config.baseUrl}${config.SECRET_PATH}`);
}



export { bot };

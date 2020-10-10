import { Telegraf } from "telegraf";
import {config} from './config'
import {setCommands} from './lib/commands'

const token = config.isDev ? config.PUSHTESTBOT_TOKEN : config.PUSHBOT_TOKEN!;
const bot = new Telegraf(token);


import { v4 as uuidv4 } from 'uuid';

const helpMsg = `A simple push service built on Telegram`;


bot.start(ctx => ctx.reply(helpMsg));
bot.help(ctx => ctx.reply(helpMsg));

bot.command('regenerate', (ctx) => {
  const newPushId = uuidv4();

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

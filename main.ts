import { bot } from "./lib/bot";
import {config} from './config'
import {setCommands} from './lib/commands'
import { v4 as uuidv4 } from 'uuid';

const helpMsg = `A simple push service built on Telegram`;


async function main() {
  bot.start(ctx => ctx.reply(helpMsg));
  bot.help(ctx => ctx.reply(helpMsg));

  bot.command('regenerate', (ctx) => {
    const newPushId = uuidv4();

    ctx.reply(`Your push id is now:

${newPushId}
`)
  });

  bot.catch((err: any) => {
    console.error('Ooops', err);
  });

  setCommands(bot);

  if (config.isDev) {
    bot.startPolling();
  } else {
    bot.telegram.setWebhook(`${config.baseUrl}${config.SECRET_PATH}`);

    bot.startWebhook(config.SECRET_PATH, null, config.webPort);
  }
}

main();

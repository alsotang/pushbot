import { Telegraf, Context } from "telegraf";
import { config } from './config'
import { setCommands } from './lib/commands'
import { getPushid, regeneratePushid } from './lib/dao'
import { HELP_MSG } from './lib/constants'

const token = config.isDev ? config.PUSHTESTBOT_TOKEN : config.PUSHBOT_TOKEN!;
const bot = new Telegraf(token);

// renegenate push id
const regenerateController = async (ctx: Context) => {
  const telegram_chat_id = ctx.chat?.id as number;
  let newPushid
  try {
    newPushid = await regeneratePushid(telegram_chat_id)
  } catch (e) {
    return ctx.reply(String(e))
  }

  ctx.reply(`Your push id is now:

${newPushid}`)
}

bot.start(regenerateController);
bot.help(ctx => ctx.reply(HELP_MSG))
bot.command('regenerate', regenerateController);

const mypushidController = async (ctx: Context) => {
  const telegram_chat_id = ctx.chat?.id as number;

  const pushid = await getPushid(telegram_chat_id)
  ctx.reply(`Your current push id is: ${pushid}`)
}
bot.command('mypushid', mypushidController);

bot.catch((err: any) => {
  console.error('Ooops', err);
});

setCommands(bot);

if (config.isDev) {
  bot.launch();
} else {
  bot.launch()
}



export { bot };

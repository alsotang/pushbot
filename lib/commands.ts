import { Telegraf } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";


const commands = [
  {
    command: 'regenerate',
    description: 'regenerate your push id'
  },
]

function setCommands(bot: Telegraf<TelegrafContext>) {
  bot.telegram.setMyCommands(commands)
}

export {setCommands}
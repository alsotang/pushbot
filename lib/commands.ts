import { Telegraf } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";


const commands = [
  {
    command: 'regenerate',
    description: 'Regenerate your push id'
  },
  {
    command: 'mypushid',
    description: 'Show your current push id'
  },
  {
    command: 'help',
    description: 'Show help message'
  },
]

function setCommands(bot: Telegraf<TelegrafContext>) {
  bot.telegram.setMyCommands(commands)
}

export {setCommands}
import { Telegraf, Context } from "telegraf";

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

function setCommands(bot: Telegraf<Context>) {
  bot.telegram.setMyCommands(commands)
}

export {setCommands}
import {ParseMode} from 'telegraf/typings/telegram-types'

export interface PushMessage {
  pushid: number,
  content: string,
  parse_mode?: ParseMode,
}
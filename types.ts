import {ParseMode} from 'telegraf/typings/telegram-types'

export interface PushMessage {
  pushid: string,
  push_id: string,
  content: string,
  parse_mode?: ParseMode,
}
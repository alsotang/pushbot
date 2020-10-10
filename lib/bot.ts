import { Telegraf } from "telegraf";
import {config} from '../config'

const token = config.isDev ? config.PUSHTESTBOT_TOKEN : config.PUSHBOT_TOKEN!;
const bot = new Telegraf(token);


export {bot};

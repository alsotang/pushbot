import { pool } from './pg'
import { v4 as uuidv4 } from 'uuid';
import { ERROR_MSG } from './constants'



export async function getChatId(pushid: string): Promise<number> {
  const chatIdRes = await pool.query(`select * from pushid where pushid=$1`, [pushid]);
  const rows = chatIdRes.rows;

  if (rows.length === 0) {
    throw new Error(`no such push id: ${pushid}`)
  }

  return rows[0].telegram_chat_id
}

export async function getPushid(chatId: number): Promise<string> {
  const queryRes = await pool.query(`select pushid from pushid where telegram_chat_id=$1`, [chatId])
  const rows = queryRes.rows;

  const pushid = rows[0].pushid;

  return pushid
}

export async function regeneratePushid(chatId: number): Promise<string> {
  const newPushId = uuidv4();

  try {
    await pool.query(`delete from pushid where telegram_chat_id=$1;`, [chatId]);
    await pool.query(`insert into pushid(telegram_chat_id, pushid) values($1, $2);`, [chatId, newPushId]);
  } catch (e) {
    throw new Error(`${ERROR_MSG}\n${e}`)
  }

  return newPushId
}
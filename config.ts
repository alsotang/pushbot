export const config = {
  isDev: process.env.NODE_ENV === 'development',
  webPort: Number(process.env.PORT) || 8080,

  // START developer should customize
  PUSHBOT_TOKEN: process.env.PUSHBOT_TOKEN!,
  PUSHTESTBOT_TOKEN: process.env.PUSHTESTBOT_TOKEN!,
  baseUrl: 'https://push.alsotang.com',
  SECRET_PATH: process.env.PUSHBOT_SECRET_PATH!,
  // END developer should customize
}
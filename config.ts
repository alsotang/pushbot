export const config = {
  isDev: process.env.NODE_ENV === 'development',
  webPort: Number(process.env.PORT) || 8080,
  githubRepo: 'https://github.com/alsotang/pushbot',

  // START developer should customize
  PUSHBOT_TOKEN: process.env.PUSHBOT_TOKEN!,
  PUSHTESTBOT_TOKEN: process.env.PUSHTESTBOT_TOKEN!,
  CONNECTION_STRING: (process.env.DATABASE_URL || process.env.PUSHBOT_DATABASE_URL)!,
  // END developer should customize
}
# pushbot

A simple push service built on Telegram

# When to use

When you wanna notify yourself some messages instantly. And you dont have a native app or dont wanna send an email.

# How to use

1. Start this bot using Telegram: [puuushbot](https://t.me/puuushbot)
2. The bot would generate a token for you
3. curl the push service:

    ```shell
    curl https://push.alsotang.com/push -v -H "Content-type: application/json" -L -d '{"pushid": "3a1648fe-0ce3-4aed-8b11-a1cfa55b44a8", "content":  "I am the message https://i.loli.net/2020/10/11/oQWFTGrZPAUiXaJ.jpg"}'
    ```

    or write code:

    ```js
    const axios = require('axios')

    axios.post('https://push.alsotang.com/push', {
      "pushid": "3a1648fe-0ce3-4aed-8b11-a1cfa55b44a8",
      "content": "I am the message https://i.loli.net/2020/10/11/oQWFTGrZPAUiXaJ.jpg"
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
    ```

# api

## POST /push

```ts
export interface PushMessage {
  pushid: number,
  content: string,
  parse_mode?: "Markdown" | "MarkdownV2" | "HTML" | undefined, // see https://core.telegram.org/bots/api#sendmessage
}
```

Since Telegram's markdown support is terrible, and richtext format is crude. If you want to send richtext message, try to use a [Telegraph](https://telegra.ph/api) link or other external link.

# host your own pushbot

customize your own telegram bot token and other things. See [./config.ts](./config.ts)

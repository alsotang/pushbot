# pushbot

A simple push service built on Telegram

# When to use

When you wanna notify your user some info instantly. And you dont have a native app.

# How to use

1. Let your user start this bot using Telegram [puuushbot](https://t.me/puuushbot)
2. User would give you a push id
3. curl the push service: `curl https://push.alsotang.com/push -v -H "Content-type: application/json" -L -d '{"pushid": "3a1648fe-0ce3-4aed-8b11-a1cfa55b44a8", "content":  "I am the message https://i.loli.net/2020/10/11/oQWFTGrZPAUiXaJ.jpg"}'`
    ```js
    const axios = require('axios')

    axios.post('https://push.alsotang.com/push', {
      "pushid": "3a1648fe-0ce3-4aed-8b11-a1cfa55b44a8",
      "content": "I am the message https://i.loli.net/2020/10/11/oQWFTGrZPAUiXaJ.jpg"
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    ```

# host your own

customize your own bot token and other things. See [./config.ts](./config.ts)

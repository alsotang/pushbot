# pushbot

A simple push service built on Telegram

# When to use

When you wanna notify your user some info instantly. And you dont have a native app.

# How to use

1. Let your user start this bot using Telegram (puuushbot)[https://t.me/puuushbot]
2. User would give you a push id
3. curl the push service: `curl https://push.alsotang.com/push -v -H "Content-type: application/json" -L -d '{"to": "3a1648fe-0ce3-4aed-8b11-a1cfa55b44a8", "content":  "adfsdf [1](https://i.loli.net/2020/10/11/oQWFTGrZPAUiXaJ.jpg)"}'`

# host your own

customize your own bot token and other things. See (./config.ts)[./config.ts]

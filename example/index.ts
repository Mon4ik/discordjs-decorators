import {EventLoader, importGlob} from "..";
import {Client, Events} from "discord.js";

require("dotenv").config()

const client = new Client({intents: ["Guilds"]})

client.once(Events.ClientReady, c => {
    console.log(`Bot is ready! Logged in as ${c.user.tag}`)

    new EventLoader()
        // import class
        // .add(ExampleEvent)
        // you could use import
        // .add(import("./event"))
        // or importGlob
        .add(importGlob("./events/**/*.ts"))

        // constants for command registering
        .env(process.env.NODE_ENV !== "production", process.env.CLIENT_ID, process.env.GUILD_ID)

        // and finally load everything
        .load(client)
})


client.login(process.env.TOKEN)

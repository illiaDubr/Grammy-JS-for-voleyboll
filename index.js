require('dotenv').config();
const { Bot } = require('grammy');

const bot = new Bot(process.env.BOT_API_KEY); // <-- put your bot token between the ""



bot.command('start', async (ctx) => {
    await ctx.reply('Welcome! Up and running.')
}
);

bot.on("message", async(ctx) => ctx.reply("Got another message!"));


bot.start();
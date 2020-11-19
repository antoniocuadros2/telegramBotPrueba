const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAMBOTTOKEN);

bot.start(ctx =>{
    ctx.reply("Bienvenido");
})

bot.help(ctx =>{
    ctx.reply("Ayudaaaaaaaaaaaa");
})
bot.launch()

exports.handler = async function(event, context) {
    bot.launch()
    return {
        statusCode: 200,
        body: JSON.stringify({message: ""})
    };
}

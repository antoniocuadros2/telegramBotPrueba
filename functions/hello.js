const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.TELEGRAMBOTTOKEN);

bot.start((ctx) =>{
    ctx.reply("Bienvenido");
})



exports.handler = async function(event, context) {
    await bot.handleUpdate(JSON.parse(event.body));
    return {
        statusCode: 200,
        body: JSON.stringify({message: "Hello World"})
    };
}

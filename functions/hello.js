const Telegraf = require('telegraf');

const bot = new Telegraf('1431457336:AAFnn9sLjmCN40l37SUx6iAbn5HQd7zMsh8');

bot.start(ctx =>{
    ctx.reply("Bienvenido");
})



exports.handler = async function(event, context) {
    bot.launch();
    return {
        statusCode: 200,
        body: JSON.stringify({message: "Hello World"})
    };
}

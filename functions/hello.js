const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAMBOTTOKEN);

bot.start(ctx =>{
    ctx.reply({info:"Bienvenido"});
})

bot.help(ctx =>{
    ctx.reply({info:"Ayudaaaaaaaaaaaa"});
})
bot.launch()

exports.handler = async function(event, context) {
    await bot.handleUpdate(JSON.parse(event.body));
    return {
        statusCode: 200,
        body:''
    };
}

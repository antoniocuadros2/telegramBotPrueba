const Telegraf = require('telegraf');
const startAction = require("./acciones/start")


const bot = new Telegraf(process.env.TELEGRAMBOTTOKEN);

bot.start(ctx =>{
    ctx.startAction(ctx);
})

bot.help(ctx =>{
    ctx.reply("Ayudaaaaaaaaaaaa");
})
bot.launch()

exports.handler = async function(event, context) {
    try{
        await bot.handleUpdate(JSON.parse(event.body));
        return { statusCode: 200, body: ''};
    } catch(e){
        console.log(e)
        return { statusCode: 400, body: 'Error'};
    }
}

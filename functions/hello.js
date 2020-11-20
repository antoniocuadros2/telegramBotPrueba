const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAMBOTTOKEN);

bot.start(ctx =>{
    ctx.reply("Bienvenido, soy @asignaturasivbot, ¿en qué puedo ayudarte?, puedo hacer todo lo que está en /help");
})

bot.help(ctx =>{
    ctx.reply("Ayudaaaaaaaaaaaa");
})

exports.handler = async function(event, context) {
	const body = JSON.parse(event.body);
	return { statusCode: 200, body: event.body.message.text};
	/*
    try{
        await bot.handleUpdate(JSON.parse(event.body));
        return { statusCode: 200, body: ''};
    } catch(e){
        console.log(e)
        return { statusCode: 400, body: 'Está siendo utilizado por un bot de telegram: @asignaturasivbot'};
    }
    */
}


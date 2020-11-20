const rp = require('request-promise');
const TELEGRAM_TOKEN = process.env.TELEGRAMBOTTOKEN;

async function sendToUser(chat_id, text) {
  const options = {
    method: 'GET',
    uri: `https://api.telegram.org/bot${process.env.TELEGRAMBOTTOKEN}/sendMessage`,
    qs: {
      chat_id,
      text
    }
  };

  return rp(options);
}


//HANDLER
exports.handler = async function(event, context) {
    const body = JSON.parse(event.body);
    const {chat, text} = body.message;
  
    if (text) { //Contiene texto el mensaje
      let message = '';

      await sendToUser(chat.id, "YA FUNCIONOOOO, ESTOY VIVOOOOOOOOOOOO");
    } else { //no contiene texto el mensaje
      await sendToUser(chat.id, 'Text message is expected.');
    }
  
    return { statusCode: 200 };
}

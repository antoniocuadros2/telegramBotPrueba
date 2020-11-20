const reqp = require('request-promise');

async function enviaMensaje(chat_id, text) {
  const options = {
    method: 'GET',
    uri: `https://api.telegram.org/bot${process.env.TELEGRAMBOTTOKEN}/sendMessage`,
    qs: {
      chat_id,
      text
    }
  };

  return reqp(options);
}


//HANDLER
exports.handler = async function(event, context) {
    const body = JSON.parse(event.body);
    const {chat, text} = body.message;
  
    if (text) { //Contiene texto el mensaje
      let message = '';

      await enviaMensaje(chat.id, "YA FUNCIONOOOO, ESTOY VIVOOOOOOOOOOOO");
    } else { //no contiene texto el mensaje
      await enviaMensaje(chat.id, 'Text message is expected.');
    }
  
    return { statusCode: 200 };
}
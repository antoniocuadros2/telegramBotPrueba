const request = require('request');

async function enviaMensaje(chat_id, text) {
  const options = {
    method: 'GET',
    uri: `https://api.telegram.org/bot${process.env.TELEGRAMBOTTOKEN}/sendMessage`,
    qs: {
      chat_id,  //id del chat
      text      //contenido
    }
  };

  return request(options);
}


//HANDLER
exports.handler = async function(event, context) {
    let body = JSON.parse(event.body);
    let {chat, text} = body.message;
  
    if (text){ //Contiene texto el mensaje
        let message = '';

        enviaMensaje(chat.id, text);
    }
    else{ //no contiene texto el mensaje
        enviaMensaje(chat.id, 'Text message is expected.');
    }
  
    return { statusCode: 200 };
}
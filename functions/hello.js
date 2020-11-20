const reqp = require('request-promise');

async function mandarRespuesta(id_chat, message) {
    const options = {
        method: 'GET',
        uri: `https://api.telegram.org/bot${process.env.TELEGRAMBOTTOKEN}/sendMessage`,
        qs: {
            id_chat,
            message
        }
  };

  return reqp(options);
}


//HANDLER
exports.handler = async function(event, context) {
    const body = JSON.parse(event.body);
    const {chat, message} = body.message;
  
    if (message) { //Contiene texto el mensaje
      let message = '';

      await mandarRespuesta(chat.id, "YA FUNCIONOOOO, ESTOY VIVOOOOOOOOOOOO");
    } else { //no contiene texto el mensaje
      await sendToUser(chat.id, 'No se ha mandado ningún mensaje');
    }
  
    return { statusCode: 200 };
}
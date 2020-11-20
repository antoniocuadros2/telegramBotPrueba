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
  
    if (text){ //Contiene texto el mensaje, será el comando
        let a_devolver = '';
        switch (text) {
            case "/ktengo":
                a_devolver = "Que tareas tengo que hacer";
                break;
            case "/ktengourgente":
                a_devolver = "Que tareas tengo que hacer urgentemente";
                break;
            default:
                a_devolver = "Usa /ktengo para saber que tareas tienes que realizar y  / "
                break;
        }       
        request({
            method: 'GET',
            uri: `https://api.telegram.org/bot${process.env.TELEGRAMBOTTOKEN}/sendMessage`,
            qs: {
              chat_id,  //id del chat
              text      //contenido
        })
    }
    else{ //no contiene texto el mensaje
        enviaMensaje(chat.id, 'Text message is expected.');
    }
  
    return { statusCode: 200 };
}
const request = require('request-promise');
const lib = require('./tareas')

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
              a_devolver = lib.getAsignaturas();
              break;
            case "/ktengoIV":
              a_devolver = lib.getAsignaturas("IV");
              break;
            case "/ktengoDAI":
              a_devolver = lib.getAsignaturas("DAI");
              break;
            case "/ktengoSPSI":
              a_devolver = lib.getAsignaturas("SPSI");
              break;
            default:
              a_devolver = "Usa /ktengo para saber que tareas tienes que realizar y para consultas más concretas: \n/ktengoIV para obtener las tareas a realizar de IV. \n/ktengoDAI para obtener las tareas a realizar de DAI. \n/ktengoSPSI para obtener las tareas a realizar de SPSI."
              break;
        }       
        await enviaMensaje(chat.id, a_devolver);
    }
    else{ //no contiene texto el mensaje
        await enviaMensaje(chat.id, 'Text message is expected.');
    }
  
    return { statusCode: 200 };
}
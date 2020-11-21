const request = require('request-promise');
const data = require('./data.json');

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

function getAsignaturas(){
  num_asignaturas = 3;
  a_devolver = "";
  for(i = 1; i <= num_asignaturas; i++){
    a_devolver += data['asignaturas'][i]["nombreAsignatura"] + "-> " +  data['asignaturas'][i]["tareas"] + " Fecha: " + data['asignaturas'][i]["fecha_tareas"] + "\n";
  }
  return a_devolver;
}

//HANDLER
exports.handler = async function(event, context) {
    let body = JSON.parse(event.body);
    let {chat, text} = body.message;
  
    if (text){ //Contiene texto el mensaje, será el comando
        let a_devolver = '';
        switch (text) {
            case "/ktengo":
                a_devolver = getAsignaturas();
                break;
            case "/ktengourgente":
                a_devolver = "Que tareas tengo que hacer urgentemente";
                break;
            default:
                a_devolver = "Usa /ktengo para saber que tareas tienes que realizar y  /ktengourgente para obtener una lista ordenada por urgencia de tareas a realizar"
                break;
        }       
        await enviaMensaje(chat.id, a_devolver);
    }
    else{ //no contiene texto el mensaje
        await enviaMensaje(chat.id, 'Text message is expected.');
    }
  
    return { statusCode: 200 };
}

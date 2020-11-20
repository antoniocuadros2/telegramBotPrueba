const rp = require('request-promise');
const TELEGRAM_TOKEN = process.env.TELEGRAMBOTTOKEN;

async function getShortUrl(longUrl) {
  const options = {
    method: 'POST',
    uri: 'https://cleanuri.com/api/v1/shorten',
    form: {
      url: String(longUrl).trim()
    },
    json: true
  };

  return rp(options);
}

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
      try {
        const result = await getShortUrl(text);
        message = `Input: ${text}, \nShort: ${result.result_url}`;
      } catch (error) {
        message = `holaCaraCola`;
      }
  
      await sendToUser(chat.id, message);
    } else { //no contiene texto el mensaje
      await sendToUser(chat.id, 'Text message is expected.');
    }
  
    return { statusCode: 200 };
}

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

module.exports.shortbot = async event => {
  const body = JSON.parse(event.body);
  const {chat, text} = body.message;

  if (text) {
    let message = '';
    try {
      const result = await getShortUrl(text);
      message = `Input: ${text}, \nShort: ${result.result_url}`;
    } catch (error) {
      message = `Input: ${text}, \nError: ${error.message}`;
    }

    await sendToUser(chat.id, message);
  } else {
    await sendToUser(chat.id, 'Text message is expected.');
  }

  return { statusCode: 200 };
};


//HANDLER
exports.handler = async function(event, context) {
    const body = JSON.parse(event.body);
    const {chat, text} = body.message;
  
    if (text) {
      let message = '';
      try {
        const result = await getShortUrl(text);
        message = `Input: ${text}, \nShort: ${result.result_url}`;
      } catch (error) {
        message = `holaCaraCola`;
      }
  
      await sendToUser(chat.id, message);
    } else {
      await sendToUser(chat.id, 'Text message is expected.');
    }
  
    return { statusCode: 200 };
}

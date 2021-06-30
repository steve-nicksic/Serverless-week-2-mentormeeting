const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = async function (context, req) {
    const text = req.query.text
    let translated
    if (text) {
        try{
            //translated = await translate(text)
            sendSMS(text)
        }catch(err){
            context.log(err)
            translate = "Error translating :(("
        }
    }else{
        translated = "No text to be translated!! :("
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: translated
    };
}

async function translate(text){
    // Will get the text and translate to yoda language
    // Call fun translatations api and return translated
    
    // Eg: Hello from earth!!

    // Convert string to http escaped version of text
    // Eg: Hello%20from%20earth!!
    const escaped = querystring.escape(text)
    const response = await fetch('https://api.funtranslations.com/translate/yoda.json?text=' + escaped)
    const data = await response.json()
    return data.contents.translated
}

async function sendSMS(messageTxt){
    const accountSid = "REPLACE IN YOUR TWILIO SETTINGS";
    const authToken = "REPLACE IN YOUR TWILIO SETTINGS";

    const client = require('twilio')(accountSid, authToken);

    const response = await client.messages
      .create({body: messageTxt, 
        from: 'REPLACE TWILLIO CREATED PHONE NUMBER', 
        to: '+15558675310'})

    return message.sid
}

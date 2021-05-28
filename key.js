const crypto = require('crypto');


function createKey() {
    let header = {
        "alg": "HS256",
        "typ": "JWT",
    }

    let encodeHeader = Buffer.from(JSON.stringify(header))
        .toString('base64')
        .replace('=', '');

    let payload = {
        "sub": "1234567890",
        "name": "John",
        "iat": 123325,
    }

    let encodePayload = Buffer.from(JSON.stringify(payload))
        .toString('base64')
        .replace('=', '');


    let signature = crypto.createHmac('sha256', Buffer.from('any memo'))
        .update(`${encodeHeader}.${encodePayload}`)
        .digest('base64').replace('=', '');

    console.log('signature is ' + signature)
    return signature;
}

module.exports = createKey;
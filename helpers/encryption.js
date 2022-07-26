const cryptoJS = require("crypto-js");

const AES = cryptoJS.AES;
const enc = cryptoJS.enc;

// To generate KEY and IV:
// const crypto = require("crypto");
// crypto.randomBytes(64).toString("base64");

const KEY = enc.Utf8.parse(process.env.KEY);
const IV = enc.Utf8.parse(process.env.IV);


const encrypt = plainText => {
  const AESCipher = AES.encrypt(plainText, KEY, { iv: IV });
  return AESCipher.toString();
};

const decrypt = AESCipher => {
  const AESCipherText = AES.decrypt(AESCipher, KEY, { iv: IV });
  const text = AESCipherText.toString(enc.Utf8);
  return text;
};

module.exports = {
    encrypt,
    decrypt
};

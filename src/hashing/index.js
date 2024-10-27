import { AES, enc } from 'crypto-js';
export const decryptMessage = (encryptedMessage) => {
   try {
      const env = process.env.NEXT_PUBLIC_ENG_ENV;
      if (env == "production") {
         const bytes = AES.decrypt(encryptedMessage, "$207@OnQL7L");
         const decrypted = bytes.toString(enc.Utf8);
         return JSON.parse(decrypted);
      }
      else return encryptedMessage;
   } catch (err) {
      console.log('UNABLE TO DECIPHER', err);
   }
};
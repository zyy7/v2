const { MessageType } = require('@adiwajshing/baileys')
const PhoneNumber = require('awesome-phonenumber')
async function handler(m) {
this.sendMessage(m.chat,{
   contacts: [{
  "displayName": 'Pelajar masa depan',
      "vcard": "BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:ᴛʜᴇ.ꜱᴀᴅ.ʙᴏʏ01⟿͡⃟͜✪͜͡๘ཱུᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭᮭ྆྆྆྆ғʀ͠ɪᴇɴ͠ᴅ♟᭄\nitem1.TEL;waid=6285924761802:6285924761802\nitem1.X-ABLabel:👑 Creator\nitem2.EMAIL;type=INTERNET:jojoganz191107@gmail.com\nitem2.X-ABLabel:📧 Email\nitem3.URL:https://github.com/zyy7\nitem3.X-ABLabel:⚙️Github\nitem4.ADR:;;🇮🇩 Indonesia;;;;\nitem4.X-ABADR:ac\nitem4.X-ABLabel:🌍 Region Wibu Id\nitem5.X-ABLabel:⚔️ TOHRU - BOT DEVELOPER\nEND:VCARD" 
    }]
 }, MessageType.contactsArray, {
    quoted: m,
    contextInfo: {
        externalAdReply: {
            title: `⚔️ TOHRU-BOT DEVELOPER`,
            body: `◈ Made by 𝙕𝙮𝙮𝙓𝙙`,
            description: `◈ Made by  𝙕𝙮𝙮𝙓𝙙`,
            mediaType: 2,
          thumbnail: img,
         mediaUrl: 'github.com/zyy7'
        }
     }
    })
 conn.send2Button(m.chat, `Mau tanya apa ke Real Owner ku ?\nsc bot ? tekan button bawah ini jika tidak ada button ketik *.sc*`, 'Tuh owner Ku Jangan Galak² Ya >_<, Nanti Ku Banned Nanges>.<', m)
}

handler.command = /^(rowner)$/i

module.exports = handler
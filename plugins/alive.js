let fetch = require('node-fetch')
let fs = require('fs')
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}

let handler  = async (m, { conn }) => {
  pplink = await conn.getProfilePicture(conn.user.jid)
  ppstatus = await conn.getStatus(conn.user.jid)
  totaluser = Object.keys(db.data.users)
  ppbuffer = await fetch(pplink).then(v => v.buffer())
  conn.sendMessage(m.chat, ppbuffer, 'imageMessage', { caption:`
❏ *𝙱𝚘𝚝 𝙽𝚊𝚖𝚎* : ${conn.user.name}
❏ *𝙶𝚛𝚘𝚞𝚙 𝙲𝚑𝚊𝚝𝚜* : ${conn.chats.array.filter(v => v.jid.endsWith('g.us')).map(v => v.jid).length}
❏ *𝙿𝚎𝚛𝚜𝚘𝚗𝚊𝚕 𝙲𝚑𝚊𝚝𝚜* : ${conn.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net')).map(v => v.jid).length}
❏ *𝚄𝚜𝚎𝚛 𝚃𝚘𝚝𝚊𝚕* : ${totaluser.length}
❏ *𝚆𝚊 𝚆𝚎𝚋 𝙽𝚊𝚖𝚎* : ${conn.browserDescription[0]}
❏ *𝚆𝚊 𝚆𝚎𝚋 𝚅𝚎𝚛𝚜𝚒𝚘𝚗* : ${conn.browserDescription[2]}
❏ *𝙱𝚛𝚘𝚠𝚜𝚎𝚛* : ${conn.browserDescription[1]}
❏ *𝙿𝚕𝚊𝚝𝚏𝚛𝚘𝚖* : Safari Linux
❏ *𝚄𝚙𝚝𝚒𝚖𝚎 𝙱𝚘𝚝* : ${clockString(process.uptime() * 1000)}
❏ *𝙷𝚘𝚜𝚝 𝙽𝚞𝚖𝚋𝚎𝚛* : @${global.conn.user.jid.split('@')[0]}
❏ *𝙱𝚒𝚘 𝙱𝚘𝚝* : ${ppstatus.status}`, quoted: m, sendEphemeral: true, thumbnail: fs.readFileSync('./src/R-Txzy.png'), contextInfo: { mentionedJid: [global.conn.user.jid]}})
}
handler.help = ['alive']
handler.tags = ['main']
handler.command = /^(alive)$/i
handler.fail = null

module.exports = handler

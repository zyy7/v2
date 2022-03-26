const fetch = require('node-fetch')
let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`contoh:\n${usedPrefix + command} jakarta`)
    let res = await fetch(global.API('zeks', '/api/jadwalsholat', { daerah: text }, 'apikey'))
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let json = await res.json()
    if (!json.status) {
        if (json.message == 'use of apikey reached the limit') throw json
        let hasil = json.listdaerah.map((v, i) => `│ ${i + 1}. ${v}`).join`\n`
        m.reply(`
*${json.message}*

contoh:
${usedPrefix + command} jakarta

┌ *𝗗𝗮𝗳𝘁𝗮𝗿 𝗗𝗮𝗲𝗿𝗮𝗵*
│ 
${hasil}
│ 
└────`.trim())
        throw false
    }
    m.reply(`Jadwal Sholat ${text}\n\n${json.data.string}`.trim())

}
handler.help = ['salat <daerah>']
handler.tags = ['quran']
handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i

module.exports = handler
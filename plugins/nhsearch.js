let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
    let res = await fetch(global.API('lolhum', '/api/nhentaisearch', { query: text }, 'apikey'))
    if (!res.ok) throw await res.text()
    let json = await res.json()
    let keqing = json.result.map((v, i) => `#${i + 1}. \n*𝙺𝚘𝚍𝚎:* ${v.id}\n*𝚃𝚒𝚝𝚕𝚎 𝙴𝚗𝚐𝚕𝚒𝚜𝚑:* ${v.title_english}\n*𝚃𝚒𝚝𝚕𝚎 𝙹𝚊𝚙𝚊𝚗𝚎𝚜𝚎:* ${v.title_japanese}\n*𝚃𝚒𝚝𝚕𝚎:* ${v.title_native}\n*𝙳𝚊𝚝𝚎:* ${v.date_upload}\n*𝙿𝚊𝚐𝚎:* ${v.page}\n*𝙵𝚊𝚟𝚘𝚞𝚛𝚒𝚝𝚎:* ${v.favourite}\n==============\n`).join('\n') 
    if (json.status) m.reply(keqing)
    else throw json
}
handler.help = ['nhsearch <query>']
handler.tags = ['internet']
handler.nsfw = true
handler.command = /^(nhs|nhsearch)$/i

module.exports = handler
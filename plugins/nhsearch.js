let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
    let res = await fetch(global.API('lolhum', '/api/nhentaisearch', { query: text }, 'apikey'))
    if (!res.ok) throw await res.text()
    let json = await res.json()
    let keqing = json.result.map((v, i) => `#${i + 1}. \n*πΊπππ:* ${v.id}\n*πππππ π΄ππππππ:* ${v.title_english}\n*πππππ πΉπππππππ:* ${v.title_japanese}\n*πππππ:* ${v.title_native}\n*π³πππ:* ${v.date_upload}\n*πΏπππ:* ${v.page}\n*π΅ππππππππ:* ${v.favourite}\n==============\n`).join('\n') 
    if (json.status) m.reply(keqing)
    else throw json
}
handler.help = ['nhsearch <query>']
handler.tags = ['internet']
handler.nsfw = true
handler.command = /^(nhs|nhsearch)$/i

module.exports = handler
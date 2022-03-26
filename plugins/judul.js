let fetch = require('node-fetch')
const uploadFile = require('../lib/uploadFile')
let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Reply audio dengan caption #judul'
  let media = await q.download()
  let url = await uploadFile(media)
  let res = await fetch(global.API('zeks', '/api/searchmusic', { audio: url }, 'apikey'))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  let caption = `
𝐋𝐚𝐠𝐮 𝐃𝐢𝐭𝐞𝐦𝐮𝐤𝐚𝐧!!
𝙹𝚞𝚍𝚞𝚕: ${json.data.title}
𝙰𝚛𝚝𝚒𝚜: ${json.data.artist}
𝙶𝚎𝚗𝚛𝚎: ${json.data.genre}
𝙰𝚕𝚋𝚞𝚖: ${json.data.album}
𝚁𝚎𝚊𝚕𝚎𝚜𝚎 𝙳𝚊𝚝𝚎: ${json.data.relese_date}
Note: Hasil dari api.zeks.xyz. Hasil bisa tidak akurat.
©𝑱𝑶•𝑩𝑶𝑻𝒁☠︎︎ 𝙱𝚈 𝙕𝙮𝙮𝙓𝙙
`.trim()
    conn.reply(m.chat, caption, m)
}
handler.tags = ['internet']
handler.help = ['judul <reply audio>']
handler.command = /^judul$/i
module.exports = handler
const { servers, yta, ytv } = require('../lib/y2mate')
let yts = require('yt-search')
let fetch = require('node-fetch')
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Harap masukkan query!\n\nContoh: ${usedPrefix + command} yanagi nagi one's hope`
  let chat = global.db.data.chats[m.chat]
  let results = await yts(text)
  let vid = results.all.find(video => video.seconds < 3600)
  if (!vid) throw 'Konten Tidak ditemukan'
  let isVideo = /2$/.test(command)
  let yt = false
  let yt2 = false
  let usedServer = servers[0]
  for (let i in servers) {
    let server = servers[i]
    try {
      yt = await yta(vid.url, server)
      yt2 = await ytv(vid.url, server)
      usedServer = server
      break
    } catch (e) {
      m.reply(`Server ${server} error!${servers.length >= i + 1 ? '' : '\nmencoba server lain...'}`)
    }
  }
  if (yt === false) throw 'semua server gagal'
  if (yt2 === false) throw 'semua server gagal'
  let { dl_link, thumb, title, filesize, filesizeF } = yt
  await conn.send2ButtonLoc(m.chat, await (await fetch(thumb)).buffer(), `
*𝙹𝚞𝚍𝚞𝚕:* ${title}
*𝚄𝚔𝚞𝚛𝚊𝚗 𝙵𝚒𝚕𝚎 𝙰𝚞𝚍𝚒𝚘:* ${filesizeF}
*𝚄𝚔𝚞𝚛𝚊𝚗 𝙵𝚒𝚕𝚎 𝚅𝚒𝚍𝚎𝚘:* ${yt2.filesizeF}
*𝚂𝚎𝚛𝚟𝚎𝚛 𝚈2𝚖𝚊𝚝𝚎:* ${usedServer}
`.trim(), watermark, '𝘼𝙪𝙙𝙞𝙤', `.yta ${vid.url}`, '𝙑𝙞𝙙𝙚𝙤', `.yt ${vid.url}`)
}
handler.help = ['play'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^(p|play)$/i

handler.exp = 0

module.exports = handler


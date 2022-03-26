let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, args, command }) => {
  if (!args[0]) throw `Harap masukkan code sebagai parameter!\n\nContoh: ${usedPrefix + command} 304307`
  let res1 = await fetch(global.API('lolhum', `/api/nhentai/${args[0]}`, {}, 'apikey'))
  if (!res1.ok) throw await res1.text()
  let json = await res1.json()
  let ayaka = `
𝚃𝚒𝚝𝚕𝚎: ${json.result.title_romanji}
𝙽𝚊𝚝𝚒𝚟𝚎: ${json.result.title_native}
𝙿𝚊𝚛𝚘𝚍𝚒𝚎𝚜: ${json.result.info.parodies}
𝚃𝚊𝚐𝚜: ${json.result.info.tags}
𝙿𝚊𝚐𝚎𝚜: ${json.result.info.pages}
𝚄𝚙𝚕𝚘𝚊𝚍𝚎𝚍: ${json.result.info.uploaded}
`.trim()
let thumbnail = await(await fetch(json.result.image[0])).buffer()
let poi = await(await fetch(thumbfoto)).buffer()
await conn.reply(m.chat, ayaka, m, { contextInfo: {
  externalAdReply: {
    mediaUrl: 'https://youtu.be/-tKVN2mAKRI',
    title: 'Doujin Downloader',
    body: `Code: ${args[0]}`,
    thumbnail: thumbnail
  }
}
})
await conn.reply(m.chat, 'Uploading...', m, { contextInfo: {
  externalAdReply: {
    mediaUrl: 'https://youtu.be/-tKVN2mAKRI',
    title: 'Doujin Downloader',
    body: `Code: ${args[0]}`,
    thumbnail: thumbnail
  }
}
})
  let res2 = await fetch(global.API('lolhum', `/api/nhentaipdf/${args[0]}`, {}, 'apikey'))
  let hakta = await res2.json()
  await conn.sendFile(m.chat, hakta.result, '[Haruno Bot]' + ' ' + `${args[0]}` + '.pdf', '', m, false, { asDocument: true, thumbnail: thumbnail})
}
handler.tags = ['downoader']
handler.command = /^(nh|nhentai|doujin)$/i
handler.help = ['nhentai']
module.exports = handler
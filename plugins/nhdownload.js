let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, args, command }) => {
  if (!args[0]) throw `Harap masukkan code sebagai parameter!\n\nContoh: ${usedPrefix + command} 304307`
  let res1 = await fetch(global.API('lolhum', `/api/nhentai/${args[0]}`, {}, 'apikey'))
  if (!res1.ok) throw await res1.text()
  let json = await res1.json()
  let ayaka = `
πππππ: ${json.result.title_romanji}
π½πππππ: ${json.result.title_native}
πΏπππππππ: ${json.result.info.parodies}
ππππ: ${json.result.info.tags}
πΏππππ: ${json.result.info.pages}
ππππππππ: ${json.result.info.uploaded}
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
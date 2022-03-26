const fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Harap masukkan judul lagu!\n\nContoh:\n${usedPrefix + command} yanagi nagi one's hope`
    if (isUrl(text)) throw `Parameter harus berupa judul, bukan URL!\n\nContoh: ${usedPrefix + command} yanagi nagi one's hope`

    let res = await fetch(global.API('pencarikode', '/download/joox', { search: text }, 'apikey'))
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let json = await res.json()
    if (!json.status) throw json
    let { judul, artist, album, img_url, mp3_url, filesize, duration } = json.result
    let pesan = `
𝙹𝚞𝚍𝚞𝚕: ${judul}
𝙰𝚛𝚝𝚒𝚜: ${artist}
𝙰𝚕𝚋𝚞𝚖: ${album}
Ukuran File: ${filesize}
𝙳𝚞𝚛𝚊𝚜𝚒: ${duration}

${watermark}
    `.trim()

    conn.sendFile(m.chat, img_url, 'eror.jpg', pesan, m, 0, { thumbnail: await (await fetch(img_url)).buffer() })
    conn.sendFile(m.chat, mp3_url, 'error.mp3', '', m, 0, { asDocument: global.db.data.chats[m.chat].useDocument, mimetype: 'audio/mp4' })

}
handler.help = ['joox'].map(v => v + ' <judul>')
handler.tags = ['downloader']
handler.command = /^joox$/i

module.exports = handler

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
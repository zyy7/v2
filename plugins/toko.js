let fetch = require('node-fetch')
const fs = require('fs')
let handler = async(m, { conn, usedPrefix, command }) => {
    let toko = JSON.parse(fs.readFileSync(`./src/toko.json`))
    let json = toko[Math.floor(Math.random() * toko.length)]
    let caption = `
*ð¡ð®ðºð® ð£ð¿ð¼ð±ðð¸*: ${json.name}

*ðð²ðð¸ð¿ð¶ð½ðð¶*: ${json.desc}

*ð£ð²ð»ð·ðð®ð¹*: wa.me/${json.jual}
`.trim()
    await conn.send2ButtonImg(m.chat, await(await fetch(json.img)).buffer(), caption, 'Mau produknya dipajang juga? Ketik tombol TAMBAH', 'NEXTâ¡ï¸', '.produk', 'TAMBAHð¦', '.tambah', m)
}
handler.command = /produk$/i
handler.tags = ['main']
handler.help = ['produk']
module.exports = handler 
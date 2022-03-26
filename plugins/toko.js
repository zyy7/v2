let fetch = require('node-fetch')
const fs = require('fs')
let handler = async(m, { conn, usedPrefix, command }) => {
    let toko = JSON.parse(fs.readFileSync(`./src/toko.json`))
    let json = toko[Math.floor(Math.random() * toko.length)]
    let caption = `
*𝗡𝗮𝗺𝗮 𝗣𝗿𝗼𝗱𝘂𝗸*: ${json.name}

*𝗗𝗲𝘀𝗸𝗿𝗶𝗽𝘀𝗶*: ${json.desc}

*𝗣𝗲𝗻𝗷𝘂𝗮𝗹*: wa.me/${json.jual}
`.trim()
    await conn.send2ButtonImg(m.chat, await(await fetch(json.img)).buffer(), caption, 'Mau produknya dipajang juga? Ketik tombol TAMBAH', 'NEXT➡️', '.produk', 'TAMBAH📦', '.tambah', m)
}
handler.command = /produk$/i
handler.tags = ['main']
handler.help = ['produk']
module.exports = handler 
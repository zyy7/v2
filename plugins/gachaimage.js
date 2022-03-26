let fetch = require('node-fetch')

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let er = `
┌〔 𝗟𝗶𝘀𝘁 𝗚𝗮𝗰𝗵𝗮 〕
├ waifu
├ husbu
├ neko
├ loli
├ elf
├ shota
├ sagiri
├ elaina
├ kanna
├ shinobu
├ megumin
├ art
├ wallnime
└────

Contoh:
${usedPrefix + command} elf
Credit: Khael
    `.trim()

    switch (args[0].toLowerCase()) {
        case 'waifu':
        case 'husbu':
        case 'neko':
        case 'loli':
        case 'elf':
        case 'shota':
        case 'sagiri':
        case 'kanna':
        case 'elaina':
        case 'shinobu':
        case 'megumin':
        case 'art':
        case 'wallnime':
		let res = await fetch(global.API('lolhum', '/api/random/' + args[0].toLowerCase(), {}, 'apikey'))
		m.reply(global.wait)
			if (!res.ok) throw await res.text()
			let img = await res.buffer()
			if (!img) throw img
				conn.sendButtonImg(m.chat, await(img), '𝘕𝘪𝘩 ' + args[0].toLowerCase() + ' nya', watermark, '⏩Get Again', `${usedPrefix}gacha ` + args[0].toLowerCase(), m)
            break
        default:
            throw er
    }
}
handler.help = ['gacha'].map(v => v + ' <teks>')
handler.tags = ['gacha']
handler.command = /^gacha$/i

handler.limit = true

module.exports = handler
//credit: Khael
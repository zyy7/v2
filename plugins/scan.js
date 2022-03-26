// Thanks to TOXIC-DEVIL
// https://github.com/TOXIC-DEVIL

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args || !args[0] || args.length === 0) throw `uhm.. nomornya mana?\n\ncontoh:\n${usedPrefix + command} 6285157336614`
    if (args[0].startsWith('0')) throw 'Gunakan kode Negara!'
    let user = await conn.isOnWhatsApp(args[0])
    let exists = user && user.exists ? true : false
    if (exists) {
        let sameGroup = [], isInDatabase = false
        let chat = conn.chats.all().filter(v => v.jid.endsWith('g.us') && !v.read_only)
        for (let gc of chat) {
            let participants = gc && gc.metadata && gc.metadata.participants ? gc.metadata.participants : []
            if (participants.some(v => v.jid === user.jid)) sameGroup.push(gc.jid)
        }
        if (user.jid in global.db.data.users) isInDatabase = true
        let str = ` 
*𝙽𝚊𝚖𝚊:* ${conn.getName(user.jid)}
*𝙽𝚘𝚖𝚘𝚛:* ${splitM(user.jid)}
*𝙼𝚎𝚗𝚝𝚒𝚘𝚗:* ${toM(user.jid)}
*𝙰𝚙𝚒:* wa.me/${splitM(user.jid)}
*𝙹𝙸𝙳:* ${user.jid}
*𝚆𝚑𝚊𝚝𝚜𝚊𝚙𝚙 𝙱𝚞𝚜𝚒𝚗𝚎𝚜𝚜:* ${user.isBusiness ? '✅' : '❌'}
*𝙳𝚒 𝙳𝚊𝚝𝚊𝚋𝚊𝚜𝚎:* ${isInDatabase ? '✅' : '❌'}
*𝙶𝚛𝚘𝚞𝚙 𝚈𝚐 𝚂𝚊𝚖𝚊 𝙳𝚎𝚗𝚐𝚊𝚗 𝙱𝚘𝚝:* ${sameGroup.length} *Grup*
`.trim()
        m.reply(str, m.chat, {
            contextInfo: {
                mentionedJid: conn.parseMention(str)
            }
        })
    } else throw 'nomor tidak terdaftar'
}

handler.help = ['scan'].map(v => v + ' [nomor]')
handler.tags = ['tools']
handler.command = /^scan$/i

module.exports = handler

function splitM(jid) {
    return jid.split('@')[0]
}

function toM(jid) {
    return '@' + splitM(jid)
}
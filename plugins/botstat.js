let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
    let { anon, anticall, antispam, antitroli, backup, jadibot, groupOnly, nsfw } = global.db.data.settings[conn.user.jid]
    const chats = conn.chats.all()
    const groups = chats.filter(v => v.jid.endsWith('g.us'))
    let totaljadibot = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user)])]

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)

    let str = `
╭─────[ *𝙎𝙩𝙖𝙩𝙪𝙨* ]────✧
├◌ 𝙰𝚔𝚝𝚒𝚏 𝚂𝚎𝚕𝚊𝚖𝚊 ${uptime}
├◌ 𝙱𝚊𝚝𝚎𝚛𝚊𝚒 ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 pengisian' : ''}` : 'tidak diketahui'}
├◌ *${groups.length}* 𝙶𝚛𝚘𝚞𝚙
├◌ *${chats.length - groups.length}* 𝙲𝚑𝚊𝚝 𝙿𝚛𝚒𝚋𝚊𝚍𝚒(







𝙢


 
 
 
 
  
  
  
├◌ *${Object.keys(global.db.data.users).length}* 𝙿𝚎𝚗𝚐𝚞𝚗𝚊
├◌ *${totaljadibot.length}* 𝙹𝚊𝚍𝚒𝚋𝚘𝚝
├◌ *${conn.blocklist.length}* 𝚃𝚎𝚛𝚋𝚕𝚘𝚌𝚔
├◌ *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* 𝙲𝚑𝚊𝚝 𝚃𝚎𝚛𝚋𝚊𝚗𝚗𝚎𝚍
├◌ *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* 𝙿𝚎𝚗𝚐𝚞𝚗𝚊 𝚃𝚎𝚛𝚋𝚊𝚗𝚗𝚎𝚍
╰────────────···
╭─────[ *𝙋𝙚𝙣𝙜𝙖𝙩𝙪𝙧𝙖𝙣* ]────✧
├ ${anon ? '✅' : '❌'} *𝙰𝚗𝚘𝚗 𝙲𝚑𝚊𝚝*
├ ${anticall ? '✅' : '❌'} *𝙰𝚗𝚝𝚒 𝙲𝚊𝚕𝚕*
├ ${antispam ? '✅' : '❌'} *𝙰𝚗𝚝𝚒 𝚂𝚙𝚊𝚖*
├ ${antitroli ? '✅' : '❌'} *𝙰𝚗𝚝𝚒 𝚃𝚛𝚘𝚕𝚒*
├ ${backup ? '✅' : '❌'} *𝙰𝚞𝚝𝚘 𝙱𝚊𝚌𝚔𝚞𝚙 𝙳𝙱*
├ ${groupOnly ? '✅' : '❌'} *𝙼𝚘𝚍𝚎 𝙶𝚛𝚘𝚞𝚙*
├ ${jadibot ? '✅' : '❌'} *𝙹𝚊𝚍𝚒𝙱𝚘𝚝*
├ ${nsfw ? '✅' : '❌'} *𝙼𝚘𝚍𝚎 𝙽𝚂𝙵𝚆*
╰────────────···`.trim()
     await conn.send2ButtonLoc(m.chat, await(await fetch(image)).buffer(), str, '©𝐽𝑂´𝐵𝑂𝑇𝑍☠︎︎', 'Owner', '.owner', 'Menu', '.menu', m)
}
handler.help = ['botstatus']
handler.tags = ['info']
handler.command = /^botstat(us)?$/i

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

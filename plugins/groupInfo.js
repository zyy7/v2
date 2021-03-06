let handler = async (m, { conn, participants, groupMetadata, text }) => {

    const getGroupAdmins = (participants) => {
        admins = []
        for (let i of participants) {
            i.isAdmin ? admins.push(i.jid) : ''
        }
        return admins
    }

    let pp = './src/avatar_contact.png'
    try {
        pp = await conn.getProfilePicture(m.chat)
    } catch (e) {
    } finally {
        let { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, expired, descUpdate, stiker } = global.db.data.chats[m.chat]
        const groupAdmins = getGroupAdmins(participants)
        let listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.split`@`[0]}`).join('\n')

        if (text) return m.reply(msToDate(expired - new Date() * 1))

        let caption = `*ππ£ππ€π§π’ππ¨π ππ§πͺπ₯*\n
*Ιͺα΄:* 
${groupMetadata.id}

*Ι΄α΄α΄α΄:* 
${groupMetadata.subject}

*α΄α΄sα΄ΚΙͺα΄sΙͺ:* 
${groupMetadata.desc}

*α΄α΄α΄α΄Κ α΄Ι΄Ι’Ι’α΄α΄α΄:*
${participants.length} πΈππππ π₯π

*Pα΄α΄Κα΄α΄α΄ Ι’Κα΄α΄α΄:* 
@${m.chat.split`-`[0]}

*α΄α΄α΄ΙͺΙ΄ Ι’Κα΄α΄α΄:*
${listAdmin}

*α΄α΄Ι΄Ι’α΄α΄α΄Κα΄Ι΄ Κα΄α΄:*
${antiLink ? 'β' : 'β'} Anti Link
${global.db.data.chats[m.chat].delete ? 'β' : 'β'} Anti Delete
${isBanned ? 'β' : 'β'} Banned
${descUpdate ? 'β' : 'β'} Deskprisi
${detect ? 'β' : 'β'} Detect
${stiker ? 'β' : 'β'} Stiker
${welcome ? 'β' : 'β'} Welcome

*α΄α΄Ι΄Ι’α΄α΄α΄Κα΄Ι΄ α΄α΄sα΄Ι΄ Κα΄α΄:*
Welcome: ${sWelcome}
Bye: ${sBye}
Promote: ${sPromote}
Demote: ${sDemote}

*α΄α΄ΚsΙͺsα΄:*
${msToDate(expired - new Date() * 1)}
`.trim()
        let mentionedJid = groupAdmins.concat([`${m.chat.split`-`[0]}@s.whatsapp.net`])
        conn.sendFile(m.key.remoteJid, pp, 'pp.jpg', caption, m, 0, { contextInfo: { mentionedJid } })
    }
}
handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(gro?upinfo|info(gro?up|gc))$/i

handler.group = true

module.exports = handler

function msToDate(ms) {
    temp = ms
    days = Math.floor(ms / (24 * 60 * 60 * 1000));
    daysms = ms % (24 * 60 * 60 * 1000);
    hours = Math.floor((daysms) / (60 * 60 * 1000));
    hoursms = ms % (60 * 60 * 1000);
    minutes = Math.floor((hoursms) / (60 * 1000));
    minutesms = ms % (60 * 1000);
    sec = Math.floor((minutesms) / (1000));
    return days + " hari " + hours + " jam " + minutes + " menit";
    // +minutes+":"+sec;
}
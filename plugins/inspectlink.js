let linkRegex = /chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text }) => {
  let [, code] = text.match(linkRegex) || []
  if (!code) throw 'Link invalid'
  let res = await conn.query({
    json: ["query", "invite", code],
    expect200: true
  })
  if (!res) throw res
  let caption = `
𝗚𝗿𝗼𝘂𝗽 𝗟𝗶𝗻𝗸 𝗜𝗻𝘀𝗽𝗲𝗰𝘁𝗼𝗿

${res.id}
*𝙹𝚞𝚍𝚞𝚕:* ${res.subject}
*𝙳𝚒𝚋𝚞𝚊𝚝* 𝙾𝚕𝚎𝚑 @${res.id.split('-')[0]} pada *${formatDate(res.creation * 1000)}*${res.subjectOwner ? `
*𝙹𝚞𝚍𝚞𝚕 𝙳𝚒𝚞𝚋𝚊𝚑* 𝙾𝚕𝚎𝚑 @${res.subjectOwner.split`@`[0]} pada *${formatDate(res.subjectTime * 1000)}*`: ''}${res.descOwner ? `
*𝙳𝚎𝚜𝚔𝚛𝚒𝚙𝚜𝚒 𝙳𝚒𝚞𝚋𝚊𝚑* 𝙾𝚕𝚎𝚑 @${res.descOwner.split`@`[0]} pada *${formatDate(res.descTime * 1000)}*` : ''}
*𝙹𝚞𝚖𝚕𝚊𝚑 𝙼𝚎𝚖𝚋𝚎𝚛:* ${res.size}
*𝙼𝚎𝚖𝚋𝚎𝚛 𝚈𝚐 𝙳𝚒𝚔𝚎𝚝𝚊𝚑𝚞𝚒 𝙹𝚘𝚒𝚗*: ${res.participants ? '\n' + res.participants.map((user, i) => ++i + '. @' + user.id.split`@`[0]).join('\n').trim() : 'Tidak ada'}
${res.desc ? `*𝙳𝚎𝚜𝚔𝚛𝚒𝚙𝚜𝚒:*
${res.desc}` : '*Tidak ada Deskripsi*'}

*JSON Version*
\`\`\`${JSON.stringify(res, null, 1)}\`\`\`
`.trim()
  let pp = await conn.getProfilePicture(res.id).catch(console.error)
  if (pp) conn.sendFile(m.chat, pp, 'pp.jpg', null, m)
  m.reply(caption, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(caption)
    }
  })
}
handler.help = ['inspect <chat.whatsapp.com>']
handler.tags = ['tools']

handler.command = /^inspect$/i

module.exports = handler

function formatDate(n, locale = 'id') {
  let d = new Date(n)
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
}
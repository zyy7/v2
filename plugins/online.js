let handler = async (m, { conn, args }) => {
  let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
  try {
    let online = [...Object.keys(conn.chats.get(id).presences), conn.user.jid]
    conn.reply(m.chat, 'āāć šš®š³šš®šæ š¢š»š¹š¶š»š² ć\n' + online.map(v => 'ā @' + v.replace(/@.+/, '')).join`\n` + '\nāāāāā', m, {
      contextInfo: { mentionedJid: online }
    })
  } catch (e) {
    m.reply('')
  }
}
handler.help = ['here', 'online']
handler.tags = ['group']
handler.command = /^(here|(list)?online)$/i
handler.owner = true
handler.group = false
module.exports = handler


// NurNurz
let handler = async (m, { conn, text, usedPrefix, args }) => {
  if (!text) throw `Harap masukkan text!\n\nContoh: ${usedPrefix + command} 𝑱𝑶•𝑩𝑶𝑻𝒁 𝑩𝒚 𝙕𝙮𝙮𝙓𝙙`
  try {
    await conn.updateProfileName(text)
    m.reply('Berhasil!')
  } catch (e) {
    console.log(e)
    throw `Error`
  }
}
handler.help = ['setbotname <teks>']
handler.tags = ['owner']
handler.command = /^(setbotname)$/i
handler.owner = true

module.exports = handler

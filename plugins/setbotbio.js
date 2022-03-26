// Koncol :v
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Harap masukan text!\n\n𝐂𝐨𝐧𝐭𝐨𝐡: ${usedPrefix + command} 𝑱𝑶•𝑩𝑶𝑻𝒁☠︎︎`
  try {
    await conn.setStatus(text)
    m.reply('Berhasil!')
  } catch (e) {
    console.log(e)
    throw `Eror`
  }
}
handler.help = ['setbotbio <teks>']
handler.tags = ['owner']
handler.command = /^(setbotbio)$/i
handler.owner = true

module.exports = handler

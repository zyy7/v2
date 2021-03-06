let fs = require('fs')
let fetch = require('node-fetch')
let handler = m => m

handler.all = async function (m, { isBlocked }) {

    if (isBlocked) return
    if (m.isBaileys) return
    if (m.chat.endsWith('broadcast')) return
    let setting = db.data.settings[this.user.jid]
    let { isBanned } = db.data.chats[m.chat]
    let { banned } = db.data.users[m.sender]

    // ketika ditag
    try {
        if (m.mentionedJid.includes(this.user.jid) && m.isGroup) {
            await this.send2Button(m.chat,
                isBanned ? 'π±πΆβ’π©πΆπ»πβ οΈοΈ tidak aktif' : banned ? 'kamu dibanned' : 'π±πΆβ’π©πΆπ»πβ οΈοΈ disini',
                'Β©π±πΆβ’π©πΆπ»πβ οΈοΈ',
                isBanned ? 'Unban' : banned ? 'Pemilik Bot' : 'Menu',
                isBanned ? '.unban' : banned ? '.owner' : '.?',
                m.isGroup ? 'Ban' : isBanned ? 'Unban' : 'Donasi',
                m.isGroup ? '.ban' : isBanned ? '.unban' : '.donasi', m)
        }
    } catch (e) {
        return
    }

    // ketika ada yang invite/kirim link grup di chat pribadi
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        this.send2ButtonLoc(m.chat, await (await fetch(fla + 'sewa bot')).buffer(), `β βγ Beli Bot γ β
β β₯ *1 Bulan* :      *Rp 10000*
β β₯ *Permanen* : *Rp 15000*
β β₯ *Premium* :   *Rp 15000*
β β₯ *Sc Bot* :        *Masih Beta*
β
β βγ PEMBAYARAN γ β
β β₯ Dana, Dan Pulsa
β
β β Tertarik Untuk Beli Bot Ini?
β β₯Ketuk Tombol Di Bawah Ya
β
β β Β©2021 Rpg wabot-aq
β β Script original by Nurutomo
β βγ π±πΆβ’π©πΆπ»π γ β`.trim(), 'Β© π±πΆβ’π©πΆπ»πβ οΈοΈ', 'Gopay', '#viadana', 'Pulsa', '#viapulsa', m)
}

    // salam
    let reg = /(ass?alam|Ψ§ΩΩΨ³ΩΩΩΨ§ΩΩΩ ΨΉΩΩΩΩΩΩΩΩΩ|Ψ§ΩΨ³ΩΨ§Ω ΨΉΩΩΪ©Ω)/i
    let isSalam = reg.exec(m.text)
    if (isSalam && !m.fromMe) {
        this.sendSticker(m.chat, fs.readFileSync('./src/salam.webp'), m, {sendEphemeral: true})
    }

    // backup db
    if (setting.backup) {
        if (new Date() * 1 - setting.backupDB > 1000 * 60 * 60) {
            let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            await global.db.write()
            this.reply(global.owner[0] + '@s.whatsapp.net', `Database: ${date}`, null)
            this.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync('./database.json'), 'database.json', '', 0, 0, { mimetype: 'application/json' })
            setting.backupDB = new Date() * 1
        }
    }

    // update status
    if (new Date() * 1 - setting.status > 1000) {
        let _uptime = process.uptime() * 1000
        let uptime = clockString(_uptime)
        await this.setStatus(`π  Aktif selama ${uptime} | β Mode: ${global.opts['self'] ? 'Private' : setting.groupOnly ? 'Hanya Grup' : 'Publik'} |Botz by ππ?π?ππΜΈ`).catch(_ => _)
        setting.status = new Date() * 1
    }

}

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

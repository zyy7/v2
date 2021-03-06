let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `
ββγ π±πΆβ’π©πΆπ»πβ οΈοΈ γ
β Hai, *%name!*
β Memory Used : *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
βββββ
%readmore`.trimStart(),
  header: 'ββγ %category γ',
  body: 'β %cmd %islimit %isPremium',
  footer: 'βββββ\n',
  after: `
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'edukasi', 'news', 'nsfw', 'xp', 'stiker', 'image', 'cristian', 'anime', 'kerangajaib', 'quotes', 'admin', 'rpg', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'quran', 'audio', 'jadibot', 'info', 'vote', 'tanpakategori', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Utama',
    'game': 'Game',
    'xp': 'Exp & Limit',
    'nsfw': `NSFW ${global.opts['nsfw'] ? '' : '(Dinonaktifkan)'}`,
    'sticker': 'Stiker',
    'edukasi': 'Edukasi',
    'news': 'News',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'rpg': 'Epic Rpg',
    'group': 'Grup',
    'anime': 'Anime',
    'premium': 'Premium',
    'internet': 'Internet',
    'image': 'Random Image',
    'anonymous': 'Anonymous Chat',
    'nulis': 'MagerNulis & Logo',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'cristian': 'cristian',
    'fun': 'Fun',
    'database': 'Database',
    'vote': 'Voting',
    'absen': 'Absen',
    'quran': 'Islam',
    'audio': 'Pengubah Suara',
    'jadibot': 'Jadi Bot',
    'info': 'Info',
    '': 'Tanpa Kategori',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }
  if (teks == 'nsfw') tags = {
    'hentai': 'Hentai',
    'bokep': 'Bokep'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Epic Rpg'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'cristian') tags = {
    'cristian': 'Cristian'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'image') tags = {
    'image': 'Random Image'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
    if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'quran') tags = {
    'quran': 'Islam'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
			return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
                    "listMessage":  {
                        "title": `*${ucapan()}, ${name}*`.trim(),
                        "description": `Β© *π±πΆβ’π©πΆπ»πβ οΈοΈ*`.trim(),
                        "footerText": "Jika menemukan bug, error atau kesulitan dalam penggunaan silahkan laporkan/tanyakan kepada owner.",
                        "buttonText": "*Click Here*",
                        "listType": "SINGLE_SELECT",
                        "sections": [
                            {
                                "rows": [{
                                    "title": "Status Bot",
                                    "description": "Status dan informasi Bot.",
                                    "rowId": ".botstatus"
                                }, {
                                    "title": "Rules",
                                    "description": "User yang bijak selalu mematuhi Rules.",
                                    "rowId": ".rules"
                                }, {
                                    "title": "Sewa bot - Premium",
                                    "description": "Untuk kamu yang ingin melihat daftar harga sewa dan premium.",
                                    "rowId": ".sewa"
                                }],
                                "title": "β£ββββββββββ² Tentang Bot dan lainnya β³βββββββββββ’"
                            }, {
                                "rows": [{
                                    "title": `[π§Ύ| Semua Perintah`,
                                    "description": "Memberikan Semua Fitur Bot",
                                    "rowId": ".? all"
                                }, { 
                                    "title": "|π| Islam",
                                    "description": "Menu Tentang Islam",
                                    "rowId": ".? quran"
                                }, {
                                	"title": "|βͺ| Cristian",
                                    "description": "Menu Tentang Kristen",
                                    "rowId": ".? cristian"
                                }, {
                                    "title": "|π«| Edukasi",
                                    "description": "Menu Edukasi",
                                    "rowId": ".? edukasi"
                                }, { 
                                    "title": "|π°| News",
                                    "description": "Menu Berita",
                                    "rowId": ".? News"
                                }, { 
                                    "title": "|π?| Game",
                                    "description": "Menu Game",
                                    "rowId": ".? game"
                                }, { 
                                    "title": "|πΊοΈ| Epic Rpg",
                                    "description": "Menu Game RPG",
                                    "rowId": ".? rpg"
                                }, { 
                                    "title": "|π| XP",
                                    "description": "XP Dan Level",
                                    "rowId": ".? xp"
                                }, { 
                                    "title": "|π| NSFW",
                                    "description": "Menu Bokep",
                                    "rowId": ".? nsfw"
                                }, { 
                                    "title": "|πΌοΈ| Random Image",
                                    "description": "Menu Foto Random",
                                    "rowId": ".? image"
                                }, { 
                                    "title": "|π| Stiker",
                                    "description": "Menu Buat Stiker",
                                    "rowId": ".? stiker"
                                }, { 
                                    "title": "|π| Kerang Ajaib",
                                    "description": "Menurut Kerang ajaib....",
                                    "rowId": ".? kerangajaib"
                                }, { 
                                    "title": "|π| Quotes",
                                    "description": "Menu Quotes",
                                    "rowId": ".? quotes"
                                }, { 
                                    "title": "|ποΈ| Admin",
                                    "description": "Menu Admin Group",
                                    "rowId": ".? admin"
                                }, { 
                                    "title": "|π’| Grup",
                                    "description": "Menu Group",
                                    "rowId": ".? grup"
                                }, { 
                                    "title": "|π| Premium",
                                    "description": "Menu Untuk Premium",
                                    "rowId": ".? premium"
                                }, { 
                                    "title": "|π₯οΈ| Internet",
                                    "description": "Cari Sesuatu Di Bot",
                                    "rowId": ".? internet"
                                }, { 
                                    "title": "|π₯·| Anonymous",
                                    "description": "Mainkan Anonymous Chat",
                                    "rowId": ".? anonymous"
                                }, { 
                                    "title": "|βοΈ| Nulis & Logo",
                                    "description": "Menu Nulis & Logo",
                                    "rowId": ".? nulis"
                                }, { 
                                    "title": "|πΊ| Downloader",
                                    "description": "Download Sesuatu Di Bot",
                                    "rowId": ".? downloader"
                                }, { 
                                    "title": "|π§| Tools",
                                    "description": "Tools Yang Bisa di Gunakan Di Bot",
                                    "rowId": ".? tools"
                                }, { 
                                    "title": "|π| Fun",
                                    "description": "Menu Ceria",
                                    "rowId": ".? fun"
                                }, { 
                                    "title": "|π| Database",
                                    "description": "Simpan Sesuatu Di Bot",
                                    "rowId": ".? database"
                                }, { 
                                    "title": "|π| Vote & Absen",
                                    "description": "Menu Vote & Absen",
                                    "rowId": ".? vote"
                                }, { 
                                    "title": "|ποΈ| Pengubah Suara",
                                    "description": "Ubah Suaramu",
                                    "rowId": ".? audio"
                                }, { 
                                    "title": "|π€| Jadi Bot",
                                    "description": "Jadi Bot",
                                    "rowId": ".? jadibot"
                                }, { 
                                    "title": "|β©οΈ| Anime",
                                    "description": "Cari Anime Di Bot",
                                    "rowId": ".? anime"
                                }, { 
                                    "title": "|βΉοΈ| Info",
                                    "description": "Info Tentang Bot",
                                    "rowId": ".? info"
                                }, { 
                                    "title": "Tanpa Kategori",
                                    "description": "",
                                    "rowId": ".? tanpakategori"
                                }, { 
                                    "title": "|π§βπ»| Owner",
                                    "description": "Menu Khusus Owner",
                                    "rowId": ".? owner"
                                }],
                                "title": "β£βββββββββββββββ²  All-Menu  β³βββββββββββββββ’"
                            }, {
                                "rows": [{
                                    "title": "Owner bot",
                                    "description": "pemilik π±πΆβ’π©πΆπ»πβ οΈοΈ",
                                    "rowId": ".owner"
                                }, {
                                    "title": "Donasi",
                                    "description": "Jangan lupa donasi untuk mendukung bot agar aktif selalu",
                                    "rowId": ".donasi"
                                }, {
                                    "title": "Kata penutup",
                                    "description": "Terimakasih untuk user yang telah menggunakan bot, jika ada kesalahan atau permintaan bisa chat ke nomor owner\nNote: chat P/mainΒ² tidak akan di respon(user bisa terkena banned/block)",
                                    "rowId": ".creator"
                                }, {
                                    "title": "Thanks To |ποΈ|",
                                    "description": "Terima kasih banyak untuk user yang telah berpartisipasi dalam bot",
                                    "rowId": ".tqto"
                                }],
                                "title": "β£βββββββββββββββ² Penutup β³ββββββββββββββββ’"
                            }
                        ], "contextInfo": 
						{ "stanzaId": m.key.id,
                        "participant": "0@s.whatsapp.net",
                        "remoteJid": "6283136505591-1614953337@g.us",
                        "quotedMessage": m.message
						}
                    }
                 }, {}), {waitForAck: true})
    }
    // gunakan ini jika kamu menggunakan whatsapp bisnis
    //   throw `
    // βγ DAFTAR MENU γ
    // β ${_p + command} all
    // β ${_p + command} game
    // β ${_p + command} xp
    // β ${_p + command} stiker
    // β ${_p + command} kerang
    // β ${_p + command} quotes
    // β ${_p + command} admin
    // β ${_p + command} group
    // β ${_p + command} premium
    // β ${_p + command} internet
    // β ${_p + command} anonymous
    // β ${_p + command} nulis
    // β ${_p + command} downloader
    // β ${_p + command} tools
    // β ${_p + command} fun
    // β ${_p + command} cristian
    // β ${_p + command} database
    // β ${_p + command} vote
    // β ${_p + command} quran
    // β ${_p + command} audio
    // β ${_p + command} jadibot
    // β ${_p + command} info
    // β ${_p + command} tanpa kategori
    // β ${_p + command} owner
    // βββββ  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send2ButtonLoc(m.chat, await (await fetch(thumbfoto)).buffer(), text.trim(), watermark, 'Pemilik Bot', `${_p}owner`, 'Donasi', `${_p}donasi`, m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(1)
const readMore = more.repeat(1)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat dinihariπ"
  if (time >= 4) {
    res = "Selamat pagiπ"
  }
  if (time > 10) {
    res = "Selamat siangποΈ"
  }
  if (time >= 15) {
    res = "Selamat soreπ"
  }
  if (time >= 18) {
    res = "Selamat malamπ"
  }
  return res
}

const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const { color } = require('./color')
require('./index.js')
nocache('./index.js', module => console.log(`${module} update`))

const starts = async (rechan = new WAConnection()) => {
    rechan.logger.level = 'warn'
    rechan.version = [ 2, 2147, 16 ]
    rechan.browserDescription = [ 'Bot', 'Safari', '3.0' ]
    rechan.on('qr', () => {
    //rechan.sendMessage(`6285849261085@s.whatsapp.net`, `「 BOT CONNECT 」\n\n${a}Hallo Kak!! Saya ${Miminnya} Izin Menggunakan Bot Ini!!${a}\n\n${a}BOT TERSAMBUNG PADA${a}\n${a}${time2}${a}\n\n${a}PROFILE${a}\n*Nama* : ${Miminnya}\n*Nomor* : ${ownerNumber}\n*Status* : Online\n\n${a}TERIMAKASIH KAK PEBRI!!${a}`, MessageType.extendedText)
    console.log(color('[','white'), color('!','cyan'), color(']','white'), color('Scan Ngab'))
    })

    fs.existsSync('./sesi.json') && rechan.loadAuthInfo('./sesi.json')
    rechan.on('connecting', () => {
    console.log('Connecting')
    })
    rechan.on('open', () => {
    console.log('Dah Connect Tuhh!!')
    })
    await rechan.connect({timeoutMs: 30*1000})
    fs.writeFileSync('./sesi.json', JSON.stringify(rechan.base64EncodedAuthInfo(), null, '\t'))
    
    rechan.on('chat-update', async (message) => {
    require('./index.js')(rechan, message)
    })  
  }
/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()

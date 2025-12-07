const moment = require('moment-timezone');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const settings = require('../settings');

async function githubCommand(sock, chatId, message) {
  try {
    const res = await fetch('https://api.github.com/repos/CalebDevX/AchekBot');
    if (!res.ok) throw new Error('Error fetching repository data');
    const json = await res.json();

    let txt = `*✅  AchekBot - WhatsApp Bot  ✅*\n\n`;
    txt += `✓  *Name* : ${json.name || 'AchekBot'}\n`;
    txt += `✓  *Watchers* : ${json.watchers_count || 0}\n`;
    txt += `✓  *Size* : ${json.size ? (json.size / 1024).toFixed(2) : 'N/A'} MB\n`;
    txt += `✓  *Last Updated* : ${json.updated_at ? moment(json.updated_at).format('DD/MM/YY - HH:mm:ss') : 'N/A'}\n`;
    txt += `✓  *URL* : ${json.html_url || 'https://github.com/CalebDevX/AchekBot'}\n`;
    txt += `✓  *Forks* : ${json.forks_count || 0}\n`;
    txt += `✓  *Stars* : ${json.stargazers_count || 0}\n\n`;
    txt += `🏢 *Powered by Achek Digital Solutions*\n`;
    txt += `🌐 ${settings.website || 'https://achek.com.ng'}`;

    const imgPath = path.join(__dirname, '../assets/bot_image.jpg');
    
    if (fs.existsSync(imgPath)) {
      const imgBuffer = fs.readFileSync(imgPath);
      await sock.sendMessage(chatId, { 
        image: imgBuffer, 
        caption: txt,
        contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: settings.channelJid || '120363402198872825@newsletter',
            newsletterName: 'AchekBot - Achek Digital Solutions',
            serverMessageId: -1
          }
        }
      }, { quoted: message });
    } else {
      await sock.sendMessage(chatId, { 
        text: txt,
        contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: settings.channelJid || '120363402198872825@newsletter',
            newsletterName: 'AchekBot - Achek Digital Solutions',
            serverMessageId: -1
          }
        }
      }, { quoted: message });
    }
  } catch (error) {
    await sock.sendMessage(chatId, { 
      text: `✅ *AchekBot - WhatsApp Bot*\n\n🏢 *Powered by Achek Digital Solutions*\n🌐 ${settings.website || 'https://achek.com.ng'}\n\n_Repository info not available_` 
    }, { quoted: message });
  }
}

module.exports = githubCommand;

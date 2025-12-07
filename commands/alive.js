const settings = require("../settings");

async function aliveCommand(sock, chatId, message) {
    try {
        const message1 = `*✅ AchekBot is Active!*\n\n` +
                       `*Version:* ${settings.version}\n` +
                       `*Status:* Online\n` +
                       `*Mode:* Public\n\n` +
                       `*🌟 Features:*\n` +
                       `• Group Management\n` +
                       `• Antilink Protection\n` +
                       `• AI Commands\n` +
                       `• Media Downloads\n` +
                       `• Fun Commands\n` +
                       `• And more!\n\n` +
                       `🏢 *Powered by Achek Digital Solutions*\n` +
                       `🌐 ${settings.website || 'https://achek.com.ng'}\n\n` +
                       `Type *.menu* for full command list`;

        await sock.sendMessage(chatId, {
            text: message1,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: settings.channelJid || '120363402198872825@newsletter',
                    newsletterName: 'AchekBot - Achek Digital Solutions',
                    serverMessageId: -1
                }
            }
        }, { quoted: message });
    } catch (error) {
        console.error('Error in alive command:', error);
        await sock.sendMessage(chatId, { text: 'AchekBot is alive and running! 🤖' }, { quoted: message });
    }
}

module.exports = aliveCommand;

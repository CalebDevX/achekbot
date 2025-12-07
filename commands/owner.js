const settings = require('../settings');

async function ownerCommand(sock, chatId) {
    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${settings.botOwner} - Achek Digital Solutions
ORG:Achek Digital Solutions
TEL;waid=${settings.ownerNumber}:${settings.ownerNumber}
URL:${settings.website || 'https://achek.com.ng'}
END:VCARD
`;

    await sock.sendMessage(chatId, {
        contacts: { 
            displayName: `${settings.botOwner} - AchekBot Owner`, 
            contacts: [{ vcard }] 
        },
    });

    await sock.sendMessage(chatId, {
        text: `🏢 *Achek Digital Solutions*\n\n🌐 Website: ${settings.website || 'https://achek.com.ng'}\n📢 Channel: ${settings.channelLink || 'https://whatsapp.com/channel/0029VbAfyp57dmeXh5trtY2W'}\n💬 Support: ${settings.supportGroup || 'https://chat.whatsapp.com/FO5rtxtFuWBL5EUNc6wEO5'}`,
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: settings.channelJid || '120363402198872825@newsletter',
                newsletterName: 'AchekBot - Achek Digital Solutions',
                serverMessageId: -1
            }
        }
    });
}

module.exports = ownerCommand;

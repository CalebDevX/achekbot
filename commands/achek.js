const settings = require('../settings');

async function achekCommand(sock, chatId, message) {
    try {
        const achekMessage = `
╔═══════════════════════════════════╗
   🏢 *ACHEK DIGITAL SOLUTIONS*
╚═══════════════════════════════════╝

*Your Trusted Partner for Digital Excellence*

━━━━━━━━━━━━━━━━━━━━━━━━━━━

*🌟 Our Services:*

✓ *Web Development*
   Professional websites and web apps
   
✓ *Mobile App Development*
   iOS & Android applications
   
✓ *Digital Marketing*
   SEO, Social Media, PPC
   
✓ *Bot Development*
   WhatsApp & Telegram bots
   
✓ *IT Consulting*
   Tech solutions for your business
   
✓ *E-commerce Solutions*
   Online stores and payment integration

━━━━━━━━━━━━━━━━━━━━━━━━━━━

*📞 Contact Us:*
🌐 Website: ${settings.website || 'https://achek.com.ng'}
📱 WhatsApp: +234 810 404 0841

*📢 Follow Us:*
Join our channel for updates, tips, and promotions!

━━━━━━━━━━━━━━━━━━━━━━━━━━━

_"E no matter wetin your digital needs be, Achek dey got your back!"_

_Achek Digital Solutions - We Dey Move Your Business Forward! 🚀_
`;

        await sock.sendMessage(chatId, {
            text: achekMessage,
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
    } catch (error) {
        console.error('Error in achek command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to load Achek Digital Solutions info. Visit https://achek.com.ng' 
        }, { quoted: message });
    }
}

module.exports = achekCommand;

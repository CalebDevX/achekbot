
const startTime = Date.now();

async function uptimeCommand(sock, chatId, message) {
    const uptime = Date.now() - startTime;
    const seconds = Math.floor(uptime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const uptimeText = `
⏱️ *Bot Uptime*

📅 Days: ${days}
🕐 Hours: ${hours % 24}
⏰ Minutes: ${minutes % 60}
⏳ Seconds: ${seconds % 60}

✅ Status: Online
🤖 Running smoothly!

🏢 *Achek Digital Solutions*
🌐 https://achek.com.ng`;

    await sock.sendMessage(chatId, {
        text: uptimeText,
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402198872825@newsletter',
                newsletterName: 'AchekBot - Achek Digital Solutions',
                serverMessageId: -1
            }
        }
    }, { quoted: message });
}

module.exports = uptimeCommand;

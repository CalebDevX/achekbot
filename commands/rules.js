
async function rulesCommand(sock, chatId, message) {
    const rulesText = `
╔══════════════════════╗
   📜 *GROUP RULES*
╚══════════════════════╝

1️⃣ Be respectful to all members
2️⃣ No spam or excessive messages
3️⃣ No inappropriate content
4️⃣ No external links without permission
5️⃣ Follow admin instructions
6️⃣ Keep conversations on-topic
7️⃣ No personal attacks or harassment
8️⃣ English or group language only

⚠️ *Breaking rules may result in warnings or removal*

🏢 *Powered by Achek Digital Solutions*
🌐 https://achek.com.ng`;

    await sock.sendMessage(chatId, {
        text: rulesText,
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

module.exports = rulesCommand;

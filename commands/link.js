
async function linkCommand(sock, chatId, message) {
    try {
        if (!chatId.endsWith('@g.us')) {
            await sock.sendMessage(chatId, { 
                text: 'This command can only be used in groups!' 
            });
            return;
        }

        const inviteCode = await sock.groupInviteCode(chatId);
        const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;

        await sock.sendMessage(chatId, {
            text: `🔗 *Group Invite Link*\n\n${inviteLink}\n\n_Share this link to invite others!_\n\n🏢 *Achek Digital Solutions*\n🌐 https://achek.com.ng`,
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
    } catch (error) {
        console.error('Error in link command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to get group link. Make sure the bot is an admin!' 
        });
    }
}

module.exports = linkCommand;

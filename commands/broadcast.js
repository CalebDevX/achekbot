const settings = require('../settings');
const isOwnerOrSudo = require('../lib/isOwner');

async function broadcastCommand(sock, chatId, senderId, message, text) {
    try {
        const isOwner = await isOwnerOrSudo(senderId, sock, chatId);
        
        if (!isOwner) {
            await sock.sendMessage(chatId, {
                text: '❌ Only bot owner can use the broadcast command.',
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
            return;
        }

        if (!text || text.trim().length === 0) {
            await sock.sendMessage(chatId, {
                text: '❌ Please provide a message to broadcast.\n\nUsage: .broadcast <message>',
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
            return;
        }

        const broadcastMsg = `
╔═══════════════════════════════════╗
   📢 *ACHEKBOT BROADCAST*
╚═══════════════════════════════════╝

${text}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
_Sent by: ${settings.botOwner || 'Bot Owner'}_
_Powered by Achek Digital Solutions_
🌐 ${settings.website || 'https://achek.com.ng'}
`;

        try {
            const groups = await sock.groupFetchAllParticipating();
            const groupIds = Object.keys(groups);
            
            let successCount = 0;
            let failCount = 0;

            for (const groupId of groupIds) {
                try {
                    await sock.sendMessage(groupId, {
                        text: broadcastMsg,
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
                    successCount++;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } catch (err) {
                    failCount++;
                    console.error(`Failed to broadcast to ${groupId}:`, err.message);
                }
            }

            await sock.sendMessage(chatId, {
                text: `✅ *Broadcast Complete!*\n\n✓ Sent to: ${successCount} groups\n✗ Failed: ${failCount} groups`,
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
            console.error('Error fetching groups:', error);
            await sock.sendMessage(chatId, {
                text: '❌ Failed to fetch groups for broadcast.',
            }, { quoted: message });
        }
    } catch (error) {
        console.error('Error in broadcast command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to send broadcast.' 
        }, { quoted: message });
    }
}

module.exports = broadcastCommand;

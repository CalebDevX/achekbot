
const { delay } = require('@whiskeysockets/baileys');

async function bugCommand(sock, chatId, message, args) {
    try {
        const mentionedJid = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quotedParticipant = message.message?.extendedTextMessage?.contextInfo?.participant;
        
        const target = mentionedJid[0] || quotedParticipant;
        
        if (!target) {
            return await sock.sendMessage(chatId, {
                text: '❌ Please mention or reply to someone to bug them!\n\n*Usage:*\n.bug @user - Spam 20 messages\n.bug @user 50 - Custom amount (max 100)'
            });
        }

        // Check if sender is admin/owner
        const senderId = message.key.participant || message.key.remoteJid;
        const isGroup = chatId.endsWith('@g.us');
        
        if (isGroup) {
            const groupMetadata = await sock.groupMetadata(chatId);
            const isAdmin = groupMetadata.participants.find(p => p.id === senderId)?.admin;
            
            if (!isAdmin && !message.key.fromMe) {
                return await sock.sendMessage(chatId, {
                    text: '❌ Only admins can use this command!'
                });
            }
        }

        const count = Math.min(parseInt(args[0]) || 20, 100);
        
        await sock.sendMessage(chatId, {
            text: `⚠️ Bugging user with ${count} messages...`
        });

        const bugMessages = [
            '💥 BUG ATTACK 💥',
            '⚡ SPAM MODE ACTIVATED ⚡',
            '🔥 MISBEHAVIOR DETECTED 🔥',
            '⚠️ WARNING: ANNOYING MESSAGE ⚠️',
            '👾 BOT REVENGE 👾',
            '🚨 BEHAVE YOURSELF 🚨',
            '💣 SPAM BOMB 💣',
            '⚡ ZAP ZAP ZAP ⚡',
            '🌪️ MESSAGE STORM 🌪️',
            '👻 GHOST SPAM 👻'
        ];

        for (let i = 0; i < count; i++) {
            try {
                const randomMsg = bugMessages[Math.floor(Math.random() * bugMessages.length)];
                await sock.sendMessage(target, { 
                    text: `${randomMsg}\n\nMessage ${i + 1}/${count}\n\n_You've been bugged by AchekBot!_` 
                });
                
                // Random delay between 100-500ms to avoid rate limiting
                await delay(Math.random() * 400 + 100);
            } catch (err) {
                console.error('Bug message error:', err);
                break;
            }
        }

        await sock.sendMessage(chatId, {
            text: `✅ Successfully bugged the user with ${count} messages! 💥`
        });

    } catch (error) {
        console.error('Bug command error:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to bug user. They might have blocked the bot.'
        });
    }
}

module.exports = bugCommand;

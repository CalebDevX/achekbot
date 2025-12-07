const isAdmin = require('../lib/isAdmin');
const isOwnerOrSudo = require('../lib/isOwner');
const settings = require('../settings');
const fs = require('fs');
const path = require('path');

// Helper functions for tagall permissions
function getTagallPermissions() {
    const dataPath = path.join(__dirname, '../data/userGroupData.json');
    try {
        if (fs.existsSync(dataPath)) {
            const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
            return data.tagallPermissions || {};
        }
    } catch (error) {
        console.error('Error reading tagall permissions:', error);
    }
    return {};
}

function setTagallPermission(chatId, enabled) {
    const dataPath = path.join(__dirname, '../data/userGroupData.json');
    try {
        let data = {};
        if (fs.existsSync(dataPath)) {
            data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        }
        if (!data.tagallPermissions) {
            data.tagallPermissions = {};
        }
        data.tagallPermissions[chatId] = enabled;
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error setting tagall permission:', error);
        return false;
    }
}

async function tagAllCommand(sock, chatId, senderId, message) {
    try {
        const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);
        const isOwner = await isOwnerOrSudo(senderId, sock, chatId);

        if (!isBotAdmin) {
            await sock.sendMessage(chatId, { 
                text: '⚠️ Please make the bot an admin first.',
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

        // Check if it's a permission management command
        const userMessage = (message.message?.conversation || message.message?.extendedTextMessage?.text || '').toLowerCase().trim();
        const args = userMessage.split(' ');
        
        if (args[0] === '.tagall' && args[1]) {
            const subCommand = args[1].toLowerCase();
            
            // Only admins and owner can manage permissions
            if (!isSenderAdmin && !isOwner) {
                await sock.sendMessage(chatId, { 
                    text: '❌ Only group admins or bot owner can manage tagall permissions.',
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

            if (subCommand === 'on' || subCommand === 'enable') {
                setTagallPermission(chatId, true);
                await sock.sendMessage(chatId, { 
                    text: '✅ Tagall has been enabled for all members.\n\nNow everyone in this group can use .tagall command.',
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
            } else if (subCommand === 'off' || subCommand === 'disable') {
                setTagallPermission(chatId, false);
                await sock.sendMessage(chatId, { 
                    text: '🔒 Tagall has been disabled for regular members.\n\nOnly admins and bot owner can now use .tagall command.',
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
            } else if (subCommand === 'status') {
                const permissions = getTagallPermissions();
                const isEnabled = permissions[chatId] || false;
                await sock.sendMessage(chatId, { 
                    text: `📊 *Tagall Status*\n\nCurrent state: ${isEnabled ? '✅ Enabled for all members' : '🔒 Only admins can use'}\n\n*Usage:*\n.tagall on - Enable for everyone\n.tagall off - Admins only`,
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
        }

        // Check permissions for regular tagall usage
        const permissions = getTagallPermissions();
        const isTagallEnabled = permissions[chatId] || false;

        // Allow if: owner, admin, or tagall is enabled for all members
        if (!isOwner && !isSenderAdmin && !isTagallEnabled) {
            await sock.sendMessage(chatId, { 
                text: '❌ Tagall is currently disabled for regular members.\n\nAsk an admin to enable it with: .tagall on',
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

        const groupMetadata = await sock.groupMetadata(chatId);
        const participants = groupMetadata.participants;

        if (!participants || participants.length === 0) {
            await sock.sendMessage(chatId, { text: '❌ No participants found in the group.' });
            return;
        }

        let messageText = '📢 *Attention Everyone!*\n\n';
        participants.forEach(participant => {
            messageText += `@${participant.id.split('@')[0]}\n`;
        });
        messageText += `\n_Powered by AchekBot_\n🌐 ${settings.website || 'https://achek.com.ng'}`;

        await sock.sendMessage(chatId, {
            text: messageText,
            mentions: participants.map(p => p.id),
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

    } catch (error) {
        console.error('Error in tagall command:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to tag all members.' });
    }
}

module.exports = tagAllCommand;

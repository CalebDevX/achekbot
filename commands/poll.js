
async function pollCommand(sock, chatId, message) {
    try {
        const text = message.message?.conversation || 
                    message.message?.extendedTextMessage?.text || '';
        
        const args = text.slice(6).trim();
        
        if (!args) {
            await sock.sendMessage(chatId, {
                text: '📊 *How to create a poll:*\n\n`.poll Question | Option1 | Option2 | Option3`\n\nExample:\n`.poll Best food? | Pizza | Burger | Pasta`'
            }, { quoted: message });
            return;
        }

        const parts = args.split('|').map(p => p.trim());
        
        if (parts.length < 3) {
            await sock.sendMessage(chatId, {
                text: '❌ Please provide a question and at least 2 options!\n\nFormat: `.poll Question | Option1 | Option2`'
            }, { quoted: message });
            return;
        }

        const question = parts[0];
        const options = parts.slice(1);

        await sock.sendMessage(chatId, {
            poll: {
                name: question,
                values: options,
                selectableCount: 1
            }
        });
    } catch (error) {
        console.error('Error in poll command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to create poll!' 
        });
    }
}

module.exports = pollCommand;


const pickupLines = [
    "Are you a magician? Because whenever I look at you, everyone else disappears! ✨",
    "Do you have a map? I keep getting lost in your eyes. 🗺️",
    "Is your name Google? Because you have everything I've been searching for. 🔍",
    "Are you a parking ticket? Because you've got FINE written all over you. 🚗",
    "Do you believe in love at first sight, or should I walk by again? 👀",
    "Are you a camera? Every time I look at you, I smile. 📸",
    "Is your dad a boxer? Because you're a knockout! 🥊",
    "Are you made of copper and tellurium? Because you're Cu-Te. 🧪",
    "Do you have a Band-Aid? I just scraped my knee falling for you. 🩹",
    "Are you a time traveler? Because I see you in my future. ⏰",
    "If you were a vegetable, you'd be a cute-cumber! 🥒",
    "Are you Wi-Fi? Because I'm feeling a connection. 📡",
    "Do you have a sunburn, or are you always this hot? ☀️",
    "Are you a bank loan? Because you have my interest. 💰",
    "Is your name Ariel? Because we mermaid for each other. 🧜‍♀️",
    "Are you Australian? Because you meet all of my koala-fications. 🐨",
    "Do you like Star Wars? Because Yoda one for me! ⭐",
    "Are you a beaver? Because daaaaam. 🦫",
    "If beauty were time, you'd be an eternity. ⌛",
    "Are you a keyboard? Because you're just my type. ⌨️"
];

async function pickupLineCommand(sock, chatId, message) {
    try {
        if (!message || !chatId) {
            console.log('Invalid message or chatId:', { message, chatId });
            return;
        }

        let userTarget;
        
        // Check for mentioned users
        if (message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
            userTarget = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }
        // Check for replied message
        else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            userTarget = message.message.extendedTextMessage.contextInfo.participant;
        }
        
        const pickupLine = pickupLines[Math.floor(Math.random() * pickupLines.length)];

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (userTarget) {
            await sock.sendMessage(chatId, { 
                text: `💘 Hey @${userTarget.split('@')[0]}, ${pickupLine}`,
                mentions: [userTarget]
            });
        } else {
            await sock.sendMessage(chatId, { 
                text: `💘 ${pickupLine}`
            });
        }
    } catch (error) {
        console.error('Error in pickup line command:', error);
        await sock.sendMessage(chatId, { 
            text: 'An error occurred while getting a pickup line.'
        });
    }
}

module.exports = { pickupLineCommand };

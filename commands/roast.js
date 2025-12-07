
const roasts = [
    "You're the reason the gene pool needs a lifeguard.",
    "I'd explain it to you, but I left my English-to-Dingbat dictionary at home.",
    "You're not stupid; you just have bad luck thinking.",
    "If I wanted to hear from an idiot, I'd watch the news.",
    "You bring everyone so much joy... when you leave the room.",
    "I'm not saying you're dumb, but you've got the intellectual range of a teaspoon.",
    "You're like a cloud. When you disappear, it's a beautiful day.",
    "I'd agree with you, but then we'd both be wrong.",
    "You're proof that even evolution makes mistakes.",
    "Your secrets are safe with me. I never even listen when you talk.",
    "You have something on your chin... no, the third one down.",
    "You're like a software update. Whenever I see you, I think 'Not now.'",
    "I'd slap you, but that would be animal abuse.",
    "You're the reason shampoo has instructions.",
    "Your face makes onions cry.",
    "I'd call you a tool, but that would imply you're useful.",
    "You're like Monday mornings - nobody likes you.",
    "If you were any more inbred, you'd be a sandwich.",
    "You're the human equivalent of a participation award.",
    "I've seen better comebacks from a flat tire.",
    
    // Painful Nigerian roasts
    "Chai! Even Oshodi market rat get better plan than you. 🐀",
    "You be like the 'i' in team - totally useless and nobody needs you.",
    "Your brain dey sleep pass person wey drink Ogogoro. 🍺",
    "You be like generator wey no get fuel - just noise, no light.",
    "Even mallam wey dey sell suya get better future than you. 🍖",
    "You dey reason backwards like person wey wear trouser commot. 👖",
    "Your sense be like Buhari's promise - e no dey ever show.",
    "You be the only person wey fit use internet bundles finish without downloading sense.",
    "Even pure water seller get better hustle than whatever you dey do.",
    "You be like those yeye WhatsApp forwards - nobody wan receive you.",
    "Your life story fit make person sleep pass sleeping tablet.",
    "You be like okrika clothes - second-hand and smelling.",
    "Even danfo driver wey no get license get better direction than you.",
    "You be the type wey go use data to stream poverty documentary.",
    "Your village people sef don give up on you - that's how bad e be.",
    "You be like Nigerian road during rainy season - full of problems.",
    "Even tout wey dey collect 20 naira for Ojuelegba get better business plan.",
    "Your brain be like Nokia 3310 - old, slow, and nobody wan use am.",
    "You be like fake Gucci from Balogun market - everyone don expose you.",
    "Your reasoning be like Keke NAPEP - e dey shake but e no dey move forward.",
    "Even person wey dey sell recharge card for traffic get better customer base.",
    "You be like those One Chance buses - nobody fit trust you.",
    "Your future be like epilepsy light - always blinking, never bright.",
    "You be the only person wey JAMB fit give negative score.",
    "Even LASTMA officials get more sense when e come to direction.",
    "You be like those audio phones from Computer Village - packaging fine, inside useless.",
    "Your mates are setting up businesses, you still dey beg for airtime.",
    "You be the reason why our parents dey always compare us.",
    "Even Shoprite security at the door get better job security than your future.",
    "You be like Trace TV when am come to repeating yourself - same old nonsense."
];

async function roastCommand(sock, chatId, message) {
    try {
        if (!message || !chatId) {
            console.log('Invalid message or chatId:', { message, chatId });
            return;
        }

        let userToRoast;
        
        // Check for mentioned users
        if (message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
            userToRoast = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }
        // Check for replied message
        else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            userToRoast = message.message.extendedTextMessage.contextInfo.participant;
        }
        
        if (!userToRoast) {
            await sock.sendMessage(chatId, { 
                text: 'Please mention someone or reply to their message to roast them! 🔥'
            });
            return;
        }

        const roast = roasts[Math.floor(Math.random() * roasts.length)];

        await new Promise(resolve => setTimeout(resolve, 1000));

        await sock.sendMessage(chatId, { 
            text: `🔥 @${userToRoast.split('@')[0]}, ${roast}`,
            mentions: [userToRoast]
        });
    } catch (error) {
        console.error('Error in roast command:', error);
        await sock.sendMessage(chatId, { 
            text: 'An error occurred while roasting.'
        });
    }
}

module.exports = { roastCommand };

const insults = [
    "You're like a cloud. When you disappear, it's a beautiful day!",
    "You bring everyone so much joy when you leave the room!",
    "I'd agree with you, but then we'd both be wrong.",
    "You're not stupid; you just have bad luck thinking.",
    "Your secrets are always safe with me. I never even listen to them.",
    "You're proof that even evolution takes a break sometimes.",
    "You have something on your chin... no, the third one down.",
    "You're like a software update. Whenever I see you, I think, 'Do I really need this right now?'",
    "You bring everyone happiness... you know, when you leave.",
    "You're like a penny—two-faced and not worth much.",
    "You have something on your mind... oh wait, never mind.",
    "You're the reason they put directions on shampoo bottles.",
    "You're like a cloud. Always floating around with no real purpose.",
    "Your jokes are like expired milk—sour and hard to digest.",
    "You're like a candle in the wind... useless when things get tough.",
    "You have something unique—your ability to annoy everyone equally.",
    "You're like a Wi-Fi signal—always weak when needed most.",
    "You're proof that not everyone needs a filter to be unappealing.",
    "Your energy is like a black hole—it just sucks the life out of the room.",
    "You have the perfect face for radio.",
    "You're like a traffic jam—nobody wants you, but here you are.",
    "You're like a broken pencil—pointless.",
    "Your ideas are so original, I'm sure I've heard them all before.",
    "You're living proof that even mistakes can be productive.",
    "You're not lazy; you're just highly motivated to do nothing.",
    "Your brain's running Windows 95—slow and outdated.",
    "You're like a speed bump—nobody likes you, but everyone has to deal with you.",
    "You're like a cloud of mosquitoes—just irritating.",
    "You bring people together... to talk about how annoying you are.",
    
    // Painful Nigerian insults
    "Your mates are building empires, you still dey ask for data.",
    "Even NEPA light get more value than you.",
    "You be like agege bread wey don expire - nobody wan collect you.",
    "Your brain be like MTN network - always disappointing.",
    "You get the IQ of a Lagos pothole.",
    "Even Danfo conductor get more sense than you.",
    "You be the reason why Nigeria no dey move forward.",
    "Your future be like Nigerian politicians' promises - empty and useless.",
    "You dey reason like person wey smoke roadside weed.",
    "Even yahoo boys get better brain than you.",
    "You be like Lekki tollgate camera - you just dey there doing nothing.",
    "Your sense be like traffic light for Nigeria - e no dey work.",
    "You get the energy of a dead PHCN transformer.",
    "Even common mosquito get more purpose than you.",
    "You be like expired indomie - nobody wan chop you.",
    "Your destiny be like suspended Twitter - e no go ever activate.",
    "You be the type wey go collect 'I better pass my neighbor' generator.",
    "Even area boys get more respect than you.",
    "Your future be like fuel subsidy - always uncertain.",
    "You dey reason like person wey chop tramadol overdose.",
    "You be like Nigerian road - full of potholes and disappointment.",
    "Even blind man fit see say you no go blow for life.",
    "You be the only person wey go use data to download poverty.",
    "Your brain be like Naija economy - always on recession.",
    "You be like okada without brake - heading for disaster.",
    "Even SARS officers get more sense than you.",
    "You be the definition of 'audio money' - just noise, no value.",
    "Your life be like Eko bridge traffic - stuck and going nowhere.",
    "You be like fake designer - everybody don expose you."
];

async function insultCommand(sock, chatId, message) {
    try {
        if (!message || !chatId) {
            console.log('Invalid message or chatId:', { message, chatId });
            return;
        }

        let userToInsult;
        
        // Check for mentioned users
        if (message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
            userToInsult = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }
        // Check for replied message
        else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            userToInsult = message.message.extendedTextMessage.contextInfo.participant;
        }
        
        if (!userToInsult) {
            await sock.sendMessage(chatId, { 
                text: 'Please mention someone or reply to their message to insult them!'
            });
            return;
        }

        const insult = insults[Math.floor(Math.random() * insults.length)];

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));

        await sock.sendMessage(chatId, { 
            text: `Hey @${userToInsult.split('@')[0]}, ${insult}`,
            mentions: [userToInsult]
        });
    } catch (error) {
        console.error('Error in insult command:', error);
        if (error.data === 429) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            try {
                await sock.sendMessage(chatId, { 
                    text: 'Please try again in a few seconds.'
                });
            } catch (retryError) {
                console.error('Error sending retry message:', retryError);
            }
        } else {
            try {
                await sock.sendMessage(chatId, { 
                    text: 'An error occurred while sending the insult.'
                });
            } catch (sendError) {
                console.error('Error sending error message:', sendError);
            }
        }
    }
}

module.exports = { insultCommand };

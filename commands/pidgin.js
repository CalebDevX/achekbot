const settings = require('../settings');

const pidginPhrases = [
    "Wetin dey happen? Make we run am! 🔥",
    "Na today? Abeg no stress me o! 😂",
    "E be like say you wan catch cruise today abi? 🤣",
    "Omo, this one pass my power o! 💀",
    "Wahala no dey finish! But we move still 💪",
    "E don tey wey we see o! How body? 🤝",
    "Na so we see am reach here! 🙌",
    "Shey you don chop today? 🍲",
    "Abeg shift make I pass! 🚶‍♂️",
    "Money must land today! 💰",
    "E no go better for haters! 🙅‍♂️",
    "We dey kampe, no shaking! ✊",
    "Omo this thing sweet die! 😋",
    "Make we run am before rain catch us 🌧️",
    "Chai! See gobe wey dey front! 😱",
    "No wahala, God dey! 🙏",
    "Pepper dem gang! 🌶️",
    "Sapa no go catch us this year! 💸",
    "Na cruise we dey, no vex! 😎",
    "E choke! 🔥🔥🔥",
    "Oya na, make we move! 🏃‍♂️",
    "Who dey breet? Nobody! 💯",
    "We ball pass ball! ⚽",
    "E don be that! 💪",
    "Shege! This one na premium cruise! 🤣",
    "Aboki dey go market! 🛒",
    "No long talk, na action we wan see! 🎬",
    "Wetin concern agbero with overload? 🚌",
    "E sweet me die! 😍",
    "Na beans? E no easy o! 🤔"
];

async function pidginCommand(sock, chatId, message, text) {
    try {
        let responseText;
        
        if (text && text.trim().length > 0) {
            const translations = {
                "hello": "How far na? 👋",
                "hi": "Wetin dey? 🤙",
                "how are you": "How body dey? Hope say e dey kampe? 💪",
                "good morning": "Good morning o! E go sweet today! 🌅",
                "good night": "Night o! Make dream sweet! 🌙",
                "thank you": "Thank you die! Na you biko! 🙏",
                "sorry": "E pain me o, abeg no vex! 😔",
                "yes": "Na so! Correct! ✅",
                "no": "E no go happen! ❌",
                "money": "Ego! Cash! Kudi! 💰",
                "food": "Chop chop! Belly must smile! 🍲",
                "love": "Love wey pass love! ❤️",
                "friend": "Paddy mi! Gee! 🤝",
                "goodbye": "E go be like that! We go link up! 👋",
                "beautiful": "Fine no be small! Correct babe! 😍",
                "handsome": "Fine bobo! Correct guy! 😎",
                "problem": "Wahala! Gbese! 😰",
                "help": "Abeg help me o! 🆘",
                "what": "Wetin? 🤔",
                "where": "For where? 📍",
                "when": "When e go happen? ⏰",
                "why": "Why nau? Kilode? 🤷",
                "who": "Na who? 👤"
            };
            
            const lowerText = text.toLowerCase().trim();
            if (translations[lowerText]) {
                responseText = `*English:* ${text}\n*Pidgin:* ${translations[lowerText]}`;
            } else {
                const randomPhrase = pidginPhrases[Math.floor(Math.random() * pidginPhrases.length)];
                responseText = `*Your text:* ${text}\n\n*Pidgin vibes:* ${randomPhrase}`;
            }
        } else {
            const randomPhrase = pidginPhrases[Math.floor(Math.random() * pidginPhrases.length)];
            responseText = `*🇳🇬 Naija Pidgin:*\n\n${randomPhrase}\n\n_Use: .pidgin <text> to get pidgin vibes!_`;
        }

        await sock.sendMessage(chatId, {
            text: responseText + `\n\n_Powered by AchekBot 🤖_`,
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
        console.error('Error in pidgin command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ E no work o! Try again later!' 
        }, { quoted: message });
    }
}

module.exports = pidginCommand;

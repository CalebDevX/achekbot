
const settings = require('../settings');

const truthCategories = {
    general: [
        "What's your birthday?",
        "What's your worst mistake?",
        "What's your greatest fear?",
        "Who's your crush?",
        "What's your best color?",
        "Last time you cried and what caused it?",
        "What are your dreams?",
        "Your happiest moment?",
        "Best memory?",
        "Complete name?",
        "If you had the chance, would you date me?",
        "Kiss or hug?",
        "Favorite song?",
        "Favorite movie?",
        "Best hobby?",
        "Tell me 3 deepest secrets",
        "Promise to kiss me when we meet?",
        "Tell me how you really feel about me",
        "Tell me a story",
        "Player or loyal?",
        "Single or taken?",
        "Have you ever been played?",
        "Have you ever played someone?"
    ],
    personal: [
        "Age?",
        "Are you naughty?",
        "Best friend?",
        "Nickname?",
        "Something you would change about yourself?",
        "Tell me things you want from me",
        "What don't you like about me?",
        "Who is your favorite celebrity?",
        "What is your worst habit?",
        "How many kids would you like to have?",
        "When was the first time you watched something naughty?",
        "Tell me a dirty truth about you that no one else knows?",
        "Do you think I'm hot?",
        "Name one celebrity you would want to make out with",
        "Are you a jealous person?",
        "At what age do you plan to get married?"
    ],
    relationships: [
        "Why did you break up with your last partner?",
        "How many times have you been in love?",
        "Who was your first girlfriend/boyfriend?",
        "Have you ever lied to me?",
        "Can you tell me some reasons why you like me?",
        "Do you miss me right now?",
        "Is there anything you're too nervous to tell me in person?",
        "Do you discuss your relationship with your friends?",
        "Do you love me? How much?",
        "Do you prefer younger or older partners?",
        "Using three words, how do you feel about me?",
        "Would you like to know how I feel about you?"
    ],
    fun: [
        "Shy or bold?",
        "What turns you on?",
        "What do you love doing the most?",
        "Favorite clothes?",
        "What gets you wet?",
        "What is on your mind right now?",
        "What are you wearing right now?",
        "What color of underwear do you prefer and why?",
        "Do you like cooking?",
        "Do you prefer texting or talking on the phone?",
        "If you were famous, what would you be famous for?",
        "What's one thing you can't live without?",
        "What's the last thing you searched on your phone?",
        "What's your biggest fear?",
        "What's your secret move to turn someone on?"
    ]
};

const channelInfo = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: settings.channelJid || '120363402198872825@newsletter',
            newsletterName: 'AchekBot - Achek Digital Solutions',
            serverMessageId: -1
        }
    }
};

function getRandomQuestion(category = null) {
    if (category && truthCategories[category]) {
        const questions = truthCategories[category];
        return questions[Math.floor(Math.random() * questions.length)];
    }
    
    // Get random category
    const categories = Object.keys(truthCategories);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const questions = truthCategories[randomCategory];
    return {
        question: questions[Math.floor(Math.random() * questions.length)],
        category: randomCategory
    };
}

async function truth400Command(sock, chatId, message, args) {
    try {
        const mentionedJid = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const category = args[0]?.toLowerCase();
        
        const result = getRandomQuestion(category);
        const question = typeof result === 'string' ? result : result.question;
        const cat = typeof result === 'string' ? category : result.category;

        let text = `🎯 *Truth Game*\n\n`;
        
        if (mentionedJid.length > 0) {
            text += `*Question for @${mentionedJid[0].split('@')[0]}:*\n\n`;
        }
        
        text += `${question}\n\n`;
        text += `📂 Category: ${cat}\n`;
        text += `\n_No hard feelings! Answer honestly 💕_`;

        await sock.sendMessage(chatId, {
            text: text,
            mentions: mentionedJid,
            ...channelInfo
        }, { quoted: message });
    } catch (error) {
        console.error('Error in truth400 command:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to get truth question!',
            ...channelInfo
        });
    }
}

async function categoriesCommand(sock, chatId, message) {
    const categories = Object.keys(truthCategories);
    const text = `📚 *Truth Game Categories*\n\n${categories.map((c, i) => `${i + 1}. ${c.charAt(0).toUpperCase() + c.slice(1)}`).join('\n')}\n\n_Use: .truth400 <category> @user_`;
    
    await sock.sendMessage(chatId, {
        text: text,
        ...channelInfo
    }, { quoted: message });
}

module.exports = { truth400Command, categoriesCommand };

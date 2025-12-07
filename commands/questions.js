
const settings = require('../settings');

const questions = [
    "What's your birthday?",
    "What's your worst mistake?",
    "What's your greatest fear?",
    "Who's your crush?",
    "What's your favorite color?",
    "Have you ever smoked?",
    "Do you drink alcohol?",
    "Do you go to night parties?",
    "When was the last time you cried and what caused it?",
    "What are your dreams?",
    "What's your happiest moment?",
    "What's your best memory?",
    "What's your complete name?",
    "What's your favorite song?",
    "What's your favorite movie?",
    "What's your best friend's name?",
    "What age are you?",
    "What's your nickname?",
    "What's something you'd change about yourself?",
    "What's your favorite food?",
    "What are your hobbies?",
    "What's your favorite sport?",
    "What's your favorite book?",
    "What makes you laugh?",
    "What makes you cry?",
    "What's your dream job?",
    "What's your biggest achievement?",
    "What's your favorite place to visit?",
    "What's your favorite season?",
    "What's your pet peeve?",
    "What's your hidden talent?",
    "What's your morning routine?",
    "What's your night routine?",
    "What's your favorite emoji?",
    "What's your phone wallpaper?",
    "What's the last thing you searched online?",
    "What's your favorite app?",
    "What's your screen time average?",
    "What's your favorite quote?",
    "What motivates you?",
    "What's your biggest regret?",
    "What's your proudest moment?",
    "What's your favorite childhood memory?",
    "What's your comfort food?",
    "What's your guilty pleasure?",
    "What's your spirit animal?",
    "What's your superpower if you had one?",
    "What's your favorite ice cream flavor?",
    "What's your go-to karaoke song?",
    "What's the best advice you've received?"
];

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

async function questionsCommand(sock, chatId, message) {
    try {
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        const questionNumber = questions.indexOf(randomQuestion) + 1;

        await sock.sendMessage(chatId, {
            text: `🎯 *Question #${questionNumber}*\n\n${randomQuestion}\n\n_Tag someone or say 'hi' to get a random question!_\n\n💭 Total Questions: ${questions.length}`,
            ...channelInfo
        }, { quoted: message });
    } catch (error) {
        console.error('Error in questions command:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to get a question. Try again!',
            ...channelInfo
        });
    }
}

async function askMeCommand(sock, chatId, message) {
    try {
        const mentionedJid = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        const questionNumber = questions.indexOf(randomQuestion) + 1;

        if (mentionedJid.length > 0) {
            await sock.sendMessage(chatId, {
                text: `🎯 *Question #${questionNumber} for @${mentionedJid[0].split('@')[0]}*\n\n${randomQuestion}\n\n_Answer honestly! 😊_`,
                mentions: mentionedJid,
                ...channelInfo
            }, { quoted: message });
        } else {
            await sock.sendMessage(chatId, {
                text: `🎯 *Question #${questionNumber}*\n\n${randomQuestion}\n\n_Tag someone to ask them!_`,
                ...channelInfo
            }, { quoted: message });
        }
    } catch (error) {
        console.error('Error in askme command:', error);
    }
}

module.exports = { questionsCommand, askMeCommand, questions };

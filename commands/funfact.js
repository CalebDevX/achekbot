
const funFacts = [
    "A group of flamingos is called a 'flamboyance'. 🦩",
    "Bananas are berries, but strawberries aren't! 🍌",
    "Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs that was still edible. 🍯",
    "Octopuses have three hearts and blue blood. 🐙",
    "The shortest war in history lasted 38-45 minutes. ⚔️",
    "A single cloud can weigh over a million pounds. ☁️",
    "Sharks existed before trees. 🦈",
    "The tongue is the strongest muscle in the body relative to its size. 👅",
    "You can't hum while holding your nose closed. (Try it!) 🤔",
    "Hot water freezes faster than cold water under certain conditions. ❄️",
    "A day on Venus is longer than its year. 🪐",
    "The world's oldest piece of chewing gum is 9,000 years old. 🍬",
    "Pineapples take about 2 years to grow. 🍍",
    "Your brain uses 20% of your body's energy. 🧠",
    "Butterflies can taste with their feet. 🦋",
    "A sneeze travels at about 100 mph. 🤧",
    "The average person walks the equivalent of three times around the world in a lifetime. 🚶",
    "Sea otters hold hands when they sleep so they don't drift apart. 🦦",
    "There are more stars in the universe than grains of sand on Earth. ✨",
    "A group of crows is called a 'murder'. 🐦‍⬛"
];

async function funFactCommand(sock, chatId, message) {
    try {
        const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
        
        await sock.sendMessage(chatId, { 
            text: `🎯 *Fun Fact:*\n\n${fact}\n\n_Did you know? 🤓_`
        }, { quoted: message });
    } catch (error) {
        console.error('Error in fun fact command:', error);
        await sock.sendMessage(chatId, { 
            text: 'An error occurred while getting a fun fact.'
        });
    }
}

module.exports = { funFactCommand };

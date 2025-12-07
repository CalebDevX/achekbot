const settings = require('../settings');
const fs = require('fs');
const path = require('path');

async function helpCommand(sock, chatId, message) {
    const helpMessage = `
╔═══════════════════════════════════╗
   *✅ ${settings.botName || 'AchekBot'}*  
   Version: *${settings.version || '4.0.0'}*
   by ${settings.botOwner || 'Caleb'}

   🏢 *Achek Digital Solutions*
   🌐 ${settings.website || 'https://achek.com.ng'}
╚═══════════════════════════════════╝

*Na wetin AchekBot fit do for you:*

╔═══════════════════════════════════╗
🌐 *General Commands*:
║ ➤ .help or .menu - Show dis menu
║ ➤ .ping - Check if bot dey online
║ ➤ .alive - See bot status
║ ➤ .uptime - Bot uptime
║ ➤ .rules - Group rules
║ ➤ .link - Get group link
║ ➤ .poll <question|opt1|opt2> - Create poll
║ ➤ .tts <text> - Text to speech
║ ➤ .owner - Contact bot owner
║ ➤ .joke - Get funny joke
║ ➤ .quote - Inspiring quote
║ ➤ .fact - Random facts
║ ➤ .weather <city> - Check weather
║ ➤ .news - Latest news
║ ➤ .attp <text> - Animated text
║ ➤ .lyrics <song> - Song lyrics
║ ➤ .8ball <question> - Ask magic ball
║ ➤ .groupinfo - Group info
║ ➤ .staff or .admins - List admins
║ ➤ .vv - View once media
║ ➤ .trt <text> <lang> - Translate
║ ➤ .ss <link> - Screenshot website
║ ➤ .jid - Get chat JID
║ ➤ .url - URL info
║ ➤ .achek - About Achek Digital
╚═══════════════════════════════════╝ 

╔═══════════════════════════════════╗
👮‍♂️ *Admin Commands*:
║ ➤ .ban @user - Ban person
║ ➤ .promote @user - Make admin
║ ➤ .demote @user - Remove admin
║ ➤ .mute <minutes> - Mute group
║ ➤ .unmute - Unmute group
║ ➤ .delete or .del - Delete message
║ ➤ .kick @user - Remove person
║ ➤ .warnings @user - Check warns
║ ➤ .warn @user - Warn person
║ ➤ .antilink - Toggle antilink
║ ➤ .antibadword - Bad word filter
║ ➤ .clear - Clear chat
║ ➤ .tag <message> - Tag with msg
║ ➤ .tagall - Tag everybody
║ ➤ .tagall on/off - Enable/disable for all
║ ➤ .tagall status - Check permission
║ ➤ .tagnotadmin - Tag non-admins
║ ➤ .hidetag <message> - Silent tag
║ ➤ .chatbot - Toggle AI chat
║ ➤ .resetlink - Reset invite link
║ ➤ .antitag <on/off> - Antitag mode
║ ➤ .welcome <on/off> - Welcome msg
║ ➤ .goodbye <on/off> - Goodbye msg
║ ➤ .setgdesc <text> - Set description
║ ➤ .setgname <name> - Rename group
║ ➤ .setgpp - Set group photo
╚═══════════════════════════════════╝

╔═══════════════════════════════════╗
🔒 *Owner Commands*:
║ ➤ .mode <public/private>
║ ➤ .clearsession - Reset session
║ ➤ .antidelete - Recover deleted
║ ➤ .cleartmp - Clear temp files
║ ➤ .update - Check for updates
║ ➤ .settings - Bot settings
║ ➤ .setpp <reply to image>
║ ➤ .autoreact <on/off>
║ ➤ .autostatus <on/off>
║ ➤ .autotyping <on/off>
║ ➤ .autoread <on/off>
║ ➤ .anticall <on/off>
║ ➤ .pmblocker <on/off>
║ ➤ .sudo <add/remove> @user
║ ➤ .broadcast <message>
╚═══════════════════════════════════╝

╔═══════════════════════════════════╗
🎨 *Image/Sticker Commands*:
║ ➤ .blur <image> - Blur image
║ ➤ .simage - Sticker to image
║ ➤ .sticker or .s - Make sticker
║ ➤ .removebg - Remove background
║ ➤ .remini - Enhance image
║ ➤ .crop <reply to image>
║ ➤ .tgsticker <Link>
║ ➤ .meme - Random meme
║ ➤ .take <packname>
║ ➤ .emojimix <emj1>+<emj2>
║ ➤ .igs <insta link>
║ ➤ .igsc <insta link>
╚═══════════════════════════════════╝  

╔═══════════════════════════════════╗
🎮 *Game Commands*:
║ ➤ .tictactoe @user - Play game
║ ➤ .hangman - Word guessing
║ ➤ .guess <letter>
║ ➤ .trivia - Quiz game
║ ➤ .answer <answer>
║ ➤ .truth - Truth question
║ ➤ .dare - Dare challenge
╚═══════════════════════════════════╝

╔═══════════════════════════════════╗
🤖 *AI Commands*:
║ ➤ .gpt <question> - Chat with AI
║ ➤ .gemini <question> - Google AI
║ ➤ .imagine <prompt> - AI image
║ ➤ .flux <prompt> - AI art
║ ➤ .sora <prompt> - AI video
╚═══════════════════════════════════╝

╔═══════════════════════════════════╗
🎙️ *Voice & Audio Commands*:
║ ➤ .voice <effect> - Change voice
║   Effects: male, female, chipmunk
║   robot, deep, nightcore, echo
║   bass, vibrato, distorted, radio
║   fast, slow, reverse, wizkid
║   burnaboy, davido, rema, asake
║   ayrastarr, tems
║ ➤ .bug @user <count> - Spam (Admin)
╚═══════════════════════════════════╝

╔═══════════════════════════════════╗
🎯 *Fun Commands*:
║ ➤ .compliment @user
║ ➤ .insult @user
║ ➤ .roast - Roast someone 🔥
║ ➤ .pickup - Pickup line 💘
║ ➤ .flirt - Flirt message
║ ➤ .funfact - Random fun fact 🎯
║ ➤ .goodnight - Night message
║ ➤ .character @user
║ ➤ .wasted @user
║ ➤ .ship @user - Ship meter
║ ➤ .simp @user
║ ➤ .stupid @user [text]
║ ➤ .pidgin <text> - Pidgin vibes
║ ➤ .question or .q - Get random Q
║ ➤ .askme @user - Ask someone
║ ➤ .truth400 @user - Truth game
║ ➤ .categories - View categories
╚═══════════════════════════════════╝

╔═══════════════════════════════════╗
🔤 *Textmaker*:
║ ➤ .metallic <text>
║ ➤ .ice <text>
║ ➤ .snow <text>
║ ➤ .impressive <text>
║ ➤ .matrix <text>
║ ➤ .light <text>
║ ➤ .neon <text>
║ ➤ .devil <text>
║ ➤ .purple <text>
║ ➤ .thunder <text>
║ ➤ .leaves <text>
║ ➤ .arena <text>
║ ➤ .hacker <text>
║ ➤ .glitch <text>
║ ➤ .fire <text>
╚═══════════════════════════════════╝

╔═══════════════════════════════════╗
📥 *Downloader Commands*:
║ ➤ .play <song_name> - Play music
║ ➤ .song <song_name> - Download MP3
║ ➤ .spotify <query> - Spotify
║ ➤ .instagram <link> - IG download
║ ➤ .facebook <link> - FB download
║ ➤ .tiktok <link> - TikTok video
║ ➤ .video <song name> - Music video
║ ➤ .ytmp4 <Link> - YouTube video
╚═══════════════════════════════════╝

╔═══════════════════════════════════╗
🧩 *MISC Commands*:
║ ➤ .heart - Heart effect
║ ➤ .circle - Circle avatar
║ ➤ .namecard - Create namecard
║ ➤ .tweet - Fake tweet
║ ➤ .ytcomment - YT comment
║ ➤ .comrade - Comrade effect
║ ➤ .glass - Glass effect
║ ➤ .jail - Jail effect
║ ➤ .passed - Passed effect
║ ➤ .triggered - Triggered GIF
╚═══════════════════════════════════╝

╔═══════════════════════════════════╗
🖼️ *ANIME Commands*:
║ ➤ .nom - Eating anime
║ ➤ .poke - Poke someone
║ ➤ .cry - Crying anime
║ ➤ .kiss - Kiss anime
║ ➤ .pat - Pat head
║ ➤ .hug - Hug anime
║ ➤ .wink - Wink anime
║ ➤ .facepalm - Facepalm
╚═══════════════════════════════════╝

╔═══════════════════════════════════╗
💻 *Github/Dev Commands:*
║ ➤ .git - Git info
║ ➤ .github - GitHub profile
║ ➤ .sc or .script - Source code
║ ➤ .repo - Repository info
╚═══════════════════════════════════╝

╔═══════════════════════════════════╗
🏢 *ACHEK DIGITAL SOLUTIONS*
║ 
║ We dey provide top-notch digital
║ services for your business:
║ 
║ ✓ Web Development
║ ✓ Mobile Apps
║ ✓ Digital Marketing
║ ✓ Bot Development
║ ✓ IT Consulting
║ 
║ 🌐 ${settings.website || 'https://achek.com.ng'}
║ 📢 Join our channel for updates!
╚═══════════════════════════════════╝`;

    try {
        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');

        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);

            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: settings.channelJid || '120363402198872825@newsletter',
                        newsletterName: 'AchekBot - Achek Digital Solutions',
                        serverMessageId: -1
                    }
                }
            },{ quoted: message });
        } else {
            console.error('Bot image not found at:', imagePath);
            await sock.sendMessage(chatId, { 
                text: helpMessage,
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
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;
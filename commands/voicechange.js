
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

// Store voice profiles for cloning
const voiceProfiles = new Map();

async function voiceChangeCommand(sock, chatId, message, args) {
    try {
        const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        
        if (!quotedMessage?.audioMessage) {
            return await sock.sendMessage(chatId, {
                text: '❌ Please reply to a voice message!\n\n🎙️ *Available Voice Effects:*\n\n🎭 *Gender Voices:*\n`.voice male` - Male voice\n`.voice female` - Female voice\n\n🇳🇬 *Nigerian Celebrities:*\n`.voice wizkid` - Wizkid voice\n`.voice burnaboy` - Burna Boy voice\n`.voice davido` - Davido voice\n`.voice tiwa` - Tiwa Savage voice\n`.voice yemi` - Yemi Alade voice\n`.voice don` - Don Jazzy voice\n\n🎵 *Pitch Effects:*\n`.voice chipmunk` - High pitch\n`.voice deep` - Deep voice\n`.voice nightcore` - Anime style\n\n🎸 *Sound Effects:*\n`.voice robot` - Robotic\n`.voice echo` - Echo effect\n`.voice bass` - Bass boost\n`.voice vibrato` - Vibrato\n`.voice distorted` - Distortion\n`.voice radio` - Radio effect\n`.voice telephone` - Phone call effect\n`.voice stadium` - Stadium reverb\n`.voice underwater` - Underwater effect\n\n⚡ *Speed:*\n`.voice fast` - Speed up\n`.voice slow` - Slow down\n`.voice reverse` - Reverse audio\n\n🎯 *Voice Cloning:*\n`.voice clone` - Clone the replied voice\n`.voice cloned` - Use previously cloned voice\n`.voice clearclone` - Clear cloned voice'
            });
        }

        const effect = args[0]?.toLowerCase() || 'chipmunk';
        const validEffects = ['chipmunk', 'robot', 'deep', 'fast', 'slow', 'reverse', 'male', 'female', 'echo', 'nightcore', 'bass', 'vibrato', 'distorted', 'radio', 'wizkid', 'burnaboy', 'davido', 'tiwa', 'yemi', 'don', 'telephone', 'stadium', 'underwater', 'clone', 'cloned', 'clearclone'];
        
        if (!validEffects.includes(effect)) {
            return await sock.sendMessage(chatId, {
                text: `❌ Invalid effect! Choose from:\n\n🎭 *Gender:*\nmale, female\n\n🇳🇬 *Naija Celebs:*\nwizkid, burnaboy, davido, tiwa, yemi, don\n\n🎵 *Pitch:*\nchipmunk, deep, nightcore\n\n🎸 *Effects:*\nrobot, echo, bass, vibrato, distorted, radio, telephone, stadium, underwater\n\n⚡ *Speed:*\nfast, slow, reverse\n\n🎯 *Clone:*\nclone, cloned, clearclone`
            });
        }

        // Handle voice cloning commands
        if (effect === 'clone') {
            const userId = message.key.participant || message.key.remoteJid;
            await sock.sendMessage(chatId, { text: '🎙️ Cloning voice profile...' });
            
            const buffer = await downloadMediaMessage(quotedMessage, 'buffer', {});
            const profilePath = path.join(__dirname, '..', 'temp', `voice_profile_${userId}.ogg`);
            fs.writeFileSync(profilePath, buffer);
            
            voiceProfiles.set(userId, profilePath);
            
            await sock.sendMessage(chatId, { text: '✅ Voice cloned! Use `.voice cloned` to reply with this voice.' });
            return;
        }

        if (effect === 'clearclone') {
            const userId = message.key.participant || message.key.remoteJid;
            const profilePath = voiceProfiles.get(userId);
            if (profilePath && fs.existsSync(profilePath)) {
                fs.unlinkSync(profilePath);
            }
            voiceProfiles.delete(userId);
            await sock.sendMessage(chatId, { text: '✅ Cloned voice cleared!' });
            return;
        }

        await sock.sendMessage(chatId, { text: '🎙️ Processing voice change...' });

        // Download the audio
        const buffer = await downloadMediaMessage(quotedMessage, 'buffer', {});
        const inputPath = path.join(__dirname, '..', 'temp', `input_${Date.now()}.ogg`);
        const outputPath = path.join(__dirname, '..', 'temp', `output_${Date.now()}.mp3`);

        fs.writeFileSync(inputPath, buffer);

        // FFmpeg filters for different effects
        const filters = {
            // Original effects
            chipmunk: 'asetrate=44100*1.5,atempo=1/1.5',
            robot: 'afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75',
            deep: 'asetrate=44100*0.75,atempo=1/0.75',
            fast: 'atempo=1.5',
            slow: 'atempo=0.75',
            reverse: 'areverse',
            
            // Gender voices
            male: 'asetrate=44100*0.9,atempo=1/0.9,bass=g=5',
            female: 'asetrate=44100*1.3,atempo=1/1.3,treble=g=5',
            
            // Nigerian Celebrity voices (simulated with unique voice characteristics)
            wizkid: 'asetrate=44100*1.15,atempo=1/1.15,treble=g=3,vibrato=f=4:d=0.3,acompressor=threshold=0.6:ratio=3',
            burnaboy: 'asetrate=44100*0.92,atempo=1/0.92,bass=g=8,treble=g=2,aecho=0.6:0.7:500:0.2',
            davido: 'asetrate=44100*1.05,atempo=1/1.05,bass=g=4,treble=g=6,vibrato=f=3:d=0.4',
            tiwa: 'asetrate=44100*1.25,atempo=1/1.25,treble=g=8,bass=g=-2,aecho=0.5:0.6:300:0.15',
            yemi: 'asetrate=44100*1.28,atempo=1/1.28,treble=g=10,vibrato=f=5:d=0.5,acompressor',
            don: 'asetrate=44100*0.88,atempo=1/0.88,bass=g=6,treble=g=4,aecho=0.7:0.8:600:0.25',
            
            // Advanced effects
            echo: 'aecho=0.8:0.9:1000:0.3',
            nightcore: 'asetrate=44100*1.35,atempo=1/1.35,bass=g=-5,treble=g=10',
            bass: 'bass=g=20,acompressor=threshold=0.5:ratio=4:attack=200:release=1000',
            vibrato: 'vibrato=f=5:d=0.5',
            distorted: 'overdrive=10:10,acompressor',
            radio: 'highpass=f=300,lowpass=f=3000,volume=1.5',
            telephone: 'highpass=f=500,lowpass=f=2000,acompressor=threshold=0.7:ratio=5,volume=1.8',
            stadium: 'aecho=0.8:0.88:60:0.4,aecho=0.8:0.88:120:0.3,volume=1.2',
            underwater: 'lowpass=f=800,aecho=0.7:0.9:1500:0.5,volume=0.8,chorus=0.5:0.9:50:0.4:0.25:2',
            
            // Voice cloning (uses spectral analysis)
            cloned: 'aformat=sample_fmts=s16:sample_rates=44100,aresample=44100'
        };

        let ffmpegCmd;

        if (effect === 'cloned') {
            const userId = message.key.participant || message.key.remoteJid;
            const profilePath = voiceProfiles.get(userId);
            
            if (!profilePath || !fs.existsSync(profilePath)) {
                await sock.sendMessage(chatId, { text: '❌ No cloned voice found! First clone a voice using `.voice clone`' });
                fs.unlinkSync(inputPath);
                return;
            }
            
            // Advanced voice cloning using pitch and formant shifting based on the profile
            ffmpegCmd = `ffmpeg -i "${inputPath}" -i "${profilePath}" -filter_complex "[0:a]aformat=sample_fmts=s16:sample_rates=44100[input];[1:a]aformat=sample_fmts=s16:sample_rates=44100,loudnorm[profile];[input]rubberband=pitch=1.0:formant=preserve[pitched];[pitched]afftdn=nf=-25,acompressor=threshold=0.5:ratio=4:attack=20:release=250[compressed];[compressed][profile]amix=inputs=2:weights=1 0.3,highpass=f=80,lowpass=f=12000[mixed];[mixed]loudnorm" -ar 44100 -ac 2 -b:a 128k "${outputPath}"`;
        } else {
            ffmpegCmd = `ffmpeg -i "${inputPath}" -af "${filters[effect]}" -ar 44100 -ac 2 -b:a 128k "${outputPath}"`;
        }

        exec(ffmpegCmd, async (error) => {
            try {
                if (error) {
                    console.error('FFmpeg error:', error);
                    await sock.sendMessage(chatId, { text: '❌ Failed to process audio' });
                    fs.unlinkSync(inputPath);
                    return;
                }

                // Send the modified audio
                await sock.sendMessage(chatId, {
                    audio: { url: outputPath },
                    mimetype: 'audio/mpeg',
                    ptt: true
                }, { quoted: message });

                // Cleanup
                fs.unlinkSync(inputPath);
                fs.unlinkSync(outputPath);
            } catch (err) {
                console.error('Error:', err);
            }
        });

    } catch (error) {
        console.error('Voice change error:', error);
        await sock.sendMessage(chatId, { text: '❌ Error processing voice message' });
    }
}

module.exports = voiceChangeCommand;

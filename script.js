const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
const transcriptDisplay = document.getElementById('transcript');
const startBtn = document.getElementById('start-btn');
const image=document.getElementById('mic');

// Set recognition settings
recognition.lang = 'en-US'; 
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// When the button is clicked, start listening
startBtn.addEventListener('click',function (){
    recognition.start();
    startBtn.style.display='none';
    image.style.display='block'
    transcriptDisplay.innerText='Listening...'
});

// On speech recognition result
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    image.style.display='none'
    startBtn.style.display="inline-block"      
    transcriptDisplay.textContent =`You said: ${transcript}`;  
    processCommand(transcript);
};

recognition.onerror = (event) => {
    console.error('Recognition error:', event.error);
    image.style.display='none'    
    startBtn.style.display="inline-block"  
    transcriptDisplay.textContent = 'Error occurred in recognition';
};

function speakResponse(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US'; 
    speech.pitch = 1;
    speech.rate = 1;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        speech.voice = voices.find(voice => voice.name === 'Google हिन्दी') || voices[0];
    }
    window.speechSynthesis.speak(speech);
}
function processCommand(command) {
    if (command.includes('hello')) {
        speakResponse('Hello! How can I help you today?');
    } else if (command.includes('noor talab')) {
        speakResponse('noor talab is awais khan father owais ka abbu');
    }else if (command.includes('lubna sharif khan')) {
        speakResponse('awais ki mama');
    }else if (command.includes('how are you')) {
        speakResponse('I am absolutely fine thanks for asking');
    } else if (command.includes('who is owais khan')) {
        speakResponse('awais is very handsome boy and my creator');
    } else if (command.includes('creator')) {
        speakResponse('awais is very handsome boy and my creator');
    } else if (command.includes('who is mahi')) {
        speakResponse('maheen is awaiss best friend and she is very beautiful and intelligent but very busy');
    }else if (command.includes('apka naam')) {
        speakResponse('mera naam alexa hai apki dost');
    }else if (command.includes('your name')) {
        speakResponse('my name is alexa your friend');
    }else if (command.includes('created')) {
        speakResponse('owais khan created me');
    }else if (command.includes('what are you doing')) {
        speakResponse('i am talking with you my friend');
    }else if (command.includes('sajjad')) {
        speakResponse('sajjad awais ka mamu hai aur buhut handsome hai aur abhi saudi-arabia mai hai mai un ke liye dua karti ho ke allah unko kamiyab kare');
    }else {
        speakResponse('I did not understand your command,let me search it on google for you');
        searchOnGoogle(command)
    }
};

function searchOnGoogle (querry){
    const searchurl = `https://www.google.com/search?q=${encodeURIComponent(querry)}`;
    window.open(searchurl, '_blank');
}

window.speechSynthesis.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices();
    // console.log('Available voices:', voices);
};
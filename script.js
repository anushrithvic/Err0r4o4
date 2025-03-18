let currentTheme = 'space';
let letterSound = new Audio(`sounds/${currentTheme}/letter.mp3`);
const wordSound = new Audio('sounds/word.mp3');
const videoElement = document.getElementById('backgroundVideo');

// Theme-Specific Bubble Colors
const themeColors = {
  space: ['#ffc280', '#f17c4d', '#a3a3a3'],
  ocean: ['#0077b6', '#00b4d8', '#90e0ef'],
  cyberpunk: ['#ff00ff', '#00ffff', '#ff8800'],
  forest: ['#228B22', '#8FBC8F', '#ADFF2F'],
};

// Speech Synthesis
const synth = window.speechSynthesis;

// Select Elements
const textInput = document.getElementById('textInput');
const charCountDisplay = document.getElementById('charCount');
const clearBtn = document.getElementById('clearBtn');
const themeButtons = document.querySelectorAll('.theme-btn');
const bubbleContainer = document.getElementById('bubbleContainer');

// Play Sound on Typing
textInput.addEventListener('input', () => {
  const text = textInput.value;
  const lastChar = text.slice(-1);
  const words = text.trim().split(/\s+/).filter(Boolean);

  // Generate multiple bubbles
  for (let i = 0; i < 8; i++) {
    createBubble();
  }

  // Play Letter Sound
  if (lastChar.match(/[a-zA-Z0-9]/)) {
    letterSound.currentTime = 0;
    letterSound.play();
  }

  // Play Word Sound and Pronounce Word
  if (lastChar === ' ' || lastChar === '.' || lastChar === '!' || lastChar === '?') {
    wordSound.currentTime = 0;
    wordSound.play();
    if (words.length > 0) speakWord(words[words.length - 1]);
  }

  // Update CPM
  charCountDisplay.textContent = `${text.length} CPM`;
});

// Clear Button
clearBtn.addEventListener('click', () => {
  textInput.value = '';
  charCountDisplay.textContent = '0 CPM';
});

// Speak Word
function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  synth.speak(utterance);
}

// Change Theme
function changeTheme(theme) {
  currentTheme = theme;
  videoElement.src = `videos/${currentTheme}.mp4`;
  letterSound = new Audio(`sounds/${currentTheme}/letter.mp3`);

  themeButtons.forEach(button => button.classList.remove('active'));
  document.querySelector(`button[onclick="changeTheme('${theme}')"]`).classList.add('active');
}

// Create Bubble with Theme Colors
function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  const size = Math.random() * 50 + 20;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // Random color from the current theme
  const colors = themeColors[currentTheme];
  bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  // Random position
  bubble.style.left = `${Math.random() * window.innerWidth}px`;
  bubble.style.top = `${window.innerHeight}px`;

  bubbleContainer.appendChild(bubble);
  setTimeout(() => bubble.remove(), 4000);
}
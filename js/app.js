// Main application logic

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const questionCounter = document.getElementById('question-counter');
const progressBar = document.querySelector('.progress-bar');
const currentAnimeLabel = document.getElementById('current-anime');
const finalScoreDisplay = document.getElementById('final-score');
const scoreVerdict = document.getElementById('score-verdict');
const retryBtn = document.getElementById('retry-btn');
const homeBtn = document.getElementById('home-btn');
const themeToggle = document.getElementById('theme-toggle');
const soundToggle = document.getElementById('sound-toggle');
const highScoresList = document.getElementById('high-scores-list');
const backgroundContainer = document.querySelector('.background-container');

// State variables
let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];
let soundEnabled = true;
let currentTheme = null;
let selectedAnswer = false;

// Audio elements
const audioClick = new Audio();
const audioCorrect = new Audio();
const audioWrong = new Audio();
const audioNext = new Audio();

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', goToNextQuestion);
retryBtn.addEventListener('click', restartQuiz);
homeBtn.addEventListener('click', goToHome);
themeToggle.addEventListener('click', toggleTheme);
soundToggle.addEventListener('click', toggleSound);

// Initialize the app
function initApp() {
    // Set default theme
    setTheme('naruto');
    
    // Check for saved sound preference
    const savedSoundPreference = localStorage.getItem('soundEnabled');
    if (savedSoundPreference !== null) {
        soundEnabled = JSON.parse(savedSoundPreference);
        updateSoundIcon();
    }
    
    // Load high scores
    loadHighScores();
}

// Start the quiz
function startQuiz() {
    // Shuffle and prepare questions
    shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    
    // Hide start screen, show quiz screen
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    quizScreen.classList.add('fadeIn');
    
    // Display first question
    showQuestion();
    
    // Play sound effect
    playSound('click');
}

// Show current question
function showQuestion() {
    resetState();
    
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    
    // Update question counter and progress bar
    questionCounter.textContent = `Question ${questionNumber}/${shuffledQuestions.length}`;
    progressBar.style.width = `${(questionNumber / shuffledQuestions.length) * 100}%`;
    
    // Set theme based on current anime
    setTheme(currentQuestion.anime);
    
    // Update anime label
    currentAnimeLabel.textContent = formatAnimeName(currentQuestion.anime);
    
    // Set question text
    questionText.textContent = currentQuestion.question;
    
    // Create answer buttons
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.textContent = option;
        
        // Add click event
        button.addEventListener('click', () => selectAnswer(index, currentQuestion.correctAnswer));
        
        // Add to answers container
        answersContainer.appendChild(button);
    });
}

// Reset the state between questions
function resetState() {
    nextBtn.classList.add('hidden');
    selectedAnswer = false;
    
    // Clear previous answers
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

// Handle answer selection
function selectAnswer(selectedIndex, correctIndex) {
    // Prevent selecting multiple answers
    if (selectedAnswer) return;
    selectedAnswer = true;
    
    const buttons = document.querySelectorAll('.answer-btn');
    
    // Highlight correct and incorrect answers
    buttons.forEach((button, index) => {
        if (index === correctIndex) {
            button.classList.add('correct');
        } else if (index === selectedIndex) {
            button.classList.add('wrong');
        }
        
        // Disable all buttons
        button.disabled = true;
    });
    
    // Update score if correct
    if (selectedIndex === correctIndex) {
        score++;
        playSound('correct');
    } else {
        playSound('wrong');
    }
    
    // Show next button
    nextBtn.classList.remove('hidden');
    nextBtn.classList.add('bounce');
}

// Go to next question
function goToNextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
        playSound('next');
    } else {
        showResults();
    }
}

// Show results screen
function showResults() {
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    resultsScreen.classList.add('fadeIn');
    
    // Display final score
    finalScoreDisplay.textContent = `${score}/${shuffledQuestions.length}`;
    
    // Show score verdict
    const percent = (score / shuffledQuestions.length) * 100;
    let verdictText = '';
    
    // Find appropriate verdict
    for (const verdict of scoreVerdicts) {
        if (score >= verdict.range[0] && score <= verdict.range[1]) {
            verdictText = verdict.text;
            break;
        }
    }
    
    scoreVerdict.textContent = verdictText;
    
    // Save score to local storage
    saveScore(score);
    
    // Display high scores
    displayHighScores();
}

// Restart the quiz
function restartQuiz() {
    resultsScreen.classList.add('hidden');
    playSound('click');
    startQuiz();
}

// Go back to home screen
function goToHome() {
    resultsScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    startScreen.classList.add('fadeIn');
    playSound('click');
}

// Toggle theme manually
function toggleTheme() {
    // Get all anime themes
    const animeThemes = Object.keys(themes);
    
    // Find current theme index
    let currentIndex = animeThemes.indexOf(currentTheme);
    
    // Move to next theme (or back to first)
    currentIndex = (currentIndex + 1) % animeThemes.length;
    
    // Set the new theme
    setTheme(animeThemes[currentIndex]);
    
    playSound('click');
}

// Toggle sound on/off
function toggleSound() {
    soundEnabled = !soundEnabled;
    updateSoundIcon();
    
    // Save preference
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
}

// Update sound icon
function updateSoundIcon() {
    if (soundEnabled) {
        soundToggle.querySelector('.icon').textContent = '🔊';
    } else {
        soundToggle.querySelector('.icon').textContent = '🔇';
    }
}

// Set theme based on anime
function setTheme(anime) {
    // If invalid anime, use default
    if (!themes[anime]) {
        anime = 'naruto';
    }
    
    // Store current theme
    currentTheme = anime;
    
    // Get theme details
    const theme = themes[anime];
    
    // Remove all theme classes
    document.body.className = '';
    
    // Add theme class
    document.body.classList.add(theme.className);
      // Set background image (randomly select from available backgrounds)
    const backgrounds = animeBackgrounds[anime];
    const randomBgIndex = Math.floor(Math.random() * backgrounds.length);
    backgroundContainer.style.backgroundImage = `url('./assets/images/${backgrounds[randomBgIndex]}')`;
    
    // Update audio sources
    audioClick.src = `./assets/audio/${theme.soundEffects.click}`;
    audioCorrect.src = `./assets/audio/${theme.soundEffects.correct}`;
    audioWrong.src = `./assets/audio/${theme.soundEffects.wrong}`;
    audioNext.src = `./assets/audio/${theme.soundEffects.next}`;
    
    // Preload audio
    audioClick.load();
    audioCorrect.load();
    audioWrong.load();
    audioNext.load();
}

// Play sound effect
function playSound(type) {
    if (!soundEnabled) return;
    
    switch(type) {
        case 'click':
            audioClick.currentTime = 0;
            audioClick.play();
            break;
        case 'correct':
            audioCorrect.currentTime = 0;
            audioCorrect.play();
            break;
        case 'wrong':
            audioWrong.currentTime = 0;
            audioWrong.play();
            break;
        case 'next':
            audioNext.currentTime = 0;
            audioNext.play();
            break;
    }
}

// Format anime name for display
function formatAnimeName(animeName) {
    return animeName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Save score to local storage
function saveScore(newScore) {
    // Get existing scores
    let highScores = JSON.parse(localStorage.getItem('animeQuizHighScores')) || [];
    
    // Add new score with timestamp
    highScores.push({
        score: newScore,
        total: shuffledQuestions.length,
        date: new Date().toISOString()
    });
    
    // Sort scores (highest first)
    highScores.sort((a, b) => (b.score/b.total) - (a.score/a.total));
    
    // Keep only top 5 scores
    highScores = highScores.slice(0, 5);
    
    // Save back to storage
    localStorage.setItem('animeQuizHighScores', JSON.stringify(highScores));
}

// Load high scores
function loadHighScores() {
    return JSON.parse(localStorage.getItem('animeQuizHighScores')) || [];
}

// Display high scores
function displayHighScores() {
    // Clear existing list
    highScoresList.innerHTML = '';
    
    // Get scores
    const scores = loadHighScores();
    
    // If no scores
    if (scores.length === 0) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No high scores yet!';
        highScoresList.appendChild(listItem);
        return;
    }
    
    // Add each score to list
    scores.forEach((scoreData, index) => {
        const listItem = document.createElement('li');
        
        // Format date
        const date = new Date(scoreData.date);
        const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
        
        listItem.innerHTML = `
            <span>#${index + 1}: ${scoreData.score}/${scoreData.total}</span>
            <span>${formattedDate}</span>
        `;
        
        highScoresList.appendChild(listItem);
    });
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

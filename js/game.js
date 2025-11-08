// AFilm Detective Game Logic

// Vision screens navigation
let currentScreen = 1;
const totalScreens = 5;

function initVisionScreens() {
    showScreen(1);
    updateProgressDots();
}

function showScreen(screenNumber) {
    document.querySelectorAll('.vision-screen').forEach(screen => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(`screen-${screenNumber}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenNumber;
        updateProgressDots();
    }
}

function nextScreen() {
    if (currentScreen < totalScreens) {
        showScreen(currentScreen + 1);
    }
}

function prevScreen() {
    if (currentScreen > 1) {
        showScreen(currentScreen - 1);
    }
}

function updateProgressDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index + 1 <= currentScreen) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Episode camera selection logic
function checkAnswer(selectedCamera) {
    const episodeContainer = document.querySelector('[data-correct]');
    if (!episodeContainer) return;

    const correctAnswer = episodeContainer.getAttribute('data-correct');
    const feedback = document.getElementById('answer-feedback');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');
    const nextButton = document.getElementById('next-button');

    if (!feedback) return;

    // Remove previous classes
    feedback.classList.remove('correct', 'incorrect');

    if (selectedCamera === correctAnswer) {
        // Correct answer
        feedback.classList.add('correct', 'show');
        feedbackIcon.textContent = '✅';
        feedbackTitle.textContent = 'Верно!';

        // Episode-specific feedback
        const feedbackMessages = {
            'sony': 'Обрати внимание на характерный "видеошный" вид картинки Sony TRV900. Цифровое видео той эпохи имело особую текстуру.',
            'canon': 'Отличная работа! Canon XL1 отличается более кинематографичной картинкой с мягкими переходами и естественными тонами кожи.',
            'panasonic': 'Превосходно! Panasonic DVX100 была первой доступной камерой с режимом 24p, что делало картинку похожей на плёнку.',
            'hero3': 'Блестяще! GoPro Hero3 легко узнать по характерному широкому углу обзора и специфическим искажениям "рыбий глаз".'
        };

        feedbackText.textContent = feedbackMessages[correctAnswer] || 'Ты правильно определил камеру!';

        if (nextButton) {
            nextButton.style.display = 'inline-block';
        }
    } else {
        // Incorrect answer
        feedback.classList.add('incorrect', 'show');
        feedbackIcon.textContent = '❌';
        feedbackTitle.textContent = 'Не совсем...';

        // Episode-specific hints
        const hintMessages = {
            'sony': 'Пикси подсказывает: обрати внимание на резкость и контраст. Sony TRV900 даёт более "цифровую" картинку.',
            'canon': 'Пикси подсказывает: посмотри на цвета и тона кожи. Canon XL1 имеет более тёплую и кинематографичную картинку.',
            'panasonic': 'Пикси подсказывает: присмотрись к движению и плавности кадра. Panasonic DVX100 с режимом 24p создаёт эффект киноплёнки.',
            'hero3': 'Пикси подсказывает: обрати внимание на угол обзора и перспективу. GoPro имеет характерный широкий угол.'
        };

        feedbackText.textContent = hintMessages[correctAnswer] || 'Попробуй ещё раз! Внимательно посмотри на все три видео.';

        if (nextButton) {
            nextButton.style.display = 'none';
        }
    }

    // Scroll to feedback
    feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function retryEpisode() {
    const feedback = document.getElementById('answer-feedback');
    if (feedback) {
        feedback.classList.remove('show');
    }
}

// Save progress to localStorage
function saveProgress(episode) {
    const progress = JSON.parse(localStorage.getItem('afilm_progress') || '[]');
    if (!progress.includes(episode)) {
        progress.push(episode);
        localStorage.setItem('afilm_progress', JSON.stringify(progress));
    }
}

function getProgress() {
    return JSON.parse(localStorage.getItem('afilm_progress') || '[]');
}

function resetProgress() {
    localStorage.removeItem('afilm_progress');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize vision screens if on vision page
    if (document.querySelector('.vision-screen')) {
        initVisionScreens();
    }

    // Add keyboard navigation for vision screens
    document.addEventListener('keydown', function(e) {
        if (document.querySelector('.vision-screen')) {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                nextScreen();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevScreen();
            }
        }
    });
});

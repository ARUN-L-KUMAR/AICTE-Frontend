/**
 * Online Quiz Application
 * A comprehensive quiz app with dynamic question fetching, timer, scoring, and responsive design
 * Created with HTML, CSS, and JavaScript
 */

class QuizApp {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questions = [];
        this.timeLeft = 30;
        this.timerInterval = null;
        this.selectedAnswer = null;
        
        // DOM elements
        this.screens = {
            start: document.getElementById('start-screen'),
            loading: document.getElementById('loading-screen'),
            quiz: document.getElementById('quiz-screen'),
            results: document.getElementById('results-screen')
        };
        
        this.elements = {
            startBtn: document.getElementById('start-btn'),
            difficulty: document.getElementById('difficulty'),
            category: document.getElementById('category'),
            questionCount: document.getElementById('questionCount'),
            questionText: document.getElementById('question-text'),
            optionsContainer: document.getElementById('options-container'),
            questionCounter: document.getElementById('question-counter'),
            scoreElement: document.getElementById('score'),
            timer: document.getElementById('timer'),
            progressFill: document.getElementById('progress-fill'),
            feedback: document.getElementById('feedback'),
            feedbackIcon: document.getElementById('feedback-icon'),
            feedbackText: document.getElementById('feedback-text'),
            nextBtn: document.getElementById('next-btn'),
            restartBtn: document.getElementById('restart-btn'),
            shareBtn: document.getElementById('share-btn')
        };
        
        this.init();
    }

    /**
     * Initialize the quiz application
     */
    init() {
        this.bindEvents();
        this.showScreen('start');
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        this.elements.startBtn.addEventListener('click', () => this.startQuiz());
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.elements.shareBtn.addEventListener('click', () => this.shareResults());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (this.screens.start.classList.contains('active')) {
                    this.startQuiz();
                } else if (!this.elements.feedback.classList.contains('hidden')) {
                    this.nextQuestion();
                }
            }
        });
    }

    /**
     * Show a specific screen
     */
    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => screen.classList.remove('active'));
        this.screens[screenName].classList.add('active');
    }

    /**
     * Start the quiz
     */
    async startQuiz() {
        try {
            this.showScreen('loading');
            
            // Get quiz settings
            const settings = {
                difficulty: this.elements.difficulty.value,
                category: this.elements.category.value,
                amount: parseInt(this.elements.questionCount.value)
            };
            
            // Load questions
            await this.loadQuestions(settings);
            
            // Initialize quiz state
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.updateScore();
            
            // Show quiz screen and start first question
            this.showScreen('quiz');
            this.displayQuestion();
            
        } catch (error) {
            console.error('Error starting quiz:', error);
            alert('Failed to load quiz questions. Please try again.');
            this.showScreen('start');
        }
    }

    /**
     * Load questions from API or fallback to local questions
     */
    async loadQuestions(settings) {
        try {
            // Try to fetch from Open Trivia DB API
            const url = `https://opentdb.com/api.php?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=multiple`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.response_code === 0 && data.results.length > 0) {
                this.questions = this.formatAPIQuestions(data.results);
            } else {
                throw new Error('API returned no questions');
            }
            
        } catch (error) {
            console.warn('API failed, using fallback questions:', error);
            // Fallback to local questions
            this.questions = this.getFallbackQuestions(settings);
        }
    }

    /**
     * Format questions from API response
     */
    formatAPIQuestions(apiQuestions) {
        return apiQuestions.map(q => ({
            question: this.decodeHTML(q.question),
            correct: this.decodeHTML(q.correct_answer),
            incorrect: q.incorrect_answers.map(answer => this.decodeHTML(answer)),
            category: this.decodeHTML(q.category),
            difficulty: q.difficulty
        }));
    }

    /**
     * Decode HTML entities
     */
    decodeHTML(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    /**
     * Get fallback questions when API fails
     */
    getFallbackQuestions(settings) {
        const fallbackQuestions = [
            {
                question: "What is the capital of France?",
                correct: "Paris",
                incorrect: ["London", "Berlin", "Madrid"],
                category: "Geography",
                difficulty: "easy"
            },
            {
                question: "Which planet is known as the Red Planet?",
                correct: "Mars",
                incorrect: ["Venus", "Jupiter", "Saturn"],
                category: "Science",
                difficulty: "easy"
            },
            {
                question: "Who painted the Mona Lisa?",
                correct: "Leonardo da Vinci",
                incorrect: ["Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
                category: "Art",
                difficulty: "medium"
            },
            {
                question: "What is the largest mammal in the world?",
                correct: "Blue Whale",
                incorrect: ["African Elephant", "Giraffe", "Hippopotamus"],
                category: "Nature",
                difficulty: "easy"
            },
            {
                question: "In which year did World War II end?",
                correct: "1945",
                incorrect: ["1944", "1946", "1943"],
                category: "History",
                difficulty: "medium"
            },
            {
                question: "What is the chemical symbol for gold?",
                correct: "Au",
                incorrect: ["Go", "Gd", "Ag"],
                category: "Science",
                difficulty: "medium"
            },
            {
                question: "Which programming language is known as the 'language of the web'?",
                correct: "JavaScript",
                incorrect: ["Python", "Java", "C++"],
                category: "Technology",
                difficulty: "easy"
            },
            {
                question: "What is the smallest country in the world?",
                correct: "Vatican City",
                incorrect: ["Monaco", "San Marino", "Liechtenstein"],
                category: "Geography",
                difficulty: "medium"
            },
            {
                question: "Who wrote 'Romeo and Juliet'?",
                correct: "William Shakespeare",
                incorrect: ["Charles Dickens", "Jane Austen", "Mark Twain"],
                category: "Literature",
                difficulty: "easy"
            },
            {
                question: "What is the hardest natural substance on Earth?",
                correct: "Diamond",
                incorrect: ["Quartz", "Steel", "Iron"],
                category: "Science",
                difficulty: "medium"
            }
        ];
        
        // Shuffle and return the requested number of questions
        const shuffled = [...fallbackQuestions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, settings.amount);
    }

    /**
     * Display current question
     */
    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Update question text
        this.elements.questionText.textContent = question.question;
        
        // Update progress
        this.updateProgress();
        
        // Create options array and shuffle
        const options = [...question.incorrect, question.correct].sort(() => 0.5 - Math.random());
        
        // Display options
        this.elements.optionsContainer.innerHTML = '';
        options.forEach((option, index) => {
            const optionElement = this.createOptionElement(option, index);
            this.elements.optionsContainer.appendChild(optionElement);
        });
        
        // Reset timer
        this.startTimer();
        
        // Reset selected answer
        this.selectedAnswer = null;
    }

    /**
     * Create option element
     */
    createOptionElement(text, index) {
        const option = document.createElement('div');
        option.className = 'option';
        option.textContent = text;
        option.setAttribute('data-answer', text);
        option.addEventListener('click', () => this.selectAnswer(option, text));
        
        // Add keyboard navigation
        option.setAttribute('tabindex', '0');
        option.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.selectAnswer(option, text);
            }
        });
        
        return option;
    }

    /**
     * Handle answer selection
     */
    selectAnswer(optionElement, answer) {
        if (this.selectedAnswer !== null) return; // Prevent multiple selections
        
        this.selectedAnswer = answer;
        this.stopTimer();
        
        // Mark selected option
        optionElement.classList.add('selected');
        
        // Disable all options
        const options = this.elements.optionsContainer.querySelectorAll('.option');
        options.forEach(opt => opt.classList.add('disabled'));
        
        // Check if answer is correct
        const currentQuestion = this.questions[this.currentQuestionIndex];
        const isCorrect = answer === currentQuestion.correct;
        
        // Show correct/incorrect styling
        setTimeout(() => {
            this.showAnswerFeedback(isCorrect, currentQuestion.correct);
        }, 500);
    }

    /**
     * Show answer feedback
     */
    showAnswerFeedback(isCorrect, correctAnswer) {
        // Update options styling
        const options = this.elements.optionsContainer.querySelectorAll('.option');
        options.forEach(option => {
            const optionText = option.getAttribute('data-answer');
            if (optionText === correctAnswer) {
                option.classList.add('correct');
            } else if (optionText === this.selectedAnswer && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
        
        // Update score
        if (isCorrect) {
            this.score += 10;
            this.updateScore();
        }
        
        // Show feedback modal
        this.showFeedbackModal(isCorrect, correctAnswer);
    }

    /**
     * Show feedback modal
     */
    showFeedbackModal(isCorrect, correctAnswer) {
        const feedbackIcon = this.elements.feedbackIcon;
        const feedbackText = this.elements.feedbackText;
        
        if (isCorrect) {
            feedbackIcon.className = 'fas fa-check-circle';
            feedbackIcon.parentElement.className = 'feedback-icon correct';
            feedbackText.textContent = 'Correct! Well done!';
        } else {
            feedbackIcon.className = 'fas fa-times-circle';
            feedbackIcon.parentElement.className = 'feedback-icon incorrect';
            feedbackText.textContent = `Wrong! The correct answer is: ${correctAnswer}`;
        }
        
        // Show feedback
        this.elements.feedback.classList.remove('hidden');
        
        // Auto-advance after 3 seconds if this is not the last question
        if (this.currentQuestionIndex < this.questions.length - 1) {
            setTimeout(() => {
                if (!this.elements.feedback.classList.contains('hidden')) {
                    this.nextQuestion();
                }
            }, 3000);
        }
    }

    /**
     * Move to next question
     */
    nextQuestion() {
        this.elements.feedback.classList.add('hidden');
        
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.questions.length) {
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }

    /**
     * Start the timer
     */
    startTimer() {
        this.timeLeft = 30;
        this.updateTimerDisplay();
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            // Warning at 10 seconds
            if (this.timeLeft <= 10) {
                this.elements.timer.classList.add('timer-warning');
            }
            
            // Time's up
            if (this.timeLeft <= 0) {
                this.handleTimeUp();
            }
        }, 1000);
    }

    /**
     * Stop the timer
     */
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.elements.timer.classList.remove('timer-warning');
    }

    /**
     * Update timer display
     */
    updateTimerDisplay() {
        this.elements.timer.textContent = this.timeLeft;
    }

    /**
     * Handle when time runs out
     */
    handleTimeUp() {
        if (this.selectedAnswer === null) {
            this.stopTimer();
            
            // Disable all options
            const options = this.elements.optionsContainer.querySelectorAll('.option');
            options.forEach(opt => opt.classList.add('disabled'));
            
            // Show correct answer
            const currentQuestion = this.questions[this.currentQuestionIndex];
            this.showAnswerFeedback(false, currentQuestion.correct);
        }
    }

    /**
     * Update score display
     */
    updateScore() {
        this.elements.scoreElement.textContent = this.score;
    }

    /**
     * Update progress bar
     */
    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.elements.progressFill.style.width = `${progress}%`;
        this.elements.questionCounter.textContent = `${this.currentQuestionIndex + 1} / ${this.questions.length}`;
    }

    /**
     * Show results screen
     */
    showResults() {
        this.stopTimer();
        
        const totalQuestions = this.questions.length;
        const correctAnswers = this.score / 10;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        
        // Update results display
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('final-percentage').textContent = `${percentage}%`;
        document.getElementById('correct-answers').textContent = correctAnswers;
        document.getElementById('total-questions').textContent = totalQuestions;
        
        // Set performance message and icon
        this.setPerformanceMessage(percentage);
        
        this.showScreen('results');
    }

    /**
     * Set performance message based on score
     */
    setPerformanceMessage(percentage) {
        const resultsIcon = document.getElementById('results-icon');
        const performanceMessage = document.getElementById('performance-message');
        
        if (percentage >= 90) {
            resultsIcon.className = 'results-icon excellent';
            resultsIcon.innerHTML = '<i class="fas fa-trophy"></i>';
            performanceMessage.textContent = 'Outstanding! You\'re a quiz master!';
        } else if (percentage >= 70) {
            resultsIcon.className = 'results-icon good';
            resultsIcon.innerHTML = '<i class="fas fa-medal"></i>';
            performanceMessage.textContent = 'Great job! You did very well!';
        } else if (percentage >= 50) {
            resultsIcon.className = 'results-icon average';
            resultsIcon.innerHTML = '<i class="fas fa-thumbs-up"></i>';
            performanceMessage.textContent = 'Not bad! Keep practicing!';
        } else {
            resultsIcon.className = 'results-icon poor';
            resultsIcon.innerHTML = '<i class="fas fa-redo"></i>';
            performanceMessage.textContent = 'Don\'t give up! Try again to improve!';
        }
    }

    /**
     * Restart the quiz
     */
    restartQuiz() {
        // Reset all variables
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questions = [];
        this.selectedAnswer = null;
        
        // Stop timer if running
        this.stopTimer();
        
        // Show start screen
        this.showScreen('start');
    }

    /**
     * Share results
     */
    shareResults() {
        const totalQuestions = this.questions.length;
        const correctAnswers = this.score / 10;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        
        const shareText = `I just scored ${this.score} points (${percentage}%) on the Online Quiz! ${correctAnswers}/${totalQuestions} correct answers. Can you beat my score?`;
        
        // Try to use Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: 'Online Quiz Results',
                text: shareText,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
                this.fallbackShare(shareText);
            });
        } else {
            this.fallbackShare(shareText);
        }
    }

    /**
     * Fallback share method
     */
    fallbackShare(text) {
        // Copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Results copied to clipboard! You can now paste and share them.');
            }).catch(() => {
                this.manualShare(text);
            });
        } else {
            this.manualShare(text);
        }
    }

    /**
     * Manual share method
     */
    manualShare(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            alert('Results copied to clipboard! You can now paste and share them.');
        } catch (err) {
            // Show text in a modal for manual copying
            alert(`Share your results:\n\n${text}`);
        }
        
        document.body.removeChild(textarea);
    }
}

// Initialize the quiz when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

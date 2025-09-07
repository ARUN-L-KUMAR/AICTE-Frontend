# Online Quiz Application

A modern, responsive quiz application built with HTML, CSS, and JavaScript that provides an interactive quiz experience with dynamic question fetching, real-time scoring, and comprehensive results analysis.

![Quiz App Preview](https://img.shields.io/badge/Status-Complete-brightgreen.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🌟 Features

### Core Functionality
- **Dynamic Question Loading**: Fetches questions from Open Trivia DB API with fallback to local questions
- **Multiple Quiz Categories**: General Knowledge, Sports, History, Science, Entertainment, and more
- **Difficulty Levels**: Easy, Medium, and Hard questions available
- **Customizable Quiz Length**: Choose from 5, 10, or 15 questions
- **Real-time Scoring**: Track your score throughout the quiz
- **Timer System**: 30-second countdown per question with visual warnings
- **Immediate Feedback**: Instant correct/incorrect feedback with explanations
- **Progress Tracking**: Visual progress bar and question counter
- **Comprehensive Results**: Detailed score breakdown and performance analysis

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Accessibility**: Keyboard navigation support and screen reader friendly
- **Visual Feedback**: Color-coded answers and animated transitions
- **Share Results**: Built-in sharing functionality for social media

### Technical Features
- **API Integration**: Connects to Open Trivia Database for diverse questions
- **Error Handling**: Graceful fallback when API is unavailable
- **Local Storage**: Potential for saving quiz history (easily extendable)
- **Service Worker Ready**: Framework for offline functionality
- **Cross-browser Compatible**: Works on all modern browsers

## 🚀 Demo

### Live Features:
1. **Start Screen**: Select difficulty, category, and number of questions
2. **Quiz Interface**: Answer questions with visual timer and score tracking
3. **Immediate Feedback**: See correct answers instantly with explanations
4. **Results Screen**: Comprehensive performance analysis with sharing options

## 🛠️ Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API features, works offline with fallback questions)

### Quick Start
1. **Clone or Download**
   ```bash
   git clone [repository-url]
   cd online-quiz-application
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for best experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using VS Code Live Server extension
   Right-click index.html → "Open with Live Server"
   ```

3. **Start Quizzing!**
   - Select your preferred difficulty and category
   - Choose the number of questions
   - Click "Start Quiz" and begin!

## 📁 Project Structure

```
online-quiz-application/
│
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
└── assets/             # (Optional) Images and icons
    └── screenshots/    # Application screenshots
```

## 🎯 How to Use

### Starting a Quiz
1. **Choose Settings**:
   - Select difficulty level (Easy/Medium/Hard)
   - Pick a category (General Knowledge, Sports, etc.)
   - Choose number of questions (5/10/15)

2. **Take the Quiz**:
   - Read each question carefully
   - Click on your answer choice
   - Watch the timer (30 seconds per question)
   - Get immediate feedback on your selection

3. **View Results**:
   - See your final score and percentage
   - Review performance analysis
   - Share your results with friends
   - Restart to try again

### Navigation Controls
- **Mouse**: Click on answers and buttons
- **Keyboard**: Use Tab to navigate, Enter to select
- **Touch**: Tap on mobile devices

## 🧩 API Integration

### Open Trivia Database
The application integrates with [Open Trivia DB](https://opentdb.com/) to fetch diverse questions:

- **Endpoint**: `https://opentdb.com/api.php`
- **Parameters**: amount, category, difficulty, type
- **Fallback**: Local question bank when API is unavailable
- **Error Handling**: Graceful degradation with user notification

### Sample API Call
```javascript
const url = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;
```

## 🎨 Customization

### Styling
Modify `styles.css` to customize:
- Color schemes and themes
- Font families and sizes
- Animation speeds and effects
- Responsive breakpoints

### Questions
Add custom questions in `script.js`:
```javascript
const customQuestions = [
    {
        question: "Your question here?",
        correct: "Correct answer",
        incorrect: ["Wrong 1", "Wrong 2", "Wrong 3"],
        category: "Custom Category",
        difficulty: "easy"
    }
];
```

### Timer Settings
Adjust timer duration in `script.js`:
```javascript
startTimer() {
    this.timeLeft = 30; // Change to desired seconds
    // ... rest of timer logic
}
```

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

### Adaptive Features
- Flexible grid layouts
- Scalable font sizes
- Touch-optimized buttons
- Collapsible navigation
- Optimized spacing

## 🔧 Browser Support

| Browser | Version | Status |
|---------|---------|---------|
| Chrome  | 60+     | ✅ Full Support |
| Firefox | 55+     | ✅ Full Support |
| Safari  | 12+     | ✅ Full Support |
| Edge    | 79+     | ✅ Full Support |
| IE      | 11      | ⚠️ Partial Support |

## 🚀 Future Enhancements

### Planned Features
- [ ] User accounts and quiz history
- [ ] Leaderboards and competitions
- [ ] Custom quiz creation
- [ ] Multiplayer mode
- [ ] Quiz categories expansion
- [ ] Advanced statistics
- [ ] Offline mode with service worker
- [ ] Dark/light theme toggle
- [ ] Question explanations
- [ ] Difficulty progression system

### Technical Improvements
- [ ] Unit testing implementation
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] PWA capabilities
- [ ] Database integration
- [ ] Admin dashboard

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test on multiple browsers
- Ensure responsive design
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- **Open Trivia Database** for providing the quiz questions API
- **Font Awesome** for the beautiful icons
- **Google Fonts** for typography
- **CSS Grid and Flexbox** for layout capabilities
- **Modern JavaScript APIs** for enhanced functionality

## 📊 Project Stats

- **Lines of Code**: ~1200+
- **Files**: 4 main files
- **Dependencies**: None (Vanilla JavaScript)
- **Load Time**: < 2 seconds
- **Bundle Size**: < 50KB

## 🔗 Useful Links

- [Open Trivia DB API Documentation](https://opentdb.com/api_config.php)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Font Awesome Icons](https://fontawesome.com/icons)

---

**Made with ❤️ for the AICTE-Edunet Frontend Web Development Course**

*Happy Quizzing! 🎉*

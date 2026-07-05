# 🧠 Online Quiz Application

A modern, interactive quiz app built with **HTML5**, **CSS3**, and **JavaScript**. Features dynamic question loading, real-time scoring, and responsive design.

![Status](https://img.shields.io/badge/Status-Complete-brightgreen.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- 🎯 **Dynamic Questions** - Fetches from Open Trivia DB API with offline fallback
- ⏱️ **Timer System** - 30-second countdown per question
- 🏆 **Real-time Scoring** - Instant feedback and progress tracking
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Smooth animations and intuitive interface
- 📊 **Detailed Results** - Performance analysis and sharing options
- ♿ **Accessible** - Keyboard navigation and screen reader support

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/ARUN-L-KUMAR/Online-Quiz-Application.git
   cd Online-Quiz-Application
   ```

2. **Open in browser**
   - Double-click `index.html`, or
   - Use a local server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve .
   ```

3. **Start quizzing!**
   - Select difficulty, category, and question count
   - Answer questions within 30 seconds
   - View your results and share with friends

## 🎮 How It Works

1. **Setup** → Choose your quiz preferences
2. **Quiz** → Answer questions with live timer and scoring  
3. **Results** → View detailed performance analysis
4. **Share** → Post your score on social media

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **API**: Open Trivia Database
- **Design**: CSS Grid, Flexbox, Custom Animations
- **Features**: Service Worker, PWA-ready, Responsive

## 📁 Project Structure

```
online-quiz-application/
├── index.html          # Main HTML structure
├── styles.css          # Responsive CSS styling  
├── script.js           # Core JavaScript logic
├── questions.json      # Fallback question bank
├── sw.js              # Service worker (PWA)
└── README.md          # Documentation
```

## 🎨 Customization

**Add Custom Questions**
```javascript
const customQuestions = [{
    question: "Your question?",
    correct: "Right answer",
    incorrect: ["Wrong 1", "Wrong 2", "Wrong 3"],
    category: "Custom",
    difficulty: "easy"
}];
```

**Modify Timer**
```javascript
startTimer() {
    this.timeLeft = 45; // Change from 30 to 45 seconds
}
```

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 60+ | ✅ Full |
| Firefox 55+ | ✅ Full |
| Safari 12+ | ✅ Full |
| Edge 79+ | ✅ Full |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - feel free to use for learning and projects!

## 👨‍💻 Author

**ARUN L KUMAR**
- GitHub: [@ARUN-L-KUMAR](https://github.com/ARUN-L-KUMAR)
- Project: [Online Quiz Application](https://github.com/ARUN-L-KUMAR/Online-Quiz-Application)

---

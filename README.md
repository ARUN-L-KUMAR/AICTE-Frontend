# Smart Study Planner 📚

A comprehensive web-based study planner application built with HTML, CSS, and JavaScript. Organize your academic tasks efficiently with features like task management, calendar view, progress tracking, and smart reminders.

## 🌟 Features

### Core Functionality
- **Task Management**: Create, read, update, and delete tasks with ease
- **Task Details**: Add title, description, subject, due date, and priority levels
- **Status Tracking**: Mark tasks as completed or pending with checkboxes
- **Local Storage**: All data persists in your browser's local storage

### User Interface
- **Multiple Views**: Switch between Tasks, Calendar, and Statistics views
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Dark/Light Theme**: Beautiful gradient background with glassmorphism effects

### Advanced Features
- **Search & Filter**: Find tasks by title, description, or filter by subject, status, and priority
- **Calendar View**: Visual timeline showing tasks organized by due dates
- **Statistics Dashboard**: Track your progress with completion rates and subject breakdowns
- **Smart Reminders**: Get notifications for overdue tasks and upcoming deadlines
- **Priority System**: Organize tasks by High, Medium, and Low priority levels
- **Subject Categorization**: Organize tasks by academic subjects

### Productivity Features
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Overdue Detection**: Automatic identification and highlighting of overdue tasks
- **Task Sorting**: Smart sorting by due date, priority, and completion status
- **Bulk Operations**: Efficient task management with quick actions

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required!

### Installation & Setup

1. **Clone or Download the Repository**
   ```bash
   git clone <repository-url>
   cd smart-study-planner
   ```

2. **Open the Application**
   - Simply open `index.html` in your web browser
   - Or use a local server for better development experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Start Using!**
   - The application will load with sample tasks to help you get started
   - Your data is automatically saved to local storage

## 📱 How to Use

### Adding Tasks
1. Fill out the task form at the top of the page
2. Required fields: Title, Subject, Due Date
3. Optional: Description and Priority level
4. Click "Add Task" to save

### Managing Tasks
- **Edit**: Click the edit button on any task card
- **Delete**: Click the delete button and confirm
- **Complete**: Check the checkbox to mark as completed
- **View Details**: Click the eye icon to see full task details

### Navigation
- **Tasks View**: Main list of all your tasks with search and filters
- **Calendar View**: Monthly calendar showing tasks by due date
- **Statistics View**: Progress tracking and analytics

### Filtering & Search
- Use the search box to find tasks by keywords
- Filter by Subject, Status (All/Pending/Completed), or Priority
- Combine filters for more specific results

### Reminders
The app automatically checks for:
- Tasks due within 1 day (info notification)
- Tasks due within 1 hour (warning notification)
- Overdue tasks (warning notification)

## 🎨 Customization

### Adding New Subjects
Edit the `taskSubject` select options in `index.html`:
```html
<option value="YourSubject">Your Subject</option>
```

### Changing Colors & Themes
Modify the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* Add your custom colors */
}
```

### Customizing Priorities
Update priority levels in the JavaScript class and corresponding CSS styles.

## 🏗️ Project Structure

```
smart-study-planner/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

### Key Components

#### HTML Structure
- **Header**: App title and description
- **Navigation**: View switching buttons
- **Task Form**: Input form for creating/editing tasks
- **Views Container**: Houses all three main views
- **Modal**: Task details popup
- **Notifications**: Alert system

#### CSS Features
- **Responsive Grid Layout**: Adapts to all screen sizes
- **Glassmorphism Design**: Modern frosted glass effects
- **CSS Animations**: Smooth transitions and hover effects
- **Mobile-First Approach**: Optimized for mobile devices

#### JavaScript Architecture
- **Class-Based Structure**: Organized with SmartStudyPlanner class
- **Event-Driven**: Responsive to user interactions
- **Local Storage Integration**: Persistent data storage
- **Modular Functions**: Clean, maintainable code

## 🔧 Technical Details

### Browser Compatibility
- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

### Storage
- Uses HTML5 Local Storage
- Data persists between browser sessions
- Automatic backup on every change

### Performance
- Lightweight (~50KB total)
- Fast loading and rendering
- Efficient DOM updates
- Optimized for low-end devices

## 🚀 Future Enhancements

### Planned Features
- [ ] Data export/import functionality
- [ ] Multiple user profiles
- [ ] Task categories and tags
- [ ] Recurring tasks
- [ ] Study time tracking
- [ ] Integration with calendar apps
- [ ] Dark mode toggle
- [ ] Offline functionality with Service Workers

### Advanced Ideas
- [ ] AI-powered task prioritization
- [ ] Study schedule optimization
- [ ] Performance analytics
- [ ] Social features (study groups)
- [ ] Integration with learning management systems

## 🐛 Troubleshooting

### Common Issues

**Tasks not saving:**
- Check if local storage is enabled in your browser
- Ensure you're not in private/incognito mode

**Date/time display issues:**
- Verify your system date and time are correct
- Check browser timezone settings

**Responsive design problems:**
- Clear browser cache
- Ensure you're using a modern browser version

**Notifications not working:**
- Make sure the browser tab remains active
- Check browser notification permissions

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature-name`
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

### Contribution Guidelines
- Follow existing code style and structure
- Add comments for complex functionality
- Test on multiple browsers and devices
- Update documentation as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

- **Your Name** - Initial work and development

## 🙏 Acknowledgments

- Icons provided by [Font Awesome](https://fontawesome.com/)
- Inspired by modern productivity applications
- Built with vanilla web technologies for maximum compatibility

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information
4. Contact the development team

---

**Happy Studying! 🎓**

Made with ❤️ for students everywhere.

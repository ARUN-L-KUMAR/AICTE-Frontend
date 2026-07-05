// Smart Study Planner JavaScript
class SmartStudyPlanner {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentView = 'tasks';
        this.currentEditingTask = null;
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        
        this.init();
        this.bindEvents();
        this.updateUI();
        this.checkReminders();
        
        // Check for reminders every minute
        setInterval(() => this.checkReminders(), 60000);
    }

    init() {
        // Set minimum date to today for new tasks
        const now = new Date();
        const minDateTime = now.toISOString().slice(0, 16);
        document.getElementById('taskDueDate').min = minDateTime;
        
        // Populate subject filter
        this.populateSubjectFilter();
        
        // Initialize calendar
        this.renderCalendar();
        
        // Show initial view
        this.showView('tasks');
    }

    bindEvents() {
        // Form submission
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Cancel edit
        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.cancelEdit();
        });

        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.getAttribute('data-view');
                this.showView(view);
            });
        });

        // Search and filters
        document.getElementById('searchTasks').addEventListener('input', (e) => {
            this.filterTasks();
        });

        document.getElementById('subjectFilter').addEventListener('change', () => {
            this.filterTasks();
        });

        document.getElementById('statusFilter').addEventListener('change', () => {
            this.filterTasks();
        });

        document.getElementById('priorityFilter').addEventListener('change', () => {
            this.filterTasks();
        });

        // Calendar navigation
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.previousMonth();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.nextMonth();
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        document.getElementById('taskModal').addEventListener('click', (e) => {
            if (e.target.id === 'taskModal') {
                this.closeModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.cancelEdit();
            }
        });
    }

    // Task Management
    handleFormSubmit() {
        const formData = new FormData(document.getElementById('taskForm'));
        const task = {
            id: this.currentEditingTask ? this.currentEditingTask.id : this.generateId(),
            title: formData.get('title').trim(),
            description: formData.get('description').trim(),
            subject: formData.get('subject'),
            dueDate: formData.get('dueDate'),
            priority: formData.get('priority'),
            completed: this.currentEditingTask ? this.currentEditingTask.completed : false,
            createdAt: this.currentEditingTask ? this.currentEditingTask.createdAt : new Date().toISOString()
        };

        if (this.validateTask(task)) {
            if (this.currentEditingTask) {
                this.updateTask(task);
            } else {
                this.addTask(task);
            }
        }
    }

    validateTask(task) {
        if (!task.title || !task.subject || !task.dueDate) {
            this.showNotification('Please fill in all required fields', 'error');
            return false;
        }

        const dueDate = new Date(task.dueDate);
        if (dueDate < new Date() && !this.currentEditingTask) {
            this.showNotification('Due date cannot be in the past', 'error');
            return false;
        }

        return true;
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasks();
        this.updateUI();
        this.resetForm();
        this.showNotification('Task added successfully!', 'success');
    }

    updateTask(updatedTask) {
        const index = this.tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
            this.tasks[index] = updatedTask;
            this.saveTasks();
            this.updateUI();
            this.cancelEdit();
            this.showNotification('Task updated successfully!', 'success');
        }
    }

    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            this.saveTasks();
            this.updateUI();
            this.showNotification('Task deleted successfully!', 'success');
        }
    }

    toggleTaskComplete(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.updateUI();
            this.showNotification(`Task marked as ${task.completed ? 'completed' : 'pending'}!`, 'success');
        }
    }

    editTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            this.currentEditingTask = task;
            this.populateForm(task);
            document.getElementById('formTitle').textContent = 'Edit Task';
            document.querySelector('.btn-primary').innerHTML = '<i class="fas fa-save"></i> Update Task';
            document.getElementById('cancelEdit').style.display = 'inline-flex';
            
            // Scroll to form
            document.querySelector('.task-form-section').scrollIntoView({ behavior: 'smooth' });
        }
    }

    populateForm(task) {
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskSubject').value = task.subject;
        document.getElementById('taskDueDate').value = task.dueDate;
        document.getElementById('taskPriority').value = task.priority;
    }

    cancelEdit() {
        this.currentEditingTask = null;
        this.resetForm();
        document.getElementById('formTitle').textContent = 'Add New Task';
        document.querySelector('.btn-primary').innerHTML = '<i class="fas fa-plus"></i> Add Task';
        document.getElementById('cancelEdit').style.display = 'none';
    }

    resetForm() {
        document.getElementById('taskForm').reset();
        // Reset minimum date
        const now = new Date();
        const minDateTime = now.toISOString().slice(0, 16);
        document.getElementById('taskDueDate').min = minDateTime;
    }

    // UI Updates
    updateUI() {
        this.renderTasks();
        this.renderCalendar();
        this.updateStatistics();
    }

    renderTasks() {
        const tasksList = document.getElementById('tasksList');
        const emptyState = document.getElementById('emptyState');
        
        let filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            tasksList.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        tasksList.style.display = 'block';
        emptyState.style.display = 'none';

        // Sort tasks by due date and priority
        filteredTasks.sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed - b.completed;
            }
            
            const aDate = new Date(a.dueDate);
            const bDate = new Date(b.dueDate);
            
            if (aDate.getTime() !== bDate.getTime()) {
                return aDate - bDate;
            }
            
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        tasksList.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');
    }

    createTaskHTML(task) {
        const dueDate = new Date(task.dueDate);
        const now = new Date();
        const isOverdue = dueDate < now && !task.completed;
        const dueDateStr = this.formatDateTime(dueDate);

        return `
            <div class="task-card ${task.priority} ${task.completed ? 'completed' : ''}">
                <div class="task-header">
                    <div>
                        <div class="task-title">${this.escapeHtml(task.title)}</div>
                        <span class="task-subject">${task.subject}</span>
                    </div>
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                           onchange="planner.toggleTaskComplete('${task.id}')">
                </div>
                
                ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
                
                <div class="task-meta">
                    <div class="task-due-date ${isOverdue ? 'overdue' : ''}">
                        <i class="fas fa-clock"></i>
                        ${dueDateStr} ${isOverdue ? '(Overdue)' : ''}
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="task-priority ${task.priority}">${task.priority}</span>
                        <div class="task-actions">
                            <button class="btn btn-small btn-secondary" onclick="planner.editTask('${task.id}')" title="Edit Task">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-small btn-danger" onclick="planner.deleteTask('${task.id}')" title="Delete Task">
                                <i class="fas fa-trash"></i>
                            </button>
                            <button class="btn btn-small btn-primary" onclick="planner.showTaskDetails('${task.id}')" title="View Details">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getFilteredTasks() {
        const searchTerm = document.getElementById('searchTasks').value.toLowerCase();
        const subjectFilter = document.getElementById('subjectFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const priorityFilter = document.getElementById('priorityFilter').value;

        return this.tasks.filter(task => {
            const matchesSearch = !searchTerm || 
                task.title.toLowerCase().includes(searchTerm) ||
                task.description.toLowerCase().includes(searchTerm) ||
                task.subject.toLowerCase().includes(searchTerm);

            const matchesSubject = !subjectFilter || task.subject === subjectFilter;
            
            const matchesStatus = !statusFilter || 
                (statusFilter === 'completed' && task.completed) ||
                (statusFilter === 'pending' && !task.completed);

            const matchesPriority = !priorityFilter || task.priority === priorityFilter;

            return matchesSearch && matchesSubject && matchesStatus && matchesPriority;
        });
    }

    filterTasks() {
        this.renderTasks();
    }

    // Calendar
    renderCalendar() {
        const calendar = document.getElementById('calendar');
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        
        document.getElementById('currentMonth').textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;

        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let calendarHTML = '';

        // Header days
        dayNames.forEach(day => {
            calendarHTML += `<div class="calendar-header-day">${day}</div>`;
        });

        // Calendar days
        const today = new Date();
        for (let i = 0; i < 42; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const isToday = currentDate.toDateString() === today.toDateString();
            const isCurrentMonth = currentDate.getMonth() === this.currentMonth;
            
            const dayTasks = this.getTasksForDate(currentDate);
            
            calendarHTML += `
                <div class="calendar-day ${isCurrentMonth ? '' : 'other-month'} ${isToday ? 'today' : ''}">
                    <div class="day-number">${currentDate.getDate()}</div>
                    ${dayTasks.map(task => `
                        <div class="calendar-task ${task.priority}" onclick="planner.showTaskDetails('${task.id}')" title="${this.escapeHtml(task.title)}">
                            ${task.title.substring(0, 15)}${task.title.length > 15 ? '...' : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        calendar.innerHTML = calendarHTML;
    }

    getTasksForDate(date) {
        const dateStr = date.toDateString();
        return this.tasks.filter(task => {
            const taskDate = new Date(task.dueDate);
            return taskDate.toDateString() === dateStr;
        });
    }

    previousMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.renderCalendar();
    }

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendar();
    }

    // Statistics
    updateStatistics() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;
        const overdue = this.tasks.filter(task => !task.completed && new Date(task.dueDate) < new Date()).length;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('pendingTasks').textContent = pending;
        document.getElementById('overdueTasks').textContent = overdue;

        // Progress bar
        const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        document.getElementById('progressFill').style.width = `${progressPercentage}%`;
        document.getElementById('progressText').textContent = `${progressPercentage}% Complete`;

        // Subject breakdown
        this.updateSubjectStats();
    }

    updateSubjectStats() {
        const subjectCounts = {};
        this.tasks.forEach(task => {
            subjectCounts[task.subject] = (subjectCounts[task.subject] || 0) + 1;
        });

        const subjectStats = document.getElementById('subjectStats');
        subjectStats.innerHTML = Object.entries(subjectCounts)
            .map(([subject, count]) => `
                <div class="subject-stat">
                    <span>${subject}</span>
                    <span><strong>${count}</strong> tasks</span>
                </div>
            `).join('') || '<p style="text-align: center; color: #6c757d;">No tasks available</p>';
    }

    // Views
    showView(viewName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(`${viewName}View`).classList.add('active');

        this.currentView = viewName;

        // Update content based on view
        if (viewName === 'calendar') {
            this.renderCalendar();
        } else if (viewName === 'statistics') {
            this.updateStatistics();
        } else if (viewName === 'tasks') {
            this.renderTasks();
        }
    }

    // Modal
    showTaskDetails(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        const modal = document.getElementById('taskModal');
        const modalContent = document.getElementById('modalContent');
        
        const dueDate = new Date(task.dueDate);
        const createdDate = new Date(task.createdAt);
        const isOverdue = dueDate < new Date() && !task.completed;

        modalContent.innerHTML = `
            <div style="margin-bottom: 20px;">
                <h3>${this.escapeHtml(task.title)}</h3>
                <span class="task-subject" style="display: inline-block; margin-top: 10px;">${task.subject}</span>
                <span class="task-priority ${task.priority}" style="margin-left: 10px; text-transform: capitalize;">${task.priority} Priority</span>
            </div>
            
            ${task.description ? `
                <div style="margin-bottom: 20px;">
                    <h4>Description</h4>
                    <p style="color: #666; line-height: 1.6;">${this.escapeHtml(task.description)}</p>
                </div>
            ` : ''}
            
            <div style="margin-bottom: 20px;">
                <h4>Due Date</h4>
                <p style="color: ${isOverdue ? '#dc3545' : '#333'}; font-weight: ${isOverdue ? '600' : 'normal'};">
                    <i class="fas fa-clock"></i> ${this.formatDateTime(dueDate)}
                    ${isOverdue ? ' (Overdue)' : ''}
                </p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h4>Status</h4>
                <p>
                    <i class="fas ${task.completed ? 'fa-check-circle' : 'fa-clock'}" style="color: ${task.completed ? '#28a745' : '#ffc107'};"></i>
                    ${task.completed ? 'Completed' : 'Pending'}
                </p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h4>Created</h4>
                <p style="color: #666;">
                    <i class="fas fa-calendar-plus"></i> ${this.formatDateTime(createdDate)}
                </p>
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="planner.editTask('${task.id}'); planner.closeModal();">
                    <i class="fas fa-edit"></i> Edit Task
                </button>
                <button class="btn ${task.completed ? 'btn-warning' : 'btn-success'}" onclick="planner.toggleTaskComplete('${task.id}'); planner.closeModal();">
                    <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i> 
                    Mark as ${task.completed ? 'Pending' : 'Completed'}
                </button>
                <button class="btn btn-danger" onclick="planner.deleteTask('${task.id}'); planner.closeModal();">
                    <i class="fas fa-trash"></i> Delete Task
                </button>
            </div>
        `;

        modal.style.display = 'block';
    }

    closeModal() {
        document.getElementById('taskModal').style.display = 'none';
    }

    // Reminders and Notifications
    checkReminders() {
        const now = new Date();
        const oneHour = 60 * 60 * 1000;
        const oneDay = 24 * oneHour;

        this.tasks.forEach(task => {
            if (task.completed) return;

            const dueDate = new Date(task.dueDate);
            const timeDiff = dueDate - now;

            // Check for overdue tasks
            if (timeDiff < 0 && !task.notifiedOverdue) {
                this.showNotification(`Task "${task.title}" is overdue!`, 'warning');
                task.notifiedOverdue = true;
                this.saveTasks();
            }
            // Check for tasks due within 1 hour
            else if (timeDiff <= oneHour && timeDiff > 0 && !task.notifiedOneHour) {
                this.showNotification(`Task "${task.title}" is due within an hour!`, 'warning');
                task.notifiedOneHour = true;
                this.saveTasks();
            }
            // Check for tasks due within 1 day
            else if (timeDiff <= oneDay && timeDiff > oneHour && !task.notifiedOneDay) {
                this.showNotification(`Task "${task.title}" is due tomorrow!`, 'info');
                task.notifiedOneDay = true;
                this.saveTasks();
            }
        });
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notifications');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>${this.escapeHtml(message)}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; padding: 0; margin-left: 10px;">&times;</button>
            </div>
        `;

        container.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Utility Functions
    populateSubjectFilter() {
        const subjects = [...new Set(this.tasks.map(task => task.subject))];
        const subjectFilter = document.getElementById('subjectFilter');
        
        // Clear existing options except "All Subjects"
        subjectFilter.innerHTML = '<option value="">All Subjects</option>';
        
        subjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject;
            subjectFilter.appendChild(option);
        });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    formatDateTime(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Local Storage
    saveTasks() {
        localStorage.setItem('smartPlannerTasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const stored = localStorage.getItem('smartPlannerTasks');
        return stored ? JSON.parse(stored) : [];
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.planner = new SmartStudyPlanner();
    
    // Add some sample data if no tasks exist
    if (window.planner.tasks.length === 0) {
        window.planner.addSampleTasks();
    }
});

// Add sample tasks method to the class
SmartStudyPlanner.prototype.addSampleTasks = function() {
    const sampleTasks = [
        {
            id: this.generateId(),
            title: 'Complete Math Assignment',
            description: 'Finish calculus problems from chapter 5',
            subject: 'Mathematics',
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
            priority: 'high',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: this.generateId(),
            title: 'Study for Chemistry Test',
            description: 'Review organic chemistry concepts and practice problems',
            subject: 'Science',
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
            priority: 'medium',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: this.generateId(),
            title: 'Read History Chapter',
            description: 'Read and summarize World War II chapter',
            subject: 'History',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
            priority: 'low',
            completed: true,
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
    ];
    
    this.tasks = sampleTasks;
    this.saveTasks();
    this.updateUI();
};

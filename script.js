class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.historyExpression = document.getElementById('history-expression');
        this.historyList = document.getElementById('history-list');
        this.history = [];
        this.currentExpression = '';
        this.lastResult = '';
        this.isDarkMode = true;
        this.initializeEventListeners();
        this.initializeTheme();
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('calculatorTheme');
        if (savedTheme) {
            this.isDarkMode = savedTheme === 'dark';
            this.updateTheme();
        }
    }

    updateTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('span');

        if (this.isDarkMode) {
            document.body.removeAttribute('data-theme');
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        } else {
            document.body.setAttribute('data-theme', 'light');
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        }

        localStorage.setItem('calculatorTheme', this.isDarkMode ? 'dark' : 'light');
    }

    initializeEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.isDarkMode = !this.isDarkMode;
            this.updateTheme();
        });

        // Mode switching
        document.getElementById('normalMode').addEventListener('click', () => this.switchMode('normal'));
        document.getElementById('scientificMode').addEventListener('click', () => this.switchMode('scientific'));
        document.getElementById('historyBtn').addEventListener('click', () => this.toggleHistory());
        document.getElementById('clearHistory').addEventListener('click', () => this.clearHistory());

        // Number and operator buttons
        document.querySelectorAll('.number, .operator, .decimal').forEach(button => {
            button.addEventListener('click', () => this.appendValue(button.dataset.value));
        });

        // Scientific operators
        document.querySelectorAll('.sci-operator').forEach(button => {
            button.addEventListener('click', () => this.handleScientificOperation(button.dataset.value));
        });

        // Special buttons
        document.querySelector('.equals').addEventListener('click', () => this.calculate());
        document.querySelector('.clear').addEventListener('click', () => this.clear());
        document.querySelector('.delete').addEventListener('click', () => this.delete());

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboardInput(e));
    }

    switchMode(mode) {
        const normalButtons = document.querySelector('.normal-buttons');
        const scientificButtons = document.querySelector('.scientific-buttons');
        const normalModeBtn = document.getElementById('normalMode');
        const scientificModeBtn = document.getElementById('scientificMode');

        if (mode === 'normal') {
            normalButtons.style.display = 'grid';
            scientificButtons.style.display = 'none';
            normalModeBtn.classList.add('active');
            scientificModeBtn.classList.remove('active');
        } else {
            normalButtons.style.display = 'grid';
            scientificButtons.style.display = 'grid';
            normalModeBtn.classList.remove('active');
            scientificModeBtn.classList.add('active');
        }
    }

    toggleHistory() {
        const historyPanel = document.querySelector('.history-panel');
        const historyBtn = document.getElementById('historyBtn');
        const isVisible = historyPanel.style.display === 'block';
        
        historyPanel.style.display = isVisible ? 'none' : 'block';
        historyBtn.classList.toggle('active');
    }

    appendValue(value) {
        this.currentExpression += value;
        this.display.value = this.currentExpression;
    }

    handleScientificOperation(operation) {
        switch(operation) {
            case 'sin':
            case 'cos':
            case 'tan':
                this.appendValue(`${operation}(`);
                break;
            case 'log':
                this.appendValue('log(');
                break;
            case 'sqrt':
                this.appendValue('sqrt(');
                break;
            case 'pow':
                this.appendValue('^2');
                break;
            case 'pi':
                this.appendValue('3.14159');
                break;
            case 'e':
                this.appendValue('2.71828');
                break;
        }
    }

    calculate() {
        try {
            let expression = this.currentExpression;
            
            // Replace scientific functions with Math equivalents
            expression = expression.replace(/sin\(/g, 'Math.sin(');
            expression = expression.replace(/cos\(/g, 'Math.cos(');
            expression = expression.replace(/tan\(/g, 'Math.tan(');
            expression = expression.replace(/log\(/g, 'Math.log10(');
            expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
            expression = expression.replace(/\^2/g, '**2');

            const result = eval(expression);
            
            // Add to history
            this.addToHistory(`${this.currentExpression} = ${result}`);
            
            // Update display
            this.historyExpression.textContent = this.currentExpression;
            this.lastResult = result;
            this.currentExpression = result.toString();
            this.display.value = this.currentExpression;
        } catch (error) {
            this.display.value = 'Error';
            setTimeout(() => {
                this.clear();
            }, 1000);
        }
    }

    clear() {
        this.currentExpression = '';
        this.display.value = '';
        this.historyExpression.textContent = '';
    }

    delete() {
        this.currentExpression = this.currentExpression.slice(0, -1);
        this.display.value = this.currentExpression;
    }

    addToHistory(entry) {
        this.history.unshift(entry);
        if (this.history.length > 10) {
            this.history.pop();
        }
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        this.historyList.innerHTML = this.history
            .map(entry => `<div>${entry}</div>`)
            .join('');
    }

    clearHistory() {
        this.history = [];
        this.updateHistoryDisplay();
    }

    handleKeyboardInput(e) {
        const key = e.key;
        
        if (/[0-9\.]/.test(key)) {
            this.appendValue(key);
        } else if (['+', '-', '*', '/', '(', ')'].includes(key)) {
            this.appendValue(key);
        } else if (key === 'Enter') {
            this.calculate();
        } else if (key === 'Backspace') {
            this.delete();
        } else if (key === 'Escape') {
            this.clear();
        }
        
        e.preventDefault();
    }
}

// Initialize calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all MDL components
    componentHandler.upgradeDom();

    // Add active class to current navigation item
    const navLinks = document.querySelectorAll('.mdl-navigation__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Sample data for demonstration
    const mockData = {
        users: [1234, 1200, 1150, 1100],
        revenue: [45678, 42000, 40000, 38000],
        orders: [567, 585, 600, 620],
        products: [890, 850, 800, 780]
    };

    // Calculate and update percentage changes
    function updateStats() {
        const stats = {
            users: calculateChange(mockData.users[0], mockData.users[1]),
            revenue: calculateChange(mockData.revenue[0], mockData.revenue[1]),
            orders: calculateChange(mockData.orders[0], mockData.orders[1]),
            products: calculateChange(mockData.products[0], mockData.products[1])
        };

        // Update DOM with new stats
        updateStatDisplay('Total Users', stats.users);
        updateStatDisplay('Revenue', stats.revenue);
        updateStatDisplay('Orders', stats.orders);
        updateStatDisplay('Products', stats.products);
    }

    // Calculate percentage change
    function calculateChange(current, previous) {
        const change = ((current - previous) / previous) * 100;
        return change.toFixed(1);
    }

    // Update stat display in DOM
    function updateStatDisplay(title, change) {
        const cards = document.querySelectorAll('.demo-card-square');
        cards.forEach(card => {
            const cardTitle = card.querySelector('.mdl-card__title-text').textContent;
            if (cardTitle === title) {
                const changeElement = card.querySelector('.stats-change');
                const changeValue = parseFloat(change);
                
                changeElement.textContent = `${changeValue >= 0 ? '+' : ''}${change}%`;
                changeElement.className = `stats-change ${changeValue >= 0 ? 'positive' : 'negative'}`;
            }
        });
    }

    // Initialize tooltips
    const tooltips = document.querySelectorAll('.mdl-tooltip');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            this.style.display = 'block';
        });
        tooltip.addEventListener('mouseleave', function() {
            this.style.display = 'none';
        });
    });

    // Sample notification system
    let notificationCount = 0;
    const notificationButton = document.querySelector('#notification-button');
    
    if (notificationButton) {
        setInterval(() => {
            notificationCount++;
            const badge = notificationButton.querySelector('.mdl-badge');
            if (badge) {
                badge.setAttribute('data-badge', notificationCount);
            }
        }, 30000); // Update every 30 seconds
    }

    // Initialize with sample data
    updateStats();
});

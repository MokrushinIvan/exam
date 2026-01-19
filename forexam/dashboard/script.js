// API ключ для погоды (можно заменить на свой)
const WEATHER_API_KEY = 'b806a66b80729c942b2d16113d059ce9';

// Базовый класс виджета
class Widget {
    constructor(type, title, id = null) {
        this.type = type;
        this.title = title;
        this.id = id || this.generateId();
        this.settings = {};
        this.isLoading = false;
        this.hasError = false;
        this.errorMessage = '';
    }

    generateId() {
        return 'widget-' + Math.random().toString(36).substr(2, 9);
    }

   render() {
    return `
        <div class="widget" data-id="${this.id}" draggable="true">
            <div class="widget-header">
                <h3 class="widget-title">${this.title}</h3>
                <div class="widget-controls">
                    <button class="icon-btn settings-btn" title="Настройки">
                        <i data-lucide="settings"></i>
                    </button>
                    <button class="icon-btn refresh-btn" title="Обновить">
                        <i data-lucide="refresh-cw"></i>
                    </button>
                    <button class="icon-btn remove-btn danger" title="Удалить">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            </div>
            <div class="widget-content">
                ${this.renderContent()}
            </div>
        </div>
    `;
}

    renderContent() {
        if (this.isLoading) {
            return `<div class="loading"><div class="spinner"></div><p>Загрузка...</p></div>`;
        }
        if (this.hasError) {
            return `<div class="error">
                <p>Ошибка загрузки данных</p>
                <p class="error-details">${this.errorMessage}</p>
                <button class="retry-btn">Повторить</button>
            </div>`;
        }
        return this.getContent();
    }

    getContent() { return '<p>Содержимое виджета</p>'; }

    loadData() {
        this.isLoading = true;
        this.hasError = false;
        this.errorMessage = '';
        this.updateView();
    }

    updateView() {
        const widgetEl = document.querySelector(`[data-id="${this.id}"]`);
        if (!widgetEl) return;
        widgetEl.querySelector('.widget-title').textContent = this.title;
        const content = widgetEl.querySelector('.widget-content');
        if (content) {
            content.innerHTML = this.renderContent();
            this.attachEventListeners();
        }
    }

    attachEventListeners() {
        const widgetEl = document.querySelector(`[data-id="${this.id}"]`);
        if (!widgetEl) return;

        widgetEl.querySelector('.refresh-btn')?.addEventListener('click', () => this.loadData());
        widgetEl.querySelector('.remove-btn')?.addEventListener('click', () => this.remove());
        widgetEl.querySelector('.settings-btn')?.addEventListener('click', () => this.openSettings());
        widgetEl.querySelector('.retry-btn')?.addEventListener('click', () => this.loadData());

        widgetEl.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', this.id);
            widgetEl.classList.add('dragging');
        });
        widgetEl.addEventListener('dragend', () => widgetEl.classList.remove('dragging'));
    }

    remove() {
        document.querySelector(`[data-id="${this.id}"]`)?.remove();
        dashboardManager.removeWidget(this.id);
    }

    openSettings() {
        const modal = document.getElementById('settings-modal');
        const form = document.getElementById('settings-form');

        form.innerHTML = `
            <div class="form-group">
                <label for="widget-title">Название виджета</label>
                <input type="text" id="widget-title" value="${this.title}">
            </div>
            <div class="form-group">
                <label for="widget-city">Город (для погоды)</label>
                <input type="text" id="widget-city" placeholder="Москва">
            </div>
            <div class="form-group">
                <label for="widget-currencies">Валюты</label>
                <select multiple id="widget-currencies" size="7">
                    <option value="USD">USD — Доллар США</option>
                    <option value="EUR">EUR — Евро</option>
                    <option value="GBP">GBP — Британский фунт</option>
                    <option value="CNY">CNY — Китайский юань</option>
                    <option value="JPY">JPY — Японская иена</option>
                    <option value="TRY">TRY — Турецкая лира</option>
                    <option value="CHF">CHF — Швейцарский франк</option>
                </select>
            </div>
        `;

        modal.style.display = 'flex';
        const closeModal = () => modal.style.display = 'none';
        modal.querySelector('.close-modal').onclick = closeModal;
        modal.querySelector('#cancel-settings').onclick = closeModal;
        modal.querySelector('#save-settings').onclick = () => { this.saveSettings(); closeModal(); };

        this.setupSettingsForm?.();
    }

    setupSettingsForm() {}
    saveSettings() {
        const titleInput = document.getElementById('widget-title');
        if (titleInput?.value.trim()) this.title = titleInput.value.trim();
    }

    getConfig() {
        return { type: this.type, id: this.id, title: this.title, settings: this.settings };
    }
}

// === ВИДЖЕТЫ ===

class WeatherWidget extends Widget {
    constructor(id = null) {
        super('weather', 'Погода', id);
        this.settings.city = this.settings.city || 'Moscow';
        this.data = null;
    }

    getContent() {
        if (!this.data) return '<p>Данные о погоде не загружены</p>';
        return `
            <div class="weather-info">
                <div class="weather-temp">${Math.round(this.data.main.temp)}°C</div>
                <div class="weather-desc">${this.data.weather[0].description}</div>
                <div class="weather-city">${this.data.name}</div>
                <div class="weather-details">
                    <div class="weather-detail"><span>Ощущается</span><span>${Math.round(this.data.main.feels_like)}°C</span></div>
                    <div class="weather-detail"><span>Влажность</span><span>${this.data.main.humidity}%</span></div>
                    <div class="weather-detail"><span>Ветер</span><span>${this.data.wind.speed} м/с</span></div>
                </div>
            </div>
        `;
    }

    loadData() {
        this.isLoading = true; this.updateView();
        const city = encodeURIComponent(this.settings.city);
        const urls = [
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`,
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        ];
        this.tryUrls(urls, 0);
    }

    tryUrls(urls, i) {
        if (i >= urls.length) { this.isLoading = false; this.hasError = true; this.errorMessage = 'Не удалось подключиться'; this.updateView(); return; }
        fetch(urls[i])
            .then(r => r.ok ? r.json() : Promise.reject(r.status))
            .then(data => { this.isLoading = false; this.data = data; this.updateView(); })
            .catch(() => this.tryUrls(urls, i + 1));
    }

    setupSettingsForm() {
        document.getElementById('widget-city').value = this.settings.city;
        document.querySelector('#widget-currencies').parentElement.style.display = 'none';
    }

    saveSettings() {
        super.saveSettings();
        const city = document.getElementById('widget-city').value.trim();
        if (city) { this.settings.city = city; this.loadData(); }
        this.updateView();
    }
}

class CurrencyWidget extends Widget {
    constructor(id = null) {
        super('currency', 'Курсы валют', id);
        this.settings.currencies = this.settings.currencies || ['USD', 'EUR', 'GBP'];
        this.data = null;
        this.updateTime = null;
    }

    getContent() {
        if (!this.data) return '<p>Данные не загружены</p>';
        let html = '<div class="currency-info">';
        this.settings.currencies.forEach(code => {
            const c = this.data[code];
            if (c) {
                const change = c.Previous ? ((c.Value - c.Previous) / c.Previous) * 100 : 0;
                const cls = change >= 0 ? 'positive' : 'negative';
                const sym = change >= 0 ? '↑' : '↓';
                html += `<div class="currency-pair">
                    <span class="currency-name">${c.Name}</span>
                    <span class="currency-rate">${c.Value.toFixed(2)} ₽</span>
                    <span class="currency-change ${cls}">${sym} ${Math.abs(change).toFixed(2)}%</span>
                </div>`;
            }
        });
        html += '</div>';
        if (this.updateTime) html += `<div class="currency-update-time">Обновлено: ${new Date(this.updateTime).toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'})}</div>`;
        return html;
    }

    loadData() {
        this.isLoading = true; this.updateView();
        fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then(r => r.json())
            .then(d => { this.isLoading = false; this.data = d.Valute; this.updateTime = d.Date; this.updateView(); })
            .catch(() => { this.isLoading = false; this.hasError = true; this.errorMessage = 'Ошибка сети'; this.updateView(); });
    }

    setupSettingsForm() {
        const select = document.getElementById('widget-currencies');
        Array.from(select.options).forEach(opt => opt.selected = this.settings.currencies.includes(opt.value));
        document.querySelector('#widget-city').parentElement.style.display = 'none';
    }

    saveSettings() {
        super.saveSettings();
        const selected = Array.from(document.getElementById('widget-currencies').selectedOptions).map(o => o.value);
        this.settings.currencies = selected.length ? selected : ['USD', 'EUR'];
        this.loadData();
        this.updateView();
    }
}

class QuoteWidget extends Widget {
    constructor(id = null) { super('quote', 'Случайная цитата', id); this.data = null; }

 getContent() {
    if (!this.data) return '<p>Цитата не загружена</p>';
    return `
        <div class="quote-content">
            <p class="quote-text">"${this.data.quote}"</p>
            <p class="quote-author">— ${this.data.author}</p>
            <button class="glass-btn next-quote-btn">
                Следующая цитата
            </button>
        </div>
    `;
}

    loadData() {
        this.isLoading = true; this.updateView();
        setTimeout(() => {
            const quotes = [
                {quote:"Лучший способ предсказать будущее — создать его.", author:"Питер Друкер"},
                {quote:"Успех — это способность идти от неудачи к неудаче, не теряя энтузиазма.", author:"Уинстон Черчилль"},
                {quote:"Единственный способ делать великие дела — любить то, что ты делаешь.", author:"Стив Джобс"},
                {quote:"Не ошибается тот, кто ничего не делает.", author:"Теодор Рузвельт"},
                {quote:"Ваше время ограничено, не тратьте его, живя чужой жизнью.", author:"Стив Джобс"}
            ];
            this.isLoading = false;
            this.data = quotes[Math.floor(Math.random() * quotes.length)];
            this.updateView();
        }, 800);
    }

    attachEventListeners() {
        super.attachEventListeners();
        document.querySelector(`[data-id="${this.id}"] .next-quote-btn`)?.addEventListener('click', () => this.loadData());
    }

    setupSettingsForm() {
        document.querySelector('#widget-city').parentElement.style.display = 'none';
        document.querySelector('#widget-currencies').parentElement.style.display = 'none';
    }

    saveSettings() { super.saveSettings(); this.updateView(); }
}

class TimerWidget extends Widget {
    constructor(id = null) {
        super('timer', 'Таймер', id);
        this.settings.workTime = this.settings.workTime || 25;
        this.settings.breakTime = this.settings.breakTime || 5;
        this.timeLeft = this.settings.workTime * 60;
        this.isRunning = false;
        this.isWorkTime = true;
        this.intervalId = null;
    }

    loadData() {
        this.isLoading = false;
        this.hasError = false;
        this.timeLeft = this.settings.workTime * 60;
        this.updateView();
    }

    getContent() {
        const m = String(Math.floor(this.timeLeft / 60)).padStart(2, '0');
        const s = String(this.timeLeft % 60).padStart(2, '0');
        return `
            <div class="timer-display">${m}:${s}</div>
            <p>${this.isWorkTime ? 'Рабочее время' : 'Перерыв'}</p>
            <div class="timer-controls">
                <button class="start-btn">${this.isRunning ? 'Пауза' : 'Старт'}</button>
                <button class="reset-btn">Сброс</button>
            </div>
        `;
    }

    attachEventListeners() {
        super.attachEventListeners();
        const el = document.querySelector(`[data-id="${this.id}"]`);
        el.querySelector('.start-btn')?.addEventListener('click', () => this.toggleTimer());
        el.querySelector('.reset-btn')?.addEventListener('click', () => this.resetTimer());
    }

    toggleTimer() { this.isRunning ? this.pauseTimer() : this.startTimer(); this.updateView(); }
    startTimer() {
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            if (--this.timeLeft <= 0) this.timerComplete();
            this.updateView();
        }, 1000);
    }
    pauseTimer() { this.isRunning = false; clearInterval(this.intervalId); }
    resetTimer() { this.pauseTimer(); this.isWorkTime = true; this.timeLeft = this.settings.workTime * 60; this.updateView(); }
    timerComplete() {
        this.pauseTimer();
        const msg = this.isWorkTime ? 'Время работы закончилось! Перерыв!' : 'Перерыв закончен! Пора работать!';
        (Notification.permission === 'granted' ? new Notification(msg) : alert(msg));
        this.isWorkTime = !this.isWorkTime;
        this.timeLeft = (this.isWorkTime ? this.settings.workTime : this.settings.breakTime) * 60;
        this.startTimer();
        this.updateView();
    }

    setupSettingsForm() {
        document.querySelector('#widget-city').parentElement.style.display = 'none';
        document.querySelector('#widget-currencies').parentElement.style.display = 'none';
        const form = document.getElementById('settings-form');
        const workGroup = document.createElement('div'); workGroup.className = 'form-group';
        workGroup.innerHTML = `<label for="work-time">Рабочее время (минут)</label><input type="number" id="work-time" min="1" max="180" value="${this.settings.workTime}">`;
        const breakGroup = document.createElement('div'); breakGroup.className = 'form-group';
        breakGroup.innerHTML = `<label for="break-time">Перерыв (минут)</label><input type="number" id="break-time" min="1" max="60" value="${this.settings.breakTime}">`;
        form.insertBefore(workGroup, form.firstChild.nextSibling);
        form.insertBefore(breakGroup, form.firstChild.nextSibling);
    }

    saveSettings() {
        super.saveSettings();
        const w = parseInt(document.getElementById('work-time')?.value) || 25;
        const b = parseInt(document.getElementById('break-time')?.value) || 5;
        this.settings.workTime = Math.max(1, w);
        this.settings.breakTime = Math.max(1, b);
        this.resetTimer();
        this.updateView();
    }
}

class NotesWidget extends Widget {
    constructor(id = null) {
        super('notes', 'Заметки', id);
        this.notes = JSON.parse(localStorage.getItem(`notes-${this.id}`)) || [];
    }

    loadData() {
        this.isLoading = false;
        this.hasError = false;
        this.updateView();
    }

    getContent() {
        let html = this.notes.length
            ? '<div class="notes-list">' + this.notes.map((n, i) => `
                <div class="note-item">
                    <span class="note-text">${n}</span>
                    <span class="note-delete" data-index="${i}">Удалить</span>
                </div>
            `).join('') + '</div>'
            : '<p>Заметок пока нет</p>';

        html += `<div class="add-note">
            <input type="text" class="new-note-input" placeholder="Новая заметка...">
            <button class="add-note-btn">Добавить</button>
        </div>`;
        return html;
    }

    attachEventListeners() {
        super.attachEventListeners();
        const el = document.querySelector(`[data-id="${this.id}"]`);
        const input = el.querySelector('.new-note-input');
        const btn = el.querySelector('.add-note-btn');

        const addNote = () => {
            if (input.value.trim()) {
                this.notes.push(input.value.trim());
                this.saveNotes();
                this.updateView();
                input.value = '';
            }
        };

        btn?.addEventListener('click', addNote);
        input?.addEventListener('keypress', e => e.key === 'Enter' && addNote());

        el.querySelectorAll('.note-delete').forEach(span => {
            span.addEventListener('click', () => {
                const idx = parseInt(span.dataset.index);
                this.notes.splice(idx, 1);
                this.saveNotes();
                this.updateView();
            });
        });
    }

    saveNotes() { localStorage.setItem(`notes-${this.id}`, JSON.stringify(this.notes)); }

    setupSettingsForm() {
        document.querySelector('#widget-city').parentElement.style.display = 'none';
        document.querySelector('#widget-currencies').parentElement.style.display = 'none';
    }

    saveSettings() { super.saveSettings(); this.updateView(); }
}

// === DashboardManager (без изменений) ===
class DashboardManager {
    constructor() {
        this.widgets = [];
        this.loadConfiguration();
        this.initEventListeners();
        this.renderDashboard();
        if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
    }

    initEventListeners() {
        document.getElementById('add-widget-btn').addEventListener('click', () => 
            document.querySelector('.widget-selector').scrollIntoView({behavior:'smooth'})
        );
        document.getElementById('export-btn').onclick = () => this.exportConfiguration();
        document.getElementById('import-btn').onclick = () => this.importConfiguration();

        document.querySelectorAll('.available-widget').forEach(el => 
            el.addEventListener('click', () => this.addWidget(el.dataset.type))
        );

        const dash = document.getElementById('dashboard');
        dash.addEventListener('dragover', e => {
            e.preventDefault();
            const after = this.getDragAfterElement(dash, e.clientY);
            const dragging = document.querySelector('.dragging');
            if (after) dash.insertBefore(dragging, after);
            else dash.appendChild(dragging);
        });
        dash.addEventListener('drop', () => this.saveConfiguration());
    }

    getDragAfterElement(container, y) {
        return [...container.querySelectorAll('.widget:not(.dragging)')].reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            return offset < 0 && offset > closest.offset ? {offset, element: child} : closest;
        }, {offset: Number.NEGATIVE_INFINITY}).element;
    }

    addWidget(type) {
        let w;
        switch(type) {
            case 'weather': w = new WeatherWidget(); break;
            case 'currency': w = new CurrencyWidget(); break;
            case 'quote': w = new QuoteWidget(); break;
            case 'timer': w = new TimerWidget(); break;
            case 'notes': w = new NotesWidget(); break;
        }
        if (w) {
            this.widgets.push(w);
            this.renderDashboard();
            this.saveConfiguration();
            setTimeout(() => w.loadData(), 100);
        }
    }

    removeWidget(id) { this.widgets = this.widgets.filter(w => w.id !== id); this.saveConfiguration(); }

    renderDashboard() {
        const dash = document.getElementById('dashboard');
        dash.innerHTML = this.widgets.map(w => w.render()).join('');
        this.widgets.forEach(w => w.attachEventListeners());
    }

    exportConfiguration() {
        const data = JSON.stringify({widgets: this.widgets.map(w => w.getConfig())}, null, 2);
        const blob = new Blob([data], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'dashboard-config.json'; a.click();
        URL.revokeObjectURL(url);
    }

    importConfiguration() {
        const input = document.createElement('input'); input.type = 'file'; input.accept = '.json';
        input.onchange = e => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = ev => {
                try { this.loadConfigurationFromObject(JSON.parse(ev.target.result)); }
                catch { alert('Неверный формат файла'); }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    loadConfiguration() {
        const saved = localStorage.getItem('dashboard-config');
        if (saved) {
            try { this.loadConfigurationFromObject(JSON.parse(saved)); return; }
            catch(e) { console.error(e); }
        }
        this.addWidget('weather'); this.addWidget('currency'); this.addWidget('quote');
    }

    loadConfigurationFromObject(config) {
        this.widgets = [];
        config.widgets?.forEach(c => {
            let w;
            switch(c.type) {
                case 'weather': w = new WeatherWidget(c.id); break;
                case 'currency': w = new CurrencyWidget(c.id); break;
                case 'quote': w = new QuoteWidget(c.id); break;
                case 'timer': w = new TimerWidget(c.id); break;
                case 'notes': w = new NotesWidget(c.id); break;
            }
            if (w) {
                w.title = c.title || w.title;
                w.settings = {...w.settings, ...c.settings};
                if (c.type === 'notes') w.notes = JSON.parse(localStorage.getItem(`notes-${w.id}`)) || [];
                this.widgets.push(w);
            }
        });
        this.renderDashboard();
        setTimeout(() => this.widgets.forEach(w => w.loadData()), 500);
    }

    saveConfiguration() {
        localStorage.setItem('dashboard-config', JSON.stringify({widgets: this.widgets.map(w => w.getConfig())}));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.dashboardManager = new DashboardManager();
});
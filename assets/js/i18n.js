// 国际化支持
class I18n {
    constructor() {
        this.translations = {};
        this.currentLang = localStorage.getItem('language') || 'zh';
    }

    async loadTranslation(lang, retries = 3) {
        for (let i = 0; i < retries; i++) {
            try {
                // 先尝试从本地缓存获取
                const cached = this.getCachedTranslation(lang);
                if (cached) {
                    console.log(`Using cached translation for ${lang}`);
                    return cached;
                }
                
                // 如果没有缓存，从服务器加载
                const response = await fetch(`assets/js/i18n/${lang}.json`);
                if (!response.ok) throw new Error(`HTTP error ${response.status}`);
                
                const data = await response.json();
                // 缓存翻译数据
                this.setCachedTranslation(lang, data);
                return data;
            } catch (error) {
                console.error(`Attempt ${i+1}/${retries} failed:`, error);
                if (i === retries - 1) throw error;
                // 等待一段时间再重试
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

    // 从本地存储获取缓存的翻译
    getCachedTranslation(lang) {
        const cached = localStorage.getItem(`i18n_${lang}_cache`);
        if (cached) {
            try {
                const data = JSON.parse(cached);
                const timestamp = localStorage.getItem(`i18n_${lang}_timestamp`);
                // 缓存有效期为1天
                if (timestamp && (Date.now() - parseInt(timestamp)) < 86400000) {
                    return data;
                }
            } catch (e) {
                console.error('Failed to parse cached translation:', e);
            }
        }
        return null;
    }

    // 将翻译缓存到本地存储
    setCachedTranslation(lang, data) {
        try {
            localStorage.setItem(`i18n_${lang}_cache`, JSON.stringify(data));
            localStorage.setItem(`i18n_${lang}_timestamp`, Date.now().toString());
        } catch (e) {
            console.error('Failed to cache translation:', e);
        }
    }

    async init() {
        try {
            // 添加加载状态提示
            const loadingMessage = document.createElement('div');
            loadingMessage.className = 'loading-message';
            loadingMessage.textContent = '正在加载语言文件...';
            loadingMessage.style.position = 'fixed';
            loadingMessage.style.top = '10px';
            loadingMessage.style.left = '50%';
            loadingMessage.style.transform = 'translateX(-50%)';
            loadingMessage.style.backgroundColor = '#4a6cf7';
            loadingMessage.style.color = 'white';
            loadingMessage.style.padding = '10px 20px';
            loadingMessage.style.borderRadius = '4px';
            loadingMessage.style.zIndex = '1000';
            document.body.appendChild(loadingMessage);
            
            // 使用 loadTranslation 方法加载翻译
            this.translations.zh = await this.loadTranslation('zh');
            this.translations.en = await this.loadTranslation('en');
            
            // 移除加载提示
            loadingMessage.remove();
            
            // 初始化页面语言
            this.setLanguage(this.currentLang);
            
            // 设置语言切换按钮事件
            this.setupLanguageSwitcher();
        } catch (error) {
            console.error('Failed to load translations:', error);
            // 显示错误提示给用户
            this.showErrorMessage('无法加载语言文件，请刷新页面重试。详细错误: ' + error.message);
        }
    }

    // 添加错误提示方法
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.position = 'fixed';
        errorDiv.style.top = '10px';
        errorDiv.style.left = '50%';
        errorDiv.style.transform = 'translateX(-50%)';
        errorDiv.style.backgroundColor = '#f44336';
        errorDiv.style.color = 'white';
        errorDiv.style.padding = '10px 20px';
        errorDiv.style.borderRadius = '4px';
        errorDiv.style.zIndex = '1000';
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.error(`Translation for ${lang} not found`);
            return;
        }
        
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // 更新页面上所有带有data-i18n属性的元素
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.getTranslation(key, lang);
            
            if (translation) {
                // 只处理了文本内容和placeholder，没有处理其他属性
                if (el.tagName === 'INPUT' && el.getAttribute('type') === 'text') {
                    el.placeholder = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });
        
        // 更新语言切换按钮状态
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.getElementById(`${lang}-btn`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        } else {
            console.warn(`Language button for ${lang} not found`);
        }
        
        // 更新HTML lang属性
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        
        // 更新页面标题
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            const key = titleElement.getAttribute('data-i18n');
            const translation = this.getTranslation(key, lang);
            if (translation) {
                document.title = translation;
            }
        } else if (this.translations[lang].pageTitle) {
            document.title = this.translations[lang].pageTitle;
        }
    }

    getTranslation(key, lang) {
        const keys = key.split('.');
        let translation = this.translations[lang];
        
        for (const k of keys) {
            if (translation && translation[k] !== undefined) {
                translation = translation[k];
            } else {
                // 检查是否是数组索引
                const arrayMatch = k.match(/^(\d+)$/);
                if (arrayMatch && Array.isArray(translation) && translation[parseInt(arrayMatch[1])] !== undefined) {
                    translation = translation[parseInt(arrayMatch[1])];
                } else {
                    return null;
                }
            }
        }
        
        return translation;
    }

    setupLanguageSwitcher() {
        const zhBtn = document.getElementById('zh-btn');
        const enBtn = document.getElementById('en-btn');
        
        if (zhBtn && enBtn) {
            zhBtn.addEventListener('click', () => {
                this.setLanguage('zh');
            });
            
            enBtn.addEventListener('click', () => {
                this.setLanguage('en');
            });
        } else {
            console.error('Language switcher buttons not found');
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const i18n = new I18n();
    i18n.init();
});
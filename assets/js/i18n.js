// 国际化支持
class I18n {
    constructor() {
        this.translations = {};
        this.currentLang = localStorage.getItem('language') || 'zh';
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
            
            // 加载中文翻译
            const zhResponse = await fetch('assets/js/i18n/zh.json');
            if (!zhResponse.ok) {
                throw new Error(`Failed to load zh.json: ${zhResponse.status}`);
            }
            
            try {
                this.translations.zh = await zhResponse.json();
            } catch (jsonError) {
                console.error('Error parsing zh.json:', jsonError);
                throw new Error('zh.json 格式错误，请检查JSON语法');
            }
            
            // 加载英文翻译
            const enResponse = await fetch('assets/js/i18n/en.json');
            if (!enResponse.ok) {
                throw new Error(`Failed to load en.json: ${enResponse.status}`);
            }
            
            try {
                this.translations.en = await enResponse.json();
            } catch (jsonError) {
                console.error('Error parsing en.json:', jsonError);
                throw new Error('en.json 格式错误，请检查JSON语法');
            }
            
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
        document.getElementById(`${lang}-btn`).classList.add('active');
        
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

// 删除这部分重复的初始化代码
// 页面加载完成后初始化国际化
document.addEventListener('DOMContentLoaded', () => {
    const i18n = new I18n();
    i18n.init();
});
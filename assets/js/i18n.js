// 国际化支持
class I18n {
    constructor() {
        this.translations = {};
        this.currentLang = localStorage.getItem('language') || 'zh';
        
        // 直接使用内置的基本翻译
        this.translations.zh = this.fallbackTranslations.zh;
        this.translations.en = this.fallbackTranslations.en;
    }

    async init() {
        try {
            // 显示加载状态
            console.log('正在初始化语言...');
            
            // 尝试从服务器加载更完整的翻译
            try {
                const zhResponse = await fetch('assets/js/i18n/zh.json');
                if (zhResponse.ok) {
                    const zhData = await zhResponse.json();
                    this.translations.zh = {...this.translations.zh, ...zhData};
                    console.log('成功加载中文翻译');
                }
            } catch (e) {
                console.warn('使用内置中文翻译', e);
            }
            
            try {
                const enResponse = await fetch('assets/js/i18n/en.json');
                if (enResponse.ok) {
                    const enData = await enResponse.json();
                    this.translations.en = {...this.translations.en, ...enData};
                    console.log('成功加载英文翻译');
                }
            } catch (e) {
                console.warn('使用内置英文翻译', e);
            }
            
            // 初始化页面语言
            this.setLanguage(this.currentLang);
            
            // 设置语言切换按钮事件
            this.setupLanguageSwitcher();
            
            console.log('语言初始化完成');
        } catch (error) {
            console.error('初始化语言失败:', error);
            this.showErrorMessage('无法加载语言文件，请刷新页面重试。详细错误: ' + error.message);
        }
    }
}

// 初始化I18n实例
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM加载完成，初始化I18n');
    window.i18n = new I18n();
    window.i18n.init().catch(err => {
        console.error('I18n初始化失败:', err);
    });
});

// 国际化支持
class I18n {
    constructor() {
        this.translations = {};
        this.currentLang = localStorage.getItem('language') || 'zh';
        
        // 基本翻译作为回退
        this.fallbackTranslations = {
            zh: {
                pageTitle: 'chenjy的个人主页',
                nav: { projects: '项目展示', experience: '工作经历' },
                projects: { 
                    title: '项目展示',
                    rideflow: { 
                        title: 'RideFlow',
                        description: '一款智能出行应用，提供实时路况、智能导航和行程规划功能。',
                        viewLink: '查看应用',
                        donateLink: '支持项目'
                    },
                    edgebox: {
                        title: 'EdgeBox',
                        description: '边缘计算工具箱，提供设备AI LLM 下载 部署 运行功能。',
                        viewLink: '查看应用',
                        donateLink: '支持项目'
                    },
                    support: '支持项目',
                    supportDescription: '如果您觉得这个项目对您有帮助，可以通过以下方式支持我们：',
                    starGithub: '在GitHub上Star',
                    shareProject: '分享给朋友'
                },
                experience: {
                    title: '工作经历',
                    jobs: {
                        1: {
                            period: '2022/11 - 2023/09',
                            title: '技术架构负责人',
                            company: '华宝新能',
                            description: '负责公司整个系统基础架构设计，推动技术委员会组织建设并管理日常运作。主导华宝数字化云原生平台建设，推动便携储能产品和移动式家庭储能新品类开发。'
                        },
                        2: {
                            period: '2020/09 - 2022/08',
                            title: '技术经理',
                            company: 'Castlery',
                            description: '负责公司整个供应链系统架构设计和全球部署方案，推动供应链系统的智能化。制定研发流程，持续集成和持续部署方案设计。'
                        },
                        3: {
                            period: '2018/11 - 2020/07',
                            title: '资深架构师',
                            company: '深圳平安信息技术有限公司',
                            description: '负责平安智慧养老平台的C端项目整体架构设计、技术选型及制定开发流程。'
                        },
                        4: {
                            period: '2014/08 - 2018/06',
                            title: '开发组长',
                            company: '美的电商',
                            description: '负责电商平台的技术开发和团队管理工作。'
                        },
                        5: {
                            period: '2011/06 - 2014/08',
                            title: '高级开发工程师',
                            company: '苏宁北京研发中心',
                            description: '负责闪拍项目核心功能模块开发和项目进度管理，开发Dal组件等基础设施。'
                        }
                    }
                },
                footer: {
                    copyright: '© 2025 chenjy. 保留所有权利。'
                }
            },
            en: {
                pageTitle: "Jianyu Chen's Personal Website",
                nav: { projects: 'Projects', experience: 'Experience' },
                projects: { 
                    title: 'Projects',
                    rideflow: { 
                        title: 'RideFlow',
                        description: 'A smart travel application providing real-time traffic conditions, intelligent navigation, and trip planning features.',
                        viewLink: 'View App',
                        donateLink: 'Support Project'
                    },
                    edgebox: {
                        title: 'EdgeBox',
                        description: 'Edge computing toolbox offering AI LLM download, deployment, and execution capabilities.',
                        viewLink: 'View App',
                        donateLink: 'Support Project'
                    },
                    support: 'Support Project',
                    supportDescription: 'If you find this project helpful, you can support us in the following ways:',
                    starGithub: 'Star on GitHub',
                    shareProject: 'Share with Friends'
                },
                experience: {
                    title: 'Work Experience',
                    jobs: {
                        1: {
                            period: '2022/11 - 2023/09',
                            title: 'Technical Architecture Lead',
                            company: 'Huabao New Energy',
                            description: 'Responsible for the company\'s overall system infrastructure design, promoting the organization of the technical committee and managing daily operations. Led the construction of Huabao\'s digital cloud-native platform, promoting the development of portable energy storage products and mobile home energy storage new categories.'
                        },
                        2: {
                            period: '2020/09 - 2022/08',
                            title: 'Technical Manager',
                            company: 'Castlery',
                            description: 'Responsible for the company\'s entire supply chain system architecture design and global deployment plan, promoting the intelligence of the supply chain system. Formulate R&D processes, continuous integration and continuous deployment solution design.'
                        },
                        3: {
                            period: '2018/11 - 2020/07',
                            title: 'Senior Architect',
                            company: 'Shenzhen Ping An Information Technology Co., Ltd.',
                            description: 'Responsible for the overall architecture design, technology selection and development process formulation of the C-end project of Ping An Smart Pension Platform.'
                        },
                        4: {
                            period: '2014/08 - 2018/06',
                            title: 'Development Team Leader',
                            company: 'Midea E-commerce',
                            description: 'Responsible for the technical development and team management of the e-commerce platform.'
                        },
                        5: {
                            period: '2011/06 - 2014/08',
                            title: 'Senior Development Engineer',
                            company: 'Suning Beijing R&D Center',
                            description: 'Responsible for the development of core functional modules of the flash auction project and project progress management, and the development of Dal components and other infrastructure.'
                        }
                    }
                },
                footer: {
                    copyright: '© 2025 chenjy. All rights reserved.'
                }
            }
        };
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
            
            // 直接使用内置的基本翻译
            this.translations.zh = this.fallbackTranslations.zh;
            this.translations.en = this.fallbackTranslations.en;
            
            // 尝试从服务器加载更完整的翻译
            try {
                const zhData = await fetch('assets/js/i18n/zh.json').then(res => res.json());
                this.translations.zh = {...this.translations.zh, ...zhData};
            } catch (e) {
                console.warn('Using fallback zh translation');
            }
            
            try {
                const enData = await fetch('assets/js/i18n/en.json').then(res => res.json());
                this.translations.en = {...this.translations.en, ...enData};
            } catch (e) {
                console.warn('Using fallback en translation');
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
                return null;
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

// 初始化I18n实例
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
    window.i18n.init();
});

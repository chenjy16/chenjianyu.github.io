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
                    features: '功能特点',
                    rideflow: { 
                        title: 'RideFlow',
                        description: '一款智能出行应用，提供实时路况、智能导航和行程规划功能。',
                        viewLink: '查看应用',
                        features: [
                            "实时路况监测与预警",
                            "智能路线规划与导航",
                            "出行时间预测",
                            "多种交通方式整合",
                            "个性化出行建议"
                        ]
                    },
                    edgebox: {
                        title: 'EdgeBox',
                        description: '边缘计算工具箱，提供设备AI LLM 下载 部署 运行功能。',
                        viewLink: '查看应用',
                        features: [
                            "本地AI模型部署与执行",
                            "离线大语言模型(LLM)使用",
                            "设备资源监控与优化",
                            "边缘计算任务调度",
                            "多设备协同计算"
                        ]
                    },
                    starGithub: '支持项目'
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
                    features: 'Features',
                    rideflow: { 
                        title: 'RideFlow',
                        description: 'A smart travel application providing real-time traffic conditions, intelligent navigation, and trip planning features.',
                        viewLink: 'View App',
                        features: [
                            "Real-time traffic monitoring and alerts",
                            "Intelligent route planning and navigation",
                            "Travel time prediction",
                            "Multiple transportation modes integration",
                            "Personalized travel recommendations"
                        ]
                    },
                    edgebox: {
                        title: 'EdgeBox',
                        description: 'Edge computing toolbox offering AI LLM download, deployment, and execution capabilities.',
                        viewLink: 'View App',
                        features: [
                            "Local AI model deployment and execution",
                            "Offline Large Language Model (LLM) usage",
                            "Device resource monitoring and optimization",
                            "Edge computing task scheduling",
                            "Multi-device collaborative computing"
                        ]
                    },
                    starGithub: 'GitHubSupport Project'
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

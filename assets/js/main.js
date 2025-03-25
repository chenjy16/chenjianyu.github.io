document.addEventListener('DOMContentLoaded', () => {
    // 页面加载完成后隐藏加载动画
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
    
    // 移除重复的i18n初始化
    // const i18n = new I18n();
    // i18n.init();
    
    // 平滑滚动效果
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时显示/隐藏返回顶部按钮
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'back-to-top';
        button.style.display = 'none';
        document.body.appendChild(button);
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
    };
    
    createBackToTopButton();
    
    // 添加动画效果
    const addAnimations = () => {
        const elements = document.querySelectorAll('.project-detail, .timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    };
    
    // 页面加载完成后添加动画
    setTimeout(addAnimations, 500);
    
    // 初始化 Buy Me a Coffee 按钮
    const initBuyMeCoffeeButtons = () => {
        // 如果原生的 BMC 按钮已加载，则使用它们的样式
        if (typeof(window.BmcButton) !== 'undefined') {
            document.querySelectorAll('.bmc-btn').forEach(btn => {
                new window.BmcButton().init({
                    element: btn,
                    name: btn.getAttribute('data-name'),
                    slug: btn.getAttribute('data-slug'),
                    color: btn.getAttribute('data-color'),
                    emoji: btn.getAttribute('data-emoji'),
                    font: btn.getAttribute('data-font'),
                    text: btn.getAttribute('data-text'),
                    outline_color: btn.getAttribute('data-outline-color'),
                    font_color: btn.getAttribute('data-font-color'),
                    coffee_color: btn.getAttribute('data-coffee-color')
                });
            });
        }
    };
    
    // 页面加载完成后初始化 Buy Me a Coffee 按钮
    setTimeout(initBuyMeCoffeeButtons, 1000);
});
// 项目详情数据
const projectData = {
    rideflow: {
        zh: {
            title: "RideFlow",
            description: "一款智能出行应用，提供实时路况、智能导航和行程规划功能。",
            screenshots: ["assets/images/projects/rideflow-1.png", "assets/images/projects/rideflow-2.png"],
            features: [
                "实时路况监测与预警",
                "智能路线规划与导航",
                "出行时间预测",
                "多种交通方式整合",
                "个性化出行建议"
            ],
            githubUrl: "https://github.com/chenjy16/rideflow"
        },
        en: {
            title: "RideFlow",
            description: "A smart travel application providing real-time traffic conditions, intelligent navigation, and trip planning features.",
            screenshots: ["assets/images/projects/rideflow-1.png", "assets/images/projects/rideflow-2.png"],
            features: [
                "Real-time traffic monitoring and alerts",
                "Intelligent route planning and navigation",
                "Travel time prediction",
                "Multiple transportation modes integration",
                "Personalized travel recommendations"
            ],
            githubUrl: "https://github.com/chenjy16/rideflow"
        }
    },
    edgebox: {
        zh: {
            title: "EdgeBox",
            description: "边缘计算工具箱，提供设备AI LLM 下载 部署 运行功能。",
            screenshots: ["assets/images/projects/edgebox-1.png", "assets/images/projects/edgebox-2.png"],
            features: [
                "本地AI模型部署与执行",
                "离线大语言模型(LLM)使用",
                "设备资源监控与优化",
                "边缘计算任务调度",
                "多设备协同计算"
            ],
            githubUrl: "https://github.com/chenjy16/edgebox"
        },
        en: {
            title: "EdgeBox",
            description: "Edge computing toolbox offering AI LLM download, deployment, and execution capabilities.",
            screenshots: ["assets/images/projects/edgebox-1.png", "assets/images/projects/edgebox-2.png"],
            features: [
                "Local AI model deployment and execution",
                "Offline Large Language Model (LLM) usage",
                "Device resource monitoring and optimization",
                "Edge computing task scheduling",
                "Multi-device collaborative computing"
            ],
            githubUrl: "https://github.com/chenjy16/edgebox"
        }
    }
};

// 全局函数，用于关闭项目模态框
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('show');
    
    // 恢复背景滚动
    document.body.style.overflow = '';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// 打开项目模态框
function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    
    const currentLang = document.documentElement.lang || 'zh';
    const lang = currentLang.startsWith('zh') ? 'zh' : 'en';
    
    if (projectData && projectData[projectId] && projectData[projectId][lang]) {
        const project = projectData[projectId][lang];
        
        modalTitle.textContent = project.title;
        
        const modalDescription = document.getElementById('modal-description');
        if (modalDescription && project.description) {
            modalDescription.textContent = project.description;
        }
        
        const screenshotsContainer = document.getElementById('project-screenshots');
        if (screenshotsContainer && project.screenshots && project.screenshots.length > 0) {
            screenshotsContainer.innerHTML = '';
            project.screenshots.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = project.title;
                img.className = 'project-screenshot';
                screenshotsContainer.appendChild(img);
            });
        }
        
        const featuresContainer = document.getElementById('project-features');
        if (featuresContainer && project.features && project.features.length > 0) {
            featuresContainer.innerHTML = '';
            const featuresList = document.createElement('ul');
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            featuresContainer.appendChild(featuresList);
        }
        
        const githubOption = document.querySelector('.support-option:not(.donate-option)');
        if (githubOption && project.githubUrl) {
            githubOption.onclick = () => {
                window.open(project.githubUrl, '_blank');
            };
            githubOption.style.cursor = 'pointer';
        }
        
        modal.style.display = 'block';
        
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    } else {
        console.error(`Project data not found for: ${projectId}, language: ${lang}`);
    }
    
    document.body.style.overflow = 'hidden';
}

document.addEventListener('DOMContentLoaded', () => {
    // 获取模态框元素
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // 关闭模态框
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeProjectModal);
    }
    
    // 点击模态框外部关闭
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeProjectModal();
        }
    });
    
    // 为捐赠链接添加点击事件
    const donateLinks = document.querySelectorAll('.donate-link');
    donateLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = link.getAttribute('data-project');
            if (projectId) {
                openProjectModal(projectId);
            } else {
                console.error('Missing data-project attribute on donate link');
            }
        });
    });
    
    // 添加键盘事件处理
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (modal && modal.style.display === 'block') {
                closeProjectModal();
            }
        }
    });
});
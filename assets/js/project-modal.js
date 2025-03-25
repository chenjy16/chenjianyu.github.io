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
            technologies: [
                "Swift UI & SwiftData",
                "MapKit & CoreLocation",
                "CloudKit",
                "机器学习算法",
                "实时数据处理"
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
            technologies: [
                "Swift UI & SwiftData",
                "MapKit & CoreLocation",
                "CloudKit",
                "Machine Learning algorithms",
                "Real-time data processing"
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
                "AI模型本地部署与运行",
                "大语言模型(LLM)离线使用",
                "设备资源监控与优化",
                "边缘计算任务调度",
                "多设备协同计算"
            ],
            technologies: [
                "Swift & SwiftUI",
                "Core ML & Metal",
                "ONNX Runtime",
                "分布式计算框架",
                "低功耗优化算法"
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
            technologies: [
                "Swift & SwiftUI",
                "Core ML & Metal",
                "ONNX Runtime",
                "Distributed computing framework",
                "Low-power optimization algorithms"
            ],
            githubUrl: "https://github.com/chenjy16/edgebox"
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 获取模态框元素
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const closeModal = document.querySelector('.close-modal');
    
    // 关闭模态框
    closeModal.addEventListener('click', () => {
        closeProjectModal();
    });
    
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
    

    // 将 closeProjectModal 函数移到全局作用域
    function closeProjectModal() {
        const modal = document.getElementById('project-modal');
        modal.classList.remove('show');
        
        // 恢复背景滚动
        document.body.style.overflow = '';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    
    // 添加键盘事件处理
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const modal = document.getElementById('project-modal');
            if (modal.style.display === 'block') {
                closeProjectModal();
            }
        }
    });
});

// 打开项目模态框
function openProjectModal(projectId) {
    // 获取模态框元素
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    
    // 获取当前语言
    const currentLang = document.documentElement.lang || 'zh';
    const lang = currentLang.startsWith('zh') ? 'zh' : 'en';
    
    // 获取项目数据
    if (projectData && projectData[projectId] && projectData[projectId][lang]) {
        const project = projectData[projectId][lang];
        
        // 设置模态框内容
        modalTitle.textContent = project.title;
        
        // 设置 GitHub 链接
        const githubOption = document.querySelector('.support-option:not(.donate-option)');
        if (githubOption && project.githubUrl) {
            githubOption.onclick = () => {
                window.open(project.githubUrl, '_blank');
            };
            githubOption.style.cursor = 'pointer';
        }
        
        // 显示模态框
        modal.style.display = 'block';
        
        // 使用 requestAnimationFrame 确保 DOM 更新后再添加 show 类
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    } else {
        console.error(`Project data not found for: ${projectId}, language: ${lang}`);
    }
    
    // 禁用背景滚动
    document.body.style.overflow = 'hidden';
}
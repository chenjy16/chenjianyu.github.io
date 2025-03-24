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
    const projectFeatures = document.getElementById('project-features');
    const projectTechnologies = document.getElementById('project-technologies');
    const projectScreenshots = document.querySelector('.project-screenshots');
    const closeModal = document.querySelector('.close-modal');
    
    // 获取所有"了解更多"按钮
    const moreInfoButtons = document.querySelectorAll('.more-info-btn');
    
    // 为每个按钮添加点击事件
    moreInfoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    // 关闭模态框
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
    
    // 打开项目模态框
    function openProjectModal(projectId) {
        // 获取当前语言
        const currentLang = document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
        
        // 获取项目数据
        const project = projectData[projectId][currentLang];
        
        // 设置模态框内容
        modalTitle.textContent = project.title;
        
        // 清空并添加项目特点
        projectFeatures.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            projectFeatures.appendChild(li);
        });
        
        // 清空并添加技术栈
        projectTechnologies.innerHTML = '';
        project.technologies.forEach(tech => {
            const li = document.createElement('li');
            li.textContent = tech;
            projectTechnologies.appendChild(li);
        });
        
        // 清空并添加项目截图
        projectScreenshots.innerHTML = '';
        project.screenshots.forEach(screenshot => {
            const img = document.createElement('img');
            img.src = screenshot;
            img.alt = project.title;
            projectScreenshots.appendChild(img);
        });
        
        // 显示模态框
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
    
    // 为捐赠链接添加点击事件
    const donateLinks = document.querySelectorAll('.donate-link');
    donateLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = link.closest('.project-card').querySelector('.more-info-btn').getAttribute('data-project');
            openProjectModal(projectId);
            // 滚动到捐赠部分
            document.querySelector('.project-support').scrollIntoView({ behavior: 'smooth' });
        });
    });
});
// 加载微博数据
async function loadWeiboData() {
    try {
        const response = await fetch('樊振东加盟德甲联赛微博舆论数据.xlsx');
        const data = await response.json();
        displayWeiboPosts(data);
    } catch (error) {
        console.error('加载微博数据失败:', error);
    }
}

// 显示微博内容
function displayWeiboPosts(data) {
    const container = document.querySelector('.posts-container');
    data.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'weibo-post';
        postElement.innerHTML = `
            <p>${post.text}</p>
            <a href="${post.url}" target="_blank">查看原文</a>
        `;
        container.appendChild(postElement);
    });
}

// 显示/隐藏媒体观点
function showMediaContent(id) {
    const content = document.getElementById(id);
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        content.style.maxHeight = content.scrollHeight + 'px';
    } else {
        content.classList.add('hidden');
        content.style.maxHeight = '0';
    }
}

// 显示情绪分布图
function showSentimentDistribution() {
    const container = document.getElementById('sentiment-container');
    if (container.classList.contains('hidden')) {
        container.classList.remove('hidden');
        // 隐藏所有情感部分
        document.getElementById('positive-section').classList.remove('active');
        document.getElementById('neutral-section').classList.remove('active');
        document.getElementById('negative-section').classList.remove('active');
    } else {
        container.classList.add('hidden');
    }
}

// 显示/隐藏情感分析内容
function showSentimentContent(type) {
    // 隐藏所有情感部分
    document.getElementById('positive-section').classList.remove('active');
    document.getElementById('neutral-section').classList.remove('active');
    document.getElementById('negative-section').classList.remove('active');
    
    // 显示选中的情感部分
    const selectedSection = document.getElementById(type + '-section');
    selectedSection.classList.add('active');
}

// 显示词云图
function showWordCloud() {
    const container = document.getElementById('wordcloud-container');
    if (container.classList.contains('hidden')) {
        container.classList.remove('hidden');
    } else {
        container.classList.add('hidden');
    }
}

// 显示热度趋势图
function showHeatTrend() {
    const container = document.getElementById('heat-trend-container');
    if (container.classList.contains('hidden')) {
        container.classList.remove('hidden');
    } else {
        container.classList.add('hidden');
    }
}

// 显示热度分布图
function showHeatDistribution() {
    const container = document.getElementById('heat-distribution-container');
    if (container.classList.contains('hidden')) {
        container.classList.remove('hidden');
    } else {
        container.classList.add('hidden');
    }
}

// 显示情感分析
function showSentiment() {
    const container = document.getElementById('sentiment-container');
    container.classList.toggle('hidden');
    
    // 加载情感分析示例
    loadSentimentExamples();
}

// 加载情感分析示例
async function loadSentimentExamples() {
    try {
        const response = await fetch('情感分析结果.xlsx');
        const data = await response.json();
        
        // 更新各个情感类别的示例
        updateSentimentExamples('positive-examples', data.filter(item => item.情感 === '正面'));
        updateSentimentExamples('neutral-examples', data.filter(item => item.情感 === '中立'));
        updateSentimentExamples('negative-examples', data.filter(item => item.情感 === '负面'));
    } catch (error) {
        console.error('加载情感分析数据失败:', error);
    }
}

// 更新情感示例列表
function updateSentimentExamples(elementId, examples) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    examples.slice(0, 5).forEach(example => {
        const li = document.createElement('li');
        li.textContent = example.text;
        container.appendChild(li);
    });
}

// 提交评论
function submitComment() {
    const commentInput = document.getElementById('comment-input');
    const comment = commentInput.value.trim();
    
    if (comment) {
        const commentsList = document.getElementById('comments-list');
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <p>${comment}</p>
            <small>${new Date().toLocaleString()}</small>
        `;
        commentsList.insertBefore(commentElement, commentsList.firstChild);
        commentInput.value = '';
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadWeiboData();
}); 
// 全局变量
let currentAlgorithm = 'insertion';
let dataArray = [];
let sortingSteps = [];
let currentStepIndex = 0;
let isPlaying = false;
let playbackSpeed = 5;
let playbackInterval;

// 算法详情数据
const algorithmDetails = {
    insertion: {
        title: '插入排序',
        description: '插入排序是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。',
        timeComplexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        code: `private static void insertionSort(String[] arr) {
    for (int i = 1; i < arr.length; i++) {
        String key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j].compareTo(key) > 0) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
        scenarios: [
            {
                title: '小数据集',
                description: '对于小型数据集，插入排序性能良好且实现简单。'
            },
            {
                title: '几乎已排序数据',
                description: '当数据已经接近排序状态时，插入排序接近线性时间表现。'
            },
            {
                title: '内存受限环境',
                description: '由于其O(1)的空间复杂度，非常适合嵌入式系统等内存受限环境。'
            }
        ]
    },
    quick: {
        title: '快速排序',
        description: '快速排序是一种分治算法，它将一个数组分成两个子数组，然后递归地对子数组进行排序。由于其平均情况下O(n log n)的性能和高效的原地排序，它是实际应用中最常用的排序算法之一。',
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(log n)',
        code: `private static void quickSort(String[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(String[] arr, int low, int high) {
    String pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j].compareTo(pivot) <= 0) {
            i++;
            String temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    String temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
        scenarios: [
            {
                title: '大数据集',
                description: '对于大规模随机数据，快速排序表现出色，通常是最佳选择。'
            },
            {
                title: '原地排序需求',
                description: '快速排序是原地排序算法，不需要额外的数组空间。'
            },
            {
                title: '平均性能要求',
                description: '在大多数实际应用中，快速排序的平均性能是最好的。'
            }
        ]
    },
    merge: {
        title: '归并排序',
        description: '归并排序是一种分治算法，它将数组分成两半，递归地对它们排序，然后合并两个有序的子数组。归并排序是稳定的排序算法，性能稳定但需要额外的空间。',
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n log n)'
        },
        spaceComplexity: 'O(n)',
        code: `private static void mergeSort(String[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

private static void merge(String[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    String[] L = new String[n1];
    String[] R = new String[n2];
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i].compareTo(R[j]) <= 0) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}`,
        scenarios: [
            {
                title: '稳定性要求',
                description: '归并排序是稳定的排序算法，保持相等元素的原始顺序。'
            },
            {
                title: '重复值数据集',
                description: '对于包含大量重复值的数据，归并排序性能稳定。'
            },
            {
                title: '可预测性能需求',
                description: '归并排序在所有情况下都保持O(n log n)的时间复杂度，性能可预测。'
            }
        ]
    }
};

// 性能数据
const performanceData = {
    labels: ['1000places_sorted', '1000places_random', '10000places_sorted', '10000places_random'],
    datasets: [
        {
            label: '插入排序',
            data: [0.7209, 2.4313, 0.2419, 73.7628],
            backgroundColor: 'rgba(66, 133, 244, 0.7)',
            borderColor: '#4285F4',
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 16,
            maxBarThickness: 20
        },
        {
            label: '快速排序',
            data: [7.1515, 0.2031, 171.752, 2.008],
            backgroundColor: 'rgba(52, 199, 89, 0.7)',
            borderColor: '#34C759',
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 16,
            maxBarThickness: 20
        },
        {
            label: '归并排序',
            data: [0.4774, 0.2206, 1.5111, 3.2734],
            backgroundColor: 'rgba(175, 82, 222, 0.7)',
            borderColor: '#AF52DE',
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 16,
            maxBarThickness: 20
        }
    ]
};

// 预设数据集
const datasets = {
    'small-random': [9, 5, 7, 3, 1, 8, 6, 2, 4, 0],
    'small-sorted': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    'small-reverse': [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    'medium-random': [18, 5, 12, 9, 3, 10, 15, 6, 1, 17, 4, 11, 8, 14, 7, 16, 13, 2, 19, 0]
};

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    // 绑定Tab切换事件
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const algorithm = tab.getAttribute('data-algorithm');
            selectAlgorithm(algorithm);
        });
    });

    // 绑定数据集选择事件
    const datasetSelect = document.getElementById('dataset-select');
    datasetSelect.addEventListener('change', () => {
        resetVisualization();
        generateSortingSteps();
        updateVisualization();
    });

    // 绑定控制按钮事件
    document.getElementById('reset-btn').addEventListener('click', resetVisualization);
    document.getElementById('play-btn').addEventListener('click', togglePlayback);
    document.getElementById('step-btn').addEventListener('click', stepForward);

    // 绑定速度滑块事件
    document.getElementById('speed-slider').addEventListener('input', (e) => {
        playbackSpeed = parseInt(e.target.value);
        if (isPlaying) {
            clearInterval(playbackInterval);
            startPlayback();
        }
    });

    // 初始化图表
    initializeChart();

    // 初始化第一个算法
    selectAlgorithm('insertion');
    resetVisualization();
    generateSortingSteps();
    updateVisualization();
});

// 选择算法
function selectAlgorithm(algorithm) {
    currentAlgorithm = algorithm;
    
    // 更新Tab样式
    document.querySelectorAll('.tab').forEach(tab => {
        if (tab.getAttribute('data-algorithm') === algorithm) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // 更新算法详情
    updateAlgorithmDetails();
    
    // 重置可视化
    resetVisualization();
    generateSortingSteps();
    updateVisualization();
}

// 更新算法详情
function updateAlgorithmDetails() {
    const details = algorithmDetails[currentAlgorithm];
    
    document.getElementById('algorithm-title').textContent = details.title;
    document.getElementById('algorithm-description').textContent = details.description;
    
    // 更新时间复杂度
    const timeComplexityHtml = `
        <h4>时间复杂度</h4>
        <p>最佳情况: <span class="highlight">${details.timeComplexity.best}</span></p>
        <p>平均情况: <span class="highlight">${details.timeComplexity.average}</span></p>
        <p>最坏情况: <span class="highlight">${details.timeComplexity.worst}</span></p>
    `;
    
    // 更新空间复杂度
    const spaceComplexityHtml = `
        <h4>空间复杂度</h4>
        <p><span class="highlight">${details.spaceComplexity}</span></p>
    `;
    
    // 更新代码
    const codeHtml = `<pre><code class="java">${details.code}</code></pre>`;
    
    // 更新应用场景
    let scenariosHtml = '';
    details.scenarios.forEach(scenario => {
        scenariosHtml += `
            <div class="scenario-card">
                <h4><span class="material-icons-outlined good">check_circle_outline</span> ${scenario.title}</h4>
                <p>${scenario.description}</p>
            </div>
        `;
    });
    
    // 插入到页面
    document.querySelector('.complexity-cards').innerHTML = `
        <div class="complexity-card">${timeComplexityHtml}</div>
        <div class="complexity-card">${spaceComplexityHtml}</div>
    `;
    
    document.querySelector('.code-block').innerHTML = codeHtml;
    document.querySelector('.scenario-cards').innerHTML = scenariosHtml;
}

// 重置可视化
function resetVisualization() {
    // 停止播放
    if (isPlaying) {
        togglePlayback();
    }
    
    // 重置状态
    currentStepIndex = 0;
    document.getElementById('step-counter').textContent = '0';
    document.getElementById('current-operation').textContent = '准备开始排序';
    
    // 获取当前选择的数据集
    const datasetSelect = document.getElementById('dataset-select');
    dataArray = [...datasets[datasetSelect.value]];
    
    // 更新播放按钮图标
    document.querySelector('#play-btn .material-icons-outlined').textContent = 'play_arrow';
}

// 生成排序步骤
function generateSortingSteps() {
    sortingSteps = [];
    const arrayCopy = [...dataArray];
    
    if (currentAlgorithm === 'insertion') {
        insertionSortWithSteps(arrayCopy);
    } else if (currentAlgorithm === 'quick') {
        quickSortWithSteps(arrayCopy, 0, arrayCopy.length - 1);
    } else if (currentAlgorithm === 'merge') {
        mergeSortWithSteps(arrayCopy, 0, arrayCopy.length - 1);
    }
}

// 插入排序(带步骤记录)
function insertionSortWithSteps(arr) {
    sortingSteps.push({
        array: [...arr],
        message: '开始插入排序',
        comparing: [],
        sorted: [0]
    });
    
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        sortingSteps.push({
            array: [...arr],
            message: `选择索引 ${i} 处的元素 ${key} 作为当前元素`,
            comparing: [i],
            sorted: Array.from({length: i}, (_, idx) => idx)
        });
        
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            sortingSteps.push({
                array: [...arr],
                message: `比较元素 ${arr[j]} 和 ${key}，${arr[j]} > ${key}，需要交换`,
                comparing: [j, i],
                sorted: Array.from({length: i}, (_, idx) => idx).filter(idx => idx !== j && idx !== j + 1)
            });
            
            arr[j + 1] = arr[j];
            
            sortingSteps.push({
                array: [...arr],
                message: `将元素 ${arr[j]} 右移一位`,
                comparing: [j, j + 1],
                sorted: Array.from({length: i}, (_, idx) => idx).filter(idx => idx !== j && idx !== j + 1)
            });
            
            j--;
        }
        
        arr[j + 1] = key;
        sortingSteps.push({
            array: [...arr],
            message: `将当前元素 ${key} 插入到位置 ${j + 1}`,
            comparing: [j + 1],
            sorted: Array.from({length: i + 1}, (_, idx) => idx)
        });
    }
    
    sortingSteps.push({
        array: [...arr],
        message: '排序完成',
        comparing: [],
        sorted: Array.from({length: arr.length}, (_, idx) => idx)
    });
}

// 快速排序(带步骤记录)
function quickSortWithSteps(arr, low, high) {
    if (low < high) {
        sortingSteps.push({
            array: [...arr],
            message: `对子数组 [${low}..${high}] 进行快速排序`,
            comparing: [low, high],
            sorted: []
        });
        
        const pivotValue = arr[high];
        sortingSteps.push({
            array: [...arr],
            message: `选择 ${pivotValue} 作为基准值`,
            comparing: [high],
            sorted: []
        });
        
        let i = low - 1;
        for (let j = low; j < high; j++) {
            sortingSteps.push({
                array: [...arr],
                message: `比较元素 ${arr[j]} 和基准值 ${pivotValue}`,
                comparing: [j, high],
                sorted: []
            });
            
            if (arr[j] <= pivotValue) {
                i++;
                
                sortingSteps.push({
                    array: [...arr],
                    message: `${arr[j]} <= ${pivotValue}，交换 ${arr[i]} 和 ${arr[j]}`,
                    comparing: [i, j],
                    sorted: []
                });
                
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                
                sortingSteps.push({
                    array: [...arr],
                    message: `交换后：${arr[i]} 和 ${arr[j]}`,
                    comparing: [i, j],
                    sorted: []
                });
            }
        }
        
        const temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        sortingSteps.push({
            array: [...arr],
            message: `将基准值 ${pivotValue} 放置到正确位置 ${i + 1}`,
            comparing: [i + 1, high],
            sorted: [i + 1]
        });
        
        const pi = i + 1;
        
        quickSortWithSteps(arr, low, pi - 1);
        quickSortWithSteps(arr, pi + 1, high);
    } else if (low === high) {
        sortingSteps.push({
            array: [...arr],
            message: `索引 ${low} 处的单元素子数组已排序`,
            comparing: [],
            sorted: [low]
        });
    }
}

// 归并排序(带步骤记录)
function mergeSortWithSteps(arr, left, right) {
    if (left < right) {
        sortingSteps.push({
            array: [...arr],
            message: `对子数组 [${left}..${right}] 进行归并排序`,
            comparing: [left, right],
            sorted: []
        });
        
        const mid = Math.floor(left + (right - left) / 2);
        
        sortingSteps.push({
            array: [...arr],
            message: `分割为 [${left}..${mid}] 和 [${mid + 1}..${right}]`,
            comparing: [left, mid, right],
            sorted: []
        });
        
        mergeSortWithSteps(arr, left, mid);
        mergeSortWithSteps(arr, mid + 1, right);
        
        // 合并两个子数组
        const n1 = mid - left + 1;
        const n2 = right - mid;
        const L = [];
        const R = [];
        
        sortingSteps.push({
            array: [...arr],
            message: `准备合并 [${left}..${mid}] 和 [${mid + 1}..${right}]`,
            comparing: [left, mid, mid + 1, right],
            sorted: []
        });
        
        for (let i = 0; i < n1; i++) {
            L[i] = arr[left + i];
        }
        
        for (let j = 0; j < n2; j++) {
            R[j] = arr[mid + 1 + j];
        }
        
        sortingSteps.push({
            array: [...arr],
            message: `左子数组: [${L.join(', ')}], 右子数组: [${R.join(', ')}]`,
            comparing: [],
            sorted: []
        });
        
        let i = 0, j = 0, k = left;
        
        while (i < n1 && j < n2) {
            sortingSteps.push({
                array: [...arr],
                message: `比较 ${L[i]} 和 ${R[j]}`,
                comparing: [left + i, mid + 1 + j],
                sorted: []
            });
            
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                
                sortingSteps.push({
                    array: [...arr],
                    message: `${L[i]} <= ${R[j]}，取左子数组的元素`,
                    comparing: [left + i],
                    sorted: []
                });
                
                i++;
            } else {
                arr[k] = R[j];
                
                sortingSteps.push({
                    array: [...arr],
                    message: `${L[i]} > ${R[j]}，取右子数组的元素`,
                    comparing: [mid + 1 + j],
                    sorted: []
                });
                
                j++;
            }
            k++;
        }
        
        while (i < n1) {
            arr[k] = L[i];
            
            if (n1 > 1 || n2 > 1) {
                sortingSteps.push({
                    array: [...arr],
                    message: `复制左子数组剩余元素 ${L[i]}`,
                    comparing: [left + i],
                    sorted: []
                });
            }
            
            i++;
            k++;
        }
        
        while (j < n2) {
            arr[k] = R[j];
            
            if (n1 > 1 || n2 > 1) {
                sortingSteps.push({
                    array: [...arr],
                    message: `复制右子数组剩余元素 ${R[j]}`,
                    comparing: [mid + 1 + j],
                    sorted: []
                });
            }
            
            j++;
            k++;
        }
        
        sortingSteps.push({
            array: [...arr],
            message: `子数组 [${left}..${right}] 合并完成`,
            comparing: [],
            sorted: Array.from({length: right - left + 1}, (_, idx) => left + idx)
        });
    }
}

// 更新可视化
function updateVisualization() {
    if (sortingSteps.length === 0) return;
    
    const step = sortingSteps[currentStepIndex];
    const visualizationArea = document.getElementById('visualization-area');
    const maxValue = Math.max(...dataArray) + 1; // +1 为了给0值元素也能显示高度
    
    // 清空可视化区域
    visualizationArea.innerHTML = '';
    
    // 绘制条形图
    step.array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(value + 1) / maxValue * 200}px`; // 标准化高度
        bar.style.width = `${Math.floor(100 / step.array.length)}%`;
        bar.style.maxWidth = '50px';
        
        // 添加元素值标签
        const label = document.createElement('div');
        label.textContent = value;
        label.style.position = 'absolute';
        label.style.top = '-25px';
        label.style.width = '100%';
        label.style.textAlign = 'center';
        label.style.fontSize = '12px';
        bar.appendChild(label);
        
        // 设置条形状态
        if (step.comparing.includes(index)) {
            bar.classList.add('comparing');
        } else if (step.sorted.includes(index)) {
            bar.classList.add('sorted');
        }
        
        bar.style.position = 'relative';
        visualizationArea.appendChild(bar);
    });
    
    // 更新步骤计数器和操作说明
    document.getElementById('step-counter').textContent = currentStepIndex;
    document.getElementById('current-operation').textContent = step.message;
}

// 向前一步
function stepForward() {
    if (currentStepIndex < sortingSteps.length - 1) {
        currentStepIndex++;
        updateVisualization();
    } else {
        // 排序完成，停止播放
        if (isPlaying) {
            togglePlayback();
        }
    }
}

// 切换播放/暂停
function togglePlayback() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        document.querySelector('#play-btn .material-icons-outlined').textContent = 'pause';
        startPlayback();
    } else {
        document.querySelector('#play-btn .material-icons-outlined').textContent = 'play_arrow';
        clearInterval(playbackInterval);
    }
}

// 开始播放动画
function startPlayback() {
    playbackInterval = setInterval(() => {
        if (currentStepIndex < sortingSteps.length - 1) {
            stepForward();
        } else {
            togglePlayback(); // 排序完成，停止播放
        }
    }, 1000 / playbackSpeed);
}

// 初始化图表
function initializeChart() {
    const ctx = document.getElementById('performance-chart').getContext('2d');
    
    // 创建自定义图例
    const chartContainer = document.querySelector('.chart-container');
    const legendDiv = document.createElement('div');
    legendDiv.className = 'chart-legend';
    legendDiv.innerHTML = `
        <div class="legend-item">
            <span class="legend-color insertion-color"></span>
            <span>插入排序</span>
        </div>
        <div class="legend-item">
            <span class="legend-color quick-color"></span>
            <span>快速排序</span>
        </div>
        <div class="legend-item">
            <span class="legend-color merge-color"></span>
            <span>归并排序</span>
        </div>
    `;
    chartContainer.insertAdjacentElement('beforebegin', legendDiv);
    
    // 添加表格标题
    const tableContainer = document.querySelector('.performance-table-container');
    const tableCaption = document.createElement('div');
    tableCaption.className = 'table-caption';
    tableCaption.textContent = '表1. 排序算法性能对比（单位：毫秒）';
    tableContainer.insertAdjacentElement('beforebegin', tableCaption);
    
    new Chart(ctx, {
        type: 'bar',
        data: performanceData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // 隐藏默认图例，使用自定义图例
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#555',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    boxPadding: 6,
                    bodyFont: {
                        family: 'Roboto, sans-serif'
                    },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(4) + ' ms';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Roboto, sans-serif',
                            size: 12
                        },
                        color: '#555555'
                    },
                    title: {
                        display: true,
                        text: '数据集',
                        font: {
                            family: 'Roboto, sans-serif',
                            size: 14,
                            weight: 'normal'
                        },
                        padding: {top: 10, bottom: 0},
                        color: '#333333'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f0f0f0'
                    },
                    ticks: {
                        font: {
                            family: 'Roboto, sans-serif',
                            size: 12
                        },
                        color: '#555555',
                        callback: function(value) {
                            if (value >= 1000) {
                                return (value / 1000).toFixed(1) + 's';
                            }
                            return value + 'ms';
                        }
                    },
                    title: {
                        display: true,
                        text: '耗时 (对数刻度)',
                        font: {
                            family: 'Roboto, sans-serif',
                            size: 14,
                            weight: 'normal'
                        },
                        padding: {top: 0, bottom: 10},
                        color: '#333333'
                    },
                    type: 'logarithmic',
                    min: 0.1 // 最小值设为0.1ms，使用对数刻度
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            layout: {
                padding: {
                    left: 10,
                    right: 20,
                    top: 20,
                    bottom: 10
                }
            },
            elements: {
                bar: {
                    borderWidth: 1.5
                }
            }
        }
    });
} 
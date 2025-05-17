// Global variables
let currentAlgorithm = 'insertion';
let dataArray = [];
let sortingSteps = [];
let currentStepIndex = 0;
let isPlaying = false;
let playbackSpeed = 5;
let playbackInterval;

// Algorithm details data
const algorithmDetails = {
    insertion: {
        title: 'Insertion Sort',
        description: 'Insertion sort is a simple and intuitive sorting algorithm. It works by building a sorted sequence and for unsorted data, it scans from the back to the front in the sorted sequence to find the appropriate position and insert.',
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
                title: 'Small Datasets',
                description: 'Insertion sort performs well and is simple to implement for small datasets.'
            },
            {
                title: 'Nearly Sorted Data',
                description: 'When data is already close to being sorted, insertion sort approaches linear time performance.'
            },
            {
                title: 'Memory Constrained Environments',
                description: 'With O(1) space complexity, it\'s very suitable for embedded systems and other memory-constrained environments.'
            }
        ]
    },
    quick: {
        title: 'Quick Sort',
        description: 'Quick sort is a divide and conquer algorithm that divides an array into two subarrays, then recursively sorts the subarrays. Due to its O(n log n) performance in average case and efficient in-place sorting, it is one of the most commonly used sorting algorithms in practical applications.',
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
                title: 'Large Datasets',
                description: 'For large-scale random data, quick sort performs excellently and is usually the best choice.'
            },
            {
                title: 'In-place Sorting Needs',
                description: 'Quick sort is an in-place sorting algorithm that doesn\'t require additional array space.'
            },
            {
                title: 'Average Performance Requirements',
                description: 'In most practical applications, quick sort has the best average performance.'
            }
        ]
    },
    merge: {
        title: 'Merge Sort',
        description: 'Merge sort is a divide and conquer algorithm that splits the array in half, recursively sorts them, and then merges the two sorted subarrays. Merge sort is a stable sorting algorithm with stable performance but requires additional space.',
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
                title: 'Stability Requirements',
                description: 'Merge sort is a stable sorting algorithm that preserves the original order of equal elements.'
            },
            {
                title: 'Datasets with Duplicate Values',
                description: 'For data containing a large number of duplicate values, merge sort provides stable performance.'
            },
            {
                title: 'Predictable Performance Needs',
                description: 'Merge sort maintains O(n log n) time complexity in all cases, with predictable performance.'
            }
        ]
    }
};

// Performance data
const performanceData = {
    labels: ['1000places_sorted', '1000places_random', '10000places_sorted', '10000places_random'],
    datasets: [
        {
            label: 'Insertion Sort',
            data: [0.7209, 2.4313, 0.2419, 73.7628],
            backgroundColor: 'rgba(66, 133, 244, 0.7)',
            borderColor: '#4285F4',
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 16,
            maxBarThickness: 20
        },
        {
            label: 'Quick Sort',
            data: [7.1515, 0.2031, 171.752, 2.008],
            backgroundColor: 'rgba(52, 199, 89, 0.7)',
            borderColor: '#34C759',
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 16,
            maxBarThickness: 20
        },
        {
            label: 'Merge Sort',
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

// Pre-set datasets
const datasets = {
    'small-random': [9, 5, 7, 3, 1, 8, 6, 2, 4, 0],
    'small-sorted': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    'small-reverse': [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    'medium-random': [18, 5, 12, 9, 3, 10, 15, 6, 1, 17, 4, 11, 8, 14, 7, 16, 13, 2, 19, 0]
};

// Page load initialization
document.addEventListener('DOMContentLoaded', () => {
    // Bind Tab switch event
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const algorithm = tab.getAttribute('data-algorithm');
            selectAlgorithm(algorithm);
        });
    });

    // Bind dataset selection event
    const datasetSelect = document.getElementById('dataset-select');
    datasetSelect.addEventListener('change', () => {
        resetVisualization();
        generateSortingSteps();
        updateVisualization();
    });

    // Bind control button events
    document.getElementById('reset-btn').addEventListener('click', resetVisualization);
    document.getElementById('play-btn').addEventListener('click', togglePlayback);
    document.getElementById('step-btn').addEventListener('click', stepForward);

    // Bind speed slider event
    document.getElementById('speed-slider').addEventListener('input', (e) => {
        playbackSpeed = parseInt(e.target.value);
        if (isPlaying) {
            clearInterval(playbackInterval);
            startPlayback();
        }
    });

    // Initialize chart
    initializeChart();

    // Initialize first algorithm
    selectAlgorithm('insertion');
    resetVisualization();
    generateSortingSteps();
    updateVisualization();
});

// Select algorithm
function selectAlgorithm(algorithm) {
    currentAlgorithm = algorithm;
    
    // Update Tab style
    document.querySelectorAll('.tab').forEach(tab => {
        if (tab.getAttribute('data-algorithm') === algorithm) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Update algorithm details
    updateAlgorithmDetails();
    
    // Reset visualization
    resetVisualization();
    generateSortingSteps();
    updateVisualization();
}

// Update algorithm details
function updateAlgorithmDetails() {
    const details = algorithmDetails[currentAlgorithm];
    
    document.getElementById('algorithm-title').textContent = details.title;
    document.getElementById('algorithm-description').textContent = details.description;
    
    // Update time complexity
    const timeComplexityHtml = `
        <h4>Time Complexity</h4>
        <p>Best case: <span class="highlight">${details.timeComplexity.best}</span></p>
        <p>Average case: <span class="highlight">${details.timeComplexity.average}</span></p>
        <p>Worst case: <span class="highlight">${details.timeComplexity.worst}</span></p>
    `;
    
    // Update space complexity
    const spaceComplexityHtml = `
        <h4>Space Complexity</h4>
        <p><span class="highlight">${details.spaceComplexity}</span></p>
    `;
    
    // Update code
    const codeHtml = `<pre><code class="java">${details.code}</code></pre>`;
    
    // Update application scenarios
    let scenariosHtml = '';
    details.scenarios.forEach(scenario => {
        scenariosHtml += `
            <div class="scenario-card">
                <h4><span class="material-icons-outlined good">check_circle_outline</span> ${scenario.title}</h4>
                <p>${scenario.description}</p>
            </div>
        `;
    });
    
    // Insert into page
    document.querySelector('.complexity-cards').innerHTML = `
        <div class="complexity-card">${timeComplexityHtml}</div>
        <div class="complexity-card">${spaceComplexityHtml}</div>
    `;
    
    document.querySelector('.code-block').innerHTML = codeHtml;
    document.querySelector('.scenario-cards').innerHTML = scenariosHtml;
}

// Reset visualization
function resetVisualization() {
    // Stop playback
    if (isPlaying) {
        togglePlayback();
    }
    
    // Reset state
    currentStepIndex = 0;
    document.getElementById('step-counter').textContent = '0';
    document.getElementById('current-operation').textContent = 'Ready to start sorting';
    
    // Get current selected dataset
    const datasetSelect = document.getElementById('dataset-select');
    dataArray = [...datasets[datasetSelect.value]];
    
    // Update playback button icon
    document.querySelector('#play-btn .material-icons-outlined').textContent = 'play_arrow';
}

// Generate sorting steps
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

// Insertion sort (with step recording)
function insertionSortWithSteps(arr) {
    sortingSteps.push({
        array: [...arr],
        message: 'Starting insertion sort',
        comparing: [],
        sorted: [0]
    });
    
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        sortingSteps.push({
            array: [...arr],
            message: `Selecting element at index ${i} with value ${key} as current element`,
            comparing: [i],
            sorted: Array.from({length: i}, (_, idx) => idx)
        });
        
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            sortingSteps.push({
                array: [...arr],
                message: `Comparing elements ${arr[j]} and ${key}, ${arr[j]} > ${key}, need to swap`,
                comparing: [j, i],
                sorted: Array.from({length: i}, (_, idx) => idx).filter(idx => idx !== j && idx !== j + 1)
            });
            
            arr[j + 1] = arr[j];
            
            sortingSteps.push({
                array: [...arr],
                message: `Shifting element ${arr[j]} one position to the right`,
                comparing: [j, j + 1],
                sorted: Array.from({length: i}, (_, idx) => idx).filter(idx => idx !== j && idx !== j + 1)
            });
            
            j--;
        }
        
        arr[j + 1] = key;
        sortingSteps.push({
            array: [...arr],
            message: `Inserting current element ${key} into position ${j + 1}`,
            comparing: [j + 1],
            sorted: Array.from({length: i + 1}, (_, idx) => idx)
        });
    }
    
    sortingSteps.push({
        array: [...arr],
        message: 'Sorting completed',
        comparing: [],
        sorted: Array.from({length: arr.length}, (_, idx) => idx)
    });
}

// Quick sort (with step recording)
function quickSortWithSteps(arr, low, high) {
    if (low < high) {
        sortingSteps.push({
            array: [...arr],
            message: `Sorting subarray [${low}..${high}]`,
            comparing: [low, high],
            sorted: []
        });
        
        const pivotValue = arr[high];
        sortingSteps.push({
            array: [...arr],
            message: `Selecting ${pivotValue} as pivot value`,
            comparing: [high],
            sorted: []
        });
        
        let i = low - 1;
        for (let j = low; j < high; j++) {
            sortingSteps.push({
                array: [...arr],
                message: `Comparing element ${arr[j]} with pivot value ${pivotValue}`,
                comparing: [j, high],
                sorted: []
            });
            
            if (arr[j] <= pivotValue) {
                i++;
                
                sortingSteps.push({
                    array: [...arr],
                    message: `${arr[j]} <= ${pivotValue}, swapping ${arr[i]} and ${arr[j]}`,
                    comparing: [i, j],
                    sorted: []
                });
                
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                
                sortingSteps.push({
                    array: [...arr],
                    message: `After swap: ${arr[i]} and ${arr[j]}`,
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
            message: `Placing pivot value ${pivotValue} into correct position ${i + 1}`,
            comparing: [i + 1, high],
            sorted: [i + 1]
        });
        
        const pi = i + 1;
        
        quickSortWithSteps(arr, low, pi - 1);
        quickSortWithSteps(arr, pi + 1, high);
    } else if (low === high) {
        sortingSteps.push({
            array: [...arr],
            message: `Single-element subarray at index ${low} is already sorted`,
            comparing: [],
            sorted: [low]
        });
    }
}

// Merge sort (with step recording)
function mergeSortWithSteps(arr, left, right) {
    if (left < right) {
        sortingSteps.push({
            array: [...arr],
            message: `Sorting subarray [${left}..${right}]`,
            comparing: [left, right],
            sorted: []
        });
        
        const mid = Math.floor(left + (right - left) / 2);
        
        sortingSteps.push({
            array: [...arr],
            message: `Splitting into [${left}..${mid}] and [${mid + 1}..${right}]`,
            comparing: [left, mid, right],
            sorted: []
        });
        
        mergeSortWithSteps(arr, left, mid);
        mergeSortWithSteps(arr, mid + 1, right);
        
        // Merge two subarrays
        const n1 = mid - left + 1;
        const n2 = right - mid;
        const L = [];
        const R = [];
        
        sortingSteps.push({
            array: [...arr],
            message: `Preparing to merge [${left}..${mid}] and [${mid + 1}..${right}]`,
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
            message: `Left subarray: [${L.join(', ')}], Right subarray: [${R.join(', ')}]`,
            comparing: [],
            sorted: []
        });
        
        let i = 0, j = 0, k = left;
        
        while (i < n1 && j < n2) {
            sortingSteps.push({
                array: [...arr],
                message: `Comparing ${L[i]} and ${R[j]}`,
                comparing: [left + i, mid + 1 + j],
                sorted: []
            });
            
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                
                sortingSteps.push({
                    array: [...arr],
                    message: `${L[i]} <= ${R[j]}, taking element from left subarray`,
                    comparing: [left + i],
                    sorted: []
                });
                
                i++;
            } else {
                arr[k] = R[j];
                
                sortingSteps.push({
                    array: [...arr],
                    message: `${L[i]} > ${R[j]}, taking element from right subarray`,
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
                    message: `Copying remaining elements from left subarray ${L[i]}`,
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
                    message: `Copying remaining elements from right subarray ${R[j]}`,
                    comparing: [mid + 1 + j],
                    sorted: []
                });
            }
            
            j++;
            k++;
        }
        
        sortingSteps.push({
            array: [...arr],
            message: `Subarray [${left}..${right}] merge completed`,
            comparing: [],
            sorted: Array.from({length: right - left + 1}, (_, idx) => left + idx)
        });
    }
}

// Update visualization
function updateVisualization() {
    if (sortingSteps.length === 0) return;
    
    const step = sortingSteps[currentStepIndex];
    const visualizationArea = document.getElementById('visualization-area');
    const maxValue = Math.max(...dataArray) + 1; // +1 for 0 value elements to display height
    
    // Clear visualization area
    visualizationArea.innerHTML = '';
    
    // Draw bar chart
    step.array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(value + 1) / maxValue * 200}px`; // Standardized height
        bar.style.width = `${Math.floor(100 / step.array.length)}%`;
        bar.style.maxWidth = '50px';
        
        // Add element value label
        const label = document.createElement('div');
        label.textContent = value;
        label.style.position = 'absolute';
        label.style.top = '-25px';
        label.style.width = '100%';
        label.style.textAlign = 'center';
        label.style.fontSize = '12px';
        bar.appendChild(label);
        
        // Set bar status
        if (step.comparing.includes(index)) {
            bar.classList.add('comparing');
        } else if (step.sorted.includes(index)) {
            bar.classList.add('sorted');
        }
        
        bar.style.position = 'relative';
        visualizationArea.appendChild(bar);
    });
    
    // Update step counter and operation description
    document.getElementById('step-counter').textContent = currentStepIndex;
    document.getElementById('current-operation').textContent = step.message;
}

// Forward one step
function stepForward() {
    if (currentStepIndex < sortingSteps.length - 1) {
        currentStepIndex++;
        updateVisualization();
    } else {
        // Sorting completed, stop playback
        if (isPlaying) {
            togglePlayback();
        }
    }
}

// Toggle play/pause
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

// Start playback animation
function startPlayback() {
    playbackInterval = setInterval(() => {
        if (currentStepIndex < sortingSteps.length - 1) {
            stepForward();
        } else {
            togglePlayback(); // Sorting completed, stop playback
        }
    }, 1000 / playbackSpeed);
}

// Initialize chart
function initializeChart() {
    const ctx = document.getElementById('performance-chart').getContext('2d');
    
    // Create custom legend
    const chartContainer = document.querySelector('.chart-container');
    const legendDiv = document.createElement('div');
    legendDiv.className = 'chart-legend';
    legendDiv.innerHTML = `
        <div class="legend-item">
            <span class="legend-color insertion-color"></span>
            <span>Insertion Sort</span>
        </div>
        <div class="legend-item">
            <span class="legend-color quick-color"></span>
            <span>Quick Sort</span>
        </div>
        <div class="legend-item">
            <span class="legend-color merge-color"></span>
            <span>Merge Sort</span>
        </div>
    `;
    chartContainer.insertAdjacentElement('beforebegin', legendDiv);
    
    // Add table caption
    const tableContainer = document.querySelector('.performance-table-container');
    const tableCaption = document.createElement('div');
    tableCaption.className = 'table-caption';
    tableCaption.textContent = 'Table 1. Sorting Algorithm Performance Comparison (Unit: Milliseconds)';
    tableContainer.insertAdjacentElement('beforebegin', tableCaption);
    
    new Chart(ctx, {
        type: 'bar',
        data: performanceData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Hide default legend, use custom legend
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
                        text: 'Dataset',
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
                        text: 'Time (Logarithmic Scale)',
                        font: {
                            family: 'Roboto, sans-serif',
                            size: 14,
                            weight: 'normal'
                        },
                        padding: {top: 0, bottom: 10},
                        color: '#333333'
                    },
                    type: 'logarithmic',
                    min: 0.1 // Minimum value set to 0.1ms, use logarithmic scale
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
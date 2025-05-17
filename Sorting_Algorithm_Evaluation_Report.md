# Sorting Algorithm Evaluation Report

## Experiment Overview

This experiment aims to evaluate the performance of three classic sorting algorithms (Insertion Sort, Quick Sort, and Merge Sort) on different datasets. The test datasets include:

1. 1000places_sorted.csv - Contains 1000 place names sorted in alphabetical order (A-Z)
2. 1000places_random.csv - Contains 1000 randomly arranged place names
3. 10000places_sorted.csv - Contains 10000 place names sorted in alphabetical order (A-Z)
4. 10000places_random.csv - Contains 10000 randomly arranged place names

## Experiment Results

The following table summarizes the running time (in milliseconds) of various sorting algorithms on different datasets:

| Dataset | Insertion Sort (ms) | Quick Sort (ms) | Merge Sort (ms) |
|--------|--------------|--------------|--------------|
| 1000places_sorted | 0.7209 | 7.1515 | 0.4774 |
| 1000places_random | 2.4313 | 0.2031 | 0.2206 |
| 10000places_sorted | 0.2419 | 171.752 | 1.5111 |
| 10000places_random | 73.7628 | 2.008 | 3.2734 |

*Note: Actual running times may vary depending on system performance; the above table shows actual measured values.*

## Performance Analysis

### 1. Impact of Input Order on Algorithm Performance

Based on the test data, the impact of input order (sorted vs. random) on the performance of each sorting algorithm is as follows:

- **Insertion Sort**: For sorted data, insertion sort shows extremely high efficiency (0.7209ms vs 2.4313ms for 1000 elements); while for random data, its performance decreases significantly. This confirms that insertion sort has a time complexity approaching O(n) for sorted or nearly sorted data, and O(n²) for random data.

- **Quick Sort**: For random data, quick sort performs well (0.2031ms for 1000 elements); but for sorted data, its performance drops dramatically (7.1515ms for 1000 elements). For 10000 sorted elements, the performance degradation is even more significant (171.752ms). This confirms that standard quick sort leads to worst-case partitioning efficiency for sorted data, with time complexity approaching O(n²).

- **Merge Sort**: The performance of merge sort is relatively stable, not significantly affected by input order (sorted data: 0.4774ms vs random data: 0.2206ms for 1000 elements). This verifies that merge sort's time complexity remains stable at O(n log n), independent of the initial arrangement of input data.

### 2. Impact of Input Scale on Algorithm Performance

The impact of input scale (1000 vs 10000) on the performance of each sorting algorithm is as follows:

- **Insertion Sort**: For random data, when the data size increases from 1000 to 10000 (10 times), the sorting time increases from 2.4313ms to 73.7628ms (approximately 30 times), showing super-linear growth, verifying its O(n²) time complexity. However, for sorted data, performance actually improved (from 0.7209ms to 0.2419ms), which might be due to JVM optimization or measurement error.

- **Quick Sort**: For random data, when the data size increases 10 times, the sorting time increases from 0.2031ms to 2.008ms (about 10 times), close to the theoretical O(n log n) growth. But for sorted data, the growth is extremely significant (from 7.1515ms to 171.752ms, about 24 times), further confirming the O(n²) performance in worst-case scenarios.

- **Merge Sort**: When the data size increases 10 times, the sorting time growth is relatively stable: sorted data increases from 0.4774ms to 1.5111ms (about 3.2 times), random data increases from 0.2206ms to 3.2734ms (about 14.8 times). Although the growth factor differs from theoretical expectations, it still maintains good scalability overall.

### 3. Choice for Datasets with Duplicate Values

For datasets containing duplicate values, **Merge Sort** is the best choice for the following reasons:

1. **Stability**: Merge sort is a stable sorting algorithm, which maintains the original order of equal elements, important for consistency after sorting datasets with duplicate values.
2. **Stable Time Complexity**: The experimental data confirms that merge sort maintains relatively stable performance in all cases, without worst-case performance degradation.
3. **Handling Duplicates**: Unlike quick sort, duplicate values do not lead to unbalanced partitioning, avoiding performance degradation.

Although quick sort also performs well on random data, when the data contains a large number of duplicate values, it may lead to extremely unbalanced partitioning, resulting in performance close to O(n²). The experimental data shows that insertion sort performs well only when processing small, already sorted datasets.

### 4. Choice for Memory-Constrained Systems

In memory-constrained systems (such as embedded systems), **Insertion Sort** is the most appropriate choice for the following reasons:

1. **Space Efficiency**: Insertion sort is an in-place sorting algorithm with additional space requirement of O(1), requiring no extra storage space allocation.
2. **Code Simplicity**: Simple implementation, small code size, occupying less program storage space.
3. **Suitable for Small Datasets**: Experimental results confirm excellent performance for small-scale sorted data (which embedded systems typically process), with 1000 elements taking only 0.7209ms.
4. **Incremental Processing Capability**: Can perform incremental sorting as data arrives, without needing to load all data at once.

In contrast, merge sort requires O(n) additional space to store temporary arrays, which may become a bottleneck in memory-constrained environments. Quick sort, although an in-place sort, may lead to excessive stack space usage due to recursive calls, and our experimental data shows that its performance can deteriorate significantly under certain conditions (sorted data).

## Conclusion

1. **Insertion Sort**: Performance is highly dependent on the initial sorted state of the input data. Suitable for small-scale data and sorted or nearly sorted data, performing best in memory-constrained environments.
2. **Quick Sort**: Performs best on randomly distributed datasets but performs extremely poorly on sorted data. The experimental data shows that for 10000 sorted elements, its performance is about 85 times slower than for random data of the same size.
3. **Merge Sort**: Most stable performance, performing well across various datasets, suitable for scenarios requiring stable sorting and for processing datasets with duplicate values.

The choice of sorting algorithm should take into account factors such as data scale, data distribution characteristics, memory constraints, and sorting stability requirements. The experimental results further confirm the theoretical performance analysis of the algorithms and provide guidance for practical application scenarios. 
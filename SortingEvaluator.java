import java.io.*;
import java.util.*;

public class SortingEvaluator {
    
    public static void main(String[] args) {
        // 数据集路径
        String[] dataFiles = {
            "data/1000places_sorted.csv",
            "data/1000places_random.csv",
            "data/10000places_sorted.csv",
            "data/10000places_random.csv"
        };
        
        String[] datasetNames = {
            "1000places_sorted",
            "1000places_random",
            "10000places_sorted",
            "10000places_random"
        };
        
        // 结果保存
        long[][] results = new long[4][3]; // [数据集][算法]
        
        // 测试每个数据集
        for (int i = 0; i < dataFiles.length; i++) {
            String[] data = readData(dataFiles[i]);
            System.out.println("测试数据集: " + dataFiles[i] + " (大小: " + data.length + ")");
            
            // 插入排序测试
            String[] dataCopy1 = Arrays.copyOf(data, data.length);
            long startTime = System.nanoTime();
            insertionSort(dataCopy1);
            long endTime = System.nanoTime();
            results[i][0] = endTime - startTime;
            System.out.println("插入排序完成, 用时: " + results[i][0] + " ns (" + (results[i][0] / 1_000_000.0) + " ms)");
            
            // 快速排序测试
            String[] dataCopy2 = Arrays.copyOf(data, data.length);
            startTime = System.nanoTime();
            quickSort(dataCopy2, 0, dataCopy2.length - 1);
            endTime = System.nanoTime();
            results[i][1] = endTime - startTime;
            System.out.println("快速排序完成, 用时: " + results[i][1] + " ns (" + (results[i][1] / 1_000_000.0) + " ms)");
            
            // 归并排序测试
            String[] dataCopy3 = Arrays.copyOf(data, data.length);
            startTime = System.nanoTime();
            mergeSort(dataCopy3, 0, dataCopy3.length - 1);
            endTime = System.nanoTime();
            results[i][2] = endTime - startTime;
            System.out.println("归并排序完成, 用时: " + results[i][2] + " ns (" + (results[i][2] / 1_000_000.0) + " ms)");
            
            System.out.println();
        }
        
        // 打印结果表格 (纳秒)
        System.out.println("结果表格 (纳秒):");
        System.out.println("数据集\t插入排序 (ns)\t快速排序 (ns)\t归并排序 (ns)");
        for (int i = 0; i < datasetNames.length; i++) {
            System.out.println(datasetNames[i] + "\t" + results[i][0] + "\t" + results[i][1] + "\t" + results[i][2]);
        }
        
        System.out.println("\n结果表格 (毫秒):");
        System.out.println("数据集\t插入排序 (ms)\t快速排序 (ms)\t归并排序 (ms)");
        for (int i = 0; i < datasetNames.length; i++) {
            System.out.println(datasetNames[i] + "\t" + (results[i][0] / 1_000_000.0) + "\t" + 
                              (results[i][1] / 1_000_000.0) + "\t" + (results[i][2] / 1_000_000.0));
        }
        
        // 将结果保存到文件
        try (PrintWriter writer = new PrintWriter(new OutputStreamWriter(new FileOutputStream("sorting_results.txt"), "UTF-8"))) {
            writer.println("数据集\t插入排序 (ns)\t快速排序 (ns)\t归并排序 (ns)");
            for (int i = 0; i < datasetNames.length; i++) {
                writer.println(datasetNames[i] + "\t" + results[i][0] + "\t" + results[i][1] + "\t" + results[i][2]);
            }
            
            writer.println("\n数据集\t插入排序 (ms)\t快速排序 (ms)\t归并排序 (ms)");
            for (int i = 0; i < datasetNames.length; i++) {
                writer.println(datasetNames[i] + "\t" + (results[i][0] / 1_000_000.0) + "\t" + 
                              (results[i][1] / 1_000_000.0) + "\t" + (results[i][2] / 1_000_000.0));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    // 读取CSV文件数据
    private static String[] readData(String filename) {
        List<String> data = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = br.readLine()) != null) {
                data.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return data.toArray(new String[0]);
    }
    
    // 插入排序
    private static void insertionSort(String[] arr) {
        for (int i = 1; i < arr.length; i++) {
            String key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j].compareTo(key) > 0) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
    
    // 快速排序
    private static void quickSort(String[] arr, int low, int high) {
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
    }
    
    // 归并排序
    private static void mergeSort(String[] arr, int left, int right) {
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
    }
} 
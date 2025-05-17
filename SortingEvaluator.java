import java.io.*;
import java.util.*;

public class SortingEvaluator {
    
    public static void main(String[] args) {
        // Dataset paths
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
        
        // Results storage
        long[][] results = new long[4][3]; // [dataset][algorithm]
        
        // Test each dataset
        for (int i = 0; i < dataFiles.length; i++) {
            String[] data = readData(dataFiles[i]);
            System.out.println("Testing dataset: " + dataFiles[i] + " (Size: " + data.length + ")");
            
            // Insertion sort test
            String[] dataCopy1 = Arrays.copyOf(data, data.length);
            long startTime = System.nanoTime();
            insertionSort(dataCopy1);
            long endTime = System.nanoTime();
            results[i][0] = endTime - startTime;
            System.out.println("Insertion sort completed, time: " + results[i][0] + " ns (" + (results[i][0] / 1_000_000.0) + " ms)");
            
            // Quick sort test
            String[] dataCopy2 = Arrays.copyOf(data, data.length);
            startTime = System.nanoTime();
            quickSort(dataCopy2, 0, dataCopy2.length - 1);
            endTime = System.nanoTime();
            results[i][1] = endTime - startTime;
            System.out.println("Quick sort completed, time: " + results[i][1] + " ns (" + (results[i][1] / 1_000_000.0) + " ms)");
            
            // Merge sort test
            String[] dataCopy3 = Arrays.copyOf(data, data.length);
            startTime = System.nanoTime();
            mergeSort(dataCopy3, 0, dataCopy3.length - 1);
            endTime = System.nanoTime();
            results[i][2] = endTime - startTime;
            System.out.println("Merge sort completed, time: " + results[i][2] + " ns (" + (results[i][2] / 1_000_000.0) + " ms)");
            
            System.out.println();
        }
        
        // Print results table (nanoseconds)
        System.out.println("Results table (nanoseconds):");
        System.out.println("Dataset\tInsertion Sort (ns)\tQuick Sort (ns)\tMerge Sort (ns)");
        for (int i = 0; i < datasetNames.length; i++) {
            System.out.println(datasetNames[i] + "\t" + results[i][0] + "\t" + results[i][1] + "\t" + results[i][2]);
        }
        
        System.out.println("\nResults table (milliseconds):");
        System.out.println("Dataset\tInsertion Sort (ms)\tQuick Sort (ms)\tMerge Sort (ms)");
        for (int i = 0; i < datasetNames.length; i++) {
            System.out.println(datasetNames[i] + "\t" + (results[i][0] / 1_000_000.0) + "\t" + 
                              (results[i][1] / 1_000_000.0) + "\t" + (results[i][2] / 1_000_000.0));
        }
        
        // Save results to file
        try (PrintWriter writer = new PrintWriter(new OutputStreamWriter(new FileOutputStream("sorting_results.txt"), "UTF-8"))) {
            writer.println("Dataset\tInsertion Sort (ns)\tQuick Sort (ns)\tMerge Sort (ns)");
            for (int i = 0; i < datasetNames.length; i++) {
                writer.println(datasetNames[i] + "\t" + results[i][0] + "\t" + results[i][1] + "\t" + results[i][2]);
            }
            
            writer.println("\nDataset\tInsertion Sort (ms)\tQuick Sort (ms)\tMerge Sort (ms)");
            for (int i = 0; i < datasetNames.length; i++) {
                writer.println(datasetNames[i] + "\t" + (results[i][0] / 1_000_000.0) + "\t" + 
                              (results[i][1] / 1_000_000.0) + "\t" + (results[i][2] / 1_000_000.0));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    // Read CSV file data
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
    
    // Insertion sort
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
    
    // Quick sort
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
    
    // Merge sort
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
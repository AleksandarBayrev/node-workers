import { parentPort, workerData } from "worker_threads";

const fibonacci = (number: number): number => {
  if (number <= 1) {
    return number;
  }
  return fibonacci(number - 1) + fibonacci(number - 2);
}

parentPort?.postMessage(fibonacci(workerData.number));
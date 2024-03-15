import { parentPort, workerData } from "worker_threads";

parentPort?.postMessage(workerData.inputArray.filter((x: number) => x % 2 === 0));
import { parentPort, workerData } from "worker_threads";

for (let i = 0; i < workerData.numberOfItems; i++) {
    parentPort?.postMessage(i);
}
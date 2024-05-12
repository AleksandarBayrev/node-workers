import osUtils from "os-utils";
import { Worker } from "worker_threads";
const onOnline = () => {
    console.log("Started worker");
};
const onMessage = (message: any) => {
    console.log(message);
}
const onMessageError = (error: any) => {
    console.error(error);
}
const onError = (error: any) => {
    console.error(error);
}
const generateWorker = () => {
    const worker = new Worker("while(true) {Math.random();}", {eval: true});
    worker.on("online", onOnline);
    worker.on("message", onMessage);
    worker.on("messageerror", onMessageError);
    worker.on("error", onError);
    worker.on("exit", () => {
        console.log("Exiting worker")
        worker.off("online", () => {});
        worker.off("message", () => {});
        worker.off("messageerror", () => {});
        worker.off("error", () => {});
        worker.off("exit", () => {});
    });
}

let workersCount = 0;
setInterval(() => {
    osUtils.cpuUsage((percentage) => {
        if (percentage < 0.99) {
            workersCount++;
            console.log(`(${new Date().toISOString()}) Generating new worker, current number of workers = ${workersCount}`)
            generateWorker();
        }
    });
});
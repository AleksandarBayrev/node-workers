import { Worker } from "worker_threads";

const getFibonacci = (number: number) => {
    return new Promise((res, rej) => {
        const worker = new Worker("./fibonacci-computation.js", {
            workerData: {
                number
            }
        });
        let result = 0;
        worker.on("message", (data) => {result = data});
        worker.on("messageerror", (error) => {rej(error)});
        worker.on("error", (error) => {rej(error)});
        worker.on("exit", () => {
            console.log("Finished generating fibonacci number order " + number);
            res(result);
        });
    });
}
(async () => {
    const workers = [];
    while (true) {
        for (let i = 0; i < 40; i++) {
            workers.push(getFibonacci(i));
        }
        let newWorkers = [...workers, ...workers];
        await (await Promise.all(newWorkers)).map(x => console.log(x))
        workers.length = 0;
    }
})();
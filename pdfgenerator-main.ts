import { Worker } from "worker_threads";
import fs from "fs/promises";
const getWorkerData = () => {
    const workerData: { data: any[] } = {
        data: []
    };
    for (let i = 0; i < 5000; i++) {
        workerData.data.push({
            name: "Alex",
            age: 27
        });
    }
    return workerData;
}
const generateWorkers = (numberOfWorkers: number) => {
    const workers = [];
    for (let i = 0; i < numberOfWorkers; i++) {
        workers.push(
            new Worker("./pdfgenerator.js", {
                workerData: getWorkerData()
            })
        );
    }
    return workers;
}
const workers = generateWorkers(1000);

let numberOfFiles = 0;
workers.forEach(worker => {
    let start = new Date();
    worker.on("online", () => {
        start = new Date();
        console.log(`Started processing data at ${start.toISOString()}`);
    });
    worker.on("message", async (data) => {
        numberOfFiles++;
    });
    worker.on("error", async (data) => {
        console.log(data);
    });
    worker.on("messageerror", async (data) => {
        console.log(data);
        //await fs.writeFile("./test.pdf", Buffer.concat(data));
    });
    worker.on("exit", () => {
        const end = new Date();
        worker.off("online", () => {});
        worker.off("message", () => {});
        worker.off("messageerror", () => {});
        worker.off("error", () => {});
        worker.off("exit", () => {});
        console.log(`Finished processing data at ${end.toISOString()}, time taken = ${end.getTime() - start.getTime()}ms`);
        console.log(`Processed ${numberOfFiles} files.`);
    })
});
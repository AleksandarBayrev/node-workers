import { Worker } from "worker_threads";

const generateData = (numberOfItems: number) => {
    return new Promise<number[]>((res, rej) => {
        const worker = new Worker("./arrayOperations-generateArray.js", {
            workerData: {
                numberOfItems
            }
        });
        const result: number[] = [];
        worker.on("message", (data) => result.push(data));
        worker.on("messageerror", (error) => {
            console.error(error);
            rej(error);
        });
        worker.on("error", (error) => {
            console.error(error);
            rej(error);
        });
        worker.on("exit", () => {
            console.log("Finished generating data")
            res(result);
        });
    });
}

const filterData = (inputArray: number[]) => {
    return new Promise<number[]>((res, rej) => {
        const worker = new Worker("./arrayOperations-filterArray.js", {
            workerData: {
                inputArray
            }
        });
        const result: number[] = [];
        worker.on("message", (data) => result.push(data));
        worker.on("messageerror", (error) => {
            console.error(error);
            rej(error);
        });
        worker.on("error", (error) => {
            console.error(error);
            rej(error);
        });
        worker.on("exit", () => {
            console.log("Finished filtering data");
            res(result);
        });
    })
}

(async () => {
    while (true) {
        const inputs = await Promise.all([
            generateData(100000),
            generateData(200000),
            generateData(300000),
            generateData(400000),
            generateData(500000),
            generateData(600000),
            generateData(700000),
            generateData(800000),
            generateData(900000),
        ]);
        const filtered = await Promise.all(inputs.map(x => filterData(x)));
        console.log(filtered.length);
    }
})();
import { Worker } from "worker_threads";

const getClientData: () => Promise<string> = () => {
    return new Promise((res, rej) => {
        const worker = new Worker("./node-pg-worker.js", {
            workerData: JSON.stringify({
                clientConfig: {
                    "host": "192.168.122.185",
                    "user": "postgres",
                    "password": "ws-2022-pgsql",
                    "port": 5432,
                    "database": "caches",
                    "keepAlive": true,
                    "application_name": "CacheSystem"
                }
            })
        });
        worker.on("message", (data) => res(data));
        worker.on("error", (err) => rej(err));
        worker.on("exit", () => {
            worker.off("message", () => {});
            worker.off("error", () => {});
            worker.off("exit", () => {});
        });
    });
}

const sleep = (ms: number) => new Promise((res, rej) => setTimeout(res, ms));

(async () => {
    while (true) {
        const clients = [];
        for (let i = 0; i < 90; i++) {
            clients.push(getClientData());
        }
        const data = await Promise.all(clients);
        console.log(new Date().toISOString(), data.map(x => JSON.parse(x).rowCount));
        await sleep(500);
    }
})();
import { Worker } from "worker_threads";
import fs from "fs/promises";
import path from "path";
const CONFIG_KEY = "NODE-PG-CONFIG";
const configurationCache = new Map<string, object>();

const getConfiguration = async () => {
    if (!configurationCache.has(CONFIG_KEY)) {
        configurationCache.set(CONFIG_KEY, JSON.parse((await fs.readFile(path.join(__dirname, "node-pg-config.json"))).toString()));
    }
    return configurationCache.get(CONFIG_KEY) as object;
}

const getClientData: () => Promise<string> = () => {
    return new Promise(async (res, rej) => {
        const worker = new Worker("./node-pg-worker.js", {
            workerData: JSON.stringify({
                clientConfig: await getConfiguration()
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
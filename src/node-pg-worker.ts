import pg from "pg";
import { workerData, parentPort } from "worker_threads";
(async () => {
    const client = new pg.Client(JSON.parse(workerData).clientConfig);
    await client.connect();
    const data = await client.query("SELECT id,username,password,deleted FROM public.usercache");
    parentPort?.postMessage(JSON.stringify({rows: data.rows, rowCount: data.rowCount}));
    await client.end();
})();
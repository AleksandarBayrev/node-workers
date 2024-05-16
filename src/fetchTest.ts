import fetch from "cross-fetch";
import {v4} from "uuid";
const getRequest = (body: {id: string, data: string}[]) => {
    return fetch("http://localhost:5225", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
}
const sleep = (timeout: number) => new Promise((res, rej) => setTimeout(res, timeout));
const sendData = () => {
    const requests = [];
    for (let i = 0; i < 50000; i++) {
        requests.push({id: v4(), data: i.toString()});
    }
    return getRequest(requests);
}
const getData = async () => {
    const data = await fetch("http://localhost:5225").then(x => x.json());
    console.log(data.length);
}
(async () => {
    while (true) {
        // await sendData();
        await getData();
        await sleep(100);
        console.log(`Done => ${new Date().toISOString()}`);
    }
})();
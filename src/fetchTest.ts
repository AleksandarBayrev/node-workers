import fetch from "cross-fetch"
const getRequest = (body: {text: string}) => {
    return fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
}
const sleep = (timeout: number) => new Promise((res, rej) => setTimeout(res, timeout));
const getRequests = () => {
    const requests = [];
    for (let i = 0; i < 50; i++) {
        requests.push(getRequest({text: i.toString()}));
    }
    return requests;
}
(async () => {
    while (true) {
        await Promise.all(getRequests());
        await sleep(100);
        console.log(`Done => ${new Date().toISOString()}`);
    }
})();
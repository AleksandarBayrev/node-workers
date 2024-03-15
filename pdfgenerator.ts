import { parentPort, workerData } from "worker_threads";
import PDFDocument from "pdfkit";

const buffers: Buffer[] = [];
const document = new PDFDocument();
document.on("data", (buffer) => buffers.push(buffer));
document.on("end", () => {
    parentPort?.postMessage(buffers);
});
workerData.data.forEach((x: {name: string;age: number;}) => {
    document.text(x.name);
    document.text(x.age.toString());
})
document.end();
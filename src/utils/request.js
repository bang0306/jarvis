import axios from "axios";
import { HOST } from "../config";
const request = axios.create({
  baseURL: HOST,
  timeout: 5000,
  headers: { "Allow-Control-Allow-Origin": "*" }
});
window.request = request;
export const getClipboardList = () =>
  request
    .get("/api/clipboard-items")
    .then(resp => resp.data)
    .then(list => list.map(item => ({ ...item, id: item._id })));

export const deleteClipboardItem = id =>
  request.delete(`/api/clipboard-item/${id}`);

export const createClipboardItem = ({ id, content, desc }) =>
  request.post("/api/clipboard-item", { params: { id, content, desc } });

import { https } from "firebase-functions";
import { http as appHttp } from "app";

const server = appHttp();

// Graphql api
// https://us-central1-<project-name>.cloudfunctions.net/api/
export const api = https.onRequest(server);

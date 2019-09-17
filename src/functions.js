import { https } from "firebase-functions";
import { http } from "@any-cloud/core";

const server = http();

// Graphql api
// https://us-central1-<project-name>.cloudfunctions.net/api/
export const api = https.onRequest(server);

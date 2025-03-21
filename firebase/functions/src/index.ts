/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import { onDocumentCreatedWithAuthContext } from "firebase-functions/v2/firestore";
import { getAuth } from "firebase-admin/auth";
// import * as logger from "firebase-functions/logger";
const { initializeApp } = require("firebase-admin/app");

initializeApp();
exports.userReg = onDocumentCreatedWithAuthContext("users/{userId}", (event) => {
  const uid = event.params.userId;

  getAuth().setCustomUserClaims(uid, {
    verified: true,
    userRole: "normal",
  });
});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

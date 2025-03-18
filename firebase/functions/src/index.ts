/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import { Change, FirestoreEvent, onDocumentCreatedWithAuthContext } from "firebase-functions/v2/firestore";
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.createuser = onDocumentCreatedWithAuthContext("users/{userId}", async (e) => {
    const uid = e.authId;

    if (uid) {
        const customClaims = {
            verified: true,
            usertype: 'normal',
        };

        try {
            await admin.auth().setCustomUserClaims(uid, customClaims);
            console.log(`Anpassade claims satt för användare ${uid}`);
        } catch (error) {
            console.error(`Kunde inte sätta anpassade claims för användare ${uid}:`, error);
        }
    } else {
        console.error('Ingen användar-ID (uid) tillgänglig i händelsens autentiseringsinformation.');
    }
})

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

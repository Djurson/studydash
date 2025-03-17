/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { firestore } from 'firebase-admin'
import * as functions from 'firebase-functions/v1'

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
    if (user.emailVerified) {
        await firestore().doc(`/users/${user.uid}`).create({

        })
    }
})

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

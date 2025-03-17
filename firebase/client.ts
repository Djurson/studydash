import { initializeApp, getApps } from "firebase/app";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FB_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID
};

let auth: Auth | undefined = undefined;

const currentApps = getApps();
if (currentApps.length <= 0) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);

    if (process.env.NEXT_PUBLIC_APP_ENV === "emulator" && process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH) {
        connectAuthEmulator(
            auth,
            `http://${process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH}`
        );
    }
} else {
    auth = getAuth(currentApps[0]);
    if (process.env.NEXT_PUBLIC_APP_ENV === "emulator" && process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH) {
        connectAuthEmulator(
            auth,
            `http://${process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH}`
        );
    }
}

export { auth }
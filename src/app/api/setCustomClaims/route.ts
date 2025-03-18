import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../../firebase/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { uid, year, previous } = req.body;

    if (!uid || !year || previous === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    if (!auth) {
        return res.status(100).json({ error: "Missing auth" });
    }

    try {
        await auth.setCustomUserClaims(uid, { year, previous });
        res.status(200).json({ message: "Custom claims set successfully" });
    } catch (error) {
        console.error("Firebase Admin Error:", error);
        res.status(500).json({ error: "Failed to set custom claims", details: error });
    }
}
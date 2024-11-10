// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function loginUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // ส่ง response กลับไปยังฝั่ง client
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        uid: user.uid,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: error.message });
  }
}

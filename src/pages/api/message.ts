import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const querySnapshot = await getDocs(collection(db, "message"));
      const messages: Message[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      res.status(200).json({ messages });
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

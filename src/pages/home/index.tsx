"use client";
import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

export default function HomePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = async () => {
    try {
      const response = await fetch("/api/message");
      const data = await response.json();
      console.log("Hello data:", data);
    } catch (error) {
      console.log("Hello Error:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const added = await addDataToFireStore(name, email, message);
    if (added) {
      setName("");
      setEmail("");
      setMessage("");
      alert("Added to fire store");
    }
  };

  async function addDataToFireStore(
    name: string,
    email: string,
    message: string
  ) {
    try {
      const docRef = await addDoc(collection(db, "message"), {
        name: name,
        email: email,
        message: message,
      });
      console.log("Document written with ID :", docRef.id);
      return true;
    } catch (error) {
      console.log("error from db : ", error);
      return false;
    }
  }

  return (
    <main className="flex min-h-screen justify-center px-4 py-10">
      <div>
        <h1>Add Data to Firestore Database</h1>
        <form className="bg-white rounded-lg px-4 py-4">
          <label className="text-black" htmlFor="name">
            name
          </label>
          <input
            type="text"
            id="name"
            className="text-black w-full px-3 py-2 border rounded-lg bg-green-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text-black" htmlFor="email">
            email
          </label>
          <input
            type="text"
            id="email"
            className="text-black w-full px-3 py-2 border rounded-lg bg-green-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-black" htmlFor="message">
            message
          </label>
          <input
            type="text"
            id="message"
            className="text-black w-full px-3 py-2 border rounded-lg bg-green-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex justify-center py-4">
            <button
              className="rounded-lg !bg-red-500 text-yellow-300 w-20 h-10 font-bold"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
        <div>
          <h1>Fetched Messages</h1>
          <ul>
            {/* {messagesReading.map((item) => (
              <li key={item.id}>
                <p>Name: {item.name}</p>
                <p>Email: {item.email}</p>
                <p>Message: {item.message}</p>
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    </main>
  );
}

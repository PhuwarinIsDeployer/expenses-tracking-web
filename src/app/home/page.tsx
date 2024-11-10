"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import registerUser from "@/pages/api/register";
import { UserIcon, KeyIcon } from "@heroicons/react/24/solid";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import "./style.css";

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("regis") === "1") {
      setIsRegister(true);
    }
  }, []);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User registered successfully:", data);
        alert("User registered successfully");
      } else {
        console.log("Error:", data.error);
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User logged in successfully:", data);
        alert("User logged in successfully");
      } else {
        console.log("Error:", data.error);
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Hello User logged in:", user);
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  return (
    <main className="home-page">
      <div className="home-container">
        <form className="home-form">
          <h1 className="title">Expense Tracking</h1>
          <label htmlFor="name">Email</label>
          <div className="input-with-icon">
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="home-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <UserIcon className="icon" />
          </div>
          <label htmlFor="email">Password</label>
          <div className="input-with-icon">
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="home-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <KeyIcon className="icon" />
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <button
              className="home-login"
              onClick={isRegister ? handleRegister : handleLogin}
            >
              {isRegister ? "REGISTER" : "LOGIN"}
            </button>
            <button onClick={handleGoogleSignIn} className="home-google-login">
              Sign in with Google
            </button>
            <div className="home-bottom-link">
              <a href="#" className="home-link">
                Forgot Password?
              </a>
              <a href="/home?regis=1" className="home-link">
                {!isRegister ? "Register?" : "Already Have Account?"}
              </a>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

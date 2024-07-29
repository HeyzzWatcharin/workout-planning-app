"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } catch (err) {
      setLoading(false);
      setSuccess(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSignIn}
        className="bg-white p-12 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl text-black mb-4 text-center font-semibold ">
          Sign In
        </h2>
        {error && (
          <p className="text-red-500 mb-4 text-center">
            Wrong email or password. Try again.
          </p>
        )}
        <div className="mb-4">
          <label className="block mb-2 text-black">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-black">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 my-3 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : success ? "Success" : "Sign In"}
        </button>
        <div>
          <h2 className="text-black text-sm font-normal text-center">
            {"Don't have an accout?"}
            <span
              onClick={() => router.push("/signUp")}
              className="text-sm text-bold mx-2 hover:cursor-pointer hover:underline hover:text-blue-500"
            >
              Sign Up
            </span>
          </h2>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
